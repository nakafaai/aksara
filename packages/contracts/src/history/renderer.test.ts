import { describe, expect, it } from "@nakafa/testing/effect";
import { Effect } from "effect";
import { vi } from "vitest";

import { HistoricalSha256HashSchema } from "#contracts/history/primitives";
import { validateHistoricalRendererManifestHash } from "#contracts/history/renderer";
import { historicalRenderer } from "#contracts/test/history-runtime";

/** Returns one expected retained renderer contract failure. */
function rejectManifest(manifest: unknown) {
  return Effect.runPromise(
    validateHistoricalRendererManifestHash(manifest).pipe(Effect.flip)
  );
}

describe("retained renderer contract", () => {
  it("authenticates the exact frozen renderer wire independently", async () => {
    await expect(
      Effect.runPromise(
        validateHistoricalRendererManifestHash(historicalRenderer)
      )
    ).resolves.toEqual(historicalRenderer);
  });

  it("rejects altered hashes and Web Crypto failures", async () => {
    const mismatch = await rejectManifest({
      ...historicalRenderer,
      hash: HistoricalSha256HashSchema.make(`sha256:${"f".repeat(64)}`),
    });
    const digest = vi
      .spyOn(crypto.subtle, "digest")
      .mockRejectedValueOnce(new TypeError("injected retained renderer hash"));
    const compute = await rejectManifest(historicalRenderer);
    digest.mockRestore();

    expect(mismatch._tag).toBe("StoredRendererHashMismatchError");
    expect(compute._tag).toBe("StoredRendererHashComputeError");
  });

  it.each([
    {
      ...historicalRenderer,
      domains: historicalRenderer.domains.slice(1),
    },
    {
      ...historicalRenderer,
      publishedDomains: ["snbt-general", "ai-ds"],
    },
    {
      ...historicalRenderer,
      publishedDomains: ["snbt-general", "snbt-general"],
    },
    {
      ...historicalRenderer,
      rendererContractVersion: "2.0.0",
    },
    {
      ...historicalRenderer,
      unexpected: true,
    },
  ])(
    "rejects renderer bytes outside the frozen old envelope",
    async (input) => {
      const error = await rejectManifest(input);

      expect(error._tag).toBe("StoredRendererDecodeError");
    }
  );

  it.each([
    {
      base: {
        authoringComponents: [],
        supportedComponents: [],
      },
    },
    {
      base: {
        authoringComponents: [{ name: "BlockMath", version: 1 }],
        supportedComponents: [],
      },
    },
    {
      base: {
        authoringComponents: [
          { name: "BlockMath", version: 1 },
          { name: "BlockMath", version: 2 },
        ],
        supportedComponents: [
          { name: "BlockMath", version: 1 },
          { name: "BlockMath", version: 2 },
        ],
      },
    },
    {
      base: {
        authoringComponents: [
          { name: "InlineMath", version: 1 },
          { name: "BlockMath", version: 1 },
        ],
        supportedComponents: [
          { name: "InlineMath", version: 1 },
          { name: "BlockMath", version: 1 },
        ],
      },
    },
    {
      base: {
        authoringComponents: [{ name: "BlockMath", version: 2 }],
        supportedComponents: [{ name: "BlockMath", version: 1 }],
      },
    },
    {
      base: {
        authoringComponents: [{ name: "1Invalid", version: 1 }],
        supportedComponents: [{ name: "1Invalid", version: 1 }],
      },
    },
  ])("rejects invalid frozen base capability %#", async ({ base }) => {
    const error = await rejectManifest({ ...historicalRenderer, base });

    expect(error._tag).toBe("StoredRendererDecodeError");
  });

  it("rejects invalid domain selections and base component collisions", async () => {
    const domain = historicalRenderer.domains.find(
      ({ name }) => name === "snbt-general"
    );
    expect(domain).toBeDefined();
    const changedDomains = historicalRenderer.domains.map((entry) =>
      entry.name === "snbt-general"
        ? {
            ...entry,
            authoringComponents: [{ name: "BlockMath", version: 1 }],
            supportedComponents: [{ name: "BlockMath", version: 1 }],
          }
        : entry
    );
    const collision = await rejectManifest({
      ...historicalRenderer,
      domains: changedDomains,
    });
    const incomplete = await rejectManifest({
      ...historicalRenderer,
      domains: historicalRenderer.domains.map((entry) =>
        entry.name === "snbt-general"
          ? {
              ...entry,
              authoringComponents: [],
              supportedComponents: [{ name: "InlineMath", version: 1 }],
            }
          : entry
      ),
    });

    expect(collision._tag).toBe("StoredRendererDecodeError");
    expect(incomplete._tag).toBe("StoredRendererDecodeError");
  });
});
