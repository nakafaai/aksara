import {
  ContentKeySchema,
  CorpusSourcePathSchema,
  GitCommitShaSchema,
  PublicPathSchema,
  Sha256HashSchema,
  SigningKeyIdSchema,
} from "@nakafa/aksara-contracts/ids";
import { ArtifactLocaleSchema } from "@nakafa/aksara-contracts/locale";
import { ContentReleaseCurrentSchema } from "@nakafa/aksara-contracts/release/current/state";
import {
  MaterialHeadSchema,
  QuestionHeadSchema,
} from "@nakafa/aksara-contracts/release/head";
import { ContentReleaseBundleSchema } from "@nakafa/aksara-contracts/release/lifecycle";
import { RendererManifestEnvelopeSchema } from "@nakafa/aksara-contracts/renderer/contract";
import type { PublicationTarget } from "@nakafa/aksara-publisher/publication/spec";
import type { prepareReleaseSnapshots } from "@nakafa/aksara-publisher/snapshot/release";
import { Effect, Layer, Redacted, Schema, Stream } from "effect";
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
  artifactLocale: ArtifactLocaleSchema.make("id"),
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
    "packages/corpus/question-bank/tryout/indonesia/snbt/general-reasoning/set-1/question-1/question.id.mdx"
  ),
});

const TargetCallsSchema = Schema.Struct({
  catalogCalls: Schema.mutableKey(Schema.Finite),
  catalogRebuild: Schema.mutableKey(Schema.UndefinedOr(Schema.Boolean)),
  checkoutRoot: Schema.mutableKey(Schema.UndefinedOr(Schema.String)),
  cleanReads: Schema.mutableKey(Schema.Finite),
  current: Schema.mutableKey(ContentReleaseCurrentSchema),
  derivedPublicKeyPem: Schema.mutableKey(Schema.String),
  environmentKeyId: Schema.String,
  finalSha: Schema.mutableKey(Schema.UndefinedOr(Schema.String)),
  headManifestHash: Schema.mutableKey(Schema.UndefinedOr(Schema.String)),
  headReleaseId: Schema.mutableKey(Schema.UndefinedOr(Schema.String)),
  publicationConfig: Schema.mutableKey(
    Schema.UndefinedOr(
      Schema.Struct({
        allowInsecureLoopback: Schema.Boolean,
        endpoint: Schema.String,
        timeout: Schema.String,
      })
    )
  ),
  rendererCalls: Schema.mutableKey(Schema.Finite),
  rendererManifestOverride: Schema.mutableKey(
    Schema.UndefinedOr(RendererManifestEnvelopeSchema)
  ),
  rootReads: Schema.mutableKey(Schema.Finite),
  runtimeBundleRefreshes: Schema.mutableKey(Schema.Finite),
  runtimeResultSnapshotId: Schema.mutableKey(
    Schema.UndefinedOr(Schema.NullOr(Schema.String))
  ),
  signingSecretReads: Schema.mutableKey(Schema.Finite),
  snapshotCalls: Schema.mutableKey(Schema.Finite),
  sourceLayers: Schema.mutableKey(Schema.Finite),
  targetCalls: Schema.mutableKey(Schema.Finite),
});

/** Observable fields shared by focused production mock implementations. */
type TargetCalls = typeof TargetCallsSchema.Type;

const ProductionCallsSchema = Schema.Struct({
  ...TargetCallsSchema.fields,
  baseManifestHash: Schema.mutableKey(
    Schema.UndefinedOr(Schema.NullOr(Schema.String))
  ),
  baseReleaseId: Schema.mutableKey(
    Schema.UndefinedOr(Schema.NullOr(Schema.String))
  ),
  baseResultCount: Schema.mutableKey(Schema.UndefinedOr(Schema.Finite)),
  baseResultDigest: Schema.mutableKey(Schema.UndefinedOr(Schema.String)),
  bundleVerifyCalls: Schema.mutableKey(Schema.Finite),
  keyId: Schema.mutableKey(Schema.UndefinedOr(Schema.String)),
  manifestMismatch: Schema.mutableKey(Schema.Boolean),
  privateKeyMatches: Schema.mutableKey(Schema.Boolean),
  publishCalls: Schema.mutableKey(Schema.Finite),
  publishKind: Schema.mutableKey(Schema.UndefinedOr(Schema.Literal("git"))),
  releaseId: Schema.mutableKey(Schema.UndefinedOr(Schema.String)),
  resumeBundle: Schema.mutableKey(
    Schema.UndefinedOr(ContentReleaseBundleSchema)
  ),
  resumeCalls: Schema.mutableKey(Schema.Finite),
  sha: Schema.mutableKey(Schema.UndefinedOr(Schema.String)),
  storedRelease: Schema.mutableKey(
    Schema.UndefinedOr(Schema.NullOr(ContentReleaseBundleSchema.fields.release))
  ),
  targetServiceReads: Schema.mutableKey(Schema.Finite),
  verifiedBundle: Schema.mutableKey(
    Schema.UndefinedOr(ContentReleaseBundleSchema)
  ),
});

/** Complete observable state owned by the production command harness. */
export type ProductionCalls = typeof ProductionCallsSchema.Type;

/** Supplies isolated production configuration without process variables. */
export function environmentMock(calls: TargetCalls) {
  const recoveryEnvironment = {
    publicationEndpoint: new URL("https://content.example.test/publish"),
    publicationToken: Redacted.make("publication-token"),
    rendererEndpoint: new URL(
      "https://www.example.test/api/internal/content/renderer"
    ),
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
    prepareContentCatalog: (input: {
      readonly checkoutRoot: string;
      readonly rebuild?: boolean | undefined;
    }) => {
      calls.catalogCalls += 1;
      calls.catalogRebuild = input.rebuild;
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
      readonly runtime: Pick<
        Parameters<typeof prepareReleaseSnapshots>[0]["runtime"],
        "kind"
      >;
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
    readonly timeout: string;
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
