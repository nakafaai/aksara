import type { BinaryLike } from "node:crypto";
import { afterEach, describe, expect, it } from "@effect/vitest";
import { Array as Arr, Effect, Schema } from "effect";
import { Sha256HashSchema } from "#contracts/ids";
import {
  canonicalizePreviewRendererAuth,
  computePreviewRendererProof,
  PREVIEW_RENDERER_AUTH_FORMAT,
  PreviewRendererNonceSchema,
  PreviewRendererResponseSchema,
  PreviewRendererSecretSchema,
  verifyPreviewRendererProof,
} from "#contracts/preview/auth";
import { rendererManifest } from "#contracts/test/request";
import { encodeJsonText } from "#contracts/text/json";

const failures = vi.hoisted(() => ({ hmac: false }));

vi.mock("node:crypto", async (importOriginal) => {
  const crypto = await importOriginal<typeof import("node:crypto")>();
  return {
    ...crypto,
    /** Injects one deterministic failure into renderer HMAC computation. */
    createHmac(algorithm: string, key: BinaryLike) {
      const hmac = crypto.createHmac(algorithm, key);
      return new Proxy(hmac, {
        /** Preserves native binding while intercepting the explicit test state. */
        get(target, property) {
          if (property === "update" && failures.hmac) {
            return (_data: BinaryLike) => {
              throw new TypeError("injected renderer HMAC failure");
            };
          }
          const value = Reflect.get(target, property, target);
          return typeof value === "function" ? value.bind(target) : value;
        },
      });
    },
  };
});

const nonce = PreviewRendererNonceSchema.make("n".repeat(43));
const secret = PreviewRendererSecretSchema.make("s".repeat(43));
const foreignSecret = PreviewRendererSecretSchema.make("x".repeat(43));
const manifest = rendererManifest;

afterEach(() => {
  failures.hmac = false;
});

describe("preview renderer authentication", () => {
  it.effect(
    "authenticates one validated renderer and exact fresh challenge",
    () =>
      Effect.gen(function* () {
        const proof = yield* computePreviewRendererProof({
          manifestHash: manifest.hash,
          nonce,
          secret,
        });
        const response = yield* Schema.decodeEffect(
          PreviewRendererResponseSchema
        )({
          format: PREVIEW_RENDERER_AUTH_FORMAT,
          manifest,
          proof,
        });

        yield* verifyPreviewRendererProof({
          manifestHash: response.manifest.hash,
          nonce,
          proof: response.proof,
          secret,
        });
        expect(
          canonicalizePreviewRendererAuth({
            manifestHash: manifest.hash,
            nonce,
          })
        ).toBe(
          encodeJsonText([PREVIEW_RENDERER_AUTH_FORMAT, nonce, manifest.hash])
        );
      })
  );

  it.effect(
    "rejects a wrong key, replayed nonce, and modified manifest identity",
    () =>
      Effect.gen(function* () {
        const proof = yield* computePreviewRendererProof({
          manifestHash: manifest.hash,
          nonce,
          secret,
        });
        const inputs = [
          {
            manifestHash: manifest.hash,
            nonce,
            proof,
            secret: foreignSecret,
          },
          {
            manifestHash: manifest.hash,
            nonce: PreviewRendererNonceSchema.make("r".repeat(43)),
            proof,
            secret,
          },
          {
            manifestHash: Sha256HashSchema.make(`sha256:${"f".repeat(64)}`),
            nonce,
            proof,
            secret,
          },
        ];
        const errors = yield* Effect.forEach(inputs, (input) =>
          verifyPreviewRendererProof(input).pipe(Effect.flip)
        );

        expect(errors).toEqual(
          Arr.map(inputs, () => expect.objectContaining({ reason: "invalid" }))
        );
      })
  );

  it.effect("maps Node HMAC failures into the typed authentication error", () =>
    Effect.gen(function* () {
      failures.hmac = true;
      const error = yield* computePreviewRendererProof({
        manifestHash: manifest.hash,
        nonce,
        secret,
      }).pipe(Effect.flip);

      expect(error).toMatchObject({
        _tag: "PreviewRendererAuthError",
        reason: "compute",
      });
    })
  );
});

describe("pinned preview renderer proof bytes", () => {
  const pinnedManifestHash = Sha256HashSchema.make(
    "sha256:6ab191841c3ad581530d7952266f08913d9f0934cc01c49c04d74a0fd1c0577d"
  );
  const pinnedNonce = PreviewRendererNonceSchema.make("n".repeat(43));
  const pinnedSecret = PreviewRendererSecretSchema.make("s".repeat(43));

  it("pins the canonical challenge text for one renderer identity", () => {
    expect(
      canonicalizePreviewRendererAuth({
        manifestHash: pinnedManifestHash,
        nonce: pinnedNonce,
      })
    ).toBe(
      '["aksara-renderer-auth-v1","nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn","sha256:6ab191841c3ad581530d7952266f08913d9f0934cc01c49c04d74a0fd1c0577d"]'
    );
  });

  it.effect(
    "pins the HMAC proof for the pinned secret, nonce, and renderer",
    () =>
      Effect.gen(function* () {
        expect(
          yield* computePreviewRendererProof({
            manifestHash: pinnedManifestHash,
            nonce: pinnedNonce,
            secret: pinnedSecret,
          })
        ).toBe("UeXg9QmjcCzuGWkcMaGW3Eyqim_B1uVGjju5H4L1bQk");
      })
  );

  it.effect(
    "verifies the pinned proof and rejects one changed proof character",
    () =>
      Effect.gen(function* () {
        expect(
          yield* verifyPreviewRendererProof({
            manifestHash: pinnedManifestHash,
            nonce: pinnedNonce,
            proof: "UeXg9QmjcCzuGWkcMaGW3Eyqim_B1uVGjju5H4L1bQk",
            secret: pinnedSecret,
          })
        ).toBeUndefined();
        const error = yield* verifyPreviewRendererProof({
          manifestHash: pinnedManifestHash,
          nonce: pinnedNonce,
          proof: "VeXg9QmjcCzuGWkcMaGW3Eyqim_B1uVGjju5H4L1bQk",
          secret: pinnedSecret,
        }).pipe(Effect.flip);

        expect(error).toMatchObject({
          _tag: "PreviewRendererAuthError",
          reason: "invalid",
        });
      })
  );
});
