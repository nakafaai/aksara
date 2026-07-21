import { compileContent } from "@nakafaai/aksara-compiler/compile";
import { hashCompiledContentPayload } from "@nakafaai/aksara-contracts/artifact/verify";
import { CompileDocumentSourceSchema } from "@nakafaai/aksara-contracts/content";
import {
  ContentKeySchema,
  type ReleaseId,
  ReleaseIdSchema,
} from "@nakafaai/aksara-contracts/ids";
import {
  type ContentChange,
  ContentReleaseItemSchema,
  compareContentChanges,
} from "@nakafaai/aksara-contracts/release";
import { createRendererManifest } from "@nakafaai/aksara-contracts/renderer/manifest";
import { Effect } from "effect";
import { describe, expect, it } from "vitest";
import { compileReleaseSources } from "#publisher/source-compilation.js";

const rendererManifest = await Effect.runPromise(
  createRendererManifest({
    authoringComponents: [{ name: "BlockMath", version: 1 }],
    supportedComponents: [{ name: "BlockMath", version: 1 }],
  })
);
const source = CompileDocumentSourceSchema.make({
  contentKey: ContentKeySchema.make("test:publication"),
  locale: "en",
  rawMdx: 'export const metadata = {}\n\n<BlockMath math="x" />',
});
const expectedPayload = await Effect.runPromise(
  compileContent({ ...source, rendererManifest })
);

/** Builds canonically ordered items for source-compilation tests. */
function makeItems(releaseId: ReleaseId, changes: readonly ContentChange[]) {
  return [...changes]
    .sort(compareContentChanges)
    .map((change, index) =>
      ContentReleaseItemSchema.make({ change, index, releaseId })
    );
}

/** Builds a verified one-upsert summary for source-compilation tests. */
function makeSummary(change: ContentChange) {
  const items = makeItems(ReleaseIdSchema.make("test-release-source"), [
    change,
  ]);
  return { deleteCount: 0, items, upsertCount: 1 };
}

/** Builds the source upsert authenticated by a selected artifact hash. */
function upsertWithArtifactHash(
  artifactHash: ReturnType<typeof hashCompiledContentPayload>
) {
  return {
    artifactHash,
    contentKey: source.contentKey,
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

  it("rejects source identity that differs from its authenticated item", async () => {
    const mismatchedSource = CompileDocumentSourceSchema.make({
      ...source,
      contentKey: ContentKeySchema.make("test:other-source"),
    });
    const error = await Effect.runPromise(
      compileReleaseSources({
        rendererManifest,
        sources: [mismatchedSource],
        summary: makeSummary(
          upsertWithArtifactHash(hashCompiledContentPayload(expectedPayload))
        ),
      }).pipe(Effect.flip)
    );

    expect(error._tag).toBe("ReleaseArtifactMismatchError");
    expect(error.message).toContain("does not match release item");
  });

  it("rejects a source when the verified summary has no matching item", async () => {
    const error = await Effect.runPromise(
      compileReleaseSources({
        rendererManifest,
        sources: [source],
        summary: { deleteCount: 0, items: [], upsertCount: 1 },
      }).pipe(Effect.flip)
    );

    expect(error._tag).toBe("ReleaseArtifactMismatchError");
    expect(error.message).toBe(
      "An authored source has no authenticated upsert item."
    );
  });
});
