// @vitest-environment node

import { type BinaryLike, createHash } from "node:crypto";
import { Effect } from "effect";
import { describe, expect, it, vi } from "vitest";
import type { RendererComponentRequirement } from "#contracts/renderer/component";
import { canonicalizeRendererManifestContract } from "#contracts/renderer/contract";
import { RENDERER_DOMAINS } from "#contracts/renderer/domain";
import {
  createRendererManifest,
  validateRendererManifestHash,
} from "#contracts/renderer/manifest";
import { rendererDomains } from "#contracts/test/renderer";

vi.mock("node:crypto", async (importOriginal) => {
  const crypto = await importOriginal<typeof import("node:crypto")>();
  return {
    ...crypto,
    /** Injects one deterministic renderer-hashing failure. */
    createHash(algorithm: string) {
      const hash = crypto.createHash(algorithm);
      return new Proxy(hash, {
        /** Preserves real hash methods while intercepting one marker. */
        get(target, property, receiver) {
          if (property === "update") {
            return (data: BinaryLike) => {
              if (typeof data === "string" && data.includes("HashFailure")) {
                throw new TypeError("injected renderer hash failure");
              }
              target.update(data);
              return receiver;
            };
          }
          const value = Reflect.get(target, property, target);
          return typeof value === "function" ? value.bind(target) : value;
        },
      });
    },
  };
});

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
const DOMAINS = rendererDomains({
  chemistry: CHEMISTRY.authoringComponents[0],
  mathematics: MATHEMATICS.authoringComponents[0],
});
/** Builds one complete manifest creation input with optional base pins. */
function creation(
  authoringComponents: readonly RendererComponentRequirement[] = BASE_AUTHORING,
  supportedComponents: readonly RendererComponentRequirement[] = BASE_SUPPORTED
) {
  return {
    base: { authoringComponents, supportedComponents },
    domains: DOMAINS,
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
  });

  it("matches the independently generated Nakafa production manifest hash", async () => {
    const names = [
      "AgentContext",
      "BlockMath",
      "CodeBlock",
      "ContentBlock",
      "ContentGrid",
      "ContentStack",
      "InlineMath",
      "MathContainer",
      "Mermaid",
      "Youtube",
      "a",
      "blockquote",
      "code",
      "em",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "li",
      "ol",
      "p",
      "pre",
      "strong",
      "sub",
      "sup",
      "table",
      "tbody",
      "td",
      "th",
      "thead",
      "tr",
      "ul",
    ].map((name) => ({ name, version: 1 }));
    const production = await Effect.runPromise(
      createRendererManifest(creation(names, names))
    );

    expect(production.hash).toBe(
      "sha256:34ea7de14176a37239db20f0bd2ef28515413054b9af3f869c596c796a427b3a"
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
    const error = await Effect.runPromise(
      createRendererManifest(
        creation(
          [{ name: "HashFailure", version: 1 }],
          [{ name: "HashFailure", version: 1 }]
        )
      ).pipe(Effect.flip)
    );
    expect(error._tag).toBe("RendererManifestHashComputeError");
  });
});
