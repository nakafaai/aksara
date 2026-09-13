import type { CompiledContentPayload } from "@nakafa/aksara-contracts/content";
import {
  ContentFamilySchema,
  compareContentHeads,
} from "@nakafa/aksara-contracts/content";
import type { ReleaseId } from "@nakafa/aksara-contracts/ids";
import { verifyContentProjections } from "@nakafa/aksara-contracts/projection/verify";
import type { ContentHead } from "@nakafa/aksara-contracts/release/head";
import { verifyContentReleaseItems } from "@nakafa/aksara-contracts/release/items";
import { verifyResultCatalog } from "@nakafa/aksara-contracts/release/result/digest";
import { verifyContentRoutes } from "@nakafa/aksara-contracts/release/route/verify";
import { inheritContentSnapshots } from "@nakafa/aksara-contracts/release/snapshot/spec";
import {
  verifyContentReleaseBundle,
  verifySignedContentRelease,
} from "@nakafa/aksara-contracts/release/verify";
import { verifySignedTryoutRuntimeBundle } from "@nakafa/aksara-contracts/tryout/runtime/verify";
import { Effect, Stream } from "effect";
import { AdoptionEvidenceError, requireEvidence } from "#adoption/evidence";
import type { normalizeHistory } from "#adoption/normalize";
import { streamContentHeads } from "#publisher/heads";
import { prepareContentRelease } from "#publisher/preparation";
import type { PreparedContentTransition } from "#publisher/preparation/spec";
import { preparePublicationRuntimes } from "#publisher/publication/runtime";
import { verifyPublicationSnapshots } from "#publisher/publication/snapshots";
import { PublicationTarget } from "#publisher/publication/spec";
import type { PublicationSigner } from "#publisher/signing/service";
import {
  stagePreparedRelease,
  stageRuntimeBundles,
} from "#publisher/stage/plan";

/** Stable locale-specific source identity for this bounded migration. */
function identity(head: Pick<ContentHead, "contentKey" | "artifactLocale">) {
  return `${head.contentKey}\0${head.artifactLocale}`;
}

/** Builds a normal verified Git candidate while preserving original compiled bodies. */
export const prepareHistoricalCandidate = Effect.fn(
  "adoption.prepareCandidate"
)(
  function* (
    history: Effect.Success<ReturnType<typeof normalizeHistory>>,
    releaseId: ReleaseId,
    signer: PublicationSigner
  ) {
    const target = yield* PublicationTarget;
    const current = yield* target.current;
    yield* requireEvidence(
      current.recovery === null &&
        (current.candidate === null ||
          current.candidate.release.manifest.releaseId === releaseId),
      "An unrelated candidate or retained recovery still owns the publication slot."
    );
    if (current.active === null || current.tryoutRuntimeBundle === null) {
      return yield* new AdoptionEvidenceError({
        message:
          "Historical adoption requires an accepted current release and runtime bundle.",
      });
    }
    const base = yield* verifyContentReleaseBundle({
      release: current.active.release,
      rendererManifest: current.active.rendererManifest,
    });
    const baseRuntime = yield* verifySignedTryoutRuntimeBundle({
      bundle: current.tryoutRuntimeBundle,
      rendererManifest: base.rendererManifest,
    });
    yield* requireEvidence(
      baseRuntime.payload.snapshot.snapshotId ===
        base.release.manifest.snapshots.tryout.resultSnapshotId,
      "Current runtime does not name its active snapshot."
    );
    const heads: ContentHead[] = [];
    for (const family of ContentFamilySchema.literals) {
      heads.push(
        ...(yield* streamContentHeads(
          base.release.manifest.releaseId,
          base.release.manifestHash,
          family
        ).pipe(Stream.runCollect))
      );
    }
    heads.sort(compareContentHeads);
    yield* verifyResultCatalog({
      expectedCount: base.release.manifest.resultCount,
      expectedDigest: base.release.manifest.resultDigest,
      heads: Stream.fromIterable(heads),
      releaseId: base.release.manifest.releaseId,
    });
    const prior = new Map(
      heads
        .filter((head) => head.family === "question")
        .map((head) => [identity(head), head])
    );
    const desired = new Set<string>();
    const records: PreparedContentTransition[] = [];
    const result: ContentHead[] = heads.filter(
      (head) => head.family !== "question"
    );
    const payloads: CompiledContentPayload[] = [];
    for (const { head, projection } of history.questions) {
      const normalized = history.artifacts.get(head.artifactHash);
      if (normalized === undefined) {
        return yield* new AdoptionEvidenceError({
          message: "A desired historical artifact is missing.",
        });
      }
      const key = identity(head);
      desired.add(key);
      const previous = prior.get(key);
      const currentHead = { ...head, artifactHash: normalized.artifactHash };
      result.push(currentHead);
      payloads.push(normalized.payload);
      records.push({
        prior:
          previous === undefined
            ? {
                artifactLocale: head.artifactLocale,
                contentKey: head.contentKey,
                family: "question",
                state: "absent",
              }
            : { head: { ...previous, family: "question" }, state: "question" },
        record: {
          change: {
            artifactHash: normalized.artifactHash,
            artifactLocale: head.artifactLocale,
            contentKey: head.contentKey,
            delivery: head.delivery,
            family: "question",
            operation: "upsert",
            rendererDomain: head.rendererDomain,
            sourcePath: head.sourcePath,
          },
          payload: normalized.payload,
          projection,
          source: {
            artifactLocale: head.artifactLocale,
            contentKey: head.contentKey,
            rawMdx: normalized.payload.rawMdx,
            rendererDomain: head.rendererDomain,
            sourcePath: head.sourcePath,
          },
        },
      });
    }
    for (const head of prior.values()) {
      if (!desired.has(identity(head))) {
        records.push({
          prior: { head: { ...head, family: "question" }, state: "question" },
          record: {
            change: {
              artifactLocale: head.artifactLocale,
              contentKey: head.contentKey,
              family: "question",
              operation: "delete",
            },
          },
        });
      }
    }
    records.sort((a, b) =>
      compareContentHeads(a.record.change, b.record.change)
    );
    result.sort(compareContentHeads);
    const runtime = {
      recovery: baseRuntime.payload.snapshot,
      result: history.snapshot.manifest,
    };
    const prepared = yield* prepareContentRelease({
      aksaraSha: history.sourceGitSha,
      baseActiveAppLocales: base.release.manifest.activeAppLocales,
      baseManifestHash: base.release.manifestHash,
      baseReleaseId: base.release.manifest.releaseId,
      baseRendererManifestHash: base.rendererManifest.hash,
      baseResultCount: base.release.manifest.resultCount,
      baseResultDigest: base.release.manifest.resultDigest,
      previousSnapshots: inheritContentSnapshots(
        base.release.manifest.snapshots
      ),
      records: Stream.fromIterable(records),
      releaseId,
      rendererManifest: base.rendererManifest,
      result: Stream.fromIterable(result),
      routes: Stream.empty,
      scope: { families: ["question"], snapshots: ["tryout"] },
      snapshotManifests: Stream.succeed(history.snapshot),
      snapshotRows: Stream.fromIterable(history.rows),
      tryoutRuntime: runtime,
    });
    const release = yield* signer
      .signRelease(prepared.manifest)
      .pipe(Effect.flatMap(verifySignedContentRelease));
    const bundles = yield* preparePublicationRuntimes({
      release,
      rendererManifest: base.rendererManifest,
      runtime,
      signer,
      sourceGitSha: history.sourceGitSha,
    });
    const summary = yield* verifyContentReleaseItems({
      items: prepared.items,
      manifest: prepared.manifest,
    });
    const projectionSummary = yield* verifyContentProjections({
      manifest: prepared.manifest,
      projections: prepared.projections,
    });
    const routeSummary = yield* verifyContentRoutes({
      manifest: prepared.manifest,
      routes: prepared.routes,
    });
    const snapshotSummary = yield* verifyPublicationSnapshots(prepared);
    const artifacts = Stream.fromIterable(payloads).pipe(
      Stream.mapEffect(signer.signArtifact)
    );
    return {
      bundle: { release, rendererManifest: base.rendererManifest },
      cacheChanges: Stream.empty,
      projectionSummary,
      rendererPreflight: prepared.rendererPreflight,
      routeSummary,
      runtimes: stageRuntimeBundles({ bundles, releaseId, target }),
      snapshotSummary,
      stage: stagePreparedRelease({
        artifacts,
        items: prepared.items,
        prepared,
        routes: prepared.routes,
        target,
      }),
      summary,
      target,
      tryoutRuntimeBundles: bundles,
    };
  },
  Effect.mapError(
    (cause) =>
      new AdoptionEvidenceError({
        message: `Historical candidate preparation failed: ${cause._tag}`,
      })
  )
);
