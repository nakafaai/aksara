import { compile } from "@mdx-js/mdx";
import { ContentKeySchema } from "@nakafaai/aksara-contracts/ids";
import { Effect } from "effect";
import { describe, expect, it } from "vitest";
import {
  extractMetadata,
  type MetadataCollector,
  validateMetadata,
} from "#compiler/metadata.js";

const VALID_METADATA = "export const metadata = {}";
const contentKey = ContentKeySchema.make("test:metadata");

async function collectMetadata(rawMdx: string) {
  const collector: MetadataCollector = {
    candidates: [],
    syntaxReasons: [],
  };
  const output = await compile(rawMdx, {
    outputFormat: "function-body",
    remarkPlugins: [extractMetadata(collector)],
  });
  return { collector, output: String(output) };
}

async function rejectMetadata(rawMdx: string) {
  const { collector } = await collectMetadata(rawMdx);
  return Effect.runPromise(
    validateMetadata(contentKey, collector).pipe(Effect.flip)
  );
}

describe("authored metadata", () => {
  it("accepts one static object and removes it from compiled output", async () => {
    const { collector, output } = await collectMetadata(
      `${VALID_METADATA}\n\n## Test`
    );

    await expect(
      Effect.runPromise(validateMetadata(contentKey, collector))
    ).resolves.toBeUndefined();
    expect(output).not.toContain("metadata");
  });

  it("requires exactly one authored metadata export", async () => {
    const missing = await rejectMetadata("## Test");
    const duplicate = await rejectMetadata(
      `${VALID_METADATA}\n\n${VALID_METADATA}`
    );

    expect(missing._tag).toBe("AuthoredMetadataMissingError");
    expect(duplicate._tag).toBe("AuthoredMetadataDuplicateError");
  });

  it.each([
    ["dynamic-value", "export const metadata = getMetadata()"],
    ["computed-property", 'export const metadata = { ["key"]: "value" }'],
    ["spread", "export const metadata = { ...{} }"],
    ["mixed-metadata-module", `${VALID_METADATA}; export const hidden = true`],
    ["metadata-not-object", 'export const metadata = "invalid"'],
  ])("rejects %s metadata syntax", async (reason, rawMdx) => {
    const error = await rejectMetadata(rawMdx);

    expect(error._tag).toBe("AuthoredMetadataSyntaxError");
    if (error._tag === "AuthoredMetadataSyntaxError") {
      expect(error.reasons).toContain(reason);
    }
  });
});
