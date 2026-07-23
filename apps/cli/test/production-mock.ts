import {
  ContentKeySchema,
  CorpusSourcePathSchema,
  GitCommitShaSchema,
  Sha256HashSchema,
  SigningKeyIdSchema,
} from "@nakafa/aksara-contracts/ids";
import { QuestionHeadSchema } from "@nakafa/aksara-contracts/release/head";
import type { PublicationTarget } from "@nakafa/aksara-publisher/publication/spec";
import { Effect, Layer, Redacted, Stream } from "effect";
import { RENDERER_MANIFEST } from "#test/real";
import { makeProductionTarget } from "#test/target";

const HEAD_HASH = Sha256HashSchema.make(`sha256:${"a".repeat(64)}`);
const QUESTION_HEAD = QuestionHeadSchema.make({
  artifactHash: HEAD_HASH,
  compilerConfigHash: HEAD_HASH,
  contentKey: ContentKeySchema.make(
    "question-bank/tryout/indonesia/snbt/general-reasoning/set-1/question-1/question"
  ),
  delivery: "authenticated",
  family: "question",
  locale: "en",
  projectionHash: HEAD_HASH,
  rendererDomain: "snbt-general",
  sourceHash: HEAD_HASH,
  sourcePath: CorpusSourcePathSchema.make(
    "packages/corpus/question-bank/tryout/indonesia/snbt/general-reasoning/set-1/question-1/question.en.mdx"
  ),
});

/** Observable fields required by small production mock implementations. */
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
  rootReads: number;
  signingSecretReads: number;
  snapshotCalls: number;
  sourceLayers: number;
  targetCalls: number;
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
      return Effect.succeed(RENDERER_MANIFEST);
    },
  };
}

/** Returns the isolated test checkout root while recording discovery. */
export function repositoryMock(calls: TargetCalls) {
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
        records: () => Stream.empty,
        result: () => Stream.make(QUESTION_HEAD),
        routes: () => Stream.empty,
      });
    },
  };
}

/** Exposes unchanged structured state for CLI orchestration tests. */
export function snapshotMock(calls: TargetCalls) {
  return {
    prepareReleaseSnapshots: (input: {
      /** Replays the catalog narrowed by production preparation. */
      readonly questionHeads: () => Stream.Stream<unknown>;
    }) => {
      calls.snapshotCalls += 1;
      return input.questionHeads().pipe(
        Stream.runDrain,
        Effect.as({
          manifests: () => Stream.empty,
          rows: () => Stream.empty,
        })
      );
    },
  };
}

/** Records construction of the exact Git publication source layer. */
export function sourceMock(calls: TargetCalls) {
  return {
    GitPublicationSourceLive: Layer.effectDiscard(
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
