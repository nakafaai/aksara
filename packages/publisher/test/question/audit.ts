import { generateKeyPairSync } from "node:crypto";
import {
  GitCommitShaSchema,
  ReleaseIdSchema,
  Sha256HashSchema,
} from "@nakafa/aksara-contracts/ids";
import { ACTIVE_APP_LOCALES } from "@nakafa/aksara-contracts/locale";
import { digestProjections } from "@nakafa/aksara-contracts/projection/digest";
import { hashContentProjection } from "@nakafa/aksara-contracts/projection/hash";
import type { ContentProjection } from "@nakafa/aksara-contracts/projection/spec";
import {
  ContentReleaseItemSchema,
  ContentReleaseManifestSchema,
  RollbackSignedContentReleaseSchema,
} from "@nakafa/aksara-contracts/release";
import { ContentReleaseCurrentSchema } from "@nakafa/aksara-contracts/release/current/state";
import { digestItems } from "@nakafa/aksara-contracts/release/digest";
import { QuestionHeadSchema } from "@nakafa/aksara-contracts/release/head";
import { EMPTY_RESULT_CATALOG_DIGEST } from "@nakafa/aksara-contracts/release/result/spec";
import { digestRollbackSnapshot } from "@nakafa/aksara-contracts/release/rollback/digest";
import { RollbackRecordSchema } from "@nakafa/aksara-contracts/release/rollback/spec";
import {
  inheritContentSnapshots,
  invertContentSnapshots,
} from "@nakafa/aksara-contracts/release/snapshot/spec";
import { createRendererManifest } from "@nakafa/aksara-contracts/renderer/manifest";
import { ContentVerificationKeyResolver } from "@nakafa/aksara-contracts/signature/spec";
import { Effect, Schema, Stream } from "effect";
import { makeEd25519PublicationSigner } from "#publisher/signing/service";
import { releaseReceipt } from "#test/lifecycle/state";
import {
  collectQuestionPublication,
  rendererManifest,
} from "#test/question/spec";

const activeReleaseId = ReleaseIdSchema.make("test-question-audit-active");
const recoveryReleaseId = ReleaseIdSchema.make("test-question-audit-recovery");
const baseReleaseId = ReleaseIdSchema.make("test-question-audit-base");
const baseManifestHash = Sha256HashSchema.make(`sha256:${"b".repeat(64)}`);
const resultDigest = Sha256HashSchema.make(`sha256:${"c".repeat(64)}`);
const routeDigest = Sha256HashSchema.make(`sha256:${"d".repeat(64)}`);

interface QuestionAuditFixtureOptions {
  readonly priorProjection?: ContentProjection;
  readonly recoveryProjectionDigest?: typeof Sha256HashSchema.Type;
}

/** Builds one fully signed active and recovery fixture for Question audits. */
export const makeQuestionAuditFixture = Effect.fn(
  "QuestionAuditTest.makeFixture"
)(function* (options: QuestionAuditFixtureOptions = {}) {
  const preparedRecords = yield* Effect.tryPromise(() =>
    collectQuestionPublication({ heads: [] })
  );
  const prepared = preparedRecords.find(
    ({ record }) =>
      "payload" in record &&
      (options.priorProjection === undefined ||
        (record.change.contentKey === options.priorProjection.contentKey &&
          record.change.artifactLocale ===
            options.priorProjection.artifactLocale))
  );
  if (!(prepared && "payload" in prepared.record)) {
    return yield* Effect.die("Expected one current Question upsert fixture.");
  }
  const { change, payload, projection } = prepared.record;
  const auditRendererManifest = yield* createRendererManifest({
    base: rendererManifest.base,
    domains: rendererManifest.domains,
    publishedDomains: [payload.rendererDomain],
  });
  const { privateKey, publicKey } = yield* Effect.sync(() =>
    generateKeyPairSync("ed25519")
  );
  const signer = yield* makeEd25519PublicationSigner({
    keyId: "test-question-audit-key",
    privateKeyPem: privateKey
      .export({ format: "pem", type: "pkcs8" })
      .toString(),
  });
  const artifact = yield* signer.signArtifact(payload);
  const item = ContentReleaseItemSchema.make({
    change,
    index: 0,
    releaseId: activeReleaseId,
  });
  const selectedPrior = options.priorProjection ?? projection;
  const rollbackRecord = RollbackRecordSchema.make({
    current: { artifact, change, projection },
    index: 0,
    prior: { artifact, change, projection: selectedPrior },
  });
  const head = QuestionHeadSchema.make({
    artifactHash: artifact.artifactHash,
    artifactLocale: change.artifactLocale,
    compilerConfigHash: payload.compilerConfigHash,
    contentKey: change.contentKey,
    delivery: change.delivery,
    family: "question",
    projectionHash: hashContentProjection(projection),
    rendererDomain: change.rendererDomain,
    sourceHash: payload.sourceHash,
    sourcePath: change.sourcePath,
  });
  const priorHead = QuestionHeadSchema.make({
    ...head,
    projectionHash: hashContentProjection(selectedPrior),
  });
  const itemSummary = yield* digestItems(activeReleaseId, Stream.make(item));
  const projectionSummary = yield* digestProjections(
    activeReleaseId,
    Stream.make(projection)
  );
  const rollbackSummary = yield* digestRollbackSnapshot(
    activeReleaseId,
    Stream.make({
      index: 0,
      releaseId: activeReleaseId,
      snapshot: { head: priorHead, state: "question" as const },
    })
  );
  const recoveryItem = ContentReleaseItemSchema.make({
    ...item,
    releaseId: recoveryReleaseId,
  });
  const recoveryItemSummary = yield* digestItems(
    recoveryReleaseId,
    Stream.make(recoveryItem)
  );
  const recoveryProjectionSummary = yield* digestProjections(
    recoveryReleaseId,
    Stream.make(selectedPrior)
  );
  const recoveryRollbackSummary = yield* digestRollbackSnapshot(
    recoveryReleaseId,
    Stream.make({
      index: 0,
      releaseId: recoveryReleaseId,
      snapshot: { head, state: "question" as const },
    })
  );
  const snapshots = inheritContentSnapshots(null);
  const activeManifest = ContentReleaseManifestSchema.make({
    activeAppLocales: ACTIVE_APP_LOCALES,
    baseActiveAppLocales: ACTIVE_APP_LOCALES,
    baseManifestHash,
    baseReleaseId,
    baseResultCount: 1,
    baseResultDigest: EMPTY_RESULT_CATALOG_DIGEST,
    deleteCount: 0,
    format: "localized-content-release",
    itemCount: itemSummary.count,
    itemsDigest: itemSummary.digest,
    origin: { kind: "git", sha: GitCommitShaSchema.make("a".repeat(40)) },
    projectionCount: projectionSummary.count,
    projectionDigest: projectionSummary.digest,
    releaseId: activeReleaseId,
    rendererContractVersion: auditRendererManifest.rendererContractVersion,
    rendererManifestHash: auditRendererManifest.hash,
    resultCount: 1,
    resultDigest,
    rollbackCount: rollbackSummary.count,
    rollbackDigest: rollbackSummary.digest,
    routeCount: 0,
    routeDigest,
    scope: { families: ["question"], snapshots: ["tryout"] },
    snapshots,
    upsertCount: itemSummary.upsertCount,
  });
  const activeRelease = yield* signer.signRelease(activeManifest);
  const recoveryManifest = ContentReleaseManifestSchema.make({
    ...activeManifest,
    activeAppLocales: ACTIVE_APP_LOCALES,
    baseActiveAppLocales: activeManifest.activeAppLocales,
    baseManifestHash: activeRelease.manifestHash,
    baseReleaseId: activeReleaseId,
    baseResultCount: activeManifest.resultCount,
    baseResultDigest: activeManifest.resultDigest,
    deleteCount: recoveryItemSummary.deleteCount,
    itemCount: recoveryItemSummary.count,
    itemsDigest: recoveryItemSummary.digest,
    origin: { kind: "rollback", releaseId: activeReleaseId },
    projectionCount: recoveryProjectionSummary.count,
    projectionDigest:
      options.recoveryProjectionDigest ?? recoveryProjectionSummary.digest,
    releaseId: recoveryReleaseId,
    resultCount: activeManifest.baseResultCount,
    resultDigest: activeManifest.baseResultDigest,
    rollbackCount: recoveryRollbackSummary.count,
    rollbackDigest: recoveryRollbackSummary.digest,
    snapshots: invertContentSnapshots(activeManifest.snapshots),
    upsertCount: recoveryItemSummary.upsertCount,
  });
  const recoveryRelease = yield* signer
    .signRelease(recoveryManifest)
    .pipe(
      Effect.flatMap(Schema.decodeEffect(RollbackSignedContentReleaseSchema))
    );
  const current = ContentReleaseCurrentSchema.make({
    active: {
      receipt: releaseReceipt(activeRelease),
      release: activeRelease,
      rendererManifest: auditRendererManifest,
    },
    candidate: null,
    recovery: {
      phase: "verified" as const,
      release: recoveryRelease,
      rendererManifest: auditRendererManifest,
    },
    tryoutRuntimeBundle: null,
  });
  const resolver = ContentVerificationKeyResolver.of({
    resolve: () =>
      Effect.succeed(
        publicKey.export({ format: "pem", type: "spki" }).toString()
      ),
  });
  return {
    current,
    head,
    input: {
      manifestHash: activeRelease.manifestHash,
      recoveryId: recoveryReleaseId,
      recoveryManifestHash: recoveryRelease.manifestHash,
      releaseId: activeReleaseId,
    },
    record: rollbackRecord,
    resolver,
  };
});
