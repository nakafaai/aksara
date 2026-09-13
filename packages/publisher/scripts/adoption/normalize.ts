import { selectVerifiedArtifactRenderer } from "@nakafa/aksara-contracts/adoption/verify";
import { hashCompiledContentPayload } from "@nakafa/aksara-contracts/artifact/integrity";
import { CompiledContentPayloadSchema } from "@nakafa/aksara-contracts/content";
import type { Sha256Hash } from "@nakafa/aksara-contracts/ids";
import { ContentSnapshotRowSchema } from "@nakafa/aksara-contracts/release/snapshot/data";
import { verifyContentSnapshots } from "@nakafa/aksara-contracts/release/snapshot/verify";
import {
  digestTryoutPlacements,
  makeTryoutPlacementRecord,
} from "@nakafa/aksara-contracts/tryout/placement-hash";
import { makeTryoutSnapshot } from "@nakafa/aksara-contracts/tryout/snapshot/hash";
import { Effect, Schema, Stream } from "effect";
import {
  AdoptionEvidenceError,
  requireEvidence,
  type verifyAdoptionEvidence,
} from "#adoption/evidence";

type VerifiedEvidence = Effect.Success<
  ReturnType<typeof verifyAdoptionEvidence>
>;

/** Normalizes only authenticated renderer requirements and their dependent hashes. */
export const normalizeHistory = Effect.fn("adoption.normalizeHistory")(
  function* (verified: VerifiedEvidence) {
    const artifacts = new Map<
      Sha256Hash,
      {
        artifactHash: Sha256Hash;
        payload: typeof CompiledContentPayloadSchema.Type;
      }
    >();
    for (const { head } of verified.questions) {
      const original = verified.artifacts.get(head.artifactHash);
      if (original === undefined) {
        return yield* new AdoptionEvidenceError({
          message: "Missing verified artifact during normalization.",
        });
      }
      const selection = yield* selectVerifiedArtifactRenderer(original);
      const payload = yield* Schema.decodeEffect(CompiledContentPayloadSchema)(
        {
          ...original.payload,
          requiredComponents: selection.requiredComponents,
        },
        { onExcessProperty: "error" }
      );
      artifacts.set(original.artifactHash, {
        artifactHash: hashCompiledContentPayload(payload),
        payload,
      });
    }
    const rows: (typeof ContentSnapshotRowSchema.Type)[] = [];
    const placements: ReturnType<typeof makeTryoutPlacementRecord>[] = [];
    for (const original of verified.history.rows) {
      if (original.family !== "tryout") {
        return yield* new AdoptionEvidenceError({
          message: "Unexpected historical row family.",
        });
      }
      if (original.rowKind === "catalog") {
        rows.push(original);
        continue;
      }
      const question = artifacts.get(original.record.row.questionArtifactHash);
      const answer = artifacts.get(original.record.row.answerArtifactHash);
      if (question === undefined || answer === undefined) {
        return yield* new AdoptionEvidenceError({
          message: "A historical placement lost its exact question or answer.",
        });
      }
      const record = makeTryoutPlacementRecord({
        ...original.record.row,
        answerArtifactHash: answer.artifactHash,
        questionArtifactHash: question.artifactHash,
      });
      rows.push(
        ContentSnapshotRowSchema.make({
          family: "tryout",
          record,
          rowKind: "placement",
        })
      );
      placements.push(record);
    }
    const summary = yield* digestTryoutPlacements(
      Stream.fromIterable(placements)
    );
    const original = verified.history.snapshot;
    if (original.family !== "tryout") {
      return yield* new AdoptionEvidenceError({
        message: "Expected a try-out snapshot.",
      });
    }
    yield* requireEvidence(
      summary.count === original.manifest.placementCount,
      "Historical placement cardinality changed."
    );
    const manifest = makeTryoutSnapshot({
      activeAppLocales: original.manifest.activeAppLocales,
      catalogDigest: original.manifest.catalogDigest,
      counts: original.manifest.counts,
      placementCount: summary.count,
      placementDigest: summary.digest,
      routeCount: original.manifest.routeCount,
    });
    const snapshot = { family: "tryout", manifest } satisfies {
      family: "tryout";
      manifest: typeof manifest;
    };
    yield* verifyContentSnapshots({
      manifests: Stream.succeed(snapshot),
      previousSnapshots: null,
      rows: Stream.fromIterable(rows),
    });
    return { ...verified, artifacts, rows, snapshot };
  },
  Effect.mapError(
    (cause) =>
      new AdoptionEvidenceError({
        message: `Historical normalization failed: ${cause._tag}`,
      })
  )
);
