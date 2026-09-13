import { describe, expect, it } from "@effect/vitest";
import { Effect } from "effect";
import { CompiledContentPayloadSchema } from "#contracts/content";
import {
  verifyContentRendererCompatibility,
  verifyRendererManifestCompatibility,
} from "#contracts/renderer/compatibility";
import { createRendererManifest } from "#contracts/renderer/manifest";
import { testRendererDomains } from "#contracts/test/renderer";
import { artifact, rendererManifest } from "#contracts/test/request";

/** Returns one live-renderer verification program for a payload override. */
function verify(payload: typeof artifact.payload = artifact.payload) {
  return verifyContentRendererCompatibility({
    payload,

    rendererManifest,
  });
}

describe("renderer compatibility", () => {
  it.effect("accepts one published domain with every required component", () =>
    Effect.gen(function* () {
      const payload = CompiledContentPayloadSchema.make({
        ...artifact.payload,
        requiredComponents: ["BlockMath"],
      });
      expect(yield* verify(payload)).toEqual(rendererManifest);
    })
  );

  it.effect("rejects unpublished, missing components", () =>
    Effect.gen(function* () {
      const payloads = [
        CompiledContentPayloadSchema.make({
          ...artifact.payload,
          rendererDomain: "chemistry",
        }),
        CompiledContentPayloadSchema.make({
          ...artifact.payload,
          requiredComponents: ["Mermaid"],
        }),
      ];
      const errors = yield* Effect.all([
        ...payloads.map((payload) => verify(payload).pipe(Effect.flip)),
      ]);
      expect(errors.map((error) => error._tag)).toEqual([
        "ArtifactRendererDomainUnpublishedError",
        "ArtifactRendererComponentMissingError",
      ]);
    })
  );

  it.effect("accepts an additive live superset of one frozen manifest", () =>
    Effect.gen(function* () {
      const added = ["BlockMath", "InlineMath"] as const;
      const live = yield* createRendererManifest({
        base: added,
        domains: testRendererDomains({
          site: ["Callout"],
        }),
        publishedDomains: ["mathematics", "site"],
      });

      expect(
        yield* verifyRendererManifestCompatibility({
          frozen: rendererManifest,
          live: rendererManifest,
        })
      ).toEqual(rendererManifest);
      expect(
        yield* verifyRendererManifestCompatibility({
          frozen: rendererManifest,
          live,
        })
      ).toEqual(live);
    })
  );

  it.effect(
    "rejects removed frozen components and unpublished frozen domains",
    () =>
      Effect.gen(function* () {
        const missingComponent = yield* createRendererManifest({
          base: ["InlineMath"],
          domains: testRendererDomains({}),
          publishedDomains: ["mathematics"],
        });
        const unpublished = yield* createRendererManifest({
          base: rendererManifest.base,
          domains: testRendererDomains({}),
          publishedDomains: ["site"],
        });
        const errors = yield* Effect.all([
          verifyRendererManifestCompatibility({
            frozen: rendererManifest,
            live: missingComponent,
          }).pipe(Effect.flip),
          verifyRendererManifestCompatibility({
            frozen: rendererManifest,
            live: unpublished,
          }).pipe(Effect.flip),
        ]);

        expect(errors).toEqual([
          expect.objectContaining({
            _tag: "RendererManifestComponentUnsupportedError",
            componentName: "BlockMath",
            rendererScope: "base",
          }),
          expect.objectContaining({
            _tag: "RendererManifestDomainUnpublishedError",
            rendererDomain: "mathematics",
          }),
        ]);
      })
  );

  it.effect("rejects removed components from frozen published domains", () =>
    Effect.gen(function* () {
      const frozen = yield* createRendererManifest({
        base: rendererManifest.base,
        domains: testRendererDomains({
          mathematics: ["NumberLine"],
        }),
        publishedDomains: ["mathematics"],
      });
      const live = yield* createRendererManifest({
        base: rendererManifest.base,
        domains: testRendererDomains({
          mathematics: [],
        }),
        publishedDomains: ["mathematics"],
      });

      expect(
        yield* verifyRendererManifestCompatibility({ frozen, live }).pipe(
          Effect.flip
        )
      ).toMatchObject({
        _tag: "RendererManifestComponentUnsupportedError",
        componentName: "NumberLine",
        rendererScope: "mathematics",
      });
    })
  );
});
