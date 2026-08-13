import { FileSystem } from "@effect/platform";
import { NodeContext } from "@effect/platform-node";
import {
  EditorialReviewRecordSchema,
  HUMANIZER_WORKFLOW_VERSION,
} from "@nakafa/aksara-contracts/editorial/review";
import { Sha256HashSchema } from "@nakafa/aksara-contracts/ids";
import { Effect, Schema } from "effect";
import { describe, expect, it } from "vitest";

import {
  EditorialReviewWriteError,
  writeEditorialReviewCatalog,
} from "#publisher/editorial/write";

const hash = Sha256HashSchema.make(`sha256:${"a".repeat(64)}`);
const targetPath = "packages/corpus/material/editorial/en.mdx";
const records = [
  Schema.decodeUnknownSync(EditorialReviewRecordSchema)({
    appLocale: "en",
    deliveryLanguage: "en",
    reviewMode: "authored-humanizer-review",
    sources: [{ sourceHash: hash, sourcePath: targetPath }],
    targetHash: hash,
    targetPath,
    workflowVersion: HUMANIZER_WORKFLOW_VERSION,
  }),
];

/** Runs one writer case against an isolated real repository shape. */
function runWriter(input: string) {
  return Effect.runPromise(
    Effect.scoped(
      Effect.gen(function* () {
        const fileSystem = yield* FileSystem.FileSystem;
        const repositoryRoot = yield* fileSystem.makeTempDirectoryScoped({
          prefix: "aksara-editorial-write-",
        });
        const editorialRoot = `${repositoryRoot}/packages/corpus/editorial`;
        const reviewRoot = `${editorialRoot}/review`;
        const inputPath = `${repositoryRoot}/records.json`;
        yield* fileSystem.makeDirectory(reviewRoot, { recursive: true });
        yield* fileSystem.writeFileString(
          `${reviewRoot}/obsolete.json`,
          "{}\n"
        );
        yield* fileSystem.writeFileString(inputPath, input);
        const outcome = yield* writeEditorialReviewCatalog({
          inputPath,
          repositoryRoot,
        }).pipe(Effect.either);
        return {
          files: yield* fileSystem.readDirectory(reviewRoot),
          outcome,
        };
      })
    ).pipe(Effect.provide(NodeContext.layer))
  );
}

describe("editorial review catalog writer", () => {
  it("atomically replaces obsolete evidence with deterministic parts", async () => {
    const result = await runWriter(JSON.stringify(records));

    expect(result.outcome).toMatchObject({
      _tag: "Right",
      right: { partCount: 1, recordCount: 1 },
    });
    expect(result.files.sort()).toEqual(["catalog.json", "part-0001.json"]);
  });

  it("rejects invalid operator JSON before changing the live catalog", async () => {
    const result = await runWriter("{");

    expect(result.outcome).toMatchObject({
      _tag: "Left",
      left: new EditorialReviewWriteError({
        cause: expect.anything(),
        phase: "decode",
      }),
    });
    expect(result.files).toEqual(["obsolete.json"]);
  });
});
