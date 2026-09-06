import { describe, expect, it } from "@effect/vitest";
import {
  type CompileDocumentSource,
  CompileDocumentSourceSchema,
} from "@nakafa/aksara-contracts/content";
import {
  ContentKeySchema,
  CorpusSourcePathSchema,
  ReleaseIdSchema,
  Sha256HashSchema,
} from "@nakafa/aksara-contracts/ids";
import { ArtifactLocaleSchema } from "@nakafa/aksara-contracts/locale";
import { ContentReleaseItemSchema } from "@nakafa/aksara-contracts/release";
import {
  ExactProcess,
  type ExactProcessInput,
} from "@nakafa/aksara-utilities/process/exact";
import { Deferred, Effect, Fiber, Stream } from "effect";
import { MAX_GIT_BATCH_BLOBS } from "#publisher/git/batch";
import { makeGitPublicationSourceLive } from "#publisher/git/source";
import {
  PublicationSource,
  PublicationSourceError,
} from "#publisher/publication/spec";
import {
  makeGitProcess,
  TEST_COMMIT_SHA,
  TEST_RAW_MDX,
  TEST_REPOSITORY_ROOT,
} from "#test/git";

const releaseId = ReleaseIdSchema.make("test-git-publication-source");
const artifactHash = Sha256HashSchema.make(`sha256:${"b".repeat(64)}`);

/** Creates explicitly test-only sources with distinct immutable coordinates. */
function sources(count: number) {
  return Array.from({ length: count }, (_, index) =>
    CompileDocumentSourceSchema.make({
      artifactLocale: ArtifactLocaleSchema.make("en"),
      contentKey: ContentKeySchema.make(`test:git-source-${index}`),
      rawMdx: `${TEST_RAW_MDX}${index}\n`,
      rendererDomain: "mathematics",
      sourcePath: CorpusSourcePathSchema.make(
        `packages/corpus/test-protocol/${index}/en.mdx`
      ),
    })
  );
}

/** Associates each test source with its signed release-item identity. */
function itemsFor(input: readonly CompileDocumentSource[]) {
  return input.map((source, index) =>
    ContentReleaseItemSchema.make({
      change: {
        artifactHash,
        artifactLocale: source.artifactLocale,
        contentKey: source.contentKey,
        delivery: "public",
        family: "material",
        operation: "upsert",
        rendererDomain: source.rendererDomain,
        sourcePath: source.sourcePath,
      },
      index,
      releaseId,
    })
  );
}

/** Supplies the exact raw bytes for the selected test-only source paths. */
function sourceProcess(
  input: readonly CompileDocumentSource[],
  commands?: ExactProcessInput[]
) {
  return makeGitProcess(
    {
      blobs: new Map(
        input.map((source) => [
          source.sourcePath,
          new TextEncoder().encode(source.rawMdx),
        ])
      ),
    },
    commands
  );
}

/** Collects at most the requested number of sources through the live adapter. */
const loadSources = Effect.fn("GitPublicationSourceTest.load")(
  (
    process: typeof ExactProcess.Service,
    items: Stream.Stream<
      ReturnType<typeof itemsFor>[number],
      PublicationSourceError
    >,
    limit = Number.POSITIVE_INFINITY
  ) =>
    PublicationSource.pipe(
      Effect.flatMap((source) =>
        source
          .loadExactRevision({ aksaraSha: TEST_COMMIT_SHA, items })
          .pipe(Stream.take(limit), Stream.runCollect)
      ),
      Effect.provide(makeGitPublicationSourceLive(TEST_REPOSITORY_ROOT)),
      Effect.provideService(ExactProcess, process)
    )
);

describe("GitPublicationSourceLive", () => {
  it.effect(
    "reads 257 sources in three bounded batches while preserving signed order",
    () =>
      Effect.gen(function* () {
        const input = sources(257).reverse();
        const commands: ExactProcessInput[] = [];
        expect(
          yield* loadSources(
            sourceProcess(input, commands),
            Stream.fromIterable(itemsFor(input))
          )
        ).toEqual(input);
        expect(commands).toHaveLength(9);
        const metadata = commands.filter(({ args }) =>
          args.includes("--batch-check")
        );
        expect(
          metadata.map(
            ({ stdin }) =>
              new TextDecoder().decode(stdin).trimEnd().split("\n").length
          )
        ).toEqual([128, 128, 1]);
        expect(
          commands.filter(({ args }) => args.includes("--batch"))
        ).toHaveLength(3);
      })
  );

  it.effect(
    "reads a shared physical path once without discarding item identities",
    () =>
      Effect.gen(function* () {
        const [first] = sources(1);
        if (!first) {
          return yield* Effect.die("Missing test source.");
        }
        const duplicate = CompileDocumentSourceSchema.make({
          ...first,
          contentKey: ContentKeySchema.make("test:git-source-shared"),
        });
        const input = [first, duplicate];
        const commands: ExactProcessInput[] = [];
        expect(
          yield* loadSources(
            sourceProcess(input, commands),
            Stream.fromIterable(itemsFor(input))
          )
        ).toEqual(input);
        expect(new TextDecoder().decode(commands[1]?.stdin)).toBe(
          `${TEST_COMMIT_SHA}:${first.sourcePath}\n`
        );
      })
  );

  it.effect(
    "stops before the next batch when the consumer takes one source",
    () =>
      Effect.gen(function* () {
        const input = sources(257);
        const commands: ExactProcessInput[] = [];
        let pulled = 0;
        const items = Stream.fromIterable(itemsFor(input)).pipe(
          Stream.mapEffect((item) =>
            Effect.sync(() => {
              pulled += 1;
              return item;
            })
          )
        );
        expect(
          yield* loadSources(sourceProcess(input, commands), items, 1)
        ).toEqual(input.slice(0, 1));
        expect(pulled).toBe(MAX_GIT_BATCH_BLOBS);
        expect(commands).toHaveLength(3);
      })
  );

  it.effect(
    "does not start Git for empty input or a failed upstream batch",
    () =>
      Effect.gen(function* () {
        const commands: ExactProcessInput[] = [];
        const process = sourceProcess([], commands);
        expect(yield* loadSources(process, Stream.empty)).toEqual([]);
        const failure = new PublicationSourceError({
          aksaraSha: TEST_COMMIT_SHA,
          cause: "test-upstream-failure",
          message: "Test-only upstream failure.",
        });
        const error = yield* loadSources(process, Stream.fail(failure)).pipe(
          Effect.flip
        );
        expect(error).toBe(failure);
        expect(commands).toEqual([]);
      })
  );

  it.effect(
    "rejects a delete item before reading any source in its batch",
    () =>
      Effect.gen(function* () {
        const commands: ExactProcessInput[] = [];
        const deletion = ContentReleaseItemSchema.make({
          change: {
            artifactLocale: ArtifactLocaleSchema.make("en"),
            contentKey: ContentKeySchema.make("test:git-source-delete"),
            family: "material",
            operation: "delete",
          },
          index: 0,
          releaseId,
        });
        const error = yield* loadSources(
          sourceProcess([], commands),
          Stream.make(deletion)
        ).pipe(Effect.flip);
        expect(error).toMatchObject({
          _tag: "PublicationSourceError",
          aksaraSha: TEST_COMMIT_SHA,
        });
        expect(error.message).toContain("upsert items only");
        expect(commands).toEqual([]);
      })
  );

  it.effect("maps exact-Git failures without losing their operation", () =>
    Effect.gen(function* () {
      const error = yield* loadSources(
        makeGitProcess({ revision: "test-branch\n" }),
        Stream.fromIterable(itemsFor(sources(1)))
      ).pipe(Effect.flip);
      expect(error).toMatchObject({
        _tag: "PublicationSourceError",
        aksaraSha: TEST_COMMIT_SHA,
        cause: { _tag: "GitBlobError", operation: "resolve-commit" },
      });
    })
  );

  it.effect(
    "cancels the active Git process without starting another batch",
    () =>
      Effect.gen(function* () {
        const started = yield* Deferred.make<void>();
        const released = yield* Deferred.make<void>();
        let calls = 0;
        const process = ExactProcess.of({
          /** Holds the first subprocess until stream cancellation runs its finalizer. */
          run: () =>
            Effect.gen(function* () {
              calls += 1;
              yield* Deferred.succeed(started, undefined);
              return yield* Effect.never;
            }).pipe(Effect.ensuring(Deferred.succeed(released, undefined))),
        });
        const fiber = yield* loadSources(
          process,
          Stream.fromIterable(itemsFor(sources(257)))
        ).pipe(Effect.forkChild);
        yield* Deferred.await(started);
        yield* Fiber.interrupt(fiber);
        yield* Deferred.await(released);
        expect(calls).toBe(1);
      })
  );
});
