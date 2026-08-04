import { hash } from "#contracts/test/request";
import {
  artifact,
  protectedArtifact,
  protectedFound,
  protectedRequest,
} from "#contracts/test/runtime/spec";

/** Protected responses and requests that violate one exact snapshot selector. */
export const protectedMismatchCases = [
  ["delivery", { ...protectedFound, delivery: "entitled" }],
  [
    "artifactHash",
    {
      ...protectedFound,
      artifact: {
        ...protectedArtifact,
        artifactHash: artifact.artifactHash,
      },
    },
  ],
  [
    "contentKey",
    {
      ...protectedFound,
      artifact: {
        ...protectedArtifact,
        payload: {
          ...protectedArtifact.payload,
          contentKey: artifact.payload.contentKey,
        },
      },
    },
  ],
  [
    "locale",
    {
      ...protectedFound,
      artifact: {
        ...protectedArtifact,
        payload: { ...protectedArtifact.payload, locale: "id" },
      },
    },
  ],
  ["snapshotId", { ...protectedFound, snapshotId: artifact.artifactHash }],
  [
    "snapshotId",
    { ...protectedFound, snapshotId: artifact.artifactHash },
    { ...protectedRequest, snapshotId: artifact.artifactHash },
  ],
  [
    "snapshotReleaseId",
    { ...protectedFound, snapshotReleaseId: "test-other-release" },
  ],
  [
    "snapshotReleaseId",
    { ...protectedFound, snapshotReleaseId: "test-other-release" },
    { ...protectedRequest, snapshotReleaseId: "test-other-release" },
  ],
  ["snapshotManifestHash", { ...protectedFound, snapshotManifestHash: hash }],
  [
    "sourcePath",
    {
      ...protectedFound,
      sourcePath: "packages/corpus/question/wrong.en.mdx",
    },
  ],
] as const;
