import { describe, expect, it } from "@effect/vitest";
import { CompileDocumentSourceSchema } from "@nakafa/aksara-contracts/content";
import {
  ContentKeySchema,
  CorpusSourcePathSchema,
  GitCommitShaSchema,
  ReleaseIdSchema,
  Sha256HashSchema,
} from "@nakafa/aksara-contracts/ids";
import { ArtifactLocaleSchema } from "@nakafa/aksara-contracts/locale";
import { ContentReleaseItemSchema } from "@nakafa/aksara-contracts/release";
import { ExactProcess } from "@nakafa/aksara-utilities/process/exact";
import { Effect, Stream } from "effect";
import { makeGitPublicationSourceLive } from "#publisher/git/source";
import {
  PublicationSource,
  type PublicationSourceError,
} from "#publisher/publication/spec";

const TEST_AKSARA_SHA = GitCommitShaSchema.make("a".repeat(40));
const TEST_RELEASE_ID = ReleaseIdSchema.make("test-git-publication-source");
const TEST_ARTIFACT_HASH = Sha256HashSchema.make(`sha256:${"b".repeat(64)}`);
const TEST_REPOSITORY_ROOT = "/test-only/aksara";
const TEST_SOURCES = [
  CompileDocumentSourceSchema.make({
    artifactLocale: ArtifactLocaleSchema.make("en"),
    contentKey: ContentKeySchema.make("test:git-source-first"),
    rawMdx: "export const testProtocolFirst = true;\n",
    rendererDomain: "mathematics",
    sourcePath: CorpusSourcePathSchema.make(
      "packages/corpus/test-protocol/first/en.mdx"
    ),
  }),
  CompileDocumentSourceSchema.make({
    artifactLocale: ArtifactLocaleSchema.make("id"),
    contentKey: ContentKeySchema.make("test:git-source-second"),
    rawMdx: "export const testProtocolSecond = true;\n",
    rendererDomain: "chemistry",
    sourcePath: CorpusSourcePathSchema.make(
      "packages/corpus/test-protocol/second/id.mdx"
    ),
  }),
];
const TEST_ITEMS = TEST_SOURCES.map((source, index) =>
  ContentReleaseItemSchema.make({
    change: {
      artifactHash: TEST_ARTIFACT_HASH,
      artifactLocale: source.artifactLocale,
      contentKey: source.contentKey,
      delivery: "public",
      family: "material",
      operation: "upsert",
      rendererDomain: source.rendererDomain,
      sourcePath: source.sourcePath,
    },
    index,
    releaseId: TEST_RELEASE_ID,
  })
);

/** Loads publication sources through the live exact-Git source layer. */
function loadTestSources(
  exactProcess: typeof ExactProcess.Service,
  items = TEST_ITEMS
) {
  return PublicationSource.pipe(
    Effect.flatMap((publicationSource) =>
      publicationSource
        .loadExactRevision({
          aksaraSha: TEST_AKSARA_SHA,
          items: Stream.fromIterable(items),
        })
        .pipe(
          Stream.runCollect,
          Effect.map((sources) => [...sources])
        )
    ),
    Effect.provide(makeGitPublicationSourceLive(TEST_REPOSITORY_ROOT)),
    Effect.provideService(ExactProcess, exactProcess)
  );
}

/** Responds to the exact revision and blob command shapes used by the layer. */
function gitResponder() {
  return ExactProcess.of({
    /** Returns one deterministic exact Git response for source tests. */
    run: (input) =>
      Effect.gen(function* () {
        const [, , replacePolicy, operation] = input.args;
        if (replacePolicy !== "--no-replace-objects") {
          return yield* Effect.die(
            "Test-only Git command allowed replacement refs."
          );
        }
        if (operation === "rev-parse") {
          return {
            exitCode: 0,
            stderr: new Uint8Array(),
            stdout: new TextEncoder().encode(`${TEST_AKSARA_SHA}\n`),
          };
        }
        const coordinates = new TextDecoder()
          .decode(input.stdin)
          .trimEnd()
          .split("\n");
        const sources: (typeof TEST_SOURCES)[number][] = [];
        for (const coordinate of coordinates) {
          const source = TEST_SOURCES.find(
            (candidate) =>
              `${TEST_AKSARA_SHA}:${candidate.sourcePath}` === coordinate
          );
          if (source === undefined) {
            return yield* Effect.die("Test-only unexpected Git blob request.");
          }
          sources.push(source);
        }
        const frames = sources.map((source) => {
          const bytes = new TextEncoder().encode(source.rawMdx);
          return `${"b".repeat(40)} blob ${bytes.byteLength}\n${source.rawMdx}\n`;
        });
        return {
          exitCode: 0,
          stderr: new Uint8Array(),
          stdout: new TextEncoder().encode(frames.join("")),
        };
      }),
  });
}

describe("GitPublicationSourceLive", () => {
  it("pairs ordered authenticated identities with their exact Git blobs", async () => {
    const sources = await Effect.runPromise(loadTestSources(gitResponder()));
    expect(sources).toEqual(TEST_SOURCES);
  });

  it("rejects a delete item instead of inventing source coordinates", async () => {
    const deleteItem = ContentReleaseItemSchema.make({
      change: {
        artifactLocale: ArtifactLocaleSchema.make("en"),
        contentKey: ContentKeySchema.make("test:git-source-delete"),
        family: "material",
        operation: "delete",
      },
      index: 0,
      releaseId: TEST_RELEASE_ID,
    });
    const error = await Effect.runPromise(
      loadTestSources(gitResponder(), [deleteItem]).pipe(Effect.flip)
    );
    expect(error).toMatchObject({
      _tag: "PublicationSourceError",
      aksaraSha: TEST_AKSARA_SHA,
    });
    expect(error.message).toContain("upsert items only");
  });

  it("maps exact-Git failures to the publication source error contract", async () => {
    const exactProcess = ExactProcess.of({
      /** Returns one invalid reviewed revision for source error mapping. */
      run: () =>
        Effect.succeed({
          exitCode: 0,
          stderr: new Uint8Array(),
          stdout: new TextEncoder().encode("test-branch\n"),
        }),
    });
    const error: PublicationSourceError = await Effect.runPromise(
      loadTestSources(exactProcess, TEST_ITEMS.slice(0, 1)).pipe(Effect.flip)
    );
    expect(error).toMatchObject({
      _tag: "PublicationSourceError",
      aksaraSha: TEST_AKSARA_SHA,
      cause: { _tag: "GitBlobError", operation: "resolve-commit" },
    });
  });
});
