import { spawn } from "node:child_process";
import { createHash } from "node:crypto";
import { chmod, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { resolve } from "node:path";

const OSV_VERSION = "2.5.1";
const MAX_SCANNER_BYTES = 128 * 1024 * 1024;
const MAX_REDIRECTS = 5;
const DOWNLOAD_ATTEMPTS = 4;
const DOWNLOAD_TIMEOUT_MS = 120_000;

/** One checksum-pinned official OSV Scanner release asset. */
export interface OsvRelease {
  readonly asset: string;
  readonly checksum: string;
}

const RELEASES: Readonly<Record<string, OsvRelease>> = {
  "darwin/arm64": {
    asset: "osv-scanner_darwin_arm64",
    checksum:
      "75c44d6332f892a1e56286f4105a98ed751ae28d215ca0a8b65cc00d84103054",
  },
  "darwin/x64": {
    asset: "osv-scanner_darwin_amd64",
    checksum:
      "9f89beb6c3d784893cb1cae0a3d56c529bfe91075418c2f9440c45b79654198b",
  },
  "linux/arm64": {
    asset: "osv-scanner_linux_arm64",
    checksum:
      "3d0f5aa5a6baa8eb32bcef247388e149ef6030a6634ccae6fa0d62681fb27a6d",
  },
  "linux/x64": {
    asset: "osv-scanner_linux_amd64",
    checksum:
      "f9f25499a2c8cc367b3af45df2ea7eeca7fbccceab9c35079968f4b3652194be",
  },
  "win32/arm64": {
    asset: "osv-scanner_windows_arm64.exe",
    checksum:
      "33feb0b210a3e5ea7b338c719defc899f8833d990cdd297bcad4ff1a2586ec8b",
  },
  "win32/x64": {
    asset: "osv-scanner_windows_amd64.exe",
    checksum:
      "25e42f5ef6711fd8c0fb45390972205891dd44c6bd02ac93f0f63e8e98d9bfb6",
  },
};

/** Fetch boundary used before audited packages are allowed to execute. */
export type OsvFetcher = (
  input: string,
  init: RequestInit
) => Promise<Response>;

/** Process boundary used after the scanner binary passes authentication. */
export type CommandRunner = (
  executable: string,
  args: readonly string[],
  cwd: string
) => Promise<number>;

/** The dependency audit could not establish a trustworthy result. */
export class OsvAuditError extends Error {
  override readonly name = "OsvAuditError";

  /** Creates one stable audit failure. */
  constructor(message: string, cause?: unknown) {
    super(message, { cause });
  }
}

/** Resolves the exact official scanner asset for one supported platform. */
export function resolveOsvRelease(
  platform: NodeJS.Platform,
  architecture: string
) {
  const release = RELEASES[`${platform}/${architecture}`];
  if (!release) {
    throw new OsvAuditError(
      `OSV Scanner does not publish a binary for ${platform}/${architecture}.`
    );
  }
  return release;
}

/** Reports whether one response continues through a redirect. */
function isRedirect(status: number) {
  return [301, 302, 303, 307, 308].includes(status);
}

/** Fetches one authenticated candidate through bounded HTTPS redirects. */
async function fetchReleaseOnce(
  url: string,
  fetcher: OsvFetcher,
  maxBytes: number
) {
  let current = new URL(url);

  for (let redirects = 0; redirects <= MAX_REDIRECTS; redirects += 1) {
    if (current.protocol !== "https:") {
      throw new OsvAuditError("OSV Scanner download left HTTPS.");
    }
    // biome-ignore lint/performance/noAwaitInLoops: redirects must remain sequential.
    const response = await fetcher(current.href, {
      redirect: "manual",
      signal: AbortSignal.timeout(DOWNLOAD_TIMEOUT_MS),
    });
    if (isRedirect(response.status)) {
      const location = response.headers.get("location");
      if (!location) {
        throw new OsvAuditError("OSV Scanner redirect lost its location.");
      }
      current = new URL(location, current);
      continue;
    }
    if (!response.ok) {
      throw new OsvAuditError(
        `OSV Scanner download returned HTTP ${response.status}.`
      );
    }
    const declaredLength = response.headers.get("content-length");
    if (declaredLength !== null && Number(declaredLength) > maxBytes) {
      throw new OsvAuditError("OSV Scanner download exceeded its byte limit.");
    }
    const binary = new Uint8Array(await response.arrayBuffer());
    if (binary.byteLength > maxBytes) {
      throw new OsvAuditError("OSV Scanner download exceeded its byte limit.");
    }
    return binary;
  }

  throw new OsvAuditError("OSV Scanner download exceeded its redirect limit.");
}

/** Downloads one release with bounded retries, redirects, time, and bytes. */
export async function downloadOsvRelease(
  url: string,
  fetcher: OsvFetcher,
  maxBytes = MAX_SCANNER_BYTES
) {
  let failure: unknown;

  for (let attempt = 0; attempt < DOWNLOAD_ATTEMPTS; attempt += 1) {
    // biome-ignore lint/performance/noAwaitInLoops: retries must remain sequential.
    const result = await fetchReleaseOnce(url, fetcher, maxBytes).then(
      (binary) => ({ binary, ok: true as const }),
      (error: unknown) => ({ error, ok: false as const })
    );
    if (result.ok) {
      return result.binary;
    }
    failure = result.error;
  }

  throw new OsvAuditError("Unable to download OSV Scanner.", failure);
}

/** Runs one scanner process without a shell and preserves terminal output. */
export function runCommand(
  executable: string,
  args: readonly string[],
  cwd: string
) {
  return new Promise<number>((resolveExit, reject) => {
    const child = spawn(executable, [...args], {
      cwd,
      shell: false,
      stdio: "inherit",
    });
    child.once("error", reject);
    child.once("close", (code) => {
      if (code === null) {
        reject(new OsvAuditError("OSV Scanner ended without an exit code."));
        return;
      }
      resolveExit(code);
    });
  });
}

/** Maps one infrastructure failure into the stable audit contract. */
async function auditStep<Value>(
  message: string,
  operation: () => Promise<Value>
) {
  return await operation().catch((cause: unknown) => {
    throw cause instanceof OsvAuditError
      ? cause
      : new OsvAuditError(message, cause);
  });
}

interface OsvAuditInput {
  readonly platform: NodeJS.Platform;
  readonly release: OsvRelease;
  readonly root: string;
  readonly temporaryRoot: string;
}

/** Downloads, authenticates, executes, and erases one pinned scanner. */
export async function runOsvAudit(
  input: OsvAuditInput,
  fetcher: OsvFetcher,
  runner: CommandRunner
) {
  const directory = await auditStep(
    "Unable to create the scanner directory.",
    () => mkdtemp(resolve(input.temporaryRoot, "aksara-osv-"))
  );

  try {
    const binary = resolve(directory, input.release.asset);
    const source = await downloadOsvRelease(
      `https://github.com/google/osv-scanner/releases/download/v${OSV_VERSION}/${input.release.asset}`,
      fetcher
    );
    const checksum = createHash("sha256").update(source).digest("hex");
    if (checksum !== input.release.checksum) {
      throw new OsvAuditError("OSV Scanner checksum verification failed.");
    }
    await auditStep("Unable to write OSV Scanner.", () =>
      writeFile(binary, source)
    );
    if (input.platform !== "win32") {
      await auditStep("Unable to authorize OSV Scanner.", () =>
        chmod(binary, 0o700)
      );
    }
    const exitCode = await auditStep("Unable to start OSV Scanner.", () =>
      runner(
        binary,
        [
          "scan",
          "source",
          `--lockfile=${resolve(input.root, "pnpm-lock.yaml")}`,
        ],
        input.root
      )
    );
    if (exitCode !== 0) {
      throw new OsvAuditError("OSV Scanner found an issue or failed.");
    }
  } finally {
    await auditStep("Unable to erase OSV Scanner.", () =>
      rm(directory, { force: true, recursive: true })
    );
  }
}

/* istanbul ignore next -- the real CLI boundary is verified by pnpm security:audit. */
if (import.meta.main) {
  await runOsvAudit(
    {
      platform: process.platform,
      release: resolveOsvRelease(process.platform, process.arch),
      root: resolve(import.meta.dirname, ".."),
      temporaryRoot: tmpdir(),
    },
    globalThis.fetch,
    runCommand
  );
}
