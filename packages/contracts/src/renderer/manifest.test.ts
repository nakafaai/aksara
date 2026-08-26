// @vitest-environment node
import { createHash } from "node:crypto";
import { describe, expect, it } from "@nakafa/testing/effect";
import { Effect } from "effect";
import { vi } from "vitest";
import type { RendererComponentRequirement } from "#contracts/renderer/component";
import { canonicalizeRendererManifestContract } from "#contracts/renderer/contract";
import { RENDERER_DOMAINS } from "#contracts/renderer/domain";
import {
  createRendererManifest,
  validateLiveRendererManifestHash,
  validateRendererManifestHash,
} from "#contracts/renderer/manifest";
import { testRendererDomains } from "#contracts/test/renderer";

const CHEMISTRY = {
  authoringComponents: [{ name: "AtomShellLab", version: 1 }],
  name: "chemistry",
  supportedComponents: [{ name: "AtomShellLab", version: 1 }],
} as const;
const MATHEMATICS = {
  authoringComponents: [{ name: "FunctionMachine", version: 1 }],
  name: "mathematics",
  supportedComponents: [{ name: "FunctionMachine", version: 1 }],
} as const;
const BASE_SUPPORTED = [
  { name: "BlockMath", version: 1 },
  { name: "InlineMath", version: 1 },
  { name: "InlineMath", version: 2 },
] as const;
const BASE_AUTHORING = [
  { name: "BlockMath", version: 1 },
  { name: "InlineMath", version: 1 },
] as const;
const PRODUCTION_COMPONENT_NAME_GROUPS = [
  "AgentContext BlockMath CodeBlock ContentBlock ContentGrid ContentStack",
  "InlineMath MathContainer Mermaid Youtube",
  "a blockquote code em h1 h2 h3 h4 h5 h6 li ol p pre strong sub sup",
  "table tbody td th thead tr ul",
] as const;
const DOMAINS = testRendererDomains({
  chemistry: CHEMISTRY.authoringComponents,
  mathematics: MATHEMATICS.authoringComponents,
});
/** Builds one complete manifest creation input with optional base pins. */
function creation(
  authoringComponents: readonly RendererComponentRequirement[] = BASE_AUTHORING,
  supportedComponents: readonly RendererComponentRequirement[] = BASE_SUPPORTED
) {
  return {
    base: { authoringComponents, supportedComponents },
    domains: DOMAINS,
    publishedDomains: ["mathematics"] as const,
  };
}

/** Runs manifest creation and returns its expected typed failure. */
function rejectCreation(components: readonly RendererComponentRequirement[]) {
  return createRendererManifest(creation(components)).pipe(Effect.flip);
}

/** Returns the expected typed validation failure for one authored selection. */
function rejectValidation(
  authoringComponents: readonly RendererComponentRequirement[]
) {
  return createRendererManifest(creation()).pipe(
    Effect.flatMap((manifest) =>
      validateRendererManifestHash({
        ...manifest,
        base: { ...manifest.base, authoringComponents },
      }).pipe(Effect.flip)
    )
  );
}

describe("renderer manifest", () => {
  it.effect("matches exact canonical domain-scoped bytes and hash", () =>
    Effect.gen(function* () {
      const manifest = yield* createRendererManifest(
        creation(BASE_AUTHORING, [
          { name: "InlineMath", version: 2 },
          { name: "BlockMath", version: 1 },
          { name: "InlineMath", version: 1 },
        ])
      );
      const bytes = canonicalizeRendererManifestContract(manifest);
      expect(bytes).toContain('"nakafa-mdx-renderer-v1"');
      expect(manifest).toMatchObject({
        base: {
          authoringComponents: BASE_AUTHORING,
          supportedComponents: BASE_SUPPORTED,
        },
        domains: DOMAINS,
        format: "nakafa-mdx-renderer-v1",
        rendererContractVersion: "1.0.0",
      });
      expect(manifest.hash).toBe(
        `sha256:${createHash("sha256").update(bytes).digest("hex")}`
      );
      expect(yield* validateRendererManifestHash(manifest)).toEqual(manifest);
      const liveManifest = yield* validateLiveRendererManifestHash(manifest);
      expect(liveManifest).toEqual(manifest);
    })
  );

  it.effect(
    "matches the independently generated Nakafa production manifest hash",
    () =>
      Effect.gen(function* () {
        const names = PRODUCTION_COMPONENT_NAME_GROUPS.flatMap((group) =>
          group.split(" ").map((name) => ({ name, version: 1 }))
        );
        const production = yield* createRendererManifest(
          creation(names, names)
        );

        expect(production.hash).toBe(
          "sha256:27011a899d841e9ca9479ad7f74a9207f09c3905165858e37a2040ecdd131d48"
        );
      })
  );

  it.effect.each([
    [
      "RendererAuthoringComponentMissingError",
      [{ name: "BlockMath", version: 1 }],
    ],
    [
      "RendererAuthoringComponentExtraError",
      [
        { name: "BlockMath", version: 1 },
        { name: "InlineMath", version: 1 },
        { name: "Mermaid", version: 1 },
      ],
    ],
    [
      "RendererAuthoringComponentUnsupportedError",
      [
        { name: "BlockMath", version: 1 },
        { name: "InlineMath", version: 3 },
      ],
    ],
    [
      "RendererAuthoringComponentDuplicateError",
      [
        { name: "BlockMath", version: 1 },
        { name: "BlockMath", version: 1 },
        { name: "InlineMath", version: 1 },
      ],
    ],
    [
      "RendererAuthoringSelectionNonCanonicalError",
      [...BASE_AUTHORING].reverse(),
    ],
  ] as const)("rejects %s from creation and validation", ([tag, pins]) =>
    Effect.all([rejectCreation(pins), rejectValidation(pins)]).pipe(
      Effect.map(([creationError, validationError]) => {
        expect(creationError._tag).toBe(tag);
        return expect(validationError._tag).toBe(tag);
      })
    )
  );

  it.effect(
    "normalizes domains and rejects duplicated support and tampered hashes",
    () =>
      Effect.gen(function* () {
        const normalizedDomains = yield* createRendererManifest({
          ...creation(),
          domains: [...DOMAINS].reverse(),
        });
        expect(normalizedDomains.domains.map(({ name }) => name)).toEqual(
          RENDERER_DOMAINS
        );

        const duplicate = yield* createRendererManifest(
          creation(
            [{ name: "BlockMath", version: 1 }],
            [
              { name: "BlockMath", version: 1 },
              { name: "BlockMath", version: 1 },
            ]
          )
        ).pipe(Effect.flip);
        expect(duplicate._tag).toBe("ContractDecodeError");

        const manifest = yield* createRendererManifest(creation());
        const mismatch = yield* validateRendererManifestHash({
          ...manifest,
          hash: `sha256:${"f".repeat(64)}`,
        }).pipe(Effect.flip);
        expect(mismatch._tag).toBe("RendererManifestHashMismatchError");
      })
  );

  it.effect(
    "validates historical subsets but creates only complete live manifests",
    () =>
      Effect.gen(function* () {
        const incompleteCreation = yield* createRendererManifest({
          ...creation(),
          domains: DOMAINS.filter(({ name }) => name !== "site"),
        }).pipe(Effect.flip);
        expect(incompleteCreation._tag).toBe("ContractDecodeError");

        const manifest = yield* createRendererManifest(creation());
        const domains = manifest.domains.filter(({ name }) => name !== "site");
        const historicalContract = {
          base: manifest.base,
          domains,
          publishedDomains: manifest.publishedDomains,
        };
        const historical = {
          ...manifest,
          domains,
          hash: `sha256:${createHash("sha256")
            .update(canonicalizeRendererManifestContract(historicalContract))
            .digest("hex")}`,
        };

        const validated = yield* validateRendererManifestHash(historical);
        expect(validated).toEqual(historical);
        const liveError = yield* validateLiveRendererManifestHash(
          historical
        ).pipe(Effect.flip);
        expect(liveError).toMatchObject({
          _tag: "ContractDecodeError",
          contract: "LiveRendererManifestDomains",
        });
      })
  );

  it.effect("rejects component ownership overlap across scopes", () =>
    Effect.gen(function* () {
      const error = yield* createRendererManifest({
        ...creation(),
        domains: DOMAINS.map((domain) =>
          domain.name === CHEMISTRY.name
            ? {
                ...domain,
                authoringComponents: [{ name: "BlockMath", version: 1 }],
                supportedComponents: [{ name: "BlockMath", version: 1 }],
              }
            : domain
        ),
      }).pipe(Effect.flip);
      expect(error._tag).toBe("ContractDecodeError");

      const manifest = yield* createRendererManifest(creation());
      const overlap = {
        base: manifest.base,
        domains: manifest.domains.map((domain) =>
          domain.name === CHEMISTRY.name
            ? {
                ...domain,
                authoringComponents: [{ name: "BlockMath", version: 1 }],
                supportedComponents: [{ name: "BlockMath", version: 1 }],
              }
            : domain
        ),
        publishedDomains: manifest.publishedDomains,
      };
      const hash = `sha256:${createHash("sha256")
        .update(canonicalizeRendererManifestContract(overlap))
        .digest("hex")}`;
      const wireError = yield* validateRendererManifestHash({
        ...manifest,
        ...overlap,
        hash,
      }).pipe(Effect.flip);
      expect(wireError._tag).toBe("ContractDecodeError");
    })
  );

  it.effect(
    "maps renderer hashing failures without leaking raw crypto errors",
    () =>
      Effect.acquireUseRelease(
        Effect.sync(() =>
          vi
            .spyOn(crypto.subtle, "digest")
            .mockRejectedValueOnce(
              new TypeError("injected renderer hash failure")
            )
        ),
        () =>
          createRendererManifest(
            creation(
              [{ name: "HashFailure", version: 1 }],
              [{ name: "HashFailure", version: 1 }]
            )
          ).pipe(Effect.flip),
        (digest) => Effect.sync(() => digest.mockRestore())
      ).pipe(
        Effect.map((error) =>
          expect(error._tag).toBe("RendererManifestHashComputeError")
        )
      )
  );
});
