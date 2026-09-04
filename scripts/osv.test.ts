import { createHash } from "node:crypto";
import { mkdtemp, readdir, rm, stat } from "node:fs/promises";
import { tmpdir } from "node:os";
import { resolve } from "node:path";

import { describe, expect, it } from "@effect/vitest";

import {
  type CommandRunner,
  downloadOsvRelease,
  OsvAuditError,
  type OsvFetcher,
  type OsvRelease,
  resolveOsvRelease,
  runCommand,
  runOsvAudit,
} from "#scripts/osv";

const SCANNER = new TextEncoder().encode("verified scanner");
const ASSET_PATTERN = /^osv-scanner_[a-z0-9_.]+$/u;
const CHECKSUM_PATTERN = /^[a-f0-9]{64}$/u;
const RELEASE = {
  asset: "osv-scanner_test",
  checksum: createHash("sha256").update(SCANNER).digest("hex"),
} satisfies OsvRelease;

/** Builds one deterministic HTTP response for the download boundary. */
function response(
  status: number,
  body: string | Uint8Array | null = null,
  headers?: Readonly<Record<string, string>>
) {
  return new Response(body, headers ? { headers, status } : { status });
}

/** Runs one assertion inside an isolated filesystem root and erases it. */
async function withTemporaryRoot(operation: (root: string) => Promise<void>) {
  const root = await mkdtemp(resolve(tmpdir(), "aksara-osv-test-"));
  try {
    await operation(root);
  } finally {
    await rm(root, { force: true, recursive: true });
  }
}

/** Returns the authenticated scanner bytes without external network access. */
const scannerFetcher: OsvFetcher = () =>
  Promise.resolve(response(200, SCANNER));

/** Builds the explicit repository and platform input for one audit. */
function auditInput(
  root: string,
  platform: NodeJS.Platform = "darwin",
  release: OsvRelease = RELEASE,
  temporaryRoot = root
) {
  return { platform, release, root, temporaryRoot };
}

describe("OSV dependency audit", () => {
  it.each([
    ["darwin", "arm64"],
    ["darwin", "x64"],
    ["linux", "arm64"],
    ["linux", "x64"],
    ["win32", "arm64"],
    ["win32", "x64"],
  ] as const)("selects a pinned %s/%s release", (platform, architecture) => {
    const release = resolveOsvRelease(platform, architecture);

    expect(release.asset).toMatch(ASSET_PATTERN);
    expect(release.checksum).toMatch(CHECKSUM_PATTERN);
    expect(release.asset.endsWith(".exe")).toBe(platform === "win32");
  });

  it("rejects a platform without an official binary", () => {
    expect(() => resolveOsvRelease("aix", "ppc64")).toThrow("aix/ppc64");
  });

  it("follows HTTPS redirects and preserves the bounded request policy", async () => {
    const calls: { init: RequestInit; url: string }[] = [];
    /** Records each redirect request before returning deterministic bytes. */
    const fetcher: OsvFetcher = (url, init) => {
      calls.push({ init, url });
      return Promise.resolve(
        calls.length === 1
          ? response(302, null, { location: "/scanner" })
          : response(200, SCANNER)
      );
    };

    await expect(
      downloadOsvRelease("https://example.test/release", fetcher)
    ).resolves.toEqual(SCANNER);
    expect(calls.map(({ url }) => url)).toEqual([
      "https://example.test/release",
      "https://example.test/scanner",
    ]);
    expect(calls[0]?.init.redirect).toBe("manual");
  });

  it("retries a transient download failure", async () => {
    let attempts = 0;
    /** Fails once before returning the authenticated scanner bytes. */
    const fetcher: OsvFetcher = () => {
      attempts += 1;
      if (attempts === 1) {
        return Promise.reject(new Error("temporary network failure"));
      }
      return Promise.resolve(response(200, SCANNER));
    };

    await expect(
      downloadOsvRelease("https://example.test/scanner", fetcher)
    ).resolves.toEqual(SCANNER);
  });

  it.each([
    [
      "redirect lost its location",
      async () => response(302),
      "https://example.test/scanner",
      128,
    ],
    [
      "download left HTTPS",
      async () => response(200, SCANNER),
      "http://example.test/scanner",
      128,
    ],
    [
      "download left HTTPS",
      async () =>
        response(302, null, { location: "http://example.test/scanner" }),
      "https://example.test/scanner",
      128,
    ],
    [
      "returned HTTP 503",
      async () => response(503),
      "https://example.test/scanner",
      128,
    ],
    [
      "exceeded its byte limit",
      async () => response(200, null, { "content-length": "9" }),
      "https://example.test/scanner",
      8,
    ],
    [
      "exceeded its byte limit",
      async () => response(200, new Uint8Array(9)),
      "https://example.test/scanner",
      8,
    ],
  ] satisfies readonly [string, OsvFetcher, string, number][])(
    "fails closed when a response $0",
    async (expected, fetcher, url, maxBytes) => {
      await expect(
        downloadOsvRelease(url, fetcher, maxBytes)
      ).rejects.toMatchObject({
        cause: expect.objectContaining({
          message: expect.stringContaining(expected),
        }),
        message: "Unable to download OSV Scanner.",
        name: "OsvAuditError",
      });
    }
  );

  it("stops after the redirect limit", async () => {
    let calls = 0;
    /** Returns an endless redirect while recording the bounded call count. */
    const fetcher: OsvFetcher = () => {
      calls += 1;
      return Promise.resolve(response(302, null, { location: "/again" }));
    };

    await expect(
      downloadOsvRelease("https://example.test/scanner", fetcher)
    ).rejects.toMatchObject({
      cause: expect.objectContaining({
        message: "OSV Scanner download exceeded its redirect limit.",
      }),
    });
    expect(calls).toBe(24);
  });

  it("downloads, authenticates, executes, and erases one scanner", async () =>
    withTemporaryRoot(async (root) => {
      const calls: { args: readonly string[]; cwd: string; file: string }[] =
        [];
      /** Records the authenticated executable and verifies POSIX permissions. */
      const runner: CommandRunner = async (file, args, cwd) => {
        calls.push({ args, cwd, file });
        expect((await stat(file)).mode % 0o1000).toBe(0o700);
        return 0;
      };

      await runOsvAudit(auditInput(root), scannerFetcher, runner);

      expect(calls[0]).toMatchObject({
        args: [
          "scan",
          "source",
          `--lockfile=${resolve(root, "pnpm-lock.yaml")}`,
        ],
        cwd: root,
      });
      await expect(readdir(root)).resolves.toEqual([]);
    }));

  it("uses the Windows executable without applying POSIX permissions", async () =>
    withTemporaryRoot(async (root) => {
      /** Verifies that Windows binaries retain their written permissions. */
      const runner: CommandRunner = async (file) => {
        expect((await stat(file)).mode % 0o1000).toBe(0o644);
        return 0;
      };

      await runOsvAudit(
        auditInput(root, "win32", {
          ...RELEASE,
          asset: "osv-scanner_test.exe",
        }),
        scannerFetcher,
        runner
      );
    }));

  it.each([
    [
      "Unable to download",
      () => Promise.reject(new Error("offline")),
      RELEASE,
      async () => 0,
    ],
    [
      "checksum verification failed",
      async () => response(200, "foreign scanner"),
      RELEASE,
      async () => 0,
    ],
    [
      "Unable to write",
      scannerFetcher,
      { ...RELEASE, asset: "missing/scanner" },
      async () => 0,
    ],
    [
      "Unable to start",
      scannerFetcher,
      RELEASE,
      () => Promise.reject(new Error("cannot spawn")),
    ],
    [
      "preserved failure",
      scannerFetcher,
      RELEASE,
      () => Promise.reject(new OsvAuditError("preserved failure")),
    ],
    ["found an issue or failed", scannerFetcher, RELEASE, async () => 1],
  ] satisfies readonly [string, OsvFetcher, OsvRelease, CommandRunner][])(
    "erases temporary files when the audit $0",
    async (expected, fetcher, release, runner) =>
      withTemporaryRoot(async (root) => {
        await expect(
          runOsvAudit(auditInput(root, "darwin", release), fetcher, runner)
        ).rejects.toThrow(expected);
        await expect(readdir(root)).resolves.toEqual([]);
      })
  );

  it("maps a scanner directory creation failure", async () => {
    await expect(
      runOsvAudit(
        auditInput(
          import.meta.dirname,
          "darwin",
          RELEASE,
          resolve(import.meta.dirname, "missing-osv-test-directory")
        ),
        scannerFetcher,
        async () => 0
      )
    ).rejects.toThrow("Unable to create the scanner directory.");
  });

  it("runs real subprocesses without a shell and preserves failure state", async () => {
    await expect(
      runCommand(
        process.execPath,
        ["--eval", "process.exit(3)"],
        import.meta.dirname
      )
    ).resolves.toBe(3);
    await expect(
      runCommand("aksara-missing-osv-command", [], import.meta.dirname)
    ).rejects.toBeInstanceOf(Error);
    await expect(
      runCommand(
        process.execPath,
        ["--eval", "process.kill(process.pid, 'SIGTERM')"],
        import.meta.dirname
      )
    ).rejects.toBeInstanceOf(OsvAuditError);
  });
});
