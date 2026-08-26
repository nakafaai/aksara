// @vitest-environment node

import { describe, expect, it } from "@effect/vitest";
import { Effect, Exit, Schema } from "effect";
import { vi } from "vitest";

import {
  authenticateHistoricalArtifact,
  canonicalizeHistoricalContentPayload,
} from "#contracts/history/artifact";
import {
  HISTORICAL_ARTIFACT_LIMITS,
  HistoricalCompiledContentPayloadSchema,
  HistoricalSignedContentArtifactSchema,
} from "#contracts/history/artifact-spec";
import { HistoricalSha256HashSchema } from "#contracts/history/primitives";
import { ContentVerificationKeyResolver } from "#contracts/signature/spec";
import {
  createHistoricalArtifact,
  historicalArtifact,
  historicalResolver,
} from "#contracts/test/history-runtime";
import { tamperSignature } from "#contracts/test/runtime/fixture";
import { protectedArtifact } from "#contracts/test/runtime/protected";

const otherHash = HistoricalSha256HashSchema.make(`sha256:${"f".repeat(64)}`);

/** Reads the field owned by one expected payload byte-limit failure. */
function errorField(error: unknown) {
  return Schema.decodeUnknownSync(Schema.Struct({ field: Schema.String }))(
    error
  ).field;
}

/** Authenticates one old artifact with the fixture trust source. */
function authenticate(input: unknown) {
  return authenticateHistoricalArtifact(input).pipe(
    Effect.provideService(ContentVerificationKeyResolver, historicalResolver)
  );
}

/** Returns one expected old artifact authentication failure. */
function reject(input: unknown) {
  return authenticateHistoricalArtifact(input).pipe(
    Effect.provideService(ContentVerificationKeyResolver, historicalResolver),
    Effect.flip
  );
}

describe("retained signed artifact authentication", () => {
  it.effect(
    "authenticates exact old canonical payload and signature bytes",
    () =>
      Effect.gen(function* () {
        expect(
          JSON.parse(
            canonicalizeHistoricalContentPayload(historicalArtifact.payload)
          )
        ).toEqual(historicalArtifact.payload);
        expect(yield* authenticate(historicalArtifact)).toEqual(
          historicalArtifact
        );
      })
  );

  it.effect(
    "rejects current, excess, noncanonical, and repeated requirement shapes",
    () =>
      Effect.gen(function* () {
        const current = yield* reject(protectedArtifact);
        const excess = yield* reject({
          ...historicalArtifact,
          unexpected: true,
        });
        const reversed = Schema.decodeExit(
          HistoricalCompiledContentPayloadSchema
        )({
          ...historicalArtifact.payload,
          requiredComponents: [
            { name: "InlineMath", version: 1 },
            { name: "BlockMath", version: 1 },
          ],
        });
        const repeated = Schema.decodeExit(
          HistoricalCompiledContentPayloadSchema
        )({
          ...historicalArtifact.payload,
          requiredComponents: [
            { name: "BlockMath", version: 1 },
            { name: "BlockMath", version: 2 },
          ],
        });

        expect(current._tag).toBe("StoredArtifactDecodeError");
        expect(excess._tag).toBe("StoredArtifactDecodeError");
        expect(Exit.isFailure(reversed)).toBe(true);
        expect(Exit.isFailure(repeated)).toBe(true);
        expect(
          Exit.isFailure(reversed) ? String(reversed.cause) : ""
        ).toContain("Stored renderer requirements are not canonical.");
      })
  );

  it.effect(
    "rejects changed payload identity, signature, and source bytes",
    () =>
      Effect.gen(function* () {
        const hashError = yield* reject({
          ...historicalArtifact,
          artifactHash: otherHash,
        });
        const signatureError = yield* reject({
          ...historicalArtifact,
          signature: tamperSignature(historicalArtifact.signature),
        });
        const sourceError = yield* reject(
          createHistoricalArtifact({ sourceHash: otherHash })
        );

        expect(hashError._tag).toBe("StoredArtifactHashMismatchError");
        expect(signatureError._tag).toBe("SignatureInvalidError");
        expect(sourceError._tag).toBe("StoredArtifactSourceHashMismatchError");
      })
  );

  it.effect(
    "maps payload and source hashing failures through typed errors",
    () =>
      Effect.gen(function* () {
        const firstDigest = yield* Effect.tryPromise(() =>
          crypto.subtle.digest(
            "SHA-256",
            new TextEncoder().encode(
              canonicalizeHistoricalContentPayload(historicalArtifact.payload)
            )
          )
        );
        const digest = yield* Effect.acquireRelease(
          Effect.sync(() =>
            vi
              .spyOn(crypto.subtle, "digest")
              .mockRejectedValueOnce(
                new TypeError("injected payload hash failure")
              )
          ),
          (mock) => Effect.sync(() => mock.mockRestore())
        );
        const payloadError = yield* reject(historicalArtifact);
        yield* Effect.sync(() => {
          digest
            .mockResolvedValueOnce(firstDigest)
            .mockRejectedValueOnce(
              new TypeError("injected source hash failure")
            );
        });
        const sourceError = yield* reject(historicalArtifact);

        expect(payloadError._tag).toBe("StoredArtifactHashComputeError");
        expect(sourceError._tag).toBe("StoredArtifactSourceHashComputeError");
      })
  );

  it.effect(
    "enforces declared compiled bytes and every established field ceiling",
    () =>
      Effect.gen(function* () {
        const byteLength = yield* reject(
          createHistoricalArtifact({ byteLength: 1 })
        );
        const rawMdx = yield* reject(
          createHistoricalArtifact({
            rawMdx: "x".repeat(HISTORICAL_ARTIFACT_LIMITS.rawMdx + 1),
          })
        );
        const compiledCode = yield* reject(
          createHistoricalArtifact({
            compiledCode: "x".repeat(
              HISTORICAL_ARTIFACT_LIMITS.compiledCode + 1
            ),
          })
        );
        const plainText = yield* reject(
          createHistoricalArtifact({
            plainText: "x".repeat(HISTORICAL_ARTIFACT_LIMITS.plainText + 1),
          })
        );
        const canonicalPayload = yield* reject(
          createHistoricalArtifact({
            compiledCode: "c".repeat(230 * 1024),
            plainText: "p".repeat(105 * 1024),
            rawMdx: "r".repeat(120 * 1024),
          })
        );
        const wire = yield* reject(
          createHistoricalArtifact({
            compiledCode: "x".repeat(HISTORICAL_ARTIFACT_LIMITS.signedArtifact),
          })
        );

        expect(byteLength._tag).toBe(
          "StoredArtifactCompiledByteLengthMismatchError"
        );
        expect([rawMdx, compiledCode, plainText].map(errorField)).toEqual([
          "rawMdx",
          "compiledCode",
          "plainText",
        ]);
        expect(canonicalPayload).toMatchObject({
          _tag: "StoredArtifactFieldByteLimitError",
          field: "canonicalPayload",
        });
        expect(wire._tag).toBe("StoredArtifactWireByteLimitError");
      })
  );

  it("strictly decodes its own complete old artifact schema", () => {
    expect(
      Exit.isSuccess(
        Schema.decodeExit(HistoricalSignedContentArtifactSchema)(
          historicalArtifact,
          { onExcessProperty: "error" }
        )
      )
    ).toBe(true);
  });
});
