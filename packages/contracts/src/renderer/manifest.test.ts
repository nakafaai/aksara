// @vitest-environment node
import { createHash } from "node:crypto";
import { describe, expect, it } from "@effect/vitest";
import { Effect } from "effect";
import { canonicalizeRendererManifestContract } from "#contracts/renderer/contract";
import { RENDERER_DOMAINS } from "#contracts/renderer/domain";
import {
  createRendererManifest,
  validateRendererManifestHash,
} from "#contracts/renderer/manifest";
import { testRendererDomains } from "#contracts/test/renderer";

const input = {
  base: ["BlockMath", "InlineMath"],
  domains: testRendererDomains({
    chemistry: ["AtomShellLab"],
    mathematics: ["FunctionMachine"],
  }),
  publishedDomains: ["mathematics"],
};

describe("renderer manifest", () => {
  it.effect(
    "creates canonical names and authenticates exact persisted bytes",
    () =>
      Effect.gen(function* () {
        const manifest = yield* createRendererManifest({
          ...input,
          base: [...input.base].reverse(),
          domains: [...input.domains].reverse(),
        });
        expect(manifest.base).toEqual(input.base);
        expect(manifest.domains).toEqual(input.domains);
        expect(manifest.domains.map(({ name }) => name)).toEqual(
          RENDERER_DOMAINS
        );
        expect(manifest.hash).toBe(
          `sha256:${createHash("sha256").update(canonicalizeRendererManifestContract(manifest)).digest("hex")}`
        );
        expect(yield* validateRendererManifestHash(manifest)).toEqual(manifest);
      })
  );

  it.effect("sorts names within domains and the published domain set", () =>
    Effect.gen(function* () {
      const manifest = yield* createRendererManifest({
        ...input,
        domains: testRendererDomains({
          mathematics: ["NumberLine", "FunctionMachine"],
        }),
        publishedDomains: ["site", "mathematics"],
      });
      expect(
        manifest.domains.find(({ name }) => name === "mathematics")?.components
      ).toEqual(["FunctionMachine", "NumberLine"]);
      expect(manifest.publishedDomains).toEqual(["mathematics", "site"]);
    })
  );

  it.effect(
    "rejects empty, duplicate, malformed, or versioned component sets",
    () =>
      Effect.gen(function* () {
        for (const base of [
          [],
          ["BlockMath", "BlockMath"],
          ["Block-Math"],
          [{ name: "BlockMath", version: 1 }],
        ]) {
          const error = yield* createRendererManifest({ ...input, base }).pipe(
            Effect.flip
          );
          expect(error._tag).toBe("ContractDecodeError");
        }
        const error = yield* createRendererManifest({
          ...input,
          domains: testRendererDomains({
            mathematics: ["NumberLine", "NumberLine"],
          }),
        }).pipe(Effect.flip);
        expect(error._tag).toBe("ContractDecodeError");
      })
  );

  it.effect(
    "rejects malformed persisted order instead of silently normalizing it",
    () =>
      Effect.gen(function* () {
        const manifest = yield* createRendererManifest(input);
        const error = yield* validateRendererManifestHash({
          ...manifest,
          base: [...manifest.base].reverse(),
        }).pipe(Effect.flip);
        expect(error._tag).toBe("ContractDecodeError");
        const mismatch = yield* validateRendererManifestHash({
          ...manifest,
          hash: `sha256:${"f".repeat(64)}`,
        }).pipe(Effect.flip);
        expect(mismatch._tag).toBe("RendererManifestHashMismatchError");
      })
  );

  it.effect(
    "rejects incomplete domains at creation and authenticated reads",
    () =>
      Effect.gen(function* () {
        const incomplete = yield* createRendererManifest({
          ...input,
          domains: input.domains.filter(({ name }) => name !== "site"),
        }).pipe(Effect.flip);
        expect(incomplete._tag).toBe("ContractDecodeError");
        const manifest = yield* createRendererManifest(input);
        const contract = {
          ...manifest,
          domains: manifest.domains.filter(({ name }) => name !== "site"),
        };
        const incompleteEnvelope = {
          ...contract,
          hash: `sha256:${createHash("sha256").update(canonicalizeRendererManifestContract(contract)).digest("hex")}`,
        };
        const error = yield* validateRendererManifestHash(
          incompleteEnvelope
        ).pipe(Effect.flip);
        expect(error).toMatchObject({
          _tag: "ContractDecodeError",
          contract: "RendererManifestEnvelope",
        });
      })
  );

  it.effect(
    "rejects overlapping ownership even with a correctly computed hash",
    () =>
      Effect.gen(function* () {
        const overlap = {
          ...input,
          domains: testRendererDomains({ chemistry: ["BlockMath"] }),
        };
        const error = yield* createRendererManifest(overlap).pipe(Effect.flip);
        expect(error._tag).toBe("ContractDecodeError");
        const manifest = yield* createRendererManifest(input);
        const contract = { ...manifest, domains: overlap.domains };
        const errorFromWire = yield* validateRendererManifestHash({
          ...contract,
          hash: `sha256:${createHash("sha256").update(canonicalizeRendererManifestContract(contract)).digest("hex")}`,
        }).pipe(Effect.flip);
        expect(errorFromWire._tag).toBe("ContractDecodeError");
      })
  );

  it.effect("maps hashing failures to a typed error", () =>
    Effect.acquireUseRelease(
      Effect.sync(() =>
        vi
          .spyOn(crypto.subtle, "digest")
          .mockRejectedValueOnce(new TypeError("injected hash failure"))
      ),
      () => createRendererManifest(input).pipe(Effect.flip),
      (digest) => Effect.sync(() => digest.mockRestore())
    ).pipe(
      Effect.map((error) =>
        expect(error._tag).toBe("RendererManifestHashComputeError")
      )
    )
  );
});
