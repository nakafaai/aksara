import {
  ReleaseIdSchema,
  Sha256HashSchema,
} from "@nakafa/aksara-contracts/ids";
import type { PublicationRequest } from "@nakafa/aksara-contracts/transport/request";
import { Match } from "effect";
import { transportResponse, transportSuccess } from "#test/transport";

const foreignReleaseId = ReleaseIdSchema.make("test-foreign-release");
const foreignHash = Sha256HashSchema.make(`sha256:${"f".repeat(64)}`);

/** Replaces one nested success identity without changing its wire shape. */
function replaceIdentity(
  input: { readonly value: object },
  key: "manifestHash" | "releaseId" | "rollbackOf",
  identity: unknown
) {
  return { ...input, value: { ...input.value, [key]: identity } };
}

/** Builds valid success evidence bound to a deliberately foreign identity. */
export function foreignTransportSuccess(request: PublicationRequest) {
  const success = transportSuccess(request);
  const foreign = Match.value(success).pipe(
    Match.discriminatorsExhaustive("operation")({
      activate: (value) =>
        replaceIdentity(value, "releaseId", foreignReleaseId),
      cleanup: (value) => replaceIdentity(value, "releaseId", foreignReleaseId),
      finalize: (value) => {
        if (!value.value.done) {
          return { ...value, releaseId: foreignReleaseId };
        }
        return {
          ...value,
          releaseId: foreignReleaseId,
          value: {
            ...value.value,
            receipt: {
              ...value.value.receipt,
              releaseId: foreignReleaseId,
            },
          },
        };
      },
      rollbackPage: (value) =>
        replaceIdentity(value, "rollbackOf", foreignReleaseId),
      stageArtifactBatch: (value) =>
        replaceIdentity(value, "releaseId", foreignReleaseId),
      stageItemBatch: (value) =>
        replaceIdentity(value, "releaseId", foreignReleaseId),
      stageProjectionBatch: (value) =>
        replaceIdentity(value, "releaseId", foreignReleaseId),
      stageRelease: (value) =>
        replaceIdentity(value, "manifestHash", foreignHash),
      status: (value) => replaceIdentity(value, "manifestHash", foreignHash),
      verify: (value) => replaceIdentity(value, "releaseId", foreignReleaseId),
    })
  );
  return transportResponse(foreign);
}
