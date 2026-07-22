import { Buffer } from "node:buffer";
import {
  createHash,
  generateKeyPairSync,
  sign as signBytes,
} from "node:crypto";
import { hashCompiledContentPayload } from "@nakafa/aksara-contracts/artifact/integrity";
import {
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
import { MaterialLessonProjectionSchema } from "@nakafa/aksara-contracts/projection/material";
import {
  RollbackDeleteStateSchema,
  type RollbackRecord,
  RollbackRecordSchema,
  RollbackUpsertStateSchema,
} from "@nakafa/aksara-contracts/release/rollback";
import { createRendererManifest } from "@nakafa/aksara-contracts/renderer/manifest";
import { ContentVerificationKeyResolver } from "@nakafa/aksara-contracts/signature/spec";
import { Effect, Schema, Stream } from "effect";
import {
  deriveRollbackRecords,
  type RollbackArtifactPolicy,
} from "#publisher/rollback/records";
import { rendererDomains } from "#test/renderer";

const rawMdx = "## Test protocol";
const compiledCode = "return {};";
const keys = generateKeyPairSync("ed25519");
const keyId = SigningKeyIdSchema.make("test-rollback-key");
export const rollbackRendererManifest = await Effect.runPromise(
  createRendererManifest({
    base: {
      authoringComponents: [{ name: "TestBase", version: 1 }],
      supportedComponents: [{ name: "TestBase", version: 1 }],
    },
    domains: rendererDomains({
      chemistry: { name: "TestChemistry", version: 1 },
      mathematics: { name: "TestMathematics", version: 1 },
    }),
  })
);
const payload = Schema.decodeUnknownSync(CompiledContentPayloadSchema)({
  byteLength: Buffer.byteLength(compiledCode, "utf8"),
  compiledCode,
  compilerConfigHash: `sha256:${"a".repeat(64)}`,
  compilerVersion: "0.1.0",
  contentKey: "test:rollback-record",
  format: "mdx-function-body-v1",
  locale: "en",
  mdxCompilerVersion: "3.1.1",
  plainText: "Test protocol",
  rawMdx,
  rendererDomain: "mathematics",
  requiredComponents: [],
  sourceHash: `sha256:${createHash("sha256").update(rawMdx).digest("hex")}`,
});

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
export const rollbackProjection = Schema.decodeUnknownSync(
  MaterialLessonProjectionSchema
)({
  contentKey: payload.contentKey,
  kind: "subject-lesson",
  locale: payload.locale,
  materialKey: "test.rollback",
  metadata: { authors: [], date: "2026-01-01", title: "Test protocol" },
  order: 1,
  parentPath: "subjects/test/rollback",
  publicPath: "subjects/test/rollback/record",
  sectionKey: "test-record",
  sitemap: true,
});
export const rollbackUpsert = RollbackUpsertStateSchema.make({
  artifact: rollbackArtifact,
  change: {
    artifactHash: rollbackArtifact.artifactHash,
    contentKey: payload.contentKey,
    delivery: "public",
    locale: payload.locale,
    operation: "upsert",
    publicPath: rollbackProjection.publicPath,
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
    contentKey: ContentKeySchema.make("test:rollback-delete"),
    locale: "en",
    operation: "delete",
  },
});
export const matchingRollbackDeletion = RollbackDeleteStateSchema.make({
  change: {
    contentKey: payload.contentKey,
    locale: payload.locale,
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
export const currentRollbackReleaseId = ReleaseIdSchema.make(
  "test-rollback-current"
);
export const priorRollbackReleaseId = ReleaseIdSchema.make(
  "test-rollback-prior"
);
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

const compatiblePolicies: RecordPolicies = {
  currentPolicy: {
    kind: "compatible",
    rendererManifest: rollbackRendererManifest,
  },
  priorPolicy: {
    kind: "compatible",
    rendererManifest: rollbackRendererManifest,
  },
};

/** Collects derived records through the selected signature and renderer policy. */
export function collectRollbackRecords(
  records: Stream.Stream<RollbackRecord>,
  policies: RecordPolicies = compatiblePolicies
) {
  return Effect.runPromise(
    deriveRollbackRecords({
      currentPolicy: policies.currentPolicy,
      currentReleaseId: currentRollbackReleaseId,
      priorPolicy: policies.priorPolicy,
      priorReleaseId: priorRollbackReleaseId,
      records,
    }).pipe(
      Stream.runCollect,
      Effect.provideService(ContentVerificationKeyResolver, resolver)
    )
  );
}

/** Returns one expected typed failure from the selected artifact policy. */
export function rejectRollbackRecords(
  records: Stream.Stream<RollbackRecord>,
  policies: RecordPolicies = compatiblePolicies
): Promise<{ readonly _tag: string }> {
  return Effect.runPromise(
    deriveRollbackRecords({
      currentPolicy: policies.currentPolicy,
      currentReleaseId: currentRollbackReleaseId,
      priorPolicy: policies.priorPolicy,
      priorReleaseId: priorRollbackReleaseId,
      records,
    }).pipe(
      Stream.runCollect,
      Effect.provideService(ContentVerificationKeyResolver, resolver),
      Effect.flip
    )
  );
}

/** Changes one signature character while preserving its wire shape. */
export function tamperRollbackSignature(
  value: typeof rollbackArtifact.signature
) {
  const replacement = value.startsWith("A") ? "B" : "A";
  return Ed25519SignatureSchema.make(`${replacement}${value.slice(1)}`);
}
