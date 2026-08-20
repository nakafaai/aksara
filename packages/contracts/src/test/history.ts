import { Effect, Schema } from "effect";

import { HistoricalSignedContentReleaseSchema } from "#contracts/history/release";
import { ContentVerificationKeyResolver } from "#contracts/signature/spec";

const RETAINED_PUBLIC_KEY = `-----BEGIN PUBLIC KEY-----
MCowBQYDK2VwAyEAGM/r01sbz8RY8LNYOiYdvSrQj+aluPXkWXYV9EqFKlo=
-----END PUBLIC KEY-----
`;

export const retainedRelease = {
  keyId: "retained-key",
  manifest: {
    baseManifestHash: null,
    baseReleaseId: null,
    baseResultCount: 0,
    baseResultDigest:
      "sha256:ed7d49e237dadbd311a1599264b00852ae18657d123c8f9cbc26c1c62c8f81cd",
    deleteCount: 0,
    itemCount: 0,
    itemsDigest:
      "sha256:1111111111111111111111111111111111111111111111111111111111111111",
    origin: {
      kind: "git",
      sha: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    },
    projectionCount: 0,
    projectionDigest:
      "sha256:2222222222222222222222222222222222222222222222222222222222222222",
    releaseId: "retained-release",
    rendererContractVersion: "1.0.0",
    rendererManifestHash:
      "sha256:3333333333333333333333333333333333333333333333333333333333333333",
    resultCount: 0,
    resultDigest:
      "sha256:ed7d49e237dadbd311a1599264b00852ae18657d123c8f9cbc26c1c62c8f81cd",
    rollbackCount: 0,
    rollbackDigest:
      "sha256:4444444444444444444444444444444444444444444444444444444444444444",
    routeCount: 0,
    routeDigest:
      "sha256:5555555555555555555555555555555555555555555555555555555555555555",
    scope: {
      content: [],
      families: [],
      snapshots: ["tryout"],
    },
    snapshots: {
      program: {
        baseSnapshotId: null,
        mode: "inherit",
        resultSnapshotId: null,
        rowCount: 0,
        rowDigest:
          "sha256:eb27aa7f59e41b14a3f76d951c5a50cb954a19f3f6e6c44bc21a733f606e888f",
      },
      quran: {
        baseSnapshotId: null,
        mode: "inherit",
        resultSnapshotId: null,
        rowCount: 0,
        rowDigest:
          "sha256:eb27aa7f59e41b14a3f76d951c5a50cb954a19f3f6e6c44bc21a733f606e888f",
      },
      tryout: {
        baseSnapshotId: null,
        mode: "replace",
        resultSnapshotId:
          "sha256:6666666666666666666666666666666666666666666666666666666666666666",
        rowCount: 1,
        rowDigest:
          "sha256:7777777777777777777777777777777777777777777777777777777777777777",
      },
    },
    upsertCount: 0,
  },
  manifestHash:
    "sha256:1bf29cf6ed4eb251d775ab3bc7d33b67e49833f3602c332dbb52a6c309fa4f0a",
  signature:
    "Yb23X8O1PY0HMsSobOoTOF0BLUdTOnVTWcmFT6TltqrX2D95b86O75lE13sQfMjbnSwSfSNnq_4Y-MKW29nSDQ",
};

export const retainedTryoutSnapshot = {
  catalogDigest:
    "sha256:8888888888888888888888888888888888888888888888888888888888888888",
  counts: { country: 1, exam: 1, section: 1, set: 1, track: 1 },
  format: "tryout-v1",
  locales: ["en", "id"],
  placementCount: 1,
  placementDigest:
    "sha256:9999999999999999999999999999999999999999999999999999999999999999",
  routeCount: 1,
  snapshotId:
    "sha256:de51b82acb83230b76c07a22aa8e7b2ef178c98384057853dc4bdce23b2e65b7",
};

const retainedTryoutGraph = {
  alignmentId: "alignment:tryout-indonesia",
  assetId: "asset:tryout-indonesia",
  conceptId: "concept:tryout-indonesia",
  learningObjectId: "lo:tryout-indonesia",
  lensId: "lens:tryout-indonesia",
};

/** One frozen catalog row shaped exactly like retained production bytes. */
export const retainedTryoutCatalogRow = {
  family: "tryout",
  record: {
    row: {
      countryCode: "ID",
      countryKey: "indonesia",
      graph: retainedTryoutGraph,
      kind: "country",
      locale: "en",
      order: 1,
      publicPath: "try-out/indonesia",
      sourceRevision: "retained-source",
      title: "Indonesia",
    },
    rowHash:
      "sha256:c40cf4f6458393c0269eecaf5d9ff78e953e439492a01a234667d966f58574c0",
  },
  rowKind: "catalog",
} as const;

const retainedQuestionRoot =
  "question-bank/tryout/indonesia/snbt/general-reasoning/set-1/question-1";
const retainedTryoutPlacement = {
  answerArtifactHash:
    "sha256:cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
  answerContentKey: `${retainedQuestionRoot}/answer`,
  choices: [
    { isCorrect: true, label: "A", optionKey: "option-1", order: 1 },
    { isCorrect: false, label: "B", optionKey: "option-2", order: 2 },
  ],
  countryKey: "indonesia",
  examKey: "snbt",
  locale: "en",
  questionArtifactHash:
    "sha256:dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd",
  questionContentKey: `${retainedQuestionRoot}/question`,
  questionOrder: 1,
  questionSourcePath: `packages/corpus/${retainedQuestionRoot}`,
  rendererDomain: "snbt-general",
  scope: "server",
  sectionKey: "general-reasoning",
  setKey: "set-1",
  sourceRevision: "retained-source",
  title: "Question 1",
  trackKey: "2027",
} as const;

/** One pre-content-hash placement shaped exactly like retained production bytes. */
export const retainedTryoutPlacementRow = {
  family: "tryout",
  record: {
    row: retainedTryoutPlacement,
    rowHash:
      "sha256:8ae3067147a3ab28e6ba7a14e4f3eb8bf07e1ff4d88ff4141842849243a2bc4a",
  },
  rowKind: "placement",
} as const;

/** One later retained placement carrying the optional complete-content hash. */
export const retainedTryoutPlacementWithHashRow = {
  family: "tryout",
  record: {
    row: { ...retainedTryoutPlacement, contentHash: "e".repeat(64) },
    rowHash:
      "sha256:ce4c00fece190e53c6189b2ec7c0c3b2956083f2a06573137e65b57fdce69e58",
  },
  rowKind: "placement",
} as const;

export const retainedKeyResolver = ContentVerificationKeyResolver.of({
  resolve: () => Effect.succeed(RETAINED_PUBLIC_KEY),
});

export const alternateHistoricalHash =
  "sha256:ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff";
export const emptyHistoricalSnapshotDigest =
  retainedRelease.manifest.snapshots.program.rowDigest;
export const retainedSnapshotId =
  retainedRelease.manifest.snapshots.tryout.resultSnapshotId;

/** Decodes one test-owned immutable envelope through the frozen schema. */
export function decodeHistoricalEnvelope(manifest: unknown) {
  return Schema.decodeUnknownExit(HistoricalSignedContentReleaseSchema)(
    { ...retainedRelease, manifest },
    { onExcessProperty: "error" }
  );
}

/** Builds the frozen transition that restores one retained snapshot. */
export function restoredHistoricalSnapshot() {
  return {
    baseSnapshotId: retainedSnapshotId,
    mode: "restore",
    resultSnapshotId: null,
    rowCount: 0,
    rowDigest: emptyHistoricalSnapshotDigest,
  };
}
