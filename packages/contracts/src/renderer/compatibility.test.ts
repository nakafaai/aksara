import { describe, expect, it } from "@effect/vitest";
import { Effect, Schema } from "effect";
import { CompiledContentPayloadSchema } from "#contracts/content";
import { ContentKeySchema } from "#contracts/ids";
import {
  verifyContentRendererCompatibility,
  verifyRendererManifestCompatibility,
} from "#contracts/renderer/compatibility";
import { RendererManifestEnvelopeSchema } from "#contracts/renderer/contract";
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

describe("pinned renderer compatibility", () => {
  const frozenWire = Schema.decodeSync(
    Schema.fromJsonString(RendererManifestEnvelopeSchema)
  )(
    '{"base": ["BlockMath", "InlineMath"], "domains": [{"components": [], "name": "ai-ds"}, {"components": [], "name": "biology"}, {"components": ["AtomShellLab"], "name": "chemistry"}, {"components": ["FunctionMachine"], "name": "mathematics"}, {"components": [], "name": "physics"}, {"components": [], "name": "politics"}, {"components": [], "name": "site"}, {"components": [], "name": "snbt-general"}, {"components": [], "name": "snbt-math"}, {"components": [], "name": "snbt-plain"}, {"components": [], "name": "snbt-quant"}, {"components": [], "name": "tka-math"}], "format": "nakafa-mdx-renderer", "hash": "sha256:6ab191841c3ad581530d7952266f08913d9f0934cc01c49c04d74a0fd1c0577d", "publishedDomains": ["mathematics"]}'
  );
  const liveWire = Schema.decodeSync(
    Schema.fromJsonString(RendererManifestEnvelopeSchema)
  )(
    '{"base": ["BlockMath", "InlineMath", "NumberLine"], "domains": [{"components": [], "name": "ai-ds"}, {"components": [], "name": "biology"}, {"components": ["AtomShellLab"], "name": "chemistry"}, {"components": ["FunctionMachine"], "name": "mathematics"}, {"components": [], "name": "physics"}, {"components": [], "name": "politics"}, {"components": [], "name": "site"}, {"components": [], "name": "snbt-general"}, {"components": [], "name": "snbt-math"}, {"components": [], "name": "snbt-plain"}, {"components": [], "name": "snbt-quant"}, {"components": [], "name": "tka-math"}], "format": "nakafa-mdx-renderer", "hash": "sha256:e5b36991ce4a1a3377606e01d3354a78bdae5ac404064176d5089d9a1fe45b8e", "publishedDomains": ["chemistry", "mathematics"]}'
  );
  const missingWire = Schema.decodeSync(
    Schema.fromJsonString(RendererManifestEnvelopeSchema)
  )(
    '{"base": ["BlockMath", "NumberLine"], "domains": [{"components": [], "name": "ai-ds"}, {"components": [], "name": "biology"}, {"components": ["AtomShellLab"], "name": "chemistry"}, {"components": ["FunctionMachine"], "name": "mathematics"}, {"components": [], "name": "physics"}, {"components": [], "name": "politics"}, {"components": [], "name": "site"}, {"components": [], "name": "snbt-general"}, {"components": [], "name": "snbt-math"}, {"components": [], "name": "snbt-plain"}, {"components": [], "name": "snbt-quant"}, {"components": [], "name": "tka-math"}], "format": "nakafa-mdx-renderer", "hash": "sha256:b7f109b88bfeae42b33af97d9484ef5330a76e03d1a7574f133c58425f75455e", "publishedDomains": ["chemistry", "mathematics"]}'
  );
  const frozen = Schema.decodeSync(RendererManifestEnvelopeSchema)(frozenWire);
  const live = Schema.decodeSync(RendererManifestEnvelopeSchema)(liveWire);
  const missingInline = Schema.decodeSync(RendererManifestEnvelopeSchema)(
    missingWire
  );
  const pinnedPayload = {
    contentKey: ContentKeySchema.make("test:content"),
    rendererDomain: "mathematics",
    requiredComponents: ["BlockMath", "FunctionMachine"],
  } as const;

  it.effect(
    "accepts a live renderer that supersedes the frozen capabilities",
    () =>
      Effect.gen(function* () {
        expect(
          yield* verifyRendererManifestCompatibility({ frozen, live })
        ).toEqual(live);
      })
  );

  it.effect(
    "rejects a live renderer that removes a frozen base component",
    () =>
      Effect.gen(function* () {
        const error = yield* verifyRendererManifestCompatibility({
          frozen,
          live: missingInline,
        }).pipe(Effect.flip);
        expect(error).toMatchObject({
          _tag: "RendererManifestComponentUnsupportedError",
          componentName: "InlineMath",
          rendererScope: "base",
        });
      })
  );

  it.effect(
    "authenticates the pinned renderer before checking artifact components",
    () =>
      Effect.gen(function* () {
        expect(
          yield* verifyContentRendererCompatibility({
            payload: pinnedPayload,
            rendererManifest: frozenWire,
          })
        ).toEqual(frozen);
      })
  );

  it.effect(
    "rejects a pinned renderer whose hash changes by one character",
    () =>
      Effect.gen(function* () {
        const error = yield* verifyContentRendererCompatibility({
          payload: pinnedPayload,
          rendererManifest: {
            ...frozenWire,
            hash: "sha256:6ab191841c3ad581530d7952266f08913d9f0934cc01c49c04d74a0fd1c0577e",
          },
        }).pipe(Effect.flip);
        expect(error._tag).toBe("RendererManifestHashMismatchError");
      })
  );

  it.effect(
    "rejects a pinned artifact component outside the frozen registry",
    () =>
      Effect.gen(function* () {
        const error = yield* verifyContentRendererCompatibility({
          payload: { ...pinnedPayload, requiredComponents: ["NumberLine"] },
          rendererManifest: frozenWire,
        }).pipe(Effect.flip);
        expect(error).toMatchObject({
          _tag: "ArtifactRendererComponentMissingError",
          componentName: "NumberLine",
        });
      })
  );
});
