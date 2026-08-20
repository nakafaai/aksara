import { Effect, Schema } from "effect";
import { verifySignedContentArtifactIntegrity } from "#contracts/artifact/integrity";
import {
  ArtifactVerificationDecodeError,
  ArtifactVerificationRequestSchema,
} from "#contracts/artifact/spec";
import { verifyContentRendererCompatibility } from "#contracts/renderer/compatibility";

/** Authenticates one artifact and its exact renderer compatibility contract. */
export const verifySignedContentArtifact = Effect.fn(
  "AksaraContracts.verifySignedContentArtifact"
)((input: unknown) =>
  Schema.decodeUnknownEffect(ArtifactVerificationRequestSchema)(input, {
    onExcessProperty: "error",
  }).pipe(
    Effect.mapError(
      () =>
        new ArtifactVerificationDecodeError({
          message:
            "Artifact verification input does not satisfy its exact wire contract.",
        })
    ),
    Effect.flatMap((request) =>
      Effect.gen(function* () {
        const artifact = yield* verifySignedContentArtifactIntegrity(
          request.artifact
        );
        yield* verifyContentRendererCompatibility({
          payload: artifact.payload,
          rendererContractVersion: request.rendererContractVersion,
          rendererManifest: request.rendererManifest,
        });
        return artifact;
      })
    )
  )
);
