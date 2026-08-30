import { assert, beforeEach, describe, it } from "@effect/vitest";
import { Effect, Result } from "effect";
import { vi } from "vitest";
import {
  ProvenanceBundleVerifier,
  publisherPolicy,
  SigstoreProvenanceBundleVerifierLive,
} from "#scripts/provenance/bundle";
import type { PublisherIdentity } from "#scripts/provenance/schema";

const mocks = vi.hoisted(() => ({
  bundleFromJSON: vi.fn(),
  bundleToJSON: vi.fn(),
  verify: vi.fn(),
}));

vi.mock("@sigstore/bundle", () => ({
  bundleFromJSON: mocks.bundleFromJSON,
  bundleToJSON: mocks.bundleToJSON,
}));
vi.mock("sigstore", () => ({ verify: mocks.verify }));

const IDENTITY = {
  environment: "npm-production",
  ref: "refs/heads/main",
  repository: "https://github.com/nakafaai/aksara",
  sourceSha: "0123456789abcdef0123456789abcdef01234567",
  workflow: ".github/workflows/contracts.yml",
} satisfies PublisherIdentity;
const PAYLOAD = JSON.stringify({ authenticated: true });
const SERIALIZED = {
  dsseEnvelope: {
    payload: Buffer.from(PAYLOAD).toString("base64"),
  },
};

describe("Sigstore publisher identity", () => {
  beforeEach(() => {
    mocks.bundleFromJSON.mockImplementation((bundle) => bundle);
    mocks.bundleToJSON.mockImplementation((bundle) => bundle);
    mocks.verify.mockResolvedValue({});
  });

  it("pins every GitHub trusted-publisher certificate field", () => {
    assert.deepStrictEqual(publisherPolicy(IDENTITY), {
      certificateIdentityURI:
        "^https://github\\.com/nakafaai/aksara/\\.github/workflows/contracts\\.yml@refs/heads/main$",
      certificateIssuer: "https://token.actions.githubusercontent.com",
      certificateOIDs: {
        "1.3.6.1.4.1.57264.1.3": IDENTITY.sourceSha,
        "1.3.6.1.4.1.57264.1.5": "nakafaai/aksara",
        "1.3.6.1.4.1.57264.1.6": IDENTITY.ref,
        "1.3.6.1.4.1.57264.1.11": `${String.fromCharCode(12, 13)}github-hosted`,
        "1.3.6.1.4.1.57264.1.23": `${String.fromCharCode(12, 14)}npm-production`,
      },
    });
  });

  it.effect("verifies and decodes one certificate-bound bundle", () =>
    Effect.gen(function* () {
      mocks.bundleToJSON.mockReturnValue(SERIALIZED);
      const verifier = yield* ProvenanceBundleVerifier;
      const payload = yield* verifier.verify({ evidence: "signed" }, IDENTITY);

      assert.strictEqual(payload, PAYLOAD);
      assert.strictEqual(mocks.verify.mock.calls.length, 1);
      assert.deepStrictEqual(mocks.verify.mock.calls[0], [
        SERIALIZED,
        publisherPolicy(IDENTITY),
      ]);
    }).pipe(Effect.provide(SigstoreProvenanceBundleVerifierLive))
  );

  it.effect("rejects an invalid serialized bundle", () =>
    Effect.gen(function* () {
      mocks.bundleFromJSON.mockImplementation(() => {
        assert.fail("invalid");
      });
      const verifier = yield* ProvenanceBundleVerifier;
      const result = yield* verifier
        .verify({ evidence: "invalid" }, IDENTITY)
        .pipe(Effect.result);

      assert(Result.isFailure(result));
      assert.strictEqual(
        result.failure.message,
        "The npm audit returned an invalid Sigstore bundle."
      );
    }).pipe(Effect.provide(SigstoreProvenanceBundleVerifierLive))
  );

  it.effect("rejects a bundle without a signed payload", () =>
    Effect.gen(function* () {
      mocks.bundleToJSON.mockReturnValue({ mediaType: "bundle" });
      const verifier = yield* ProvenanceBundleVerifier;
      const result = yield* verifier
        .verify({ evidence: "unsigned" }, IDENTITY)
        .pipe(Effect.result);

      assert(Result.isFailure(result));
      assert.strictEqual(
        result.failure.message,
        "The npm provenance bundle has no signed DSSE payload."
      );
    }).pipe(Effect.provide(SigstoreProvenanceBundleVerifierLive))
  );

  it.effect("rejects a certificate outside the publisher policy", () =>
    Effect.gen(function* () {
      mocks.bundleToJSON.mockReturnValue(SERIALIZED);
      mocks.verify.mockRejectedValue(new Error("wrong identity"));
      const verifier = yield* ProvenanceBundleVerifier;
      const result = yield* verifier
        .verify({ evidence: "wrong signer" }, IDENTITY)
        .pipe(Effect.result);

      assert(Result.isFailure(result));
      assert.strictEqual(
        result.failure.message,
        "The npm provenance signer does not match the trusted publisher."
      );
    }).pipe(Effect.provide(SigstoreProvenanceBundleVerifierLive))
  );
});
