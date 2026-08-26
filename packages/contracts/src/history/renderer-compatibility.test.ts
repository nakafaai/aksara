import { describe, expect, it } from "@effect/vitest";
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
  return verifyHistoricalRendererCompatibility({
    manifest,
    payload: historicalArtifact.payload,
  }).pipe(Effect.flip);
}

describe("retained renderer compatibility", () => {
  it.effect("accepts every component required by the old signed payload", () =>
    Effect.gen(function* () {
      expect(
        yield* verifyHistoricalRendererCompatibility({
          manifest: historicalRenderer,
          payload: historicalArtifact.payload,
        })
      ).toBeUndefined();
    })
  );

  it.effect(
    "rejects unpublished, missing, and unsupported renderer capabilities",
    () =>
      Effect.gen(function* () {
        const [unpublished, missing, unsupported] = yield* Effect.all([
          rejectCompatibility(historicalUnpublishedRenderer),
          rejectCompatibility(historicalMissingRenderer),
          rejectCompatibility(historicalUnsupportedRenderer),
        ]);

        expect(unpublished._tag).toBe("StoredRendererDomainUnpublishedError");
        expect(missing._tag).toBe("StoredRendererComponentMissingError");
        expect(unsupported._tag).toBe("StoredRendererVersionUnsupportedError");
      })
  );

  it.effect(
    "rejects a structural renderer missing its published domain registry",
    () =>
      Effect.gen(function* () {
        const error = yield* rejectCompatibility({
          ...historicalRenderer,
          domains: historicalRenderer.domains.filter(
            ({ name }) => name !== "snbt-general"
          ),
        });

        expect(error._tag).toBe("StoredRendererDomainUnpublishedError");
      })
  );
});
