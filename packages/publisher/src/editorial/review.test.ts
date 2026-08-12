import { createHash } from "node:crypto";

import {
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
import { Effect, Schema } from "effect";
import { describe, expect, it } from "vitest";

import {
  EditorialReviewFileConflictError,
  EditorialReviewFileLimitConflictError,
  verifyEditorialReviewSources,
} from "#publisher/editorial/review";
import { GitBlob } from "#publisher/git/blob";

const revision = GitCommitShaSchema.make("a".repeat(40));
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
  appLocale: "de" | "en",
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
  overrides: Readonly<Record<string, string>> = files
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
  });
  return {
    program: verifyEditorialReviewSources({ manifest, revision }).pipe(
      Effect.provideService(GitBlob, gitBlob)
    ),
    reads,
  };
}

describe("editorial review source verification", () => {
  it("recalculates each unique exact Git blob once", async () => {
    const records = Schema.decodeUnknownSync(
      Schema.Array(EditorialReviewRecordSchema)
    )([reviewRecord("de"), reviewRecord("en")]);
    const manifest = await Effect.runPromise(
      makeEditorialReviewManifest(records)
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
    const manifest = await Effect.runPromise(
      makeEditorialReviewManifest([immutable])
    );
    const verification = verify(manifest);

    await Effect.runPromise(verification.program);
    expect(verification.reads).toEqual([
      `packages/corpus/material/example/de.mdx:${MAX_REVIEWED_OFFICIAL_SOURCE_BYTES}`,
      `packages/corpus/material/example/en.mdx:${MAX_REVIEWED_OFFICIAL_SOURCE_BYTES}`,
    ]);
  });

  it("rejects stale target bytes", async () => {
    const records = Schema.decodeUnknownSync(
      Schema.Array(EditorialReviewRecordSchema)
    )([reviewRecord("de")]);
    const manifest = await Effect.runPromise(
      makeEditorialReviewManifest(records)
    );
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

  it("rejects contradictory hashes before reading Git", async () => {
    const records = Schema.decodeUnknownSync(
      Schema.Array(EditorialReviewRecordSchema)
    )([
      reviewRecord("de"),
      reviewRecord("en", Sha256HashSchema.make(`sha256:${"f".repeat(64)}`)),
    ]);
    const manifest = await Effect.runPromise(
      makeEditorialReviewManifest(records)
    );
    const verification = verify(manifest);

    const error = await Effect.runPromise(
      verification.program.pipe(Effect.flip)
    );
    expect(error).toBeInstanceOf(EditorialReviewFileConflictError);
    expect(verification.reads).toHaveLength(0);
  });

  it("rejects contradictory bounded read policies before reading Git", async () => {
    const immutable = Schema.decodeUnknownSync(EditorialReviewRecordSchema)({
      ...reviewRecord("en"),
      deliveryLanguage: "en",
      reviewMode: "immutable-official-source",
    });
    const records = Schema.decodeUnknownSync(
      Schema.Array(EditorialReviewRecordSchema)
    )([reviewRecord("de"), immutable]);
    const manifest = await Effect.runPromise(
      makeEditorialReviewManifest(records)
    );
    const verification = verify(manifest);

    const error = await Effect.runPromise(
      verification.program.pipe(Effect.flip)
    );
    expect(error).toBeInstanceOf(EditorialReviewFileLimitConflictError);
    expect(verification.reads).toHaveLength(0);
  });
});
