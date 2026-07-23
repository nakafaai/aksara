import {
  ReleaseIdSchema,
  Sha256HashSchema,
} from "@nakafa/aksara-contracts/ids";
import type { PublicationRequest } from "@nakafa/aksara-contracts/transport/request";
import {
  type PublicationSuccess,
  PublicationSuccessSchema,
} from "@nakafa/aksara-contracts/transport/response";
import { Match, Schema } from "effect";
import { releaseReceipt } from "#test/lifecycle-state";
import { transportRecovery, transportRenderer } from "#test/transport";
import { transportSuccess } from "#test/transport-success";

const foreignReleaseId = ReleaseIdSchema.make("test-foreign-release");
const foreignHash = Sha256HashSchema.make(`sha256:${"f".repeat(64)}`);

/** Replaces one nested success identity without changing its wire shape. */
function replaceIdentity(
  input: { readonly value: object },
  key: "activeReleaseId" | "manifestHash" | "releaseId" | "rollbackOf",
  identity: unknown
) {
  return { ...input, value: { ...input.value, [key]: identity } };
}

/** Builds valid success evidence bound to a deliberately foreign identity. */
export function foreignTransportSuccess(
  request: PublicationRequest
): PublicationSuccess {
  const success = transportSuccess(request);
  const foreign = Match.value(success).pipe(
    Match.discriminatorsExhaustive("operation")({
      abort: (value) => replaceIdentity(value, "releaseId", foreignReleaseId),
      accept: (value) => replaceIdentity(value, "releaseId", foreignReleaseId),
      activate: (value) =>
        replaceIdentity(value, "releaseId", foreignReleaseId),
      activateRecovery: (value) =>
        replaceIdentity(value, "releaseId", foreignReleaseId),
      cleanup: (value) => replaceIdentity(value, "releaseId", foreignReleaseId),
      current: (value) => value,
      headPage: (value) =>
        replaceIdentity(value, "activeReleaseId", foreignReleaseId),
      recovery: (value) => {
        const release = {
          ...transportRecovery,
          manifest: {
            ...transportRecovery.manifest,
            releaseId: foreignReleaseId,
          },
          manifestHash: foreignHash,
        };
        return {
          ...value,
          value: {
            kind: "completed",
            value: {
              receipt: releaseReceipt(release),
              release,
              rendererManifest: transportRenderer,
            },
          },
        };
      },
      rollbackPage: (value) =>
        replaceIdentity(value, "rollbackOf", foreignReleaseId),
      routePage: (value) =>
        replaceIdentity(value, "rollbackOf", foreignReleaseId),
      stageArtifactBatch: (value) =>
        replaceIdentity(value, "releaseId", foreignReleaseId),
      stageItemBatch: (value) =>
        replaceIdentity(value, "releaseId", foreignReleaseId),
      stageProjectionBatch: (value) =>
        replaceIdentity(value, "releaseId", foreignReleaseId),
      stageRecovery: (value) =>
        replaceIdentity(value, "manifestHash", foreignHash),
      stageRelease: (value) =>
        replaceIdentity(value, "manifestHash", foreignHash),
      stageRouteBatch: (value) =>
        replaceIdentity(value, "releaseId", foreignReleaseId),
      status: (value) => replaceIdentity(value, "manifestHash", foreignHash),
      verify: (value) => replaceIdentity(value, "releaseId", foreignReleaseId),
    })
  );
  return Schema.decodeUnknownSync(PublicationSuccessSchema)(foreign);
}
