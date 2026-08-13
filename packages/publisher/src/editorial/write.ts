import { FileSystem, Path } from "@effect/platform";
import {
  cleanupDirectoryReplacement,
  replaceDirectory,
} from "@nakafa/aksara-utilities/filesystem/replace-directory";
import { Effect, Schema } from "effect";

import { encodeEditorialReviewCatalog } from "#publisher/editorial/encode";

/** Source-controlled editorial evidence could not be written atomically. */
export class EditorialReviewWriteError extends Schema.TaggedError<EditorialReviewWriteError>()(
  "EditorialReviewWriteError",
  {
    cause: Schema.Unknown,
    phase: Schema.Literal("decode", "stage", "swap"),
  }
) {}

/** Converts one platform failure into the owned write phase. */
function writeError(phase: EditorialReviewWriteError["phase"]) {
  return (cause: unknown) => new EditorialReviewWriteError({ cause, phase });
}

/** Writes every encoded editorial part into one isolated staging tree. */
const stageEditorialReview = Effect.fn("AksaraPublisher.stageEditorialReview")(
  function* (
    staging: string,
    encoded: Effect.Effect.Success<
      ReturnType<typeof encodeEditorialReviewCatalog>
    >
  ) {
    const fileSystem = yield* FileSystem.FileSystem;
    const path = yield* Path.Path;
    yield* fileSystem
      .writeFile(path.join(staging, "catalog.json"), encoded.catalogBytes)
      .pipe(Effect.mapError(writeError("stage")));
    for (const part of encoded.parts) {
      yield* fileSystem
        .writeFile(
          path.join(staging, path.basename(part.sourcePath)),
          part.bytes
        )
        .pipe(Effect.mapError(writeError("stage")));
    }
  }
);

/** Decodes one operator-owned JSON file without creating a second content source. */
const readReviewRecords = Effect.fn("AksaraPublisher.readReviewRecords")(
  function* (inputPath: string) {
    const fileSystem = yield* FileSystem.FileSystem;
    const bytes = yield* fileSystem
      .readFile(inputPath)
      .pipe(Effect.mapError(writeError("decode")));
    const text = yield* Effect.try({
      catch: writeError("decode"),
      try: () => new TextDecoder("utf-8", { fatal: true }).decode(bytes),
    });
    return yield* Schema.decodeUnknown(Schema.parseJson())(text).pipe(
      Effect.mapError(writeError("decode"))
    );
  }
);

/** Atomically replaces the canonical content-addressed editorial catalog. */
export const writeEditorialReviewCatalog = Effect.fn(
  "AksaraPublisher.writeEditorialReviewCatalog"
)(function* (input: {
  readonly inputPath: string;
  readonly repositoryRoot: string;
}) {
  const fileSystem = yield* FileSystem.FileSystem;
  const path = yield* Path.Path;
  const records = yield* readReviewRecords(input.inputPath);
  const encoded = yield* encodeEditorialReviewCatalog(records).pipe(
    Effect.mapError(writeError("decode"))
  );
  const editorialRoot = path.join(
    input.repositoryRoot,
    "packages/corpus/editorial"
  );
  const replacement = {
    backup: path.join(editorialRoot, "review-previous"),
    target: path.join(editorialRoot, "review"),
  };
  const staging = yield* Effect.acquireRelease(
    fileSystem
      .makeTempDirectory({ directory: editorialRoot, prefix: "review-stage-" })
      .pipe(Effect.mapError(writeError("stage"))),
    (directory) =>
      cleanupDirectoryReplacement({
        ...replacement,
        staging: directory,
      }).pipe(Effect.ignore)
  );
  yield* stageEditorialReview(staging, encoded);
  yield* replaceDirectory({ ...replacement, staging }).pipe(
    Effect.mapError(writeError("swap"))
  );
  return {
    digest: encoded.catalog.digest,
    partCount: encoded.parts.length,
    recordCount: encoded.catalog.parts.reduce(
      (total, part) => total + part.recordCount,
      0
    ),
  };
});
