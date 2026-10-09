// @vitest-environment node
import { createHash } from "node:crypto";
import { describe, expect, it } from "@effect/vitest";
import { Array as Arr, Effect, Option } from "effect";
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
          base: Arr.reverse(input.base),
          domains: Arr.reverse(input.domains),
        });
        expect(manifest.base).toEqual(input.base);
        expect(manifest.domains).toEqual(input.domains);
        expect(Arr.map(manifest.domains, ({ name }) => name)).toEqual(
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
      const mathematics = Arr.findFirst(
        manifest.domains,
        ({ name }) => name === "mathematics"
      );
      expect(Option.getOrThrow(mathematics).components).toEqual([
        "FunctionMachine",
        "NumberLine",
      ]);
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
          base: Arr.reverse(manifest.base),
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
          domains: Arr.filter(input.domains, ({ name }) => name !== "site"),
        }).pipe(Effect.flip);
        expect(incomplete._tag).toBe("ContractDecodeError");
        const manifest = yield* createRendererManifest(input);
        const contract = {
          ...manifest,
          domains: Arr.filter(manifest.domains, ({ name }) => name !== "site"),
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

describe("pinned renderer manifest hashes", () => {
  const pinnedDomains = [
    { components: [], name: "ai-ds" },
    { components: [], name: "biology" },
    { components: ["AtomShellLab"], name: "chemistry" },
    { components: ["FunctionMachine"], name: "mathematics" },
    { components: [], name: "physics" },
    { components: [], name: "politics" },
    { components: [], name: "site" },
    { components: [], name: "snbt-general" },
    { components: [], name: "snbt-math" },
    { components: [], name: "snbt-plain" },
    { components: [], name: "snbt-quant" },
    { components: [], name: "tka-math" },
  ];
  const pinnedInput = {
    base: ["BlockMath", "InlineMath"],
    domains: pinnedDomains,
    publishedDomains: ["mathematics"],
  };

  /** Replaces only the mathematics component list of the pinned domain set. */
  const withMathematics = (components: readonly string[]) =>
    Arr.map(pinnedDomains, (domain) =>
      domain.name === "mathematics" ? { ...domain, components } : domain
    );

  it.effect(
    "pins one authenticated hash for caller-independent input order",
    () =>
      Effect.gen(function* () {
        const manifest = yield* createRendererManifest(pinnedInput);
        const reversed = yield* createRendererManifest({
          base: Arr.reverse(pinnedInput.base),
          domains: Arr.reverse(pinnedDomains),
          publishedDomains: pinnedInput.publishedDomains,
        });

        expect(manifest.hash).toBe(
          "sha256:6ab191841c3ad581530d7952266f08913d9f0934cc01c49c04d74a0fd1c0577d"
        );
        expect(reversed.hash).toBe(manifest.hash);
      })
  );

  it.effect(
    "pins one hash for unsorted published domains and component lists",
    () =>
      Effect.gen(function* () {
        const canonical = yield* createRendererManifest({
          base: pinnedInput.base,
          domains: withMathematics(["FunctionMachine", "NumberLine"]),
          publishedDomains: ["mathematics", "site"],
        });
        const unsorted = yield* createRendererManifest({
          base: pinnedInput.base,
          domains: withMathematics(["NumberLine", "FunctionMachine"]),
          publishedDomains: ["site", "mathematics"],
        });

        expect(canonical.hash).toBe(
          "sha256:b2bd44cf3af79ddb68a57c516bbdb397376fa9ebbb00b07db2cead4126df09e3"
        );
        expect(unsorted.hash).toBe(canonical.hash);
      })
  );

  it.effect(
    "validates the pinned envelope and rejects one changed hash character",
    () =>
      Effect.gen(function* () {
        const envelope = {
          base: ["BlockMath", "InlineMath"],
          domains: [
            { components: [], name: "ai-ds" },
            { components: [], name: "biology" },
            { components: ["AtomShellLab"], name: "chemistry" },
            { components: ["FunctionMachine"], name: "mathematics" },
            { components: [], name: "physics" },
            { components: [], name: "politics" },
            { components: [], name: "site" },
            { components: [], name: "snbt-general" },
            { components: [], name: "snbt-math" },
            { components: [], name: "snbt-plain" },
            { components: [], name: "snbt-quant" },
            { components: [], name: "tka-math" },
          ],
          format: "nakafa-mdx-renderer",
          hash: "sha256:6ab191841c3ad581530d7952266f08913d9f0934cc01c49c04d74a0fd1c0577d",
          publishedDomains: ["mathematics"],
        };

        expect(yield* validateRendererManifestHash(envelope)).toEqual(envelope);
        const error = yield* validateRendererManifestHash({
          ...envelope,
          hash: "sha256:6ab191841c3ad581530d7952266f08913d9f0934cc01c49c04d74a0fd1c0577e",
        }).pipe(Effect.flip);

        expect(error._tag).toBe("RendererManifestHashMismatchError");
      })
  );
});
