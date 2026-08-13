import { createHash } from "node:crypto";
import type { EditorialReviewManifest } from "@nakafa/aksara-contracts/editorial/review";
import {
  EDITORIAL_REVIEW_FORMAT,
  EditorialReviewRecordSchema,
  HUMANIZER_WORKFLOW_VERSION,
  makeEditorialReviewManifest,
} from "@nakafa/aksara-contracts/editorial/review";
import {
  GitCommitShaSchema,
  Sha256HashSchema,
} from "@nakafa/aksara-contracts/ids";
import {
  MAX_RAW_MDX_BYTES,
  MAX_REVIEWED_OFFICIAL_SOURCE_BYTES,
} from "@nakafa/aksara-contracts/limits";
import type { AppLocaleCode } from "@nakafa/aksara-contracts/locale";
import { ExactProcess } from "@nakafa/aksara-utilities/process/exact";
import { Effect, Schema } from "effect";
import { describe, expect, it } from "vitest";
import {
  EditorialReviewFileConflictError,
  loadEditorialReviewManifest,
  verifyEditorialReviewSources,
} from "#publisher/editorial/review";
import { GitBlob } from "#publisher/git/blob";

const revision = GitCommitShaSchema.make("a".repeat(40));
const repositoryRoot = "/test-only/aksara";
const reviewManifestPath = "packages/corpus/editorial/review/catalog.json";
const reviewPartPath = "packages/corpus/editorial/review/part-0001.json";
const files = {
  "packages/corpus/material/example/de.mdx": "German target",
  "packages/corpus/material/example/en.mdx": "English source",
} as const;

/** Hashes exact test file bytes through the production digest shape. */
function hash(content: string) {
  return Sha256HashSchema.make(
    `sha256:${createHash("sha256").update(content).digest("hex")}`
  );
}

/** Builds one canonical editorial review record for source verification. */
function reviewRecord(
  appLocale: AppLocaleCode,
  targetHash = hash(files["packages/corpus/material/example/de.mdx"])
) {
  return {
    appLocale,
    deliveryLanguage: "de",
    reviewMode: "assessed-language-preserved",
    sources: [
      {
        sourceHash: hash(files["packages/corpus/material/example/en.mdx"]),
        sourcePath: "packages/corpus/material/example/en.mdx",
      },
    ],
    targetHash,
    targetPath: "packages/corpus/material/example/de.mdx",
    workflowVersion: HUMANIZER_WORKFLOW_VERSION,
  } as const;
}

/** Runs source verification against an isolated in-memory Git blob seam. */
function verify(
  manifest: unknown,
  overrides: Readonly<Record<string, string>> = files,
  omitPath?: string
) {
  const reads: string[] = [];
  const gitBlob = GitBlob.of({
    read: ({ maxBytes, sourcePath }) => {
      reads.push(`${sourcePath}:${maxBytes}`);
      const value = overrides[sourcePath as keyof typeof overrides];
      return value === undefined
        ? Effect.dieMessage(`Missing test file ${sourcePath}.`)
        : Effect.succeed(value);
    },
    readBytes: ({ maxBytes, sourcePath }) => {
      reads.push(`${sourcePath}:${maxBytes}`);
      const value = overrides[sourcePath as keyof typeof overrides];
      return value === undefined
        ? Effect.dieMessage(`Missing test file ${sourcePath}.`)
        : Effect.succeed(new TextEncoder().encode(value));
    },
    readManyBytes: (inputs) =>
      Effect.forEach(inputs, ({ maxBytes, sourcePath }) => {
        reads.push(`${sourcePath}:${maxBytes}`);
        const value = overrides[sourcePath as keyof typeof overrides];
        return value === undefined
          ? Effect.dieMessage(`Missing test file ${sourcePath}.`)
          : Effect.succeed([
              sourcePath,
              new TextEncoder().encode(value),
            ] as const);
      }).pipe(
        Effect.map(
          (entries) =>
            new Map(entries.filter(([sourcePath]) => sourcePath !== omitPath))
        )
      ),
  });
  return {
    program: verifyEditorialReviewSources({ manifest, revision }).pipe(
      Effect.provideService(GitBlob, gitBlob)
    ),
    reads,
  };
}

/** Serves exact Git metadata and blobs for the live review loader adapter. */
function makeGitProcess(blobs: Readonly<Record<string, string>>) {
  return ExactProcess.of({
    run: (input) => {
      const [, , , operation] = input.args;
      if (operation === "rev-parse") {
        return Effect.succeed({
          exitCode: 0,
          stderr: new Uint8Array(),
          stdout: new TextEncoder().encode(`${revision}\n`),
        });
      }
      const coordinates = new TextDecoder()
        .decode(input.stdin)
        .trimEnd()
        .split("\n");
      const sources = coordinates.map((coordinate) => {
        const separator = coordinate.indexOf(":");
        return blobs[coordinate.slice(separator + 1)];
      });
      if (sources.some((source) => source === undefined)) {
        return Effect.succeed({
          exitCode: 1,
          stderr: new TextEncoder().encode("Missing test blob."),
          stdout: new Uint8Array(),
        });
      }
      const frames = sources.map((source) => {
        const bytes = new TextEncoder().encode(source);
        const header = new TextEncoder().encode(
          `${"b".repeat(40)} blob ${bytes.byteLength}\n`
        );
        const frame = new Uint8Array(header.byteLength + bytes.byteLength + 1);
        frame.set(header);
        frame.set(bytes, header.byteLength);
        frame[frame.byteLength - 1] = 0x0a;
        return frame;
      });
      const stdout = new Uint8Array(
        frames.reduce((total, frame) => total + frame.byteLength, 0)
      );
      let offset = 0;
      for (const frame of frames) {
        stdout.set(frame, offset);
        offset += frame.byteLength;
      }
      return Effect.succeed({
        exitCode: 0,
        stderr: new Uint8Array(),
        stdout,
      });
    },
  });
}

/** Loads one manifest through the production exact-Git adapter. */
function loadReview(blobs: Readonly<Record<string, string>>) {
  return loadEditorialReviewManifest({ repositoryRoot, revision }).pipe(
    Effect.provideService(ExactProcess, makeGitProcess(blobs))
  );
}

/** Encodes one bounded catalog and record part for the exact-Git loader. */
function reviewBlobs(manifest: EditorialReviewManifest) {
  const part = JSON.stringify(manifest.records);
  return {
    ...files,
    [reviewManifestPath]: JSON.stringify({
      digest: manifest.digest,
      format: EDITORIAL_REVIEW_FORMAT,
      parts: [
        {
          recordCount: manifest.records.length,
          sourceHash: hash(part),
          sourcePath: reviewPartPath,
        },
      ],
    }),
    [reviewPartPath]: part,
  };
}

/** Strictly builds one canonical manifest from test review records. */
function makeReviewManifest(...records: readonly unknown[]) {
  const decoded = Schema.decodeUnknownSync(
    Schema.Array(EditorialReviewRecordSchema)
  )(records);
  return Effect.runPromise(makeEditorialReviewManifest(decoded));
}

describe("editorial review source verification", () => {
  it("recalculates each unique exact Git blob once", async () => {
    const manifest = await makeReviewManifest(
      reviewRecord("de"),
      reviewRecord("en")
    );
    const verification = verify(manifest);

    await expect(Effect.runPromise(verification.program)).resolves.toEqual(
      manifest
    );
    expect(verification.reads).toEqual([
      `packages/corpus/material/example/de.mdx:${MAX_RAW_MDX_BYTES}`,
      `packages/corpus/material/example/en.mdx:${MAX_RAW_MDX_BYTES}`,
    ]);
  });
  it("uses the bounded official-source reader for immutable records", async () => {
    const immutable = Schema.decodeUnknownSync(EditorialReviewRecordSchema)({
      ...reviewRecord("de"),
      deliveryLanguage: "de",
      reviewMode: "immutable-official-source",
    });
    const manifest = await makeReviewManifest(immutable);
    const verification = verify(manifest);

    await Effect.runPromise(verification.program);
    expect(verification.reads).toEqual([
      `packages/corpus/material/example/de.mdx:${MAX_REVIEWED_OFFICIAL_SOURCE_BYTES}`,
      `packages/corpus/material/example/en.mdx:${MAX_REVIEWED_OFFICIAL_SOURCE_BYTES}`,
    ]);
  });
  it("loads and authenticates the canonical manifest from exact Git", async () => {
    const manifest = await makeReviewManifest(reviewRecord("de"));

    await expect(
      Effect.runPromise(loadReview(reviewBlobs(manifest)))
    ).resolves.toEqual(manifest);
  });
  it("wraps invalid manifest JSON at the exact Git boundary", async () => {
    const error = await Effect.runPromise(
      loadReview({ [reviewManifestPath]: "{" }).pipe(Effect.flip)
    );

    expect(error).toMatchObject({
      _tag: "EditorialReviewLoadError",
      cause: { _tag: "EditorialReviewCatalogError" },
    });
  });
  it("rejects stale target bytes", async () => {
    const manifest = await makeReviewManifest(reviewRecord("de"));
    const verification = verify(manifest, {
      ...files,
      "packages/corpus/material/example/de.mdx": "Changed target",
    });
    const error = await Effect.runPromise(
      verification.program.pipe(Effect.flip)
    );

    expect(error).toMatchObject({
      _tag: "EditorialReviewFileHashError",
      path: "packages/corpus/material/example/de.mdx",
    });
  });
  it("rejects a batch response that omits one reviewed blob", async () => {
    const manifest = await makeReviewManifest(reviewRecord("de"));
    const verification = verify(
      manifest,
      files,
      "packages/corpus/material/example/de.mdx"
    );

    await expect(
      Effect.runPromise(verification.program.pipe(Effect.flip))
    ).resolves.toMatchObject({ _tag: "EditorialReviewLoadError" });
  });
  it("rejects contradictory hashes before reading Git", async () => {
    const manifest = await makeReviewManifest(
      reviewRecord("de"),
      reviewRecord("en", Sha256HashSchema.make(`sha256:${"f".repeat(64)}`))
    );
    const verification = verify(manifest);

    const error = await Effect.runPromise(
      verification.program.pipe(Effect.flip)
    );
    expect(error).toBeInstanceOf(EditorialReviewFileConflictError);
    expect(verification.reads).toHaveLength(0);
  });
  it("uses the strongest bounded read when one exact file has two roles", async () => {
    const immutable = Schema.decodeUnknownSync(EditorialReviewRecordSchema)({
      ...reviewRecord("en"),
      deliveryLanguage: "en",
      reviewMode: "immutable-official-source",
    });
    const manifest = await makeReviewManifest(reviewRecord("de"), immutable);
    const verification = verify(manifest);

    await expect(Effect.runPromise(verification.program)).resolves.toEqual(
      manifest
    );
    expect(verification.reads).toEqual([
      `packages/corpus/material/example/de.mdx:${MAX_REVIEWED_OFFICIAL_SOURCE_BYTES}`,
      `packages/corpus/material/example/en.mdx:${MAX_REVIEWED_OFFICIAL_SOURCE_BYTES}`,
    ]);
  });
});
