import { FileSystem, Path } from "@effect/platform";
import type { ContentDeliveryClass } from "@nakafaai/aksara-contracts/delivery";
import type { CorpusSourcePath } from "@nakafaai/aksara-contracts/ids";
import type { MaterialLessonRoute } from "@nakafaai/aksara-contracts/projection/material";
import type { RendererDomain } from "@nakafaai/aksara-contracts/renderer/domain";
import { Effect, Schema, Stream } from "effect";
import {
  decodeMaterialRegistry,
  type MaterialEntry,
} from "#corpus/material/registry";

/** Reading one reviewed corpus source failed through Effect Platform. */
export class MaterialReadError extends Schema.TaggedError<MaterialReadError>()(
  "MaterialReadError",
  { cause: Schema.Unknown, sourcePath: Schema.String }
) {}

/** Complete authored material document passed to release preparation. */
export interface MaterialDocumentSource {
  readonly delivery: ContentDeliveryClass;
  readonly rawMdx: string;
  readonly rendererDomain: RendererDomain;
  readonly route: MaterialLessonRoute;
  readonly sourcePath: CorpusSourcePath;
}

/** Reads one registry-owned source without escaping the supplied checkout root. */
const readMaterialDocument = Effect.fn("AksaraCorpus.readMaterialDocument")(
  function* (corpusRoot: string, entry: MaterialEntry) {
    const fileSystem = yield* FileSystem.FileSystem;
    const path = yield* Path.Path;
    const absolutePath = path.join(corpusRoot, entry.sourcePath);
    const rawMdx = yield* fileSystem
      .readFileString(absolutePath, "utf8")
      .pipe(
        Effect.mapError(
          (cause) =>
            new MaterialReadError({ cause, sourcePath: entry.sourcePath })
        )
      );
    return {
      delivery: entry.delivery,
      rawMdx,
      rendererDomain: entry.rendererDomain,
      route: entry.route,
      sourcePath: entry.sourcePath,
    } satisfies MaterialDocumentSource;
  }
);

/** Streams the canonical Function Concept slice from one exact checkout root. */
export function streamMaterialDocuments(corpusRoot: string) {
  return Stream.unwrap(
    decodeMaterialRegistry().pipe(
      Effect.map((entries) =>
        Stream.fromIterable(entries).pipe(
          Stream.mapEffect((entry) => readMaterialDocument(corpusRoot, entry))
        )
      )
    )
  );
}
