import {
  compileIncremental,
  IncrementalResultKindSchema,
  type LocalCache,
} from "@nakafa/aksara-compiler/incremental";
import { SignedContentArtifactSchema } from "@nakafa/aksara-contracts/content";
import { ContentProjectionSchema } from "@nakafa/aksara-contracts/projection/spec";
import type { RendererManifestEnvelope } from "@nakafa/aksara-contracts/renderer/contract";
import {
  type LoadedPreviewSource,
  loadPreviewSource,
  projectPreviewSource,
} from "@nakafa/aksara-publisher/preview/source";
import type { PublicationSigner } from "@nakafa/aksara-publisher/signing/service";
import type { FileSystem, Path } from "effect";
import { Effect, Option, Ref, Schema } from "effect";
import {
  fingerprintSelectedDocument,
  type SelectedDocument,
  SelectedFingerprintSchema,
  verifySelectedFingerprint,
  verifySelectedTopology,
} from "#cli/integrity";

/** One signed current body and the renderer projection paired with it. */
const PreviewCompileResultSchema = Schema.Struct({
  artifact: SignedContentArtifactSchema,
  compileKind: IncrementalResultKindSchema,
  projection: ContentProjectionSchema,
});
/** Type of one signed current body with its renderer projection and compile kind. */
export type PreviewCompileResult = typeof PreviewCompileResultSchema.Type;

/** Atomic compilation result for the selected preview document. */
const PreviewDocumentResultSchema = Schema.Struct({
  fingerprint: SelectedFingerprintSchema,
  result: PreviewCompileResultSchema,
});
/** Type of the atomic compilation result for the selected preview document. */
export type PreviewDocumentResult = typeof PreviewDocumentResultSchema.Type;

/** Every expected failure from one selected-document compilation closure. */
export type PreviewDocumentError =
  | Effect.Error<ReturnType<typeof compileIncremental>>
  | Effect.Error<ReturnType<typeof fingerprintSelectedDocument>>
  | Effect.Error<ReturnType<typeof loadPreviewSource>>
  | Effect.Error<ReturnType<typeof projectPreviewSource>>
  | Effect.Error<ReturnType<PublicationSigner["signArtifact"]>>
  | Effect.Error<ReturnType<typeof verifySelectedFingerprint>>
  | Effect.Error<ReturnType<typeof verifySelectedTopology>>;

/** Incremental compiler of the one selected document of a preview session. */
export interface PreviewDocumentCompiler {
  /** Reads, compiles, validates, and signs the selected document. */
  readonly compile: Effect.Effect<
    PreviewDocumentResult,
    PreviewDocumentError,
    FileSystem.FileSystem | Path.Path
  >;
  /** Revalidates the source proof after repository evidence was captured. */
  readonly verify: (
    document: PreviewDocumentResult
  ) => Effect.Effect<
    void,
    PreviewDocumentError,
    FileSystem.FileSystem | Path.Path
  >;
}

/** Compiles and signs one loaded body without mutating the session cache. */
const compilePreviewSource = Effect.fn("AksaraCli.compilePreviewSource")(
  function* (
    source: LoadedPreviewSource,
    input: PreviewCompilerInput,
    previous: Option.Option<LocalCache>
  ) {
    const incremental = yield* compileIncremental(
      {
        ...source.body,
        rendererManifest: input.rendererManifest,
      },
      Option.getOrUndefined(previous)
    );
    const projection = yield* projectPreviewSource(
      source,
      incremental.result.metadata
    );
    const artifact = yield* input.signer.signArtifact(
      incremental.result.payload
    );
    return {
      cache: incremental.cache,
      result: {
        artifact,
        compileKind: incremental.kind,
        projection,
      } satisfies PreviewCompileResult,
    };
  }
);

/** Builds one compiler whose unsigned cache never becomes publication input. */
export const makePreviewDocumentCompiler: (input: {
  readonly aksaraRoot: string;
  readonly rendererManifest: RendererManifestEnvelope;
  readonly selected: SelectedDocument;
  readonly signer: PublicationSigner;
}) => Effect.Effect<PreviewDocumentCompiler> = Effect.fn(
  "AksaraCli.makeDocumentCompiler"
)(function* (input) {
  const cache = yield* Ref.make(Option.none<LocalCache>());

  return {
    /** Compiles and signs the selected body as one preview state. */
    compile: Effect.gen(function* () {
      yield* verifySelectedTopology(input.selected);
      const fingerprint = yield* fingerprintSelectedDocument(input.selected);
      const source = yield* loadPreviewSource(
        input.aksaraRoot,
        input.selected.source
      );
      yield* verifySelectedFingerprint(input.selected, fingerprint);
      const compiled = yield* compilePreviewSource(
        source,
        input,
        yield* Ref.get(cache)
      );
      yield* verifySelectedFingerprint(input.selected, fingerprint);
      yield* Ref.set(cache, Option.some(compiled.cache));
      return {
        fingerprint,
        result: compiled.result,
      } satisfies PreviewDocumentResult;
    }).pipe(Effect.withSpan("AksaraCli.compileSelectedDocument")),
    /** Revalidates that repository evidence still describes compiled sources. */
    verify: (document) =>
      verifySelectedFingerprint(input.selected, document.fingerprint),
  } satisfies PreviewDocumentCompiler;
});

/** Dependencies captured by one selected-document compiler. */
type PreviewCompilerInput = Parameters<typeof makePreviewDocumentCompiler>[0];
