import type { FileSystem, Path } from "@effect/platform";
import {
  compileIncremental,
  type IncrementalResult,
  type LocalCache,
} from "@nakafa/aksara-compiler/incremental";
import type { SignedContentArtifact } from "@nakafa/aksara-contracts/content";
import type { ContentProjection } from "@nakafa/aksara-contracts/projection/spec";
import type { RendererManifestEnvelope } from "@nakafa/aksara-contracts/renderer/contract";
import {
  type LoadedPreviewSource,
  loadPreviewSources,
  projectPreviewSource,
} from "@nakafa/aksara-publisher/preview/source";
import type { PublicationSigner } from "@nakafa/aksara-publisher/signing";
import { Effect, HashMap, Option, Ref } from "effect";
import {
  fingerprintSelectedDocument,
  type SelectedDocument,
  type SelectedFingerprint,
  verifySelectedFingerprint,
  verifySelectedTopology,
} from "#cli/integrity";

type PreviewBody = LoadedPreviewSource["body"];
type PreviewCache = HashMap.HashMap<PreviewBody["sourcePath"], LocalCache>;

/** One signed current body and the renderer projection paired with it. */
export interface PreviewCompileResult {
  readonly artifact: SignedContentArtifact;
  readonly compileKind: IncrementalResult["kind"];
  readonly projection: ContentProjection;
}

/** Ordered atomic compilation result for the selected preview document. */
export interface PreviewDocumentResult {
  readonly fingerprint: SelectedFingerprint;
  readonly results: readonly [PreviewCompileResult, ...PreviewCompileResult[]];
}

/** Every expected failure from one selected-document compilation closure. */
export type PreviewDocumentError =
  | Effect.Effect.Error<ReturnType<typeof compileIncremental>>
  | Effect.Effect.Error<ReturnType<typeof fingerprintSelectedDocument>>
  | Effect.Effect.Error<ReturnType<typeof loadPreviewSources>>
  | Effect.Effect.Error<ReturnType<typeof projectPreviewSource>>
  | Effect.Effect.Error<ReturnType<PublicationSigner["signArtifact"]>>
  | Effect.Effect.Error<ReturnType<typeof verifySelectedFingerprint>>
  | Effect.Effect.Error<ReturnType<typeof verifySelectedTopology>>;

/** Multi-body incremental compiler captured by one preview session. */
export interface PreviewDocumentCompiler {
  /** Reads, compiles, validates, and signs the complete selected closure. */
  readonly compile: () => Effect.Effect<
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

/** Dependencies captured by one selected-document compiler. */
interface PreviewCompilerInput {
  readonly aksaraRoot: string;
  readonly rendererManifest: RendererManifestEnvelope;
  readonly selected: SelectedDocument;
  readonly signer: PublicationSigner;
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
export const makePreviewDocumentCompiler: (
  input: PreviewCompilerInput
) => Effect.Effect<PreviewDocumentCompiler> = Effect.fn(
  "AksaraCli.makeDocumentCompiler"
)(function* (input) {
  const cache = yield* Ref.make(
    HashMap.empty<PreviewBody["sourcePath"], LocalCache>()
  );

  return {
    /** Compiles and signs every required body as one ordered preview state. */
    compile: Effect.fn("AksaraCli.compileSelectedDocument")(function* () {
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
    }),
    /** Revalidates that repository evidence still describes compiled sources. */
    verify: (document) =>
      verifySelectedFingerprint(input.selected, document.fingerprint),
  } satisfies PreviewDocumentCompiler;
});
