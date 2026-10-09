import {
  compileIncremental,
  type LocalCache,
} from "@nakafa/aksara-compiler/incremental";
import { SignedContentArtifactSchema } from "@nakafa/aksara-contracts/content";
import { ContentProjectionSchema } from "@nakafa/aksara-contracts/projection/spec";
import type { RendererManifestEnvelope } from "@nakafa/aksara-contracts/renderer/contract";
import {
  type LoadedPreviewSource,
  loadPreviewSources,
  projectPreviewSource,
} from "@nakafa/aksara-publisher/preview/source";
import type { PublicationSigner } from "@nakafa/aksara-publisher/signing/service";
import type { FileSystem, Path } from "effect";
import { Effect, HashMap, Option, Ref, Schema } from "effect";
import {
  fingerprintSelectedDocument,
  type SelectedDocument,
  SelectedFingerprintSchema,
  verifySelectedFingerprint,
  verifySelectedTopology,
} from "#cli/integrity";

type PreviewBody = LoadedPreviewSource["body"];
type PreviewCache = HashMap.HashMap<PreviewBody["sourcePath"], LocalCache>;

/** One signed current body and the renderer projection paired with it. */
const PreviewCompileResultSchema = Schema.Struct({
  artifact: SignedContentArtifactSchema,
  compileKind: Schema.Literals(["compiled", "unchanged"]),
  projection: ContentProjectionSchema,
});
export type PreviewCompileResult = typeof PreviewCompileResultSchema.Type;

/** Ordered atomic compilation result for the selected preview document. */
const PreviewDocumentResultSchema = Schema.Struct({
  fingerprint: SelectedFingerprintSchema,
  results: Schema.NonEmptyArray(PreviewCompileResultSchema),
});
export type PreviewDocumentResult = typeof PreviewDocumentResultSchema.Type;

/** Every expected failure from one selected-document compilation closure. */
export type PreviewDocumentError =
  | Effect.Error<ReturnType<typeof compileIncremental>>
  | Effect.Error<ReturnType<typeof fingerprintSelectedDocument>>
  | Effect.Error<ReturnType<typeof loadPreviewSources>>
  | Effect.Error<ReturnType<typeof projectPreviewSource>>
  | Effect.Error<ReturnType<PublicationSigner["signArtifact"]>>
  | Effect.Error<ReturnType<typeof verifySelectedFingerprint>>
  | Effect.Error<ReturnType<typeof verifySelectedTopology>>;

/** Multi-body incremental compiler captured by one preview session. */
export interface PreviewDocumentCompiler {
  /** Reads, compiles, validates, and signs the complete selected closure. */
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
    currentCache: PreviewCache
  ) {
    const previous = HashMap.get(currentCache, source.body.sourcePath);
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
      sourcePath: source.body.sourcePath,
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
  const cache = yield* Ref.make(
    HashMap.empty<PreviewBody["sourcePath"], LocalCache>()
  );

  return {
    /** Compiles and signs every required body as one ordered preview state. */
    compile: Effect.gen(function* () {
      yield* verifySelectedTopology(input.selected);
      const fingerprint = yield* fingerprintSelectedDocument(input.selected);
      const [firstSource, ...remainingSources] = yield* loadPreviewSources(
        input.aksaraRoot,
        input.selected.sources
      );
      yield* verifySelectedFingerprint(input.selected, fingerprint);
      const currentCache = yield* Ref.get(cache);
      const first = yield* compilePreviewSource(
        firstSource,
        input,
        currentCache
      );
      const remaining = yield* Effect.forEach(remainingSources, (source) =>
        compilePreviewSource(source, input, currentCache)
      );
      yield* verifySelectedFingerprint(input.selected, fingerprint);
      const compiled = [first, ...remaining];
      const nextCache = compiled.reduce(
        (state, item) => HashMap.set(state, item.sourcePath, item.cache),
        currentCache
      );
      yield* Ref.set(cache, nextCache);
      return {
        fingerprint,
        results: [first.result, ...remaining.map(({ result }) => result)],
      } satisfies PreviewDocumentResult;
    }).pipe(Effect.withSpan("AksaraCli.compileSelectedDocument")),
    /** Revalidates that repository evidence still describes compiled sources. */
    verify: (document) =>
      verifySelectedFingerprint(input.selected, document.fingerprint),
  } satisfies PreviewDocumentCompiler;
});

/** Dependencies captured by one selected-document compiler. */
type PreviewCompilerInput = Parameters<typeof makePreviewDocumentCompiler>[0];
