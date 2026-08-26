import {
  ContentKeySchema,
  CorpusSourcePathSchema,
  GitCommitShaSchema,
  PublicPathSchema,
  Sha256HashSchema,
  SigningKeyIdSchema,
} from "@nakafa/aksara-contracts/ids";
import { ArtifactLocaleSchema } from "@nakafa/aksara-contracts/locale";
import {
  MaterialHeadSchema,
  QuestionHeadSchema,
} from "@nakafa/aksara-contracts/release/head";
import type { ContentReleaseBundle } from "@nakafa/aksara-contracts/release/lifecycle";
import type { PublicationTarget } from "@nakafa/aksara-publisher/publication/spec";
import { Effect, Layer, Redacted, Stream } from "effect";
import { RENDERER_MANIFEST } from "#test/real";
import { makeProductionTarget } from "#test/target";

const HEAD_HASH = Sha256HashSchema.make(`sha256:${"a".repeat(64)}`);
const MATERIAL_HEAD = MaterialHeadSchema.make({
  artifactHash: HEAD_HASH,
  artifactLocale: ArtifactLocaleSchema.make("en"),
  compilerConfigHash: HEAD_HASH,
  contentKey: ContentKeySchema.make("test:material"),
  delivery: "public",
  family: "material",
  projectionHash: HEAD_HASH,
  publicPath: PublicPathSchema.make("test/material"),
  rendererDomain: "mathematics",
  sourceHash: HEAD_HASH,
  sourcePath: CorpusSourcePathSchema.make(
    "packages/corpus/test/material/en.mdx"
  ),
});
const QUESTION_HEAD = QuestionHeadSchema.make({
  artifactHash: HEAD_HASH,
  artifactLocale: ArtifactLocaleSchema.make("en"),
  compilerConfigHash: HEAD_HASH,
  contentKey: ContentKeySchema.make(
    "question-bank/tryout/indonesia/snbt/general-reasoning/set-1/question-1/question"
  ),
  delivery: "authenticated",
  family: "question",
  projectionHash: HEAD_HASH,
  rendererDomain: "snbt-general",
  sourceHash: HEAD_HASH,
  sourcePath: CorpusSourcePathSchema.make(
    "packages/corpus/question-bank/tryout/indonesia/snbt/general-reasoning/set-1/question-1/question.en.mdx"
  ),
});

/** Observable fields shared by focused production mock implementations. */
export interface TargetCalls {
  catalogCalls: number;
  checkoutRoot: string | undefined;
  cleanReads: number;
  current: unknown;
  derivedPublicKeyPem: string;
  environmentKeyId: string;
  finalSha: string | undefined;
  headManifestHash: string | undefined;
  headReleaseId: string | undefined;
  publicationConfig:
    | {
        readonly allowInsecureLoopback: boolean;
        readonly endpoint: string;
        readonly timeout: unknown;
      }
    | undefined;
  rendererCalls: number;
  rendererManifestOverride: unknown | undefined;
  rootReads: number;
  runtimeBundleRefreshes: number;
  runtimeResultSnapshotId: string | null | undefined;
  signingSecretReads: number;
  snapshotCalls: number;
  sourceLayers: number;
  targetCalls: number;
}

/** Complete observable state owned by the production command harness. */
export interface ProductionCalls extends TargetCalls {
  activatesDeveloperPage: boolean;
  baseManifestHash: string | null | undefined;
  baseReleaseId: string | null | undefined;
  baseResultCount: number | undefined;
  baseResultDigest: string | undefined;
  bundleVerifyCalls: number;
  keyId: string | undefined;
  manifestMismatch: boolean;
  privateKeyMatches: boolean;
  publishCalls: number;
  publishKind: "git" | undefined;
  readinessCalls: number;
  readinessFailure: boolean;
  releaseId: string | undefined;
  resumeBundle: ContentReleaseBundle | undefined;
  resumeCalls: number;
  sha: string | undefined;
  storedRelease: ContentReleaseBundle["release"] | null | undefined;
  targetServiceReads: number;
  verifiedBundle: ContentReleaseBundle | undefined;
}

/** Supplies isolated production configuration without process variables. */
export function environmentMock(calls: TargetCalls) {
  const recoveryEnvironment = {
    publicationEndpoint: new URL("https://content.example.test/publish"),
    publicationToken: Redacted.make("publication-token"),
    rendererEndpoint: new URL(
      "https://www.example.test/api/internal/content/renderer"
    ),
    rendererToken: Redacted.make("renderer-token"),
  };
  return {
    readProductionEnvironment: (recovery: typeof recoveryEnvironment) => {
      calls.signingSecretReads += 1;
      return Effect.succeed({
        ...recovery,
        derivedPublicKeyPem: calls.derivedPublicKeyPem,
        keyId: SigningKeyIdSchema.make(calls.environmentKeyId),
        privateKeyPem: Redacted.make("test-private-key"),
      });
    },
    readRecoveryEnvironment: () => Effect.succeed(recoveryEnvironment),
  };
}

/** Records exact Git evidence reads and returns the reviewed test revision. */
export function evidenceMock(calls: TargetCalls) {
  return {
    readCleanAksaraRevision: () => {
      calls.cleanReads += 1;
      const revision =
        calls.cleanReads > 1 && calls.finalSha !== undefined
          ? calls.finalSha
          : "a".repeat(40);
      return Effect.succeed(GitCommitShaSchema.make(revision));
    },
    /** Rejects a release whose post-preparation revision changed. */
    validateStableAksaraRevision: (
      expected: typeof GitCommitShaSchema.Type,
      actual: typeof GitCommitShaSchema.Type
    ) => {
      if (actual === expected) {
        return Effect.void;
      }
      return Effect.fail({
        _tag: "ReleaseRevisionChangedError",
        actual,
        expected,
      });
    },
  };
}

/** Returns the frozen renderer while recording production fetches. */
export function rendererMock(calls: TargetCalls) {
  return {
    fetchProductionRenderer: () => {
      calls.rendererCalls += 1;
      return Effect.succeed(
        calls.rendererManifestOverride ?? RENDERER_MANIFEST
      );
    },
  };
}

/** Returns the isolated test checkout root while recording discovery. */
export function checkoutMock(calls: TargetCalls) {
  return {
    findAksaraRoot: () => {
      calls.rootReads += 1;
      return Effect.succeed("/code/aksara");
    },
  };
}

/** Exposes an empty authoritative head stream for orchestration tests. */
export function headsMock(calls: TargetCalls) {
  return {
    streamContentHeads: (
      activeReleaseId: string,
      activeManifestHash: string
    ) => {
      calls.headManifestHash = activeManifestHash;
      calls.headReleaseId = activeReleaseId;
      return Stream.empty;
    },
  };
}

/** Exposes one replayable empty catalog after recording preparation. */
export function catalogMock(calls: TargetCalls) {
  return {
    prepareContentCatalog: (input: { readonly checkoutRoot: string }) => {
      calls.catalogCalls += 1;
      calls.checkoutRoot = input.checkoutRoot;
      return Effect.succeed({
        records: Stream.empty,
        result: Stream.make(MATERIAL_HEAD, QUESTION_HEAD),
        routes: Stream.empty,
      });
    },
  };
}

/** Exposes unchanged structured state for CLI orchestration tests. */
export function snapshotMock(calls: TargetCalls) {
  return {
    prepareReleaseSnapshots: (input: {
      /** Replays the catalog narrowed by production preparation. */
      readonly questionHeads: Stream.Stream<unknown>;
      readonly runtime: { readonly kind: "refresh" | "stable" };
    }) => {
      calls.snapshotCalls += 1;
      if (input.runtime.kind === "refresh") {
        calls.runtimeBundleRefreshes += 1;
      }
      return input.questionHeads.pipe(
        Stream.runDrain,
        Effect.as({
          manifests: Stream.empty,
          rows: Stream.empty,
          tryoutRuntimeSnapshot: null,
        })
      );
    },
  };
}

/** Records construction of the exact Git publication source layer. */
export function sourceMock(calls: TargetCalls) {
  return {
    makeGitPublicationSourceLive: () =>
      Layer.effectDiscard(
        Effect.sync(() => {
          calls.sourceLayers += 1;
        })
      ),
  };
}

/** Creates a secure HTTP target mock over authoritative mutable test state. */
export function httpTargetMock(calls: TargetCalls): {
  /** Builds one secure target over the mutable authoritative test state. */
  readonly makeHttpPublicationTarget: (input: {
    readonly allowInsecureLoopback: boolean;
    readonly endpoint: URL;
    readonly timeout: unknown;
  }) => Effect.Effect<typeof PublicationTarget.Service>;
} {
  return {
    makeHttpPublicationTarget: (input) => {
      calls.publicationConfig = {
        allowInsecureLoopback: input.allowInsecureLoopback,
        endpoint: input.endpoint.href,
        timeout: input.timeout,
      };
      calls.targetCalls += 1;
      return Effect.succeed(makeProductionTarget(() => calls.current));
    },
  };
}
