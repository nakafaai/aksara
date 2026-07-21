// @vitest-environment node

import type { BinaryLike } from "node:crypto";
import { Effect } from "effect";
import { describe, expect, it, vi } from "vitest";
import { canonicalizeRendererManifestContract } from "#contracts/renderer/contract.js";
import {
  createRendererManifest,
  validateRendererManifestHash,
} from "#contracts/renderer/manifest.js";

vi.mock("node:crypto", async (importOriginal) => {
  const crypto = await importOriginal<typeof import("node:crypto")>();
  return {
    ...crypto,
    /** Injects one deterministic renderer-hashing failure. */
    createHash(algorithm: string) {
      const hash = crypto.createHash(algorithm);
      return new Proxy(hash, {
        /** Preserves real Hash methods while intercepting the failure marker. */
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

const ORACLE_AUTHORING = [
  { name: "BlockMath", version: 1 },
  { name: "TestWidget", version: 1 },
] as const;
const ORACLE_SUPPORTED = [
  { name: "BlockMath", version: 1 },
  { name: "TestWidget", version: 1 },
  { name: "TestWidget", version: 2 },
] as const;
const ORACLE_CANONICAL_BYTES =
  '{"authoringComponents":[{"name":"BlockMath","version":1},{"name":"TestWidget","version":1}],"format":"nakafa-mdx-renderer-v1","rendererContractVersion":"1.0.0","supportedComponents":[{"name":"BlockMath","version":1},{"name":"TestWidget","version":1},{"name":"TestWidget","version":2}]}';
const ORACLE_HASH =
  "sha256:704b98505bd0b68c515f3fe85812801c12d43b754687b0e5ada86c40d9235dcb";

/** Runs manifest creation and returns its expected typed failure. */
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

/** Runs manifest validation and returns its expected typed failure. */
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

  it("sorts supported pairs but preserves canonical authoring pins", async () => {
    const manifest = await Effect.runPromise(
      createRendererManifest({
        authoringComponents: ORACLE_AUTHORING,
        supportedComponents: [
          { name: "TestWidget", version: 2 },
          { name: "BlockMath", version: 1 },
          { name: "TestWidget", version: 1 },
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
      [
        { name: "BlockMath", version: 1 },
        { name: "Mermaid", version: 1 },
        { name: "TestWidget", version: 1 },
      ],
    ],
    [
      "RendererAuthoringComponentUnsupportedError",
      [
        { name: "BlockMath", version: 1 },
        { name: "TestWidget", version: 3 },
      ],
    ],
    [
      "RendererAuthoringComponentDuplicateError",
      [
        { name: "BlockMath", version: 1 },
        { name: "BlockMath", version: 1 },
        { name: "TestWidget", version: 1 },
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

  it("maps renderer hashing failures without exposing raw crypto errors", async () => {
    const error = await Effect.runPromise(
      createRendererManifest({
        authoringComponents: [{ name: "HashFailure", version: 1 }],
        supportedComponents: [{ name: "HashFailure", version: 1 }],
      }).pipe(Effect.flip)
    );

    expect(error._tag).toBe("RendererManifestHashComputeError");
  });
});
