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
function verify(
  payload: typeof artifact.payload = artifact.payload,
  rendererContractVersion = "1.0.0"
) {
  return verifyContentRendererCompatibility({
    payload,
    rendererContractVersion,
    rendererManifest,
  });
}

describe("renderer compatibility", () => {
  it.effect("accepts one published domain with every required component", () =>
    Effect.gen(function* () {
      const payload = CompiledContentPayloadSchema.make({
        ...artifact.payload,
        requiredComponents: [{ name: "BlockMath", version: 1 }],
      });
      expect(yield* verify(payload)).toEqual(rendererManifest);
    })
  );

  it.effect(
    "rejects unpublished, missing, unsupported, and global mismatches",
    () =>
      Effect.gen(function* () {
        const payloads = [
          CompiledContentPayloadSchema.make({
            ...artifact.payload,
            rendererDomain: "chemistry",
          }),
          CompiledContentPayloadSchema.make({
            ...artifact.payload,
            requiredComponents: [{ name: "Mermaid", version: 1 }],
          }),
          CompiledContentPayloadSchema.make({
            ...artifact.payload,
            requiredComponents: [{ name: "BlockMath", version: 2 }],
          }),
        ];
        const errors = yield* Effect.all([
          ...payloads.map((payload) => verify(payload).pipe(Effect.flip)),
          verify(artifact.payload, "2.0.0").pipe(Effect.flip),
        ]);
        expect(errors.map((error) => error._tag)).toEqual([
          "ArtifactRendererDomainUnpublishedError",
          "ArtifactRendererComponentMissingError",
          "ArtifactRendererVersionUnsupportedError",
          "RendererContractVersionMismatchError",
        ]);
      })
  );

  it.effect("accepts an additive live superset of one frozen manifest", () =>
    Effect.gen(function* () {
      const added = [
        { name: "BlockMath", version: 1 },
        { name: "InlineMath", version: 1 },
      ] as const;
      const live = yield* createRendererManifest({
        base: {
          authoringComponents: added,
          supportedComponents: added,
        },
        domains: testRendererDomains({
          site: [{ name: "Callout", version: 1 }],
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
          base: {
            authoringComponents: [{ name: "InlineMath", version: 1 }],
            supportedComponents: [{ name: "InlineMath", version: 1 }],
          },
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
            componentVersion: 1,
            rendererScope: "base",
          }),
          expect.objectContaining({
            _tag: "RendererManifestDomainUnpublishedError",
            rendererDomain: "mathematics",
          }),
        ]);
      })
  );

  it.effect("checks frozen published-domain component versions", () =>
    Effect.gen(function* () {
      const frozen = yield* createRendererManifest({
        base: rendererManifest.base,
        domains: testRendererDomains({
          mathematics: [{ name: "NumberLine", version: 1 }],
        }),
        publishedDomains: ["mathematics"],
      });
      const live = yield* createRendererManifest({
        base: rendererManifest.base,
        domains: testRendererDomains({
          mathematics: [{ name: "NumberLine", version: 2 }],
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
        componentVersion: 1,
        rendererScope: "mathematics",
      });
    })
  );
});
