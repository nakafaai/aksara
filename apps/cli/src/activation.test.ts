import { beforeEach, describe, expect, it } from "@effect/vitest";
import { Sha256HashSchema } from "@nakafa/aksara-contracts/ids";
import type { RendererManifestEnvelope } from "@nakafa/aksara-contracts/renderer/contract";
import { createRendererManifest } from "@nakafa/aksara-contracts/renderer/manifest";
import { Effect, Redacted } from "effect";
import { HttpClient } from "effect/unstable/http";
import { makeProductionActivation } from "#cli/activation";
import { captureClient } from "#test/http";
import { RENDERER_MANIFEST } from "#test/real";
import { RETAINED_LIVE_INPUT, retainedBundle } from "#test/retained";
import { gitBundle } from "#test/target";

const calls = vi.hoisted(() => ({
  endpoint: "",
  fetches: 0,
  renderer: undefined as RendererManifestEnvelope | undefined,
  token: "",
}));
const BUNDLE = gitBundle("release-next");

vi.mock("#cli/production/renderer", async (importOriginal) => {
  const original =
    await importOriginal<typeof import("#cli/production/renderer")>();
  const { Effect: TestEffect, Redacted: TestRedacted } = await import("effect");
  return {
    ...original,
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
const makeActivation = makeProductionActivation({
  endpoint: new URL("https://www.example.test/api/internal/content/renderer"),
  token: Redacted.make("renderer-token"),
}).pipe(
  Effect.provideService(
    HttpClient.HttpClient,
    captureClient(() => Effect.die("Unexpected cache request.")).client
  )
);

beforeEach(() => {
  calls.endpoint = "";
  calls.fetches = 0;
  calls.renderer = RENDERER_MANIFEST;
  calls.token = "";
});

describe("production activation", () => {
  it.effect(
    "fetches and validates the live renderer immediately before commit",
    () =>
      Effect.gen(function* () {
        const activation = yield* makeActivation;
        expect(yield* activation.verify(BUNDLE, "exact")).toBeUndefined();
        expect(calls).toMatchObject({
          endpoint: "https://www.example.test/api/internal/content/renderer",
          fetches: 1,
          token: "renderer-token",
        });
      })
  );

  it.effect("accepts a compatible additive renderer deployment", () =>
    Effect.gen(function* () {
      const activation = yield* makeActivation;
      const base = [...RENDERER_MANIFEST.base, "RuntimePairProbe"];
      calls.renderer = yield* createRendererManifest({
        base,
        domains: RENDERER_MANIFEST.domains,
        publishedDomains: RENDERER_MANIFEST.publishedDomains,
      });

      expect(yield* activation.verify(BUNDLE, "compatible")).toBeUndefined();
      expect(calls.fetches).toBe(1);
    })
  );

  it.effect("rejects renderer drift for an exact adoption preflight", () =>
    Effect.gen(function* () {
      const activation = yield* makeActivation;
      const base = [...RENDERER_MANIFEST.base, "RuntimePairProbe"];
      calls.renderer = yield* createRendererManifest({
        base,
        domains: RENDERER_MANIFEST.domains,
        publishedDomains: RENDERER_MANIFEST.publishedDomains,
      });

      expect(
        yield* Effect.flip(activation.verify(BUNDLE, "exact"))
      ).toMatchObject({
        _tag: "PublicationActivationError",
        phase: "preflight",
        releaseId: "release-next",
      });
      expect(calls.fetches).toBe(1);
    })
  );

  it.effect("fails closed without exposing incompatibility details", () =>
    Effect.gen(function* () {
      const activation = yield* makeActivation;
      calls.renderer = {
        ...RENDERER_MANIFEST,
        base: RENDERER_MANIFEST.base.slice(1),
        hash: Sha256HashSchema.make(`sha256:${"f".repeat(64)}`),
      };

      expect(
        yield* Effect.flip(activation.verify(BUNDLE, "compatible"))
      ).toMatchObject({
        _tag: "PublicationActivationError",
        phase: "preflight",
        releaseId: "release-next",
      });
      expect(calls.fetches).toBe(1);
    })
  );

  it.effect(
    "accepts a retained renderer whose names the live renderer still executes",
    () =>
      Effect.gen(function* () {
        const activation = yield* makeActivation;
        expect(
          yield* activation.verify(retainedBundle(BUNDLE.release), "compatible")
        ).toBeUndefined();
        expect(calls.fetches).toBe(1);
      })
  );

  it.effect(
    "rejects retained base components the live renderer cannot execute",
    () =>
      Effect.gen(function* () {
        const activation = yield* makeActivation;
        const unsupportedName = retainedBundle(BUNDLE.release, {
          ...RETAINED_LIVE_INPUT,
          base: [
            ...RETAINED_LIVE_INPUT.base,
            { name: "RetiredWidget", version: 1 },
          ],
        });
        const unsupportedVersion = retainedBundle(BUNDLE.release, {
          ...RETAINED_LIVE_INPUT,
          base: [
            ...RETAINED_LIVE_INPUT.base,
            { name: "RetiredWidget", version: 2 },
          ],
        });
        // A name that survives only inside a live domain registry is not a base.
        const domainOnly = retainedBundle(BUNDLE.release, {
          ...RETAINED_LIVE_INPUT,
          base: [
            { name: "AtomShellLab", version: 1 },
            ...RETAINED_LIVE_INPUT.base,
          ],
          domains: RETAINED_LIVE_INPUT.domains.map((domain) =>
            domain.name === "chemistry"
              ? { ...domain, supportedComponents: [] }
              : domain
          ),
        });
        const [nameError, versionError, domainOnlyError] = yield* Effect.all([
          Effect.flip(activation.verify(unsupportedName, "compatible")),
          Effect.flip(activation.verify(unsupportedVersion, "compatible")),
          Effect.flip(activation.verify(domainOnly, "compatible")),
        ]);
        expect(nameError).toMatchObject({
          _tag: "PublicationActivationError",
          phase: "preflight",
          releaseId: "release-next",
        });
        expect(versionError).toMatchObject({
          _tag: "PublicationActivationError",
          phase: "preflight",
          releaseId: "release-next",
        });
        expect(domainOnlyError).toMatchObject({
          _tag: "PublicationActivationError",
          phase: "preflight",
          releaseId: "release-next",
        });
      })
  );

  it.effect(
    "rejects a retained published domain the live renderer does not serve",
    () =>
      Effect.gen(function* () {
        const activation = yield* makeActivation;
        calls.renderer = {
          ...RENDERER_MANIFEST,
          publishedDomains: [],
        };
        expect(
          yield* Effect.flip(
            activation.verify(retainedBundle(BUNDLE.release), "compatible")
          )
        ).toMatchObject({
          _tag: "PublicationActivationError",
          phase: "preflight",
          releaseId: "release-next",
        });
      })
  );

  it.effect(
    "rejects retained domain components the live renderer cannot execute",
    () =>
      Effect.gen(function* () {
        const activation = yield* makeActivation;
        const withRetired = retainedBundle(BUNDLE.release, {
          ...RETAINED_LIVE_INPUT,
          domains: RETAINED_LIVE_INPUT.domains.map((domain) =>
            domain.name === "mathematics"
              ? {
                  ...domain,
                  supportedComponents: [
                    ...domain.supportedComponents,
                    { name: "RetiredWidget", version: 1 },
                  ],
                }
              : domain
          ),
        });
        const withFutureVersion = retainedBundle(BUNDLE.release, {
          ...RETAINED_LIVE_INPUT,
          domains: RETAINED_LIVE_INPUT.domains.map((domain) =>
            domain.name === "mathematics"
              ? {
                  ...domain,
                  supportedComponents: [
                    { name: "FunctionMachine", version: 2 },
                  ],
                }
              : domain
          ),
        });
        const [nameError, versionError] = yield* Effect.all([
          Effect.flip(activation.verify(withRetired, "compatible")),
          Effect.flip(activation.verify(withFutureVersion, "compatible")),
        ]);
        expect(nameError).toMatchObject({
          _tag: "PublicationActivationError",
          phase: "preflight",
          releaseId: "release-next",
        });
        expect(versionError).toMatchObject({
          _tag: "PublicationActivationError",
          phase: "preflight",
          releaseId: "release-next",
        });
      })
  );
});
