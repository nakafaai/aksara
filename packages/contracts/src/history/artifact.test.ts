// @vitest-environment node
import { Effect, Either, Schema } from "effect";
import { describe, expect, it, vi } from "vitest";

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
  return Effect.runPromise(
    authenticateHistoricalArtifact(input).pipe(
      Effect.provideService(ContentVerificationKeyResolver, historicalResolver)
    )
  );
}

/** Returns one expected old artifact authentication failure. */
function reject(input: unknown) {
  return Effect.runPromise(
    authenticateHistoricalArtifact(input).pipe(
      Effect.provideService(ContentVerificationKeyResolver, historicalResolver),
      Effect.flip
    )
  );
}

describe("retained signed artifact authentication", () => {
  it("authenticates exact old canonical payload and signature bytes", async () => {
    expect(
      JSON.parse(
        canonicalizeHistoricalContentPayload(historicalArtifact.payload)
      )
    ).toEqual(historicalArtifact.payload);
    await expect(authenticate(historicalArtifact)).resolves.toEqual(
      historicalArtifact
    );
  });

  it("rejects current, excess, noncanonical, and repeated requirement shapes", async () => {
    const current = await reject(protectedArtifact);
    const excess = await reject({ ...historicalArtifact, unexpected: true });
    const reversed = Schema.decodeUnknownEither(
      HistoricalCompiledContentPayloadSchema
    )({
      ...historicalArtifact.payload,
      requiredComponents: [
        { name: "InlineMath", version: 1 },
        { name: "BlockMath", version: 1 },
      ],
    });
    const repeated = Schema.decodeUnknownEither(
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
    expect(Either.isLeft(reversed)).toBe(true);
    expect(Either.isLeft(repeated)).toBe(true);
    expect(Either.isLeft(reversed) ? String(reversed.left) : "").toContain(
      "Stored renderer requirements are not canonical."
    );
  });

  it("rejects changed payload identity, signature, and source bytes", async () => {
    const hashError = await reject({
      ...historicalArtifact,
      artifactHash: otherHash,
    });
    const signatureError = await reject({
      ...historicalArtifact,
      signature: tamperSignature(historicalArtifact.signature),
    });
    const sourceError = await reject(
      createHistoricalArtifact({ sourceHash: otherHash })
    );

    expect(hashError._tag).toBe("StoredArtifactHashMismatchError");
    expect(signatureError._tag).toBe("SignatureInvalidError");
    expect(sourceError._tag).toBe("StoredArtifactSourceHashMismatchError");
  });

  it("maps payload and source hashing failures through typed errors", async () => {
    const firstDigest = await crypto.subtle.digest(
      "SHA-256",
      new TextEncoder().encode(
        canonicalizeHistoricalContentPayload(historicalArtifact.payload)
      )
    );
    const digest = vi
      .spyOn(crypto.subtle, "digest")
      .mockRejectedValueOnce(new TypeError("injected payload hash failure"));
    const payloadError = await reject(historicalArtifact);
    digest
      .mockResolvedValueOnce(firstDigest)
      .mockRejectedValueOnce(new TypeError("injected source hash failure"));
    const sourceError = await reject(historicalArtifact);
    digest.mockRestore();

    expect(payloadError._tag).toBe("StoredArtifactHashComputeError");
    expect(sourceError._tag).toBe("StoredArtifactSourceHashComputeError");
  });

  it("enforces declared compiled bytes and every established field ceiling", async () => {
    const byteLength = await reject(
      createHistoricalArtifact({ byteLength: 1 })
    );
    const rawMdx = await reject(
      createHistoricalArtifact({
        rawMdx: "x".repeat(HISTORICAL_ARTIFACT_LIMITS.rawMdx + 1),
      })
    );
    const compiledCode = await reject(
      createHistoricalArtifact({
        compiledCode: "x".repeat(HISTORICAL_ARTIFACT_LIMITS.compiledCode + 1),
      })
    );
    const plainText = await reject(
      createHistoricalArtifact({
        plainText: "x".repeat(HISTORICAL_ARTIFACT_LIMITS.plainText + 1),
      })
    );
    const canonicalPayload = await reject(
      createHistoricalArtifact({
        compiledCode: "c".repeat(230 * 1024),
        plainText: "p".repeat(105 * 1024),
        rawMdx: "r".repeat(120 * 1024),
      })
    );
    const wire = await reject(
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
  });

  it("strictly decodes its own complete old artifact schema", () => {
    expect(
      Either.isRight(
        Schema.decodeUnknownEither(HistoricalSignedContentArtifactSchema)(
          historicalArtifact,
          { onExcessProperty: "error" }
        )
      )
    ).toBe(true);
  });
});
