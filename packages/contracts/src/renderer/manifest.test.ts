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
function rejectCreation(
  authoringComponents: readonly RendererComponentRequirement[]
) {
  return Effect.runPromise(
    createRendererManifest(creation(authoringComponents)).pipe(Effect.flip)
  );
}

/** Runs manifest validation and returns its expected typed failure. */
async function rejectValidation(
  authoringComponents: readonly RendererComponentRequirement[]
) {
  const manifest = await Effect.runPromise(createRendererManifest(creation()));
  return Effect.runPromise(
    validateRendererManifestHash({
      ...manifest,
      base: { ...manifest.base, authoringComponents },
    }).pipe(Effect.flip)
  );
}

describe("renderer manifest", () => {
  it("matches exact canonical domain-scoped bytes and hash", async () => {
    const manifest = await Effect.runPromise(
      createRendererManifest(
        creation(BASE_AUTHORING, [
          { name: "InlineMath", version: 2 },
          { name: "BlockMath", version: 1 },
          { name: "InlineMath", version: 1 },
        ])
      )
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
    await expect(
      Effect.runPromise(validateRendererManifestHash(manifest))
    ).resolves.toEqual(manifest);
    await expect(
      Effect.runPromise(validateLiveRendererManifestHash(manifest))
    ).resolves.toEqual(manifest);
  });

  it("matches the independently generated Nakafa production manifest hash", async () => {
    const names = PRODUCTION_COMPONENT_NAME_GROUPS.flatMap((group) =>
      group.split(" ").map((name) => ({ name, version: 1 }))
    );
    const production = await Effect.runPromise(
      createRendererManifest(creation(names, names))
    );

    expect(production.hash).toBe(
      "sha256:fb25869612144af7dd934bf32e3983a771debb565013f091c15793aa55d82d63"
    );
  });

  it.each([
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
  ])("rejects %s from creation and validation", async (tag, pins) => {
    const [creationError, validationError] = await Promise.all([
      rejectCreation(pins),
      rejectValidation(pins),
    ]);
    expect(creationError._tag).toBe(tag);
    expect(validationError._tag).toBe(tag);
  });

  it("normalizes domains and rejects duplicated support and tampered hashes", async () => {
    const normalizedDomains = await Effect.runPromise(
      createRendererManifest({
        ...creation(),
        domains: [...DOMAINS].reverse(),
      })
    );
    expect(normalizedDomains.domains.map(({ name }) => name)).toEqual(
      RENDERER_DOMAINS
    );

    const duplicate = await Effect.runPromise(
      createRendererManifest(
        creation(
          [{ name: "BlockMath", version: 1 }],
          [
            { name: "BlockMath", version: 1 },
            { name: "BlockMath", version: 1 },
          ]
        )
      ).pipe(Effect.flip)
    );
    expect(duplicate._tag).toBe("ContractDecodeError");

    const manifest = await Effect.runPromise(
      createRendererManifest(creation())
    );
    const mismatch = await Effect.runPromise(
      validateRendererManifestHash({
        ...manifest,
        hash: `sha256:${"f".repeat(64)}`,
      }).pipe(Effect.flip)
    );
    expect(mismatch._tag).toBe("RendererManifestHashMismatchError");
  });

  it("validates historical subsets but creates only complete live manifests", async () => {
    const incompleteCreation = await Effect.runPromise(
      createRendererManifest({
        ...creation(),
        domains: DOMAINS.slice(0, -1),
      }).pipe(Effect.flip)
    );
    expect(incompleteCreation._tag).toBe("ContractDecodeError");

    const manifest = await Effect.runPromise(
      createRendererManifest(creation())
    );
    const domains = manifest.domains.slice(0, -1);
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

    await expect(
      Effect.runPromise(validateRendererManifestHash(historical))
    ).resolves.toEqual(historical);
    const liveError = await Effect.runPromise(
      validateLiveRendererManifestHash(historical).pipe(Effect.flip)
    );
    expect(liveError).toMatchObject({
      _tag: "ContractDecodeError",
      contract: "LiveRendererManifestDomains",
    });
  });

  it("rejects component ownership overlap across scopes", async () => {
    const error = await Effect.runPromise(
      createRendererManifest({
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
      }).pipe(Effect.flip)
    );
    expect(error._tag).toBe("ContractDecodeError");

    const manifest = await Effect.runPromise(
      createRendererManifest(creation())
    );
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
    const wireError = await Effect.runPromise(
      validateRendererManifestHash({ ...manifest, ...overlap, hash }).pipe(
        Effect.flip
      )
    );
    expect(wireError._tag).toBe("ContractDecodeError");
  });

  it("maps renderer hashing failures without leaking raw crypto errors", async () => {
    const digest = vi
      .spyOn(crypto.subtle, "digest")
      .mockRejectedValueOnce(new TypeError("injected renderer hash failure"));
    const error = await Effect.runPromise(
      createRendererManifest(
        creation(
          [{ name: "HashFailure", version: 1 }],
          [{ name: "HashFailure", version: 1 }]
        )
      ).pipe(Effect.flip)
    );
    digest.mockRestore();
    expect(error._tag).toBe("RendererManifestHashComputeError");
  });
});
