import {
  type PublicationSuccess,
  PublicationSuccessSchema,
} from "@nakafa/aksara-contracts/transport/response";
import { Schema } from "effect";
import {
  transportRelease,
  transportRenderer,
  type transportRequests,
} from "#test/transport";

type RecoveryRequest = Extract<
  (typeof transportRequests)[number],
  { operation: "recovery" }
>;

/** Builds schema-valid completed recovery evidence for one requested relation. */
export function completedRecovery(
  request: RecoveryRequest,
  originReleaseId = request.releaseId
): PublicationSuccess {
  const manifest = {
    ...transportRelease.manifest,
    baseManifestHash: transportRelease.manifestHash,
    baseReleaseId: originReleaseId,
    baseResultCount: transportRelease.manifest.resultCount,
    baseResultDigest: transportRelease.manifest.resultDigest,
    origin: { kind: "rollback" as const, releaseId: originReleaseId },
    releaseId: request.recoveryId,
    resultCount: transportRelease.manifest.baseResultCount,
    resultDigest: transportRelease.manifest.baseResultDigest,
  };
  const release = {
    ...transportRelease,
    manifest,
    manifestHash: `sha256:${"e".repeat(64)}`,
  };
  return Schema.decodeUnknownSync(PublicationSuccessSchema)({
    ok: true,
    operation: "recovery",
    value: {
      kind: "completed",
      value: {
        receipt: {
          activatedHeads: manifest.upsertCount,
          deletedHeads: manifest.deleteCount,
          manifestHash: release.manifestHash,
          projectionDigest: manifest.projectionDigest,
          releaseId: manifest.releaseId,
          resultCount: manifest.resultCount,
          resultDigest: manifest.resultDigest,
          routeDigest: manifest.routeDigest,
          stagedArtifacts: manifest.upsertCount,
          stagedItems: manifest.itemCount,
          stagedProjections: manifest.projectionCount,
          stagedRoutes: manifest.routeCount,
        },
        release,
        rendererManifest: transportRenderer,
      },
    },
  });
}
