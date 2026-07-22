import type { FileSystem, Path } from "@effect/platform";
import {
  compileIncremental,
  type LocalCache,
} from "@nakafa/aksara-compiler/incremental";
import type { SignedContentArtifact } from "@nakafa/aksara-contracts/content";
import {
  type MaterialLessonProjection,
  MaterialMetadataSchema,
  makeMaterialLessonProjection,
} from "@nakafa/aksara-contracts/projection/material";
import type { RendererManifestEnvelope } from "@nakafa/aksara-contracts/renderer/contract";
import { readMaterialDocument } from "@nakafa/aksara-corpus/material/source";
import type { PublicationSigner } from "@nakafa/aksara-publisher/signing";
import { Effect, Option, Ref, Schema } from "effect";
import { type SelectedDocument, verifySelectedDocument } from "#cli/repository";

/** Exact material metadata failed after trusted AST extraction. */
export class PreviewMetadataError extends Schema.TaggedError<PreviewMetadataError>()(
  "PreviewMetadataError",
  { sourcePath: Schema.String }
) {}

/** One signed current body and the route projection rendered with it. */
export interface PreviewCompileResult {
  readonly artifact: SignedContentArtifact;
  readonly compileKind: "compiled" | "unchanged";
  readonly projection: MaterialLessonProjection;
}

/** Every expected failure from one selected-document compilation. */
export type PreviewDocumentError =
  | Effect.Effect.Error<ReturnType<typeof readMaterialDocument>>
  | Effect.Effect.Error<ReturnType<typeof compileIncremental>>
  | Effect.Effect.Error<ReturnType<PublicationSigner["signArtifact"]>>
  | Effect.Effect.Error<ReturnType<typeof verifySelectedDocument>>
  | PreviewMetadataError;

/** Single-document incremental compiler captured by one preview session. */
export interface PreviewDocumentCompiler {
  /** Reads, compiles, validates, and signs only the selected registry row. */
  readonly compile: () => Effect.Effect<
    PreviewCompileResult,
    PreviewDocumentError,
    FileSystem.FileSystem | Path.Path
  >;
}

/** Dependencies captured by one selected-document compiler. */
export interface PreviewCompilerInput {
  readonly aksaraRoot: string;
  readonly rendererManifest: RendererManifestEnvelope;
  readonly selected: SelectedDocument;
  readonly signer: PublicationSigner;
}

/** Builds one compiler whose unsigned cache never becomes publication input. */
export const makePreviewDocumentCompiler: (
  input: PreviewCompilerInput
) => Effect.Effect<PreviewDocumentCompiler> = Effect.fn(
  "AksaraCli.makeDocumentCompiler"
)(function* (input) {
  const cache = yield* Ref.make(Option.none<LocalCache>());
  return {
    /** Compiles and signs the selected registry document against live capabilities. */
    compile: Effect.fn("AksaraCli.compileSelectedDocument")(function* () {
      yield* verifySelectedDocument(input.selected);
      const source = yield* readMaterialDocument(
        input.aksaraRoot,
        input.selected.entry
      );
      const previous = yield* Ref.get(cache);
      const incremental = yield* compileIncremental(
        {
          contentKey: source.route.contentKey,
          locale: source.route.locale,
          rawMdx: source.rawMdx,
          rendererDomain: source.rendererDomain,
          rendererManifest: input.rendererManifest,
          sourcePath: source.sourcePath,
        },
        Option.getOrUndefined(previous)
      );
      const metadata = yield* Schema.decodeUnknown(MaterialMetadataSchema)(
        incremental.result.metadata,
        { onExcessProperty: "error" }
      ).pipe(
        Effect.mapError(
          () =>
            new PreviewMetadataError({
              sourcePath: input.selected.entry.sourcePath,
            })
        )
      );
      const artifact = yield* input.signer.signArtifact(
        incremental.result.payload
      );
      yield* Ref.set(cache, Option.some(incremental.cache));
      return {
        artifact,
        compileKind: incremental.kind,
        projection: makeMaterialLessonProjection(source.route, metadata),
      } satisfies PreviewCompileResult;
    }),
  } satisfies PreviewDocumentCompiler;
});
