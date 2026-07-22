import { existsSync, realpathSync, writeFileSync } from "node:fs";
import { basename, relative } from "node:path";
import { FileSystem, Error as PlatformError } from "@effect/platform";
import { NodeContext } from "@effect/platform-node";
import { Effect, Redacted, Ref, Stream } from "effect";
import { afterEach, describe, expect, it } from "vitest";
import { makeNakafaAppError } from "#cli/app-error";
import type { RunningNakafa } from "#cli/child";
import {
  type PreviewDocumentCompiler,
  PreviewMetadataError,
} from "#cli/document";
import type { NakafaApp } from "#cli/nakafa";
import { PreviewProviderError } from "#cli/provider";
import { selectPreviewDocument } from "#cli/repository";
import { refreshDocument } from "#cli/session";
import { makePreviewReady } from "#test/preview";
import {
  makeTestRepositories,
  REAL_SOURCE,
  RENDERER_MANIFEST,
  removeTestRepositories,
  type TestRepositories,
} from "#test/real";
import { makeApp, makeProvider, runLocal, runWatch } from "#test/session";

const repositories: TestRepositories[] = [];

afterEach(() => {
  for (const repository of repositories.splice(0)) {
    if (existsSync(repository.root)) {
      removeTestRepositories(repository);
    }
  }
});

/** Creates and tracks one isolated real-corpus checkout pair. */
function makeRepositories() {
  const repository = makeTestRepositories();
  repositories.push(repository);
  return repository;
}

describe("preview document refresh", () => {
  it("publishes success and sanitizes typed compilation failures", async () => {
    const repository = makeRepositories();
    const ready = await makePreviewReady(repository);
    const control = { failed: 0, pending: 0, ready: 0 };
    const provider = makeProvider(control);
    const success: PreviewDocumentCompiler = {
      compile: () => Effect.succeed(ready.result),
    };
    await Effect.runPromise(
      refreshDocument(success, provider, RENDERER_MANIFEST.hash).pipe(
        Effect.provide(NodeContext.layer)
      )
    );
    const failure: PreviewDocumentCompiler = {
      compile: () =>
        Effect.fail(
          new PreviewMetadataError({ sourcePath: ready.document.sourcePath })
        ),
    };
    await Effect.runPromise(
      refreshDocument(failure, provider, RENDERER_MANIFEST.hash).pipe(
        Effect.provide(NodeContext.layer)
      )
    );

    expect(control).toEqual({ failed: 1, pending: 2, ready: 1 });
  });

  it("propagates provider failures instead of relabeling them", async () => {
    const repository = makeRepositories();
    const ready = await makePreviewReady(repository);
    const control = { failed: 0, failPending: true, pending: 0, ready: 0 };
    const error = await Effect.runPromise(
      refreshDocument(
        { compile: () => Effect.succeed(ready.result) },
        makeProvider(control),
        RENDERER_MANIFEST.hash
      ).pipe(Effect.provide(NodeContext.layer), Effect.flip)
    );
    expect(error).toMatchObject({ _tag: "PreviewProviderError" });
  });
});

describe("selected document watch", () => {
  it("filters siblings, refreshes the selected file, and stays active", async () => {
    const repository = makeRepositories();
    const aksaraRoot = realpathSync(repository.aksaraRoot);
    const selected = await Effect.runPromise(
      selectPreviewDocument(
        aksaraRoot,
        relative(aksaraRoot, realpathSync(repository.documentPath))
      ).pipe(Effect.provide(NodeContext.layer))
    );
    const count = await Effect.runPromise(Ref.make(0));
    const events = Stream.concat(
      Stream.make(
        FileSystem.WatchEventUpdate({ path: "id.mdx" }),
        FileSystem.WatchEventUpdate({ path: basename(selected.absolutePath) })
      ),
      Stream.never
    );
    const result = await Effect.runPromise(
      runWatch(
        selected,
        events,
        Ref.update(count, (value) => value + 1)
      ).pipe(
        Effect.timeoutFail({
          duration: "150 millis",
          onTimeout: () => "timeout" as const,
        }),
        Effect.flip
      )
    );

    expect(result).toBe("timeout");
    expect(await Effect.runPromise(Ref.get(count))).toBe(1);
  });

  it("distinguishes provider, filesystem, and ended watch failures", async () => {
    const repository = makeRepositories();
    const aksaraRoot = realpathSync(repository.aksaraRoot);
    const selected = await Effect.runPromise(
      selectPreviewDocument(
        aksaraRoot,
        relative(aksaraRoot, realpathSync(repository.documentPath))
      ).pipe(Effect.provide(NodeContext.layer))
    );
    const selectedEvent = FileSystem.WatchEventUpdate({
      path: basename(selected.absolutePath),
    });
    const provider = await Effect.runPromise(
      runWatch(
        selected,
        Stream.make(selectedEvent),
        Effect.fail(new PreviewProviderError({ stage: "encode" }))
      ).pipe(Effect.flip)
    );
    const fileError = new PlatformError.SystemError({
      method: "watch",
      module: "FileSystem",
      reason: "Unknown",
    });
    const filesystem = await Effect.runPromise(
      runWatch(selected, Stream.fail(fileError), Effect.void).pipe(Effect.flip)
    );
    const ended = await Effect.runPromise(
      runWatch(selected, Stream.empty, Effect.void).pipe(Effect.flip)
    );

    expect(provider).toMatchObject({ _tag: "PreviewProviderError" });
    expect(filesystem).toMatchObject({ reason: "filesystem" });
    expect(ended).toMatchObject({ reason: "ended" });
  });
});

describe("local preview session", () => {
  it("opens the real selected corpus and recompiles without a child restart", async () => {
    const repository = makeRepositories();
    const capture: { input?: Parameters<NakafaApp["Type"]["start"]>[0] } = {};
    await runLocal(repository, makeApp(capture), (session) =>
      session.refresh().pipe(
        Effect.flatMap(() => {
          expect(session.origin.hostname).toBe("127.0.0.1");
          expect(capture.input?.provider.origin).toEqual(session.origin);
          return Effect.void;
        })
      )
    );
  });

  it("keeps a changed route failed when initial compilation fails", async () => {
    const repository = makeRepositories();
    writeFileSync(repository.documentPath, `${REAL_SOURCE}\n\n{process.env}\n`);
    const capture: { input?: Parameters<NakafaApp["Type"]["start"]>[0] } = {};
    await runLocal(repository, makeApp(capture), () =>
      Effect.tryPromise(async () => {
        const { input } = capture;
        if (!input) {
          throw new Error("The test Nakafa app did not receive preview input.");
        }
        const response = await fetch(
          new URL(input.provider.manifestPath, input.provider.origin),
          {
            headers: {
              authorization: `Bearer ${Redacted.value(input.credentials.token)}`,
            },
          }
        );
        expect(await response.json()).toMatchObject({ status: "failed" });
      })
    );
  });

  it("stops if the actual Nakafa child exits before renderer discovery", async () => {
    const repository = makeRepositories();
    const child: RunningNakafa = {
      awaitExit: Effect.fail(makeNakafaAppError("exit", false, 1)),
      origin: new URL("http://127.0.0.1:31234"),
    };
    const error = await runLocal(
      repository,
      makeApp(
        {},
        child,
        Effect.sleep("20 millis").pipe(Effect.as(RENDERER_MANIFEST))
      ),
      () => Effect.void
    ).then(
      () => undefined,
      (cause: unknown) => cause
    );

    expect(String(error)).toContain("NakafaAppError");
  });
});
