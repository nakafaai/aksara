import type { Command } from "@effect/platform/Command";
import {
  CommandExecutor,
  type CommandExecutor as CommandExecutorService,
} from "@effect/platform/CommandExecutor";
import { CompileDocumentSourceSchema } from "@nakafaai/aksara-contracts/content";
import {
  ContentKeySchema,
  CorpusSourcePathSchema,
  GitCommitShaSchema,
  ReleaseIdSchema,
  Sha256HashSchema,
} from "@nakafaai/aksara-contracts/ids";
import { ContentReleaseItemSchema } from "@nakafaai/aksara-contracts/release";
import { Effect, Stream } from "effect";
import { describe, expect, it } from "vitest";
import { GitPublicationSourceLive } from "#publisher/git/source";
import {
  PublicationSource,
  type PublicationSourceError,
} from "#publisher/publication/spec";
import { inspectTestCommand, makeTestExecutor } from "#test/command";

const TEST_AKSARA_SHA = GitCommitShaSchema.make("a".repeat(40));
const TEST_RELEASE_ID = ReleaseIdSchema.make("test-git-publication-source");
const TEST_ARTIFACT_HASH = Sha256HashSchema.make(`sha256:${"b".repeat(64)}`);
const TEST_REPOSITORY_ROOT = "/test-only/aksara";
const TEST_SOURCES = [
  CompileDocumentSourceSchema.make({
    contentKey: ContentKeySchema.make("test:git-source-first"),
    locale: "en",
    rawMdx: "export const testProtocolFirst = true;\n",
    rendererDomain: "material-mathematics",
    sourcePath: CorpusSourcePathSchema.make(
      "packages/corpus/test-protocol/first/en.mdx"
    ),
  }),
  CompileDocumentSourceSchema.make({
    contentKey: ContentKeySchema.make("test:git-source-second"),
    locale: "id",
    rawMdx: "export const testProtocolSecond = true;\n",
    rendererDomain: "material-chemistry",
    sourcePath: CorpusSourcePathSchema.make(
      "packages/corpus/test-protocol/second/id.mdx"
    ),
  }),
];
const TEST_ITEMS = TEST_SOURCES.map((source, index) =>
  ContentReleaseItemSchema.make({
    change: {
      artifactHash: TEST_ARTIFACT_HASH,
      contentKey: source.contentKey,
      delivery: "public",
      locale: source.locale,
      operation: "upsert",
      rendererDomain: source.rendererDomain,
      sourcePath: source.sourcePath,
    },
    index,
    releaseId: TEST_RELEASE_ID,
  })
);

/** Loads publication sources through the live exact-Git source layer. */
function loadTestSources(executor: CommandExecutorService, items = TEST_ITEMS) {
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
    Effect.provide(GitPublicationSourceLive),
    Effect.provideService(CommandExecutor, executor)
  );
}

/** Responds to the three allowed Git command shapes for source-layer tests. */
function gitResponder(command: Command) {
  const { args } = inspectTestCommand(command);
  const [replacePolicy, operation, detail, blob] = args;
  if (replacePolicy !== "--no-replace-objects") {
    return Effect.die("Test-only Git command allowed replacement refs.");
  }
  if (operation === "rev-parse" && detail === "--show-toplevel") {
    return Effect.succeed({ stdout: `${TEST_REPOSITORY_ROOT}\n` });
  }
  if (operation === "rev-parse") {
    return Effect.succeed({ stdout: `${TEST_AKSARA_SHA}\n` });
  }
  const source = TEST_SOURCES.find(
    (candidate) => `${TEST_AKSARA_SHA}:${candidate.sourcePath}` === blob
  );
  if (!source) {
    return Effect.die("Test-only unexpected Git blob request.");
  }
  if (detail === "-s") {
    return Effect.succeed({
      stdout: `${new TextEncoder().encode(source.rawMdx).byteLength}\n`,
    });
  }
  return Effect.succeed({ stdout: source.rawMdx });
}

describe("GitPublicationSourceLive", () => {
  it("pairs ordered authenticated identities with their exact Git blobs", async () => {
    const sources = await Effect.runPromise(
      loadTestSources(makeTestExecutor(gitResponder))
    );
    expect(sources).toEqual(TEST_SOURCES);
  });

  it("rejects a delete item instead of inventing source coordinates", async () => {
    const deleteItem = ContentReleaseItemSchema.make({
      change: {
        contentKey: ContentKeySchema.make("test:git-source-delete"),
        locale: "en",
        operation: "delete",
      },
      index: 0,
      releaseId: TEST_RELEASE_ID,
    });
    const error = await Effect.runPromise(
      loadTestSources(makeTestExecutor(gitResponder), [deleteItem]).pipe(
        Effect.flip
      )
    );
    expect(error).toMatchObject({
      _tag: "PublicationSourceError",
      aksaraSha: TEST_AKSARA_SHA,
    });
    expect(error.message).toContain("upsert items only");
  });

  it("maps exact-Git failures to the publication source error contract", async () => {
    let commandIndex = 0;
    const executor = makeTestExecutor(() =>
      Effect.sync(() => {
        commandIndex += 1;
        return {
          stdout: commandIndex === 1 ? TEST_REPOSITORY_ROOT : "test-branch\n",
        };
      })
    );
    const error: PublicationSourceError = await Effect.runPromise(
      loadTestSources(executor, TEST_ITEMS.slice(0, 1)).pipe(Effect.flip)
    );
    expect(error).toMatchObject({
      _tag: "PublicationSourceError",
      aksaraSha: TEST_AKSARA_SHA,
      cause: { _tag: "GitBlobError", operation: "resolve-commit" },
    });
  });
});
