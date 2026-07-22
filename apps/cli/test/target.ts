import {
  Ed25519SignatureSchema,
  GitCommitShaSchema,
  type ReleaseId,
  ReleaseIdSchema,
  Sha256HashSchema,
  SigningKeyIdSchema,
} from "@nakafa/aksara-contracts/ids";
import {
  type ContentReleaseManifest,
  ContentReleaseManifestSchema,
  type PublicationReceipt,
  SignedContentReleaseSchema,
} from "@nakafa/aksara-contracts/release";
import { hashContentReleaseManifest } from "@nakafa/aksara-contracts/release/hash";
import {
  type CompletedContentRelease,
  type ContentReleaseBundle,
  ContentReleaseBundleSchema,
  type ContentReleaseCurrent,
  ContentReleaseCurrentSchema,
} from "@nakafa/aksara-contracts/release/lifecycle";
import { EMPTY_RESULT_CATALOG_DIGEST } from "@nakafa/aksara-contracts/release/result";
import { PublicationTarget } from "@nakafa/aksara-publisher/publication/spec";
import { Effect, Layer, Redacted, Schema, Stream } from "effect";
import { RENDERER_MANIFEST } from "#test/real";

const HASH = Sha256HashSchema.make(`sha256:${"a".repeat(64)}`);
const OTHER_HASH = Sha256HashSchema.make(`sha256:${"b".repeat(64)}`);

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

/** Signs a structurally valid test manifest with its exact canonical hash. */
function bundleFromManifest(
  manifest: ContentReleaseManifest,
  keyId = SigningKeyIdSchema.make("content-2026-07")
): ContentReleaseBundle {
  const release = SignedContentReleaseSchema.make({
    keyId,
    manifest,
    manifestHash: Effect.runSync(hashContentReleaseManifest(manifest)),
    signature: Ed25519SignatureSchema.make(`${"A".repeat(85)}A`),
  });
  return ContentReleaseBundleSchema.make({
    release,
    rendererManifest: RENDERER_MANIFEST,
  });
}

/** Creates one contract-owned release identity for production assertions. */
export function releaseId(value: string) {
  return ReleaseIdSchema.make(value);
}

/** Creates one exact Git release bundle for recovery orchestration tests. */
export function gitBundle(
  id: string,
  input: {
    readonly baseManifestHash?: typeof Sha256HashSchema.Type;
    readonly baseReleaseId?: ReleaseId | null;
    readonly keyId?: typeof SigningKeyIdSchema.Type;
    readonly projectionDigest?: typeof Sha256HashSchema.Type;
    readonly sha?: typeof GitCommitShaSchema.Type;
  } = {}
) {
  const baseReleaseId = input.baseReleaseId ?? null;
  return bundleFromManifest(
    ContentReleaseManifestSchema.make({
      baseManifestHash:
        baseReleaseId === null ? null : (input.baseManifestHash ?? HASH),
      baseReleaseId,
      baseResultCount: 0,
      baseResultDigest: EMPTY_RESULT_CATALOG_DIGEST,
      deleteCount: 0,
      itemCount: 0,
      itemsDigest: HASH,
      origin: {
        kind: "git",
        sha: input.sha ?? GitCommitShaSchema.make("a".repeat(40)),
      },
      projectionCount: 0,
      projectionDigest: input.projectionDigest ?? OTHER_HASH,
      releaseId: releaseId(id),
      rendererContractVersion: RENDERER_MANIFEST.rendererContractVersion,
      rendererManifestHash: RENDERER_MANIFEST.hash,
      resultCount: 0,
      resultDigest: EMPTY_RESULT_CATALOG_DIGEST,
      rollbackCount: 0,
      rollbackDigest: HASH,
      upsertCount: 0,
    }),
    input.keyId
  );
}

/** Creates one exact forward-rollback bundle for recovery tests. */
export function rollbackBundle(id: string, rollbackOf: ReleaseId) {
  return bundleFromManifest(
    ContentReleaseManifestSchema.make({
      baseManifestHash: HASH,
      baseReleaseId: rollbackOf,
      baseResultCount: 0,
      baseResultDigest: EMPTY_RESULT_CATALOG_DIGEST,
      deleteCount: 0,
      itemCount: 0,
      itemsDigest: HASH,
      origin: { kind: "rollback", releaseId: rollbackOf },
      projectionCount: 0,
      projectionDigest: OTHER_HASH,
      releaseId: releaseId(id),
      rendererContractVersion: RENDERER_MANIFEST.rendererContractVersion,
      rendererManifestHash: RENDERER_MANIFEST.hash,
      resultCount: 0,
      resultDigest: EMPTY_RESULT_CATALOG_DIGEST,
      rollbackCount: 0,
      rollbackDigest: HASH,
      upsertCount: 0,
    })
  );
}

/** Adds terminal receipt evidence to one immutable release bundle. */
export function completedBundle(
  bundle: ContentReleaseBundle
): CompletedContentRelease {
  return { ...bundle, receipt: receiptFor(bundle.release.manifest) };
}

/** Creates terminal publication evidence bound to one exact manifest. */
export function receiptFor(
  manifest: ContentReleaseManifest
): PublicationReceipt {
  return {
    activatedHeads: manifest.upsertCount,
    deletedHeads: manifest.deleteCount,
    manifestHash: Effect.runSync(hashContentReleaseManifest(manifest)),
    projectionDigest: manifest.projectionDigest,
    releaseId: manifest.releaseId,
    resultCount: manifest.resultCount,
    resultDigest: manifest.resultDigest,
    stagedArtifacts: manifest.upsertCount,
    stagedItems: manifest.itemCount,
    stagedProjections: manifest.projectionCount,
  };
}

/** Decodes authoritative current state through its exact public contract. */
export function currentState(input: unknown): ContentReleaseCurrent {
  return Schema.decodeUnknownSync(ContentReleaseCurrentSchema)(input);
}

/** Creates a complete target whose unrelated operations fail immediately. */
export function makeProductionTarget(
  current: () => unknown
): typeof PublicationTarget.Service {
  /** Makes unrequested operations fail the test immediately. */
  const unused = () => Effect.die("Unused target operation.");
  return PublicationTarget.of({
    abort: unused,
    activate: unused,
    cleanup: unused,
    current: () =>
      Schema.decodeUnknown(ContentReleaseCurrentSchema)(current()).pipe(
        Effect.orDie
      ),
    finalize: unused,
    headPage: unused,
    rollbackPage: unused,
    stageArtifactBatch: unused,
    stageItemBatch: unused,
    stageProjectionBatch: unused,
    stageRelease: unused,
    status: unused,
    verify: unused,
  });
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
        rendererEndpoint: new URL("https://www.example.test/renderer"),
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
    makeHttpPublicationTarget: (input: {
      readonly allowInsecureLoopback: boolean;
      readonly endpoint: URL;
      readonly timeout: unknown;
    }) => {
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
