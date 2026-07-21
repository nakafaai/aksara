import { compileContent } from "@nakafaai/aksara-compiler/compile";
import { hashCompiledContentPayload } from "@nakafaai/aksara-contracts/artifact-verification-node";
import { CompileDocumentSourceSchema } from "@nakafaai/aksara-contracts/content";
import {
  ContentKeySchema,
  ReleaseIdSchema,
} from "@nakafaai/aksara-contracts/ids";
import {
  type ContentChange,
  indexContentChanges,
} from "@nakafaai/aksara-contracts/release";
import { createRendererManifest } from "@nakafaai/aksara-contracts/renderer-node";
import { Effect } from "effect";
import { describe, expect, it } from "vitest";
import { compileReleaseSources } from "./source-compilation.js";

const rendererManifest = await Effect.runPromise(
  createRendererManifest({
    authoringComponents: [{ name: "BlockMath", version: 1 }],
    supportedComponents: [{ name: "BlockMath", version: 1 }],
  })
);
const source = CompileDocumentSourceSchema.make({
  contentKey: ContentKeySchema.make("fixture:publication"),
  locale: "en",
  rawMdx:
    'export const metadata = { authors: [{ name: "Nakafa" }], date: "2026-07-21", title: "Publication" }\n\n## Publication\n\n<BlockMath math="x" />',
});
const expectedPayload = await Effect.runPromise(
  compileContent({ ...source, rendererManifest })
);

function makeSummary(change: ContentChange) {
  const items = indexContentChanges(ReleaseIdSchema.make("release-source"), [
    change,
  ]);
  return { deleteCount: 0, items, upsertCount: 1 };
}

function upsertWithArtifactHash(
  artifactHash: ReturnType<typeof hashCompiledContentPayload>
) {
  return {
    artifactHash,
    contentKey: source.contentKey,
    kind: "material",
    locale: source.locale,
    operation: "upsert",
  } satisfies ContentChange;
}

describe("compileReleaseSources", () => {
  it("recompiles source to the exact artifact authenticated by the release", async () => {
    const payloads = await Effect.runPromise(
      compileReleaseSources({
        rendererManifest,
        sources: [source],
        summary: makeSummary(
          upsertWithArtifactHash(hashCompiledContentPayload(expectedPayload))
        ),
      })
    );

    expect(payloads).toEqual([expectedPayload]);
  });

  it("rejects a release hash derived from caller-selected executable code", async () => {
    const maliciousPayload = {
      ...expectedPayload,
      byteLength: 38,
      compiledCode: "return {default: () => process.env};",
    };
    const error = await Effect.runPromise(
      compileReleaseSources({
        rendererManifest,
        sources: [source],
        summary: makeSummary(
          upsertWithArtifactHash(hashCompiledContentPayload(maliciousPayload))
        ),
      }).pipe(Effect.flip)
    );

    expect(error._tag).toBe("ReleaseArtifactMismatchError");
  });
});
