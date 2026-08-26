import { realpathSync } from "node:fs";
import { basename, relative } from "node:path";
import { NodeServices } from "@effect/platform-node";
import { afterEach, describe, expect, it } from "@effect/vitest";
import {
  Deferred,
  Effect,
  Fiber,
  type FileSystem,
  PlatformError,
  Ref,
  Stream,
} from "effect";
import { TestClock } from "effect/testing";
import { PreviewProviderError } from "#cli/provider";
import { selectPreviewDocument } from "#cli/repository";
import { makeRepositoryTracker, REPOSITORY_ROOT } from "#test/real";
import { runWatch } from "#test/session";

const repositories = makeRepositoryTracker();
const questionPath =
  "packages/corpus/question-bank/tryout/indonesia/snbt/general-knowledge/set-2/question-1/question.en.mdx";
const answerPath =
  "packages/corpus/question-bank/tryout/indonesia/snbt/general-knowledge/set-2/question-1/answer.en.mdx";

afterEach(() => {
  repositories.clear();
});

/** Creates one portable filesystem update event. */
function updateEvent(path: string): FileSystem.WatchEvent {
  return { _tag: "Update", path };
}

/** Creates one portable filesystem create event. */
function createEvent(path: string): FileSystem.WatchEvent {
  return { _tag: "Create", path };
}

describe("selected document watch", () => {
  it.effect(
    "filters siblings, refreshes the selected file, and stays active",
    () =>
      Effect.gen(function* () {
        const repository = repositories.create();
        const aksaraRoot = realpathSync(repository.aksaraRoot);
        const selected = yield* selectPreviewDocument(
          aksaraRoot,
          relative(aksaraRoot, realpathSync(repository.documentPath))
        ).pipe(Effect.provide(NodeServices.layer));
        const events = Stream.concat(
          Stream.make(
            updateEvent("id.mdx"),
            updateEvent(basename(selected.files[0].absolutePath))
          ),
          Stream.never
        );
        const count = yield* Ref.make(0);
        const watcher = yield* runWatch(selected, events, () =>
          Ref.update(count, (value) => value + 1)
        ).pipe(Effect.forkChild({ startImmediately: true }));
        yield* TestClock.adjust("150 millis");
        const refreshes = yield* Ref.get(count);
        const watcherRunning = watcher.pollUnsafe() === undefined;
        yield* Fiber.interrupt(watcher);
        expect(refreshes).toBe(1);
        expect(watcherRunning).toBe(true);
      })
  );

  it("invalidates every burst save while retaining only the latest queued compile", {
    timeout: 10_000,
  }, async () => {
    const repository = repositories.create();
    const aksaraRoot = realpathSync(repository.aksaraRoot);
    const selected = await Effect.runPromise(
      selectPreviewDocument(
        aksaraRoot,
        relative(aksaraRoot, realpathSync(repository.documentPath))
      ).pipe(Effect.provide(NodeServices.layer))
    );
    const focused = {
      directories: [],
      document: selected.document,
      files: [selected.files[0]],
      sources: [selected.sources[0]],
    } satisfies typeof selected;
    const event = updateEvent(basename(focused.files[0].absolutePath));
    const observed = await Effect.runPromise(
      Effect.gen(function* () {
        const firstStarted = yield* Deferred.make<void>();
        const releaseFirst = yield* Deferred.make<void>();
        const latestInvalidated = yield* Deferred.make<void>();
        const latestRefreshed = yield* Deferred.make<void>();
        const generations = yield* Ref.make(0);
        const refreshed = yield* Ref.make<number[]>([]);
        const burst = Stream.fromIterable([event, event, event, event]).pipe(
          Stream.mapEffect((next) =>
            Effect.sleep("150 millis").pipe(Effect.as(next))
          )
        );
        const events = Stream.concat(
          Stream.make(event),
          Stream.fromEffect(Deferred.await(firstStarted)).pipe(
            Stream.flatMap(() => burst)
          )
        );
        const invalidate = Ref.updateAndGet(
          generations,
          (generation) => generation + 1
        ).pipe(
          Effect.tap((generation) =>
            generation === 5
              ? Deferred.succeed(latestInvalidated, undefined)
              : Effect.void
          )
        );
        /** Holds the active compile while later generations replace each other. */
        const refresh = (generation: number) =>
          Ref.update(refreshed, (all) => [...all, generation]).pipe(
            Effect.andThen(
              generation === 1
                ? Deferred.succeed(firstStarted, undefined).pipe(
                    Effect.andThen(Deferred.await(releaseFirst))
                  )
                : Effect.when(
                    Deferred.succeed(latestRefreshed, undefined),
                    Effect.succeed(generation === 5)
                  )
            )
          );
        const watcher = yield* runWatch(
          focused,
          events,
          refresh,
          new Map(),
          invalidate
        ).pipe(Effect.forkChild);
        yield* Deferred.await(firstStarted);
        yield* Deferred.await(latestInvalidated);
        yield* Effect.sleep("150 millis");
        yield* Deferred.succeed(releaseFirst, undefined);
        yield* Deferred.await(latestRefreshed);
        const result = {
          generations: yield* Ref.get(generations),
          refreshed: yield* Ref.get(refreshed),
        };
        yield* Fiber.interrupt(watcher);
        return result;
      })
    );

    expect(observed).toEqual({ generations: 5, refreshed: [1, 5] });
  });

  it.effect(
    "watches one question body closure and its choices dependency",
    () =>
      Effect.gen(function* () {
        const selected = yield* selectPreviewDocument(
          realpathSync(REPOSITORY_ROOT),
          answerPath
        ).pipe(Effect.provide(NodeServices.layer));
        const events = Stream.concat(
          Stream.make(updateEvent("choices.ts")),
          Stream.never
        );
        const count = yield* Ref.make(0);
        const watcher = yield* runWatch(selected, events, () =>
          Ref.update(count, (value) => value + 1)
        ).pipe(Effect.forkChild({ startImmediately: true }));
        yield* TestClock.adjust("75 millis");
        const refreshes = yield* Ref.get(count);
        yield* Fiber.interrupt(watcher);
        expect(selected.files.map(({ sourcePath }) => sourcePath)).toEqual([
          questionPath,
          "packages/corpus/question-bank/tryout/indonesia/snbt/general-knowledge/set-2/question-1/choices.ts",
          "packages/corpus/tryout/registry.ts",
          "packages/corpus/tryout/indonesia/snbt/source.ts",
          "packages/corpus/tryout/indonesia/country.ts",
          "packages/corpus/tryout/schema.ts",
          "packages/corpus/locale/source.ts",
          "packages/corpus/route/schema.ts",
          answerPath,
        ]);
        expect(refreshes).toBe(1);
      }),
    { timeout: 30_000 }
  );

  it("requires a restart instead of compiling stale topology", async () => {
    const selected = await Effect.runPromise(
      selectPreviewDocument(realpathSync(REPOSITORY_ROOT), questionPath).pipe(
        Effect.provide(NodeServices.layer)
      )
    );
    const result = await Effect.runPromise(
      Effect.gen(function* () {
        const refreshes = yield* Ref.make(0);
        const error = yield* runWatch(
          selected,
          Stream.make(updateEvent("source.ts")),
          () => Ref.update(refreshes, (value) => value + 1)
        ).pipe(Effect.flip);
        return { error, refreshes: yield* Ref.get(refreshes) };
      })
    );

    expect(result.error).toMatchObject({
      _tag: "PreviewRestartError",
      sourcePath: "packages/corpus/tryout/indonesia/snbt/source.ts",
    });
    expect(result.refreshes).toBe(0);
  });

  it("rejects persistent strict-directory membership changes", async () => {
    const selected = await Effect.runPromise(
      selectPreviewDocument(realpathSync(REPOSITORY_ROOT), questionPath).pipe(
        Effect.provide(NodeServices.layer)
      )
    );
    const [directory] = selected.directories;
    expect(directory).toBeDefined();
    if (directory === undefined) {
      return;
    }
    const changedFiles = new Map([
      [directory.absolutePath, [...directory.files, "draft.mdx"]],
    ]);
    const error = await Effect.runPromise(
      runWatch(
        selected,
        Stream.make(createEvent("draft.mdx")),
        () => Effect.void,
        changedFiles
      ).pipe(Effect.flip)
    );

    expect(error).toMatchObject({
      _tag: "PreviewRestartError",
      sourcePath: directory.sourcePath,
    });
  });

  it("ignores unselected events after stable membership is restored", async () => {
    const selected = await Effect.runPromise(
      selectPreviewDocument(realpathSync(REPOSITORY_ROOT), questionPath).pipe(
        Effect.provide(NodeServices.layer)
      )
    );
    const error = await Effect.runPromise(
      runWatch(selected, Stream.make(createEvent("draft.mdx")), () =>
        Effect.die("refresh must not run")
      ).pipe(Effect.flip)
    );

    expect(error).toMatchObject({ reason: "ended" });
  });

  it("distinguishes provider, filesystem, and ended watch failures", async () => {
    const repository = repositories.create();
    const aksaraRoot = realpathSync(repository.aksaraRoot);
    const selected = await Effect.runPromise(
      selectPreviewDocument(
        aksaraRoot,
        relative(aksaraRoot, realpathSync(repository.documentPath))
      ).pipe(Effect.provide(NodeServices.layer))
    );
    const selectedEvent = updateEvent(basename(selected.files[0].absolutePath));
    const provider = await Effect.runPromise(
      runWatch(selected, Stream.make(selectedEvent), () =>
        Effect.fail(new PreviewProviderError({ stage: "encode" }))
      ).pipe(Effect.flip)
    );
    const fileError = PlatformError.systemError({
      _tag: "Unknown",
      method: "watch",
      module: "FileSystem",
    });
    const filesystem = await Effect.runPromise(
      runWatch(selected, Stream.fail(fileError), () => Effect.void).pipe(
        Effect.flip
      )
    );
    const ended = await Effect.runPromise(
      runWatch(selected, Stream.empty, () => Effect.void).pipe(Effect.flip)
    );

    expect(provider).toMatchObject({ _tag: "PreviewProviderError" });
    expect(filesystem).toMatchObject({ reason: "filesystem" });
    expect(ended).toMatchObject({ reason: "ended" });
  });
});
