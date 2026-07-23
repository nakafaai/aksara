import {
  GitCommitShaSchema,
  SigningKeyIdSchema,
} from "@nakafa/aksara-contracts/ids";
import type { PublicationTarget } from "@nakafa/aksara-publisher/publication/spec";
import { Effect, Layer, Redacted, Stream } from "effect";
import { RENDERER_MANIFEST } from "#test/real";
import { makeProductionTarget } from "#test/target";

/** Observable fields required by small production mock implementations. */
export interface TargetCalls {
  checkoutRoot: string | undefined;
  cleanReads: number;
  current: unknown;
  derivedPublicKeyPem: string;
  environmentKeyId: string;
  headManifestHash: string | undefined;
  headReleaseId: string | undefined;
  materialCalls: number;
  publicationConfig:
    | {
        readonly allowInsecureLoopback: boolean;
        readonly endpoint: string;
        readonly timeout: unknown;
      }
    | undefined;
  rendererCalls: number;
  rootReads: number;
  sourceLayers: number;
  targetCalls: number;
}

/** Supplies isolated production configuration without process variables. */
export function environmentMock(calls: TargetCalls) {
  return {
    readProductionEnvironment: () =>
      Effect.succeed({
        derivedPublicKeyPem: calls.derivedPublicKeyPem,
        keyId: SigningKeyIdSchema.make(calls.environmentKeyId),
        privateKeyPem: Redacted.make("test-private-key"),
        publicationEndpoint: new URL("https://content.example.test/publish"),
        publicationToken: Redacted.make("publication-token"),
        rendererEndpoint: new URL(
          "https://www.example.test/api/internal/content/renderer"
        ),
        rendererToken: Redacted.make("renderer-token"),
      }),
  };
}

/** Records exact Git evidence reads and returns the reviewed test revision. */
export function evidenceMock(calls: TargetCalls) {
  return {
    readCleanAksaraRevision: () => {
      calls.cleanReads += 1;
      return Effect.succeed(GitCommitShaSchema.make("a".repeat(40)));
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
    streamMaterialHeads: (
      activeReleaseId: string,
      activeManifestHash: string
    ) => {
      calls.headManifestHash = activeManifestHash;
      calls.headReleaseId = activeReleaseId;
      return Stream.empty;
    },
  };
}

/** Exposes one replayable empty material delta after recording preparation. */
export function materialMock(calls: TargetCalls) {
  return {
    prepareMaterialPublication: (input: { readonly checkoutRoot: string }) => {
      calls.checkoutRoot = input.checkoutRoot;
      calls.materialCalls += 1;
      return Effect.succeed({
        records: () => Stream.empty,
        result: () => Stream.empty,
      });
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
