import { FileSystem, Path } from "@effect/platform";
import type { ContentDeliveryClass } from "@nakafa/aksara-contracts/delivery";
import type { CorpusSourcePath } from "@nakafa/aksara-contracts/ids";
import type { MaterialLessonRoute } from "@nakafa/aksara-contracts/projection/material";
import type { RendererDomain } from "@nakafa/aksara-contracts/renderer/domain";
import { Effect, Schema } from "effect";
import type { MaterialEntry } from "#corpus/material/registry";

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
export const readMaterialDocument = Effect.fn(
  "AksaraCorpus.readMaterialDocument"
)(function* (corpusRoot: string, entry: MaterialEntry) {
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
});
