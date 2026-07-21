// @vitest-environment node

import { Effect } from "effect";
import { describe, expect, it } from "vitest";
import { canonicalizeRendererManifestContract } from "./renderer.js";
import {
  createRendererManifest,
  validateRendererManifestHash,
} from "./renderer-node.js";

const ORACLE_AUTHORING = [
  { name: "BlockMath", version: 1 },
  { name: "FunctionMachine", version: 1 },
] as const;
const ORACLE_SUPPORTED = [
  { name: "BlockMath", version: 1 },
  { name: "FunctionMachine", version: 1 },
  { name: "FunctionMachine", version: 2 },
] as const;
const ORACLE_CANONICAL_BYTES =
  '{"authoringComponents":[{"name":"BlockMath","version":1},{"name":"FunctionMachine","version":1}],"format":"nakafa-mdx-renderer-v1","rendererContractVersion":"1.0.0","supportedComponents":[{"name":"BlockMath","version":1},{"name":"FunctionMachine","version":1},{"name":"FunctionMachine","version":2}]}';
const ORACLE_HASH =
  "sha256:3d051e7db8e1f5a378c8e569b89eaa4f501274605c82458a6834209eba34e480";

function rejectCreation(
  authoringComponents: readonly {
    readonly name: string;
    readonly version: number;
  }[]
) {
  return Effect.runPromise(
    createRendererManifest({
      authoringComponents,
      supportedComponents: ORACLE_SUPPORTED,
    }).pipe(Effect.flip)
  );
}

function rejectValidation(
  authoringComponents: readonly {
    readonly name: string;
    readonly version: number;
  }[]
) {
  return Effect.runPromise(
    validateRendererManifestHash({
      authoringComponents,
      format: "nakafa-mdx-renderer-v1",
      hash: `sha256:${"a".repeat(64)}`,
      rendererContractVersion: "1.0.0",
      supportedComponents: ORACLE_SUPPORTED,
    }).pipe(Effect.flip)
  );
}

describe("renderer Node contract", () => {
  it("matches exact canonical renderer bytes and hash", async () => {
    const manifest = await Effect.runPromise(
      createRendererManifest({
        authoringComponents: ORACLE_AUTHORING,
        supportedComponents: ORACLE_SUPPORTED,
      })
    );

    expect(
      canonicalizeRendererManifestContract(
        manifest.supportedComponents,
        manifest.authoringComponents
      )
    ).toBe(ORACLE_CANONICAL_BYTES);
    expect(manifest).toEqual({
      authoringComponents: ORACLE_AUTHORING,
      format: "nakafa-mdx-renderer-v1",
      hash: ORACLE_HASH,
      rendererContractVersion: "1.0.0",
      supportedComponents: ORACLE_SUPPORTED,
    });
  });

  it("matches the captured post-FunctionMachine 35-component vector", async () => {
    const components = [
      { name: "AgentContext", version: 1 },
      { name: "BlockMath", version: 1 },
      { name: "CodeBlock", version: 1 },
      { name: "ContentBlock", version: 1 },
      { name: "ContentGrid", version: 1 },
      { name: "ContentStack", version: 1 },
      { name: "FunctionMachine", version: 1 },
      { name: "InlineMath", version: 1 },
      { name: "MathContainer", version: 1 },
      { name: "Mermaid", version: 1 },
      { name: "Youtube", version: 1 },
      { name: "a", version: 1 },
      { name: "blockquote", version: 1 },
      { name: "code", version: 1 },
      { name: "em", version: 1 },
      { name: "h1", version: 1 },
      { name: "h2", version: 1 },
      { name: "h3", version: 1 },
      { name: "h4", version: 1 },
      { name: "h5", version: 1 },
      { name: "h6", version: 1 },
      { name: "li", version: 1 },
      { name: "ol", version: 1 },
      { name: "p", version: 1 },
      { name: "pre", version: 1 },
      { name: "strong", version: 1 },
      { name: "sub", version: 1 },
      { name: "sup", version: 1 },
      { name: "table", version: 1 },
      { name: "tbody", version: 1 },
      { name: "td", version: 1 },
      { name: "th", version: 1 },
      { name: "thead", version: 1 },
      { name: "tr", version: 1 },
      { name: "ul", version: 1 },
    ];
    const manifest = await Effect.runPromise(
      createRendererManifest({
        authoringComponents: components,
        supportedComponents: components,
      })
    );

    expect(components).toHaveLength(35);
    expect(manifest.hash).toBe(
      "sha256:8743081df8597ec57471025104daad074c1ff4b08b5c11d90ffafc7d7e138613"
    );
  });

  it("sorts supported pairs but preserves canonical authoring pins", async () => {
    const manifest = await Effect.runPromise(
      createRendererManifest({
        authoringComponents: ORACLE_AUTHORING,
        supportedComponents: [
          { name: "FunctionMachine", version: 2 },
          { name: "BlockMath", version: 1 },
          { name: "FunctionMachine", version: 1 },
        ],
      })
    );

    expect(manifest.supportedComponents).toEqual(ORACLE_SUPPORTED);
    await expect(
      Effect.runPromise(validateRendererManifestHash(manifest))
    ).resolves.toEqual(manifest);
  });

  it.each([
    [
      "RendererAuthoringComponentMissingError",
      [{ name: "BlockMath", version: 1 }],
    ],
    [
      "RendererAuthoringComponentExtraError",
      [...ORACLE_AUTHORING, { name: "Mermaid", version: 1 }],
    ],
    [
      "RendererAuthoringComponentUnsupportedError",
      [
        { name: "BlockMath", version: 2 },
        { name: "FunctionMachine", version: 1 },
      ],
    ],
    [
      "RendererAuthoringComponentDuplicateError",
      [
        { name: "BlockMath", version: 1 },
        { name: "BlockMath", version: 1 },
        { name: "FunctionMachine", version: 1 },
      ],
    ],
    [
      "RendererAuthoringSelectionNonCanonicalError",
      [...ORACLE_AUTHORING].reverse(),
    ],
  ])("rejects %s from create and validate", async (expectedTag, selection) => {
    const [creationError, validationError] = await Promise.all([
      rejectCreation(selection),
      rejectValidation(selection),
    ]);

    expect(creationError._tag).toBe(expectedTag);
    expect(validationError._tag).toBe(expectedTag);
  });

  it("rejects duplicate support pairs and tampered hashes", async () => {
    const duplicate = await Effect.runPromise(
      createRendererManifest({
        authoringComponents: [{ name: "BlockMath", version: 1 }],
        supportedComponents: [
          { name: "BlockMath", version: 1 },
          { name: "BlockMath", version: 1 },
        ],
      }).pipe(Effect.flip)
    );
    expect(duplicate._tag).toBe("ContractDecodeError");

    const manifest = await Effect.runPromise(
      createRendererManifest({
        authoringComponents: [{ name: "BlockMath", version: 1 }],
        supportedComponents: [{ name: "BlockMath", version: 1 }],
      })
    );
    const mismatch = await Effect.runPromise(
      validateRendererManifestHash({
        ...manifest,
        hash: `sha256:${"f".repeat(64)}`,
      }).pipe(Effect.flip)
    );
    expect(mismatch._tag).toBe("RendererManifestHashMismatchError");
  });
});
