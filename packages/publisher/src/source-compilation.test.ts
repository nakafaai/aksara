import { describe, expect, it } from "@effect/vitest";
import { compileContent } from "@nakafa/aksara-compiler/compile";
import { hashCompiledContentPayload } from "@nakafa/aksara-contracts/artifact/integrity";
import {
  CompileDocumentSourceSchema,
  compareContentHeads,
} from "@nakafa/aksara-contracts/content";
import {
  ContentKeySchema,
  CorpusSourcePathSchema,
  type ReleaseId,
  ReleaseIdSchema,
} from "@nakafa/aksara-contracts/ids";
import { ArtifactLocaleSchema } from "@nakafa/aksara-contracts/locale";
import {
  type ContentChange,
  type ContentReleaseItem,
  ContentReleaseItemSchema,
} from "@nakafa/aksara-contracts/release";
import { createRendererManifest } from "@nakafa/aksara-contracts/renderer/manifest";
import { Effect, Schema, Stream } from "effect";
import { compileReleaseSources } from "#publisher/source-compilation";
import { testRendererDomains } from "#test/renderer";

const source = Schema.decodeSync(CompileDocumentSourceSchema)({
  artifactLocale: "en",
  contentKey: "test:publication",
  rawMdx: 'export const metadata = {}\n\n<BlockMath math="x" />',
  rendererDomain: "mathematics",
  sourcePath: "packages/corpus/test/publication/en.mdx",
});

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
    artifactLocale: source.artifactLocale,
    contentKey: source.contentKey,
    delivery: "public",
    family: "material",
    operation: "upsert",
    rendererDomain: source.rendererDomain,
    sourcePath: source.sourcePath,
  } satisfies ContentChange;
}

/** Runs one compile stream and materializes results only at the test boundary. */
const runCompile = Effect.fn("SourceCompilationTest.run")(
  (
    rendererManifest: Effect.Success<ReturnType<typeof createRendererManifest>>,
    input: {
      readonly items: Stream.Stream<ContentReleaseItem>;
      readonly sources: Stream.Stream<unknown, string>;
    }
  ) =>
    compileReleaseSources({
      ...input,
      rendererManifest,
    }).pipe(
      Stream.runCollect,
      Effect.map((chunk) => [...chunk])
    )
);

const makeFixture = Effect.fn("SourceCompilationTest.makeFixture")(
  function* () {
    const rendererManifest = yield* createRendererManifest({
      base: {
        authoringComponents: [{ name: "BlockMath", version: 1 }],
        supportedComponents: [{ name: "BlockMath", version: 1 }],
      },
      domains: testRendererDomains({
        chemistry: [{ name: "AtomShellLab", version: 1 }],
        mathematics: [{ name: "FunctionMachine", version: 1 }],
      }),
      publishedDomains: ["mathematics"],
    });
    const { payload: expectedPayload } = yield* compileContent({
      ...source,
      rendererManifest,
    });
    const items = makeItems(ReleaseIdSchema.make("test-release-source"), [
      upsertWithArtifactHash(hashCompiledContentPayload(expectedPayload)),
    ]);
    return { expectedPayload, items, rendererManifest };
  }
);

const identityMismatches = [
  CompileDocumentSourceSchema.make({
    ...source,
    contentKey: ContentKeySchema.make("test:other-source"),
  }),
  CompileDocumentSourceSchema.make({
    ...source,
    artifactLocale: ArtifactLocaleSchema.make("id"),
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
    rendererDomain: "chemistry",
  }),
];

describe("compileReleaseSources", () => {
  it.effect("streams the exact artifact authenticated by the release", () =>
    Effect.gen(function* () {
      const { expectedPayload, items, rendererManifest } = yield* makeFixture();
      const compiled = yield* runCompile(rendererManifest, {
        items: Stream.fromIterable(items),
        sources: Stream.fromIterable([source]),
      });
      expect(compiled).toEqual([{ item: items[0], payload: expectedPayload }]);
    })
  );

  it.effect("rejects a hash derived from caller-selected executable code", () =>
    Effect.gen(function* () {
      const { expectedPayload, rendererManifest } = yield* makeFixture();
      const maliciousPayload = {
        ...expectedPayload,
        byteLength: 38,
        compiledCode: "return {default: () => process.env};",
      };
      const maliciousItems = makeItems(
        ReleaseIdSchema.make("test-release-bad"),
        [upsertWithArtifactHash(hashCompiledContentPayload(maliciousPayload))]
      );
      const error = yield* compileReleaseSources({
        items: Stream.fromIterable(maliciousItems),
        rendererManifest,
        sources: Stream.fromIterable([source]),
      }).pipe(Stream.runDrain, Effect.flip);
      expect(error._tag).toBe("ReleaseArtifactMismatchError");
    })
  );

  it.effect.each(identityMismatches)(
    "rejects source identity mismatch $#: $sourcePath",
    (mismatchedSource) =>
      Effect.gen(function* () {
        const { items, rendererManifest } = yield* makeFixture();
        const error = yield* compileReleaseSources({
          items: Stream.fromIterable(items),
          rendererManifest,
          sources: Stream.fromIterable([mismatchedSource]),
        }).pipe(Stream.runDrain, Effect.flip);
        expect(error).toMatchObject({ _tag: "ReleaseArtifactMismatchError" });
        expect(error.message).toContain("does not match release item");
      })
  );

  it.effect(
    "rejects missing and extra sources without collecting either stream",
    () =>
      Effect.gen(function* () {
        const { items, rendererManifest } = yield* makeFixture();
        const [missing, extra] = yield* Effect.all([
          compileReleaseSources({
            items: Stream.fromIterable(items),
            rendererManifest,
            sources: Stream.empty,
          }).pipe(Stream.runDrain, Effect.flip),
          compileReleaseSources({
            items: Stream.empty,
            rendererManifest,
            sources: Stream.fromIterable([source]),
          }).pipe(Stream.runDrain, Effect.flip),
        ]);
        expect(missing).toMatchObject({ _tag: "ReleaseArtifactMismatchError" });
        expect(missing.message).toContain("has no authored source");
        expect(extra).toMatchObject({ _tag: "ReleaseArtifactMismatchError" });
        expect(extra.message).toBe(
          "An authored source has no authenticated upsert item."
        );
      })
  );

  it.effect("propagates source stream failures unchanged", () =>
    Effect.gen(function* () {
      const { items, rendererManifest } = yield* makeFixture();
      const error = yield* compileReleaseSources({
        items: Stream.fromIterable(items),
        rendererManifest,
        sources: Stream.fail("source-failed"),
      }).pipe(Stream.runDrain, Effect.flip);
      expect(error).toBe("source-failed");
    })
  );
});
