import { describe, expect, it } from "@nakafa/testing/effect";
import { Effect } from "effect";

import { verifyHistoricalRendererCompatibility } from "#contracts/history/renderer-compatibility";
import {
  historicalArtifact,
  historicalMissingRenderer,
  historicalRenderer,
  historicalUnpublishedRenderer,
  historicalUnsupportedRenderer,
} from "#contracts/test/history-runtime";

/** Returns one expected retained renderer compatibility failure. */
function rejectCompatibility(
  manifest: Parameters<
    typeof verifyHistoricalRendererCompatibility
  >[0]["manifest"]
) {
  return Effect.runPromise(
    verifyHistoricalRendererCompatibility({
      manifest,
      payload: historicalArtifact.payload,
    }).pipe(Effect.flip)
  );
}

describe("retained renderer compatibility", () => {
  it("accepts every component required by the old signed payload", async () => {
    await expect(
      Effect.runPromise(
        verifyHistoricalRendererCompatibility({
          manifest: historicalRenderer,
          payload: historicalArtifact.payload,
        })
      )
    ).resolves.toBeUndefined();
  });

  it("rejects unpublished, missing, and unsupported renderer capabilities", async () => {
    const [unpublished, missing, unsupported] = await Promise.all([
      rejectCompatibility(historicalUnpublishedRenderer),
      rejectCompatibility(historicalMissingRenderer),
      rejectCompatibility(historicalUnsupportedRenderer),
    ]);

    expect(unpublished._tag).toBe("StoredRendererDomainUnpublishedError");
    expect(missing._tag).toBe("StoredRendererComponentMissingError");
    expect(unsupported._tag).toBe("StoredRendererVersionUnsupportedError");
  });

  it("rejects a structural renderer missing its published domain registry", async () => {
    const error = await rejectCompatibility({
      ...historicalRenderer,
      domains: historicalRenderer.domains.filter(
        ({ name }) => name !== "snbt-general"
      ),
    });

    expect(error._tag).toBe("StoredRendererDomainUnpublishedError");
  });
});
