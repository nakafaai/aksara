import { compileContent } from "@nakafaai/aksara-compiler/compile";
import { hashCompiledContentPayload } from "@nakafaai/aksara-contracts/artifact/verify";
import {
  CompileDocumentSourceSchema,
  compareContentHeads,
} from "@nakafaai/aksara-contracts/content";
import {
  ContentKeySchema,
  CorpusSourcePathSchema,
  type ReleaseId,
  ReleaseIdSchema,
} from "@nakafaai/aksara-contracts/ids";
import {
  type ContentChange,
  type ContentReleaseItem,
  ContentReleaseItemSchema,
} from "@nakafaai/aksara-contracts/release";
import { createRendererManifest } from "@nakafaai/aksara-contracts/renderer/manifest";
import { Effect, Schema, Stream } from "effect";
import { describe, expect, it } from "vitest";
import { compileReleaseSources } from "#publisher/source-compilation";

const rendererManifest = await Effect.runPromise(
  createRendererManifest({
    base: {
      authoringComponents: [{ name: "BlockMath", version: 1 }],
      supportedComponents: [{ name: "BlockMath", version: 1 }],
    },
    domains: [
      {
        authoringComponents: [{ name: "AtomShellLab", version: 1 }],
        name: "material-chemistry",
        supportedComponents: [{ name: "AtomShellLab", version: 1 }],
      },
      {
        authoringComponents: [{ name: "FunctionMachine", version: 1 }],
        name: "material-mathematics",
        supportedComponents: [{ name: "FunctionMachine", version: 1 }],
      },
    ],
  })
);
const source = Schema.decodeUnknownSync(CompileDocumentSourceSchema)({
  contentKey: "test:publication",
  locale: "en",
  rawMdx: 'export const metadata = {}\n\n<BlockMath math="x" />',
  rendererDomain: "material-mathematics",
  sourcePath: "packages/corpus/test/publication/en.mdx",
});
const { payload: expectedPayload } = await Effect.runPromise(
  compileContent({ ...source, rendererManifest })
);

/** Builds canonically ordered items for source-compilation tests. */
function makeItems(releaseId: ReleaseId, changes: readonly ContentChange[]) {
  return [...changes]
    .sort(compareContentHeads)
    .map((change, index) =>
      ContentReleaseItemSchema.make({ change, index, releaseId })
    );
}

/** Builds the source upsert authenticated by a selected artifact hash. */
function upsertWithArtifactHash(
  artifactHash: ReturnType<typeof hashCompiledContentPayload>
) {
  return {
    artifactHash,
    contentKey: source.contentKey,
    delivery: "public",
    locale: source.locale,
    operation: "upsert",
    rendererDomain: source.rendererDomain,
    sourcePath: source.sourcePath,
  } satisfies ContentChange;
}

/** Runs one compile stream and materializes results only at the test boundary. */
function runCompile(input: {
  readonly items: Stream.Stream<ContentReleaseItem>;
  readonly sources: Stream.Stream<unknown, string>;
}) {
  return Effect.runPromise(
    compileReleaseSources({
      ...input,
      rendererManifest,
    }).pipe(
      Stream.runCollect,
      Effect.map((chunk) => [...chunk])
    )
  );
}

const items = makeItems(ReleaseIdSchema.make("test-release-source"), [
  upsertWithArtifactHash(hashCompiledContentPayload(expectedPayload)),
]);
const identityMismatches = [
  CompileDocumentSourceSchema.make({
    ...source,
    contentKey: ContentKeySchema.make("test:other-source"),
  }),
  CompileDocumentSourceSchema.make({
    ...source,
    locale: "id",
    sourcePath: CorpusSourcePathSchema.make(
      "packages/corpus/test/publication/id.mdx"
    ),
  }),
  CompileDocumentSourceSchema.make({
    ...source,
    sourcePath: CorpusSourcePathSchema.make(
      "packages/corpus/test/other/en.mdx"
    ),
  }),
  CompileDocumentSourceSchema.make({
    ...source,
    rendererDomain: "material-chemistry",
  }),
];

describe("compileReleaseSources", () => {
  it("streams the exact artifact authenticated by the release", async () => {
    const compiled = await runCompile({
      items: Stream.fromIterable(items),
      sources: Stream.fromIterable([source]),
    });
    expect(compiled).toEqual([{ item: items[0], payload: expectedPayload }]);
  });

  it("rejects a hash derived from caller-selected executable code", async () => {
    const maliciousPayload = {
      ...expectedPayload,
      byteLength: 38,
      compiledCode: "return {default: () => process.env};",
    };
    const maliciousItems = makeItems(ReleaseIdSchema.make("test-release-bad"), [
      upsertWithArtifactHash(hashCompiledContentPayload(maliciousPayload)),
    ]);
    const error = await Effect.runPromise(
      compileReleaseSources({
        items: Stream.fromIterable(maliciousItems),
        rendererManifest,
        sources: Stream.fromIterable([source]),
      }).pipe(Stream.runDrain, Effect.flip)
    );
    expect(error._tag).toBe("ReleaseArtifactMismatchError");
  });

  it.each(identityMismatches)(
    "rejects source identity mismatch $#: $sourcePath",
    async (mismatchedSource) => {
      const error = await Effect.runPromise(
        compileReleaseSources({
          items: Stream.fromIterable(items),
          rendererManifest,
          sources: Stream.fromIterable([mismatchedSource]),
        }).pipe(Stream.runDrain, Effect.flip)
      );
      expect(error).toMatchObject({ _tag: "ReleaseArtifactMismatchError" });
      expect(error.message).toContain("does not match release item");
    }
  );

  it("rejects missing and extra sources without collecting either stream", async () => {
    const [missing, extra] = await Promise.all([
      Effect.runPromise(
        compileReleaseSources({
          items: Stream.fromIterable(items),
          rendererManifest,
          sources: Stream.empty,
        }).pipe(Stream.runDrain, Effect.flip)
      ),
      Effect.runPromise(
        compileReleaseSources({
          items: Stream.empty,
          rendererManifest,
          sources: Stream.fromIterable([source]),
        }).pipe(Stream.runDrain, Effect.flip)
      ),
    ]);
    expect(missing).toMatchObject({ _tag: "ReleaseArtifactMismatchError" });
    expect(missing.message).toContain("has no authored source");
    expect(extra).toMatchObject({ _tag: "ReleaseArtifactMismatchError" });
    expect(extra.message).toBe(
      "An authored source has no authenticated upsert item."
    );
  });

  it("propagates source stream failures unchanged", async () => {
    const error = await Effect.runPromise(
      compileReleaseSources({
        items: Stream.fromIterable(items),
        rendererManifest,
        sources: Stream.fail("source-failed"),
      }).pipe(Stream.runDrain, Effect.flip)
    );
    expect(error).toBe("source-failed");
  });
});
