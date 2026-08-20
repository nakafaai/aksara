import { describe, expect, it } from "@nakafa/testing/effect";
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
  it("accepts one published domain with every required component", async () => {
    const payload = CompiledContentPayloadSchema.make({
      ...artifact.payload,
      requiredComponents: [{ name: "BlockMath", version: 1 }],
    });
    await expect(Effect.runPromise(verify(payload))).resolves.toEqual(
      rendererManifest
    );
  });

  it("rejects unpublished, missing, unsupported, and global mismatches", async () => {
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
    const errors = await Promise.all([
      ...payloads.map((payload) =>
        Effect.runPromise(verify(payload).pipe(Effect.flip))
      ),
      Effect.runPromise(verify(artifact.payload, "2.0.0").pipe(Effect.flip)),
    ]);
    expect(errors.map((error) => error._tag)).toEqual([
      "ArtifactRendererDomainUnpublishedError",
      "ArtifactRendererComponentMissingError",
      "ArtifactRendererVersionUnsupportedError",
      "RendererContractVersionMismatchError",
    ]);
  });
});
