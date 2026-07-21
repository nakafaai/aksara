import { compile } from "@mdx-js/mdx";
import { ContentKeySchema } from "@nakafaai/aksara-contracts/ids";
import { Effect } from "effect";
import { describe, expect, it } from "vitest";
import {
  type AuthoredMetadataCollector,
  decodeAuthoredMetadata,
  extractAuthoredMetadata,
} from "./metadata.js";

const metadataValue = {
  authors: [{ name: "Nakafa" }],
  date: "2026-07-21",
  title: "Metadata title",
};
const VALID_METADATA = `export const metadata = ${JSON.stringify(metadataValue)}`;
const contentKey = ContentKeySchema.make("fixture:metadata");

async function collectMetadata(rawMdx: string) {
  const collector: AuthoredMetadataCollector = {
    candidates: [],
    syntaxReasons: [],
  };
  await compile(rawMdx, {
    outputFormat: "function-body",
    remarkPlugins: [extractAuthoredMetadata(collector)],
  });
  return collector;
}

async function rejectMetadata(rawMdx: string) {
  const collector = await collectMetadata(rawMdx);
  return Effect.runPromise(
    decodeAuthoredMetadata(contentKey, collector).pipe(Effect.flip)
  );
}

describe("authored metadata", () => {
  it("extracts one static metadata value and removes it from output", async () => {
    const collector = await collectMetadata(`${VALID_METADATA}\n\n## Body`);
    const metadata = await Effect.runPromise(
      decodeAuthoredMetadata(contentKey, collector)
    );

    expect(metadata).toEqual(metadataValue);
  });

  it("requires exactly one authored metadata export", async () => {
    const missing = await rejectMetadata("## Body");
    const duplicate = await rejectMetadata(
      `${VALID_METADATA}\n\n${VALID_METADATA}`
    );

    expect(missing._tag).toBe("AuthoredMetadataMissingError");
    expect(duplicate._tag).toBe("AuthoredMetadataDuplicateError");
  });

  it.each([
    ["dynamic-value", "export const metadata = getMetadata()"],
    [
      "computed-property",
      'export const metadata = { ["title"]: "Title", authors: [{ name: "Nakafa" }], date: "2026-07-21" }',
    ],
    [
      "spread",
      `export const metadata = { ...${JSON.stringify(metadataValue)} }`,
    ],
    ["mixed-metadata-module", `${VALID_METADATA}; export const hidden = true`],
  ])("rejects %s metadata syntax", async (reason, rawMdx) => {
    const error = await rejectMetadata(rawMdx);

    expect(error._tag).toBe("AuthoredMetadataSyntaxError");
    if (error._tag === "AuthoredMetadataSyntaxError") {
      expect(error.reasons).toContain(reason);
    }
  });

  it.each([
    { ...metadataValue, category: "algebra" },
    { ...metadataValue, date: "2025-02-30" },
  ])("fails exact metadata decoding for invalid value %#", async (value) => {
    const error = await rejectMetadata(
      `export const metadata = ${JSON.stringify(value)}`
    );

    expect(error._tag).toBe("AuthoredMetadataContractError");
  });
});
