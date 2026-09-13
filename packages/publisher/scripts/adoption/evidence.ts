import { createHash } from "node:crypto";
import { gunzipSync } from "node:zlib";
import {
  RendererManifestEnvelopeSchema,
  SignedContentArtifactSchema,
  SignedContentReleaseSchema,
} from "@nakafa/aksara-contracts/adoption/schema";
import {
  verifyContentReleaseBundle,
  verifySignedContentArtifactIntegrity,
  verifySignedTryoutRuntimeBundle,
} from "@nakafa/aksara-contracts/adoption/verify";
import { compareContentHeads } from "@nakafa/aksara-contracts/content";
import { hashContentProjection } from "@nakafa/aksara-contracts/projection/hash";
import { ContentProjectionSchema } from "@nakafa/aksara-contracts/projection/spec";
import { ContentHeadSchema } from "@nakafa/aksara-contracts/release/head";
import { verifyResultCatalog } from "@nakafa/aksara-contracts/release/result/digest";
import {
  ContentSnapshotManifestSchema,
  ContentSnapshotRowSchema,
} from "@nakafa/aksara-contracts/release/snapshot/data";
import { verifyContentSnapshots } from "@nakafa/aksara-contracts/release/snapshot/verify";
import { verifyTryoutRuntimeBundleSource } from "@nakafa/aksara-contracts/tryout/runtime/source";
import { SignedTryoutRuntimeBundleSchema } from "@nakafa/aksara-contracts/tryout/runtime/spec";
import { Effect, FileSystem, Schema, Stream } from "effect";
import { GitBlob } from "#publisher/git/blob";

/** A one-time adoption proof failed before target staging. */
export class AdoptionEvidenceError extends Schema.TaggedError<AdoptionEvidenceError>()(
  "AdoptionEvidenceError",
  {
    message: Schema.String,
  }
) {}

const HistorySchema = Schema.Struct({
  heads: Schema.Array(
    Schema.Struct({
      head: ContentHeadSchema,
      projection: ContentProjectionSchema,
    })
  ),
  release: SignedContentReleaseSchema,
  rendererManifest: RendererManifestEnvelopeSchema,
  rows: Schema.Array(ContentSnapshotRowSchema),
  runtimeBundle: SignedTryoutRuntimeBundleSchema,
  snapshot: ContentSnapshotManifestSchema,
});
const EvidenceSchema = Schema.Struct({
  artifacts: Schema.Array(SignedContentArtifactSchema),
  snapshots: Schema.Array(HistorySchema),
});
export type HistoricalEvidence = typeof HistorySchema.Type;
export type AdoptionEvidence = typeof EvidenceSchema.Type;

/** Requires an exact authenticated invariant without logging content bodies. */
export const requireEvidence = Effect.fn("adoption.requireEvidence")(function* (
  condition: boolean,
  message: string
) {
  if (!condition) {
    return yield* new AdoptionEvidenceError({ message });
  }
});

/** Loads the reviewed authored-only export; it contains no learner state. */
export const readAdoptionEvidence = Effect.fn("adoption.readEvidence")(
  function* (path: string) {
    const fs = yield* FileSystem.FileSystem;
    const bytes = yield* fs.readFile(path);
    yield* requireEvidence(
      createHash("sha256").update(bytes).digest("hex") ===
        "f219beb5a2ca45601157673deb6eef75d8285dc4c54bd4c8d671d8ece0e51bab",
      "The historical evidence archive differs from its reviewed hash."
    );
    const input = yield* Effect.try({
      catch: () =>
        new AdoptionEvidenceError({
          message: "The historical evidence archive is malformed.",
        }),
      try: () =>
        JSON.parse(
          gunzipSync(bytes, { maxOutputLength: 140_000_000 }).toString("utf8")
        ),
    });
    return yield* Schema.decodeUnknownEffect(EvidenceSchema)(input, {
      onExcessProperty: "error",
    });
  }
);

/** Re-proves original signatures, catalog roots, and exact historical Git bodies. */
export const verifyAdoptionEvidence = Effect.fn("adoption.verifyEvidence")(
  function* (evidence: AdoptionEvidence, index: number) {
    const history = evidence.snapshots[index];
    yield* requireEvidence(
      evidence.snapshots.length === 2 && evidence.artifacts.length === 16_738,
      "The historical export is incomplete."
    );
    if (history === undefined) {
      return yield* new AdoptionEvidenceError({
        message: "Unknown historical snapshot selection.",
      });
    }
    const source = yield* verifyContentReleaseBundle({
      release: history.release,
      rendererManifest: history.rendererManifest,
    });
    if (
      source.release.manifest.origin.kind !== "git" ||
      history.snapshot.family !== "tryout"
    ) {
      return yield* new AdoptionEvidenceError({
        message:
          "Historical adoption requires the original Git try-out source.",
      });
    }
    const runtime = yield* verifySignedTryoutRuntimeBundle({
      bundle: history.runtimeBundle,
      rendererManifest: history.rendererManifest,
    });
    yield* verifyTryoutRuntimeBundleSource({
      bundle: runtime,
      release: source.release,
    });
    yield* requireEvidence(
      runtime.payload.snapshot.snapshotId ===
        history.snapshot.manifest.snapshotId,
      "Historical bundle and snapshot differ."
    );
    yield* verifyContentSnapshots({
      manifests: Stream.succeed(history.snapshot),
      previousSnapshots: null,
      rows: Stream.fromIterable(history.rows),
    });
    const heads = [...history.heads].sort((a, b) =>
      compareContentHeads(a.head, b.head)
    );
    yield* verifyResultCatalog({
      expectedCount: source.release.manifest.resultCount,
      expectedDigest: source.release.manifest.resultDigest,
      heads: Stream.fromIterable(heads.map(({ head }) => head)),
      releaseId: source.release.manifest.releaseId,
    });
    for (const { head, projection } of heads) {
      yield* requireEvidence(
        hashContentProjection(projection) === head.projectionHash &&
          projection.contentKey === head.contentKey &&
          projection.artifactLocale === head.artifactLocale,
        "Historical projection identity differs."
      );
    }
    const artifacts = new Map<
      AdoptionEvidence["artifacts"][number]["artifactHash"],
      AdoptionEvidence["artifacts"][number]
    >();
    for (const item of evidence.artifacts) {
      const artifact = yield* verifySignedContentArtifactIntegrity(item);
      yield* requireEvidence(
        !artifacts.has(artifact.artifactHash),
        "Duplicate historical artifact."
      );
      artifacts.set(artifact.artifactHash, artifact);
    }
    const git = yield* GitBlob;
    const questions = heads.filter(({ head }) => head.family === "question");
    for (let offset = 0; offset < questions.length; offset += 128) {
      const batch = questions.slice(offset, offset + 128);
      const blobs = yield* git.read({
        revision: source.release.manifest.origin.sha,
        sourcePaths: batch.map(({ head }) => head.sourcePath),
      });
      for (const { head } of batch) {
        const artifact = artifacts.get(head.artifactHash);
        if (artifact === undefined) {
          return yield* new AdoptionEvidenceError({
            message: "Missing historical question artifact.",
          });
        }
        const { payload } = artifact;
        yield* requireEvidence(
          payload.rawMdx === blobs.get(head.sourcePath) &&
            payload.contentKey === head.contentKey &&
            payload.artifactLocale === head.artifactLocale &&
            payload.rendererDomain === head.rendererDomain &&
            payload.sourceHash === head.sourceHash &&
            payload.compilerConfigHash === head.compilerConfigHash,
          "Historical artifact differs from its exact Git source or signed head."
        );
      }
    }
    return {
      artifacts,
      history,
      questions,
      sourceGitSha: source.release.manifest.origin.sha,
    };
  },
  Effect.mapError(
    (cause) =>
      new AdoptionEvidenceError({
        message: `Historical evidence failed: ${cause._tag}`,
      })
  )
);
