import { describe, expect, it } from "@effect/vitest";
import { Effect, Schema } from "effect";
import { PublicationRequestSchema } from "#contracts/adoption/transport";
import { newRollbackBundle, oldRollbackBundle } from "#contracts/test/adoption";

/** Mirrors the strict publication request body the publisher writes. */
function encodeRequest(release: unknown) {
  return Schema.decodeUnknownEffect(PublicationRequestSchema)({
    operation: "activateRecovery",
    release,
  }).pipe(
    Effect.flatMap(
      Schema.encodeEffect(Schema.fromJsonString(PublicationRequestSchema), {
        onExcessProperty: "error",
      })
    )
  );
}

describe("adoption publication transport", () => {
  it.effect("encodes current and retained recovery inverses", () =>
    Effect.gen(function* () {
      for (const bundle of [newRollbackBundle, oldRollbackBundle]) {
        const body = yield* encodeRequest(bundle.release);
        expect(JSON.parse(body)).toMatchObject({
          operation: "activateRecovery",
          release: {
            manifest: { releaseId: bundle.release.manifest.releaseId },
          },
        });
      }
    })
  );
});
