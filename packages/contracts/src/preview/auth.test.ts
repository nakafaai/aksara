import type { BinaryLike } from "node:crypto";
import { afterEach, describe, expect, it } from "@nakafa/testing/effect";
import { Effect, Schema } from "effect";
import { vi } from "vitest";
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
  it("authenticates one validated renderer and exact fresh challenge", async () => {
    const proof = await Effect.runPromise(
      computePreviewRendererProof({
        manifestHash: manifest.hash,
        nonce,
        secret,
      })
    );
    const response = Schema.decodeSync(PreviewRendererResponseSchema)({
      format: PREVIEW_RENDERER_AUTH_FORMAT,
      manifest,
      proof,
    });

    await expect(
      Effect.runPromise(
        verifyPreviewRendererProof({
          manifestHash: response.manifest.hash,
          nonce,
          proof: response.proof,
          secret,
        })
      )
    ).resolves.toBeUndefined();
    expect(
      canonicalizePreviewRendererAuth({
        manifestHash: manifest.hash,
        nonce,
      })
    ).toBe(
      JSON.stringify([PREVIEW_RENDERER_AUTH_FORMAT, nonce, manifest.hash])
    );
  });

  it("rejects a wrong key, replayed nonce, and modified manifest identity", async () => {
    const proof = await Effect.runPromise(
      computePreviewRendererProof({
        manifestHash: manifest.hash,
        nonce,
        secret,
      })
    );
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
    const errors = await Promise.all(
      inputs.map((input) =>
        Effect.runPromise(verifyPreviewRendererProof(input).pipe(Effect.flip))
      )
    );

    expect(errors).toEqual(
      inputs.map(() => expect.objectContaining({ reason: "invalid" }))
    );
  });

  it("maps Node HMAC failures into the typed authentication error", async () => {
    failures.hmac = true;
    const error = await Effect.runPromise(
      computePreviewRendererProof({
        manifestHash: manifest.hash,
        nonce,
        secret,
      }).pipe(Effect.flip)
    );

    expect(error).toMatchObject({
      _tag: "PreviewRendererAuthError",
      reason: "compute",
    });
  });
});
