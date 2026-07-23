import { HttpClient } from "@effect/platform";
import { Sha256HashSchema } from "@nakafa/aksara-contracts/ids";
import type { RendererManifestEnvelope } from "@nakafa/aksara-contracts/renderer/contract";
import { Effect, Redacted } from "effect";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { makeProductionActivation } from "#cli/activation";
import { captureClient } from "#test/http";
import { RENDERER_MANIFEST } from "#test/real";
import { gitBundle } from "#test/target";

const calls = vi.hoisted(() => ({
  endpoint: "",
  fetches: 0,
  renderer: undefined as RendererManifestEnvelope | undefined,
  token: "",
}));

vi.mock("#cli/production-renderer", async () => {
  const { Effect: TestEffect, Redacted: TestRedacted } = await import("effect");
  return {
    fetchProductionRenderer: (
      endpoint: URL,
      token: Redacted.Redacted<string>
    ) => {
      calls.endpoint = endpoint.href;
      calls.fetches += 1;
      calls.token = TestRedacted.value(token);
      return calls.renderer === undefined
        ? TestEffect.die("Missing test renderer.")
        : TestEffect.succeed(calls.renderer);
    },
  };
});

/** Creates one activation service through its captured HTTP boundary. */
function makeActivation() {
  const client = captureClient(() => Effect.die("Unexpected HTTP request."));
  return Effect.runPromise(
    makeProductionActivation({
      endpoint: new URL("https://www.example.test/renderer"),
      token: Redacted.make("renderer-token"),
    }).pipe(Effect.provideService(HttpClient.HttpClient, client.client))
  );
}

beforeEach(() => {
  calls.endpoint = "";
  calls.fetches = 0;
  calls.renderer = RENDERER_MANIFEST;
  calls.token = "";
});

describe("production activation", () => {
  it("fetches and validates the live renderer immediately before commit", async () => {
    const activation = await makeActivation();
    await expect(
      Effect.runPromise(activation.verify(gitBundle("release-next").release))
    ).resolves.toBeUndefined();
    expect(calls).toMatchObject({
      endpoint: "https://www.example.test/renderer",
      fetches: 1,
      token: "renderer-token",
    });
  });

  it("fails closed without exposing renderer mismatch details", async () => {
    const activation = await makeActivation();
    calls.renderer = {
      ...RENDERER_MANIFEST,
      hash: Sha256HashSchema.make(`sha256:${"f".repeat(64)}`),
    };
    await expect(
      Effect.runPromise(
        activation.verify(gitBundle("release-next").release).pipe(Effect.flip)
      )
    ).resolves.toMatchObject({
      _tag: "PublicationActivationError",
      releaseId: "release-next",
    });
    expect(calls.fetches).toBe(1);
  });
});
