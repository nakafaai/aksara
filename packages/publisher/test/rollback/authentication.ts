import { Buffer } from "node:buffer";
import {
  createHash,
  generateKeyPairSync,
  sign as signBytes,
} from "node:crypto";
import { hashCompiledContentPayload } from "@nakafa/aksara-contracts/artifact/integrity";
import {
  type CompiledContentPayload,
  CompiledContentPayloadSchema,
  canonicalizeContentArtifactSigningInput,
  SignedContentArtifactSchema,
} from "@nakafa/aksara-contracts/content";
import {
  ContentKeySchema,
  CorpusSourcePathSchema,
  Ed25519SignatureSchema,
  ReleaseIdSchema,
  SigningKeyIdSchema,
} from "@nakafa/aksara-contracts/ids";
import {
  AppLocaleSchema,
  ArtifactLocaleSchema,
} from "@nakafa/aksara-contracts/locale";
import { MaterialLessonProjectionSchema } from "@nakafa/aksara-contracts/projection/material";
import type { ContentProjection } from "@nakafa/aksara-contracts/projection/spec";
import {
  RollbackDeleteStateSchema,
  type RollbackRecord,
  RollbackRecordSchema,
  type RollbackUpsertState,
  RollbackUpsertStateSchema,
} from "@nakafa/aksara-contracts/release/rollback/spec";
import { createRendererManifest } from "@nakafa/aksara-contracts/renderer/manifest";
import { ContentVerificationKeyResolver } from "@nakafa/aksara-contracts/signature/spec";
import { Effect, Schema, Stream } from "effect";
import {
  type DerivedRollbackState,
  deriveRollbackRecords,
  type RollbackArtifactPolicy,
} from "#publisher/rollback/records";
import { materialGraph } from "#test/graph";
import { testRendererDomains } from "#test/renderer";

const rawMdx = "## Test protocol";
const compiledCode = "return {};";
const keys = generateKeyPairSync("ed25519");
const keyId = SigningKeyIdSchema.make("test-rollback-key");
/** Builds the renderer contract used by authenticated rollback fixtures. */
export const makeRollbackRendererManifest = Effect.fn(
  "publisher.rollback.testRendererManifest"
)(() =>
  createRendererManifest({
    base: {
      authoringComponents: [{ name: "TestBase", version: 1 }],
      supportedComponents: [{ name: "TestBase", version: 1 }],
    },
    domains: testRendererDomains({
      chemistry: [{ name: "TestChemistry", version: 1 }],
      mathematics: [{ name: "TestMathematics", version: 1 }],
    }),
    publishedDomains: ["mathematics"],
  })
);
const payload = Schema.decodeSync(CompiledContentPayloadSchema)({
  artifactLocale: "en",
  byteLength: Buffer.byteLength(compiledCode, "utf8"),
  compiledCode,
  compilerConfigHash: `sha256:${"a".repeat(64)}`,
  compilerVersion: "0.1.0",
  contentKey: "test:rollback-record",
  format: "mdx-function-body",
  mdxCompilerVersion: "3.1.1",
  plainText: "Test protocol",
  rawMdx,
  rendererDomain: "mathematics",
  requiredComponents: [],
  sourceHash: `sha256:${createHash("sha256").update(rawMdx).digest("hex")}`,
});
const rollbackAppLocale = AppLocaleSchema.make("en");

/** Signs one compiled payload with the shared rollback test key. */
export function signRollbackPayload(value: typeof payload) {
  const artifactHash = hashCompiledContentPayload(value);
  const signature = Ed25519SignatureSchema.make(
    signBytes(
      null,
      Buffer.from(
        canonicalizeContentArtifactSigningInput(artifactHash, value),
        "utf8"
      ),
      keys.privateKey
    ).toString("base64url")
  );
  return SignedContentArtifactSchema.make({
    artifactHash,
    keyId,
    payload: value,
    signature,
  });
}

export const rollbackArtifact = signRollbackPayload(payload);
export const rollbackProjection = Schema.decodeSync(
  MaterialLessonProjectionSchema
)({
  appLocale: rollbackAppLocale,
  artifactLocale: payload.artifactLocale,
  contentKey: payload.contentKey,
  graph: materialGraph(rollbackAppLocale, "rollback", "test-record"),
  kind: "subject-lesson",
  materialKey: "lesson.test.rollback",
  metadata: {
    authors: [],
    datePublished: "2026-01-01",
    title: "Test protocol",
  },
  order: 1,
  parentPath: "subjects/test/rollback",
  publicPath: "subjects/test/rollback/record",
  sectionKey: "test-record",
  sitemap: true,
  topicTitle: "Test Rollback Topic",
});
export const rollbackUpsert = RollbackUpsertStateSchema.make({
  artifact: rollbackArtifact,
  change: {
    artifactHash: rollbackArtifact.artifactHash,
    artifactLocale: payload.artifactLocale,
    contentKey: payload.contentKey,
    delivery: "public",
    family: "material",
    operation: "upsert",
    rendererDomain: payload.rendererDomain,
    sourcePath: CorpusSourcePathSchema.make(
      "packages/corpus/test/rollback/record.mdx"
    ),
  },
  projection: rollbackProjection,
});
const incompatiblePayload = CompiledContentPayloadSchema.make({
  ...payload,
  requiredComponents: [{ name: "CandidateMissing", version: 1 }],
});
export const incompatibleRollbackArtifact =
  signRollbackPayload(incompatiblePayload);
export const incompatibleRollbackUpsert = RollbackUpsertStateSchema.make({
  artifact: incompatibleRollbackArtifact,
  change: {
    ...rollbackUpsert.change,
    artifactHash: incompatibleRollbackArtifact.artifactHash,
  },
  projection: rollbackProjection,
});
export const rollbackDeletion = RollbackDeleteStateSchema.make({
  change: {
    artifactLocale: ArtifactLocaleSchema.make("en"),
    contentKey: ContentKeySchema.make("test:rollback-delete"),
    family: "material",
    operation: "delete",
  },
});
export const matchingRollbackDeletion = RollbackDeleteStateSchema.make({
  change: {
    artifactLocale: payload.artifactLocale,
    contentKey: payload.contentKey,
    family: "material",
    operation: "delete",
  },
});
export const rollbackUpsertRecord = RollbackRecordSchema.make({
  current: rollbackUpsert,
  index: 0,
  prior: rollbackUpsert,
});
export const rollbackDeletionRecord = RollbackRecordSchema.make({
  current: rollbackDeletion,
  index: 1,
  prior: rollbackDeletion,
});

/** Builds one authenticated rollback record containing near-limit bodies. */
export const makeLargeRollbackRecord = Effect.fn(
  "publisher.rollback.makeLargeTestRecord"
)(function* () {
  const largeCompiledCode = `/*${"x".repeat(240 * 1024)}*/\nreturn {};`;
  const largeRawMdx = `{/*${"m".repeat(90 * 1024)}*/}`;
  const largePayload = yield* Schema.decodeEffect(CompiledContentPayloadSchema)(
    {
      ...rollbackArtifact.payload,
      byteLength: Buffer.byteLength(largeCompiledCode, "utf8"),
      compiledCode: largeCompiledCode,
      plainText: "p".repeat(90 * 1024),
      rawMdx: largeRawMdx,
      sourceHash: `sha256:${createHash("sha256")
        .update(largeRawMdx)
        .digest("hex")}`,
    }
  );
  const artifact = signRollbackPayload(largePayload);
  const projection = MaterialLessonProjectionSchema.make({
    ...rollbackProjection,
    metadata: {
      ...rollbackProjection.metadata,
      description: "d".repeat(100 * 1024),
    },
  });
  const upsert = RollbackUpsertStateSchema.make({
    artifact,
    change: {
      ...rollbackUpsert.change,
      artifactHash: artifact.artifactHash,
    },
    projection,
  });
  return RollbackRecordSchema.make({
    current: upsert,
    index: 0,
    prior: upsert,
  });
});

export const currentRollbackReleaseId = ReleaseIdSchema.make(
  "test-rollback-current"
);
export const priorRollbackReleaseId = ReleaseIdSchema.make(
  "test-rollback-prior"
);

/** Builds one derived upsert from a real publication record. */
export function makeDerivedRollbackUpsert(record: {
  readonly change: RollbackUpsertState["change"];
  readonly payload: CompiledContentPayload;
  readonly projection: ContentProjection;
}) {
  return {
    artifact: signRollbackPayload(record.payload),
    item: {
      change: record.change,
      index: 0,
      releaseId: currentRollbackReleaseId,
    },
    kind: "upsert",
    projection: record.projection,
  } satisfies DerivedRollbackState;
}

const resolver = ContentVerificationKeyResolver.of({
  resolve: () =>
    Effect.succeed(
      keys.publicKey.export({ format: "pem", type: "spki" }).toString()
    ),
});

interface RecordPolicies {
  readonly currentPolicy: RollbackArtifactPolicy;
  readonly priorPolicy: RollbackArtifactPolicy;
}

/** Collects derived records through the selected signature and renderer policy. */
export const collectRollbackRecords = Effect.fn(
  "publisher.rollback.collectTestRecords"
)(function* (
  records: Stream.Stream<RollbackRecord>,
  policies?: RecordPolicies
) {
  let selectedPolicies = policies;
  if (selectedPolicies === undefined) {
    const rendererManifest = yield* makeRollbackRendererManifest();
    selectedPolicies = {
      currentPolicy: { kind: "compatible", rendererManifest },
      priorPolicy: { kind: "compatible", rendererManifest },
    };
  }

  return yield* deriveRollbackRecords({
    currentPolicy: selectedPolicies.currentPolicy,
    currentReleaseId: currentRollbackReleaseId,
    priorPolicy: selectedPolicies.priorPolicy,
    priorReleaseId: priorRollbackReleaseId,
    records,
  }).pipe(
    Stream.runCollect,
    Effect.provideService(ContentVerificationKeyResolver, resolver)
  );
});

/** Changes one signature character while preserving its wire shape. */
export function tamperRollbackSignature(
  value: typeof rollbackArtifact.signature
) {
  const replacement = value.startsWith("A") ? "B" : "A";
  return Ed25519SignatureSchema.make(`${replacement}${value.slice(1)}`);
}
