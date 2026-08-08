import { hash } from "#contracts/test/request";
import {
  protectedArtifact,
  protectedFound,
  protectedRequest,
} from "#contracts/test/runtime/protected";
import { artifact } from "#contracts/test/runtime/public";

const [protectedItem] = protectedFound.items;

/** Protected responses and requests that violate one exact snapshot selector. */
export const protectedMismatchCases = [
  [
    "delivery",
    {
      ...protectedFound,
      items: [{ ...protectedItem, delivery: "entitled" }],
    },
  ],
  [
    "artifactHash",
    {
      ...protectedFound,
      items: [
        {
          ...protectedItem,
          artifact: {
            ...protectedArtifact,
            artifactHash: artifact.artifactHash,
          },
        },
      ],
    },
  ],
  [
    "contentKey",
    {
      ...protectedFound,
      items: [
        {
          ...protectedItem,
          artifact: {
            ...protectedArtifact,
            payload: {
              ...protectedArtifact.payload,
              contentKey: artifact.payload.contentKey,
            },
          },
        },
      ],
    },
  ],
  [
    "locale",
    {
      ...protectedFound,
      items: [
        {
          ...protectedItem,
          artifact: {
            ...protectedArtifact,
            payload: { ...protectedArtifact.payload, locale: "id" },
          },
        },
      ],
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
      items: [
        {
          ...protectedItem,
          sourcePath: "packages/corpus/question/wrong.en.mdx",
        },
      ],
    },
  ],
] as const;
