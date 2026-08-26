import { describe, expect, it } from "@effect/vitest";
import { Effect } from "effect";
import { CompiledContentPayloadSchema } from "#contracts/content";
import { verifyContentRendererCompatibility } from "#contracts/renderer/compatibility";
import { artifact, rendererManifest } from "#contracts/test/request";

/** Returns one live-renderer verification program for a payload override. */
function verify(
  payload: typeof artifact.payload = artifact.payload,
  rendererContractVersion = "1.0.0"
) {
  return verifyContentRendererCompatibility({
    payload,
    rendererContractVersion,
    rendererManifest,
  });
}

describe("renderer compatibility", () => {
  it.effect("accepts one published domain with every required component", () =>
    Effect.gen(function* () {
      const payload = CompiledContentPayloadSchema.make({
        ...artifact.payload,
        requiredComponents: [{ name: "BlockMath", version: 1 }],
      });
      expect(yield* verify(payload)).toEqual(rendererManifest);
    })
  );

  it.effect(
    "rejects unpublished, missing, unsupported, and global mismatches",
    () =>
      Effect.gen(function* () {
        const payloads = [
          CompiledContentPayloadSchema.make({
            ...artifact.payload,
            rendererDomain: "chemistry",
          }),
          CompiledContentPayloadSchema.make({
            ...artifact.payload,
            requiredComponents: [{ name: "Mermaid", version: 1 }],
          }),
          CompiledContentPayloadSchema.make({
            ...artifact.payload,
            requiredComponents: [{ name: "BlockMath", version: 2 }],
          }),
        ];
        const errors = yield* Effect.all([
          ...payloads.map((payload) => verify(payload).pipe(Effect.flip)),
          verify(artifact.payload, "2.0.0").pipe(Effect.flip),
        ]);
        expect(errors.map((error) => error._tag)).toEqual([
          "ArtifactRendererDomainUnpublishedError",
          "ArtifactRendererComponentMissingError",
          "ArtifactRendererVersionUnsupportedError",
          "RendererContractVersionMismatchError",
        ]);
      })
  );
});
