import { NodeServices } from "@effect/platform-node";
import { assert, expect, layer } from "@effect/vitest";
import { AppLocaleSchema } from "@nakafa/aksara-contracts/locale";
import { Effect, FileSystem, Logger, Redacted } from "effect";
import { makeNakafaAppError } from "#cli/app-error";
import type { RunningNakafa } from "#cli/child/session";
import type { PreviewDocumentCompiler } from "#cli/document";
import { PreviewEvidenceError } from "#cli/evidence";
import { PreviewRepositoryError, PreviewRestartError } from "#cli/integrity";
import type { NakafaApp } from "#cli/nakafa";
import { refreshDocument } from "#cli/session";
import { makePreviewReady, PREVIEW_REPOSITORIES } from "#test/preview";
import {
  makeRepositoryTracker,
  REAL_SOURCE,
  RENDERER_MANIFEST,
} from "#test/real";
import { makeApp, makeProvider, runLocal } from "#test/session";

const repositories = makeRepositoryTracker();
const POLICY_DIAGNOSTIC_PATTERN =
  /^ExecutablePolicyError at material\/.+ \(rejected executable syntax: process \(process\)\)\.$/;
type ProviderControl = Parameters<typeof makeProvider>[0];
/** Creates pristine provider transition counts for one behavior test. */
function makeControl(): ProviderControl {
  return { failed: 0, pending: 0, ready: 0 };
}

/** Acquires one repository pair and removes it when the test scope closes. */
const acquireRepository = Effect.fn("AksaraCliTest.acquireRepository")(
  function* () {
    return yield* Effect.acquireRelease(
      Effect.sync(() => repositories.create()),
      () => Effect.sync(() => repositories.clear())
    );
  }
);

layer(NodeServices.layer)("preview document refresh", (it) => {
  it.effect("publishes success and sanitizes typed compilation failures", () =>
    Effect.gen(function* () {
      const repository = yield* acquireRepository();
      const ready = yield* makePreviewReady(repository);
      const control = makeControl();
      const provider = makeProvider(control);
      yield* refreshDocument(
        ready.compiler,
        provider,
        RENDERER_MANIFEST.hash,
        0,
        Effect.succeed(PREVIEW_REPOSITORIES)
      );
      const failure: PreviewDocumentCompiler = {
        compile: Effect.fail(
          new PreviewRepositoryError({
            kind: "document",
            path: ready.document.sourcePath,
            reason: "missing",
          })
        ),
        verify: () => Effect.void,
      };
      yield* refreshDocument(
        failure,
        provider,
        RENDERER_MANIFEST.hash,
        1,
        Effect.succeed(PREVIEW_REPOSITORIES)
      );
      expect(control).toMatchObject({ failed: 1, pending: 0, ready: 1 });
      expect(control.failure).toEqual({
        code: "PreviewRepositoryError",
        message: `PreviewRepositoryError at ${ready.document.sourcePath} (missing).`,
      });
    })
  );

  it.effect("logs actionable diagnostics from a real compiler failure", () =>
    Effect.gen(function* () {
      const fileSystem = yield* FileSystem.FileSystem;
      const repository = yield* acquireRepository();
      const ready = yield* makePreviewReady(repository);
      const control = makeControl();
      const logs: string[] = [];
      const logger = Logger.make(({ message }) => {
        logs.push(String(message));
      });
      yield* fileSystem.writeFileString(
        repository.documentPath,
        `${REAL_SOURCE}\n\n{process.env}\n`
      );
      yield* refreshDocument(
        ready.compiler,
        makeProvider(control),
        RENDERER_MANIFEST.hash,
        0,
        Effect.succeed(PREVIEW_REPOSITORIES)
      ).pipe(Effect.provide(Logger.layer([logger])));
      expect(control.failure).toEqual({
        code: "ExecutablePolicyError",
        message: expect.stringContaining("ExecutablePolicyError at material/"),
      });
      expect(logs).toEqual([expect.stringMatching(POLICY_DIAGNOSTIC_PATTERN)]);
    })
  );

  it.effect(
    "publishes current repository evidence and fails closed without it",
    () =>
      Effect.gen(function* () {
        const repository = yield* acquireRepository();
        const ready = yield* makePreviewReady(repository);
        const currentRepositories = {
          aksara: { ...PREVIEW_REPOSITORIES.aksara, dirty: true },
          nakafa: PREVIEW_REPOSITORIES.nakafa,
        };
        const control = makeControl();
        yield* refreshDocument(
          ready.compiler,
          makeProvider(control),
          RENDERER_MANIFEST.hash,
          1,
          Effect.succeed(currentRepositories)
        );
        const missingEvidence = new PreviewEvidenceError({
          repository: "aksara",
          stage: "status",
        });
        const blocked = makeControl();
        const error = yield* refreshDocument(
          ready.compiler,
          makeProvider(blocked),
          RENDERER_MANIFEST.hash,
          0,
          Effect.fail(missingEvidence)
        ).pipe(Effect.flip);
        expect(control.readyRepositories).toEqual(currentRepositories);
        expect(blocked).toMatchObject({ failed: 0, pending: 0, ready: 0 });
        expect(error).toBe(missingEvidence);
      })
  );

  it.effect("rejects source drift after repository evidence is captured", () =>
    Effect.gen(function* () {
      const fileSystem = yield* FileSystem.FileSystem;
      const repository = yield* acquireRepository();
      const ready = yield* makePreviewReady(repository);
      const control = makeControl();
      const evidence = fileSystem
        .writeFileString(repository.documentPath, `${REAL_SOURCE}\n`)
        .pipe(Effect.orDie, Effect.as(PREVIEW_REPOSITORIES));
      const result = yield* refreshDocument(
        ready.compiler,
        makeProvider(control),
        RENDERER_MANIFEST.hash,
        0,
        evidence
      );
      expect(result).toEqual(PREVIEW_REPOSITORIES);
      expect(control).toMatchObject({
        failed: 1,
        failure: {
          code: "PreviewRepositoryError",
          message: `PreviewRepositoryError at ${ready.document.sourcePath} (changed).`,
        },
        pending: 0,
        ready: 0,
      });
    })
  );

  it.effect("propagates provider failures instead of relabeling them", () =>
    Effect.gen(function* () {
      const repository = yield* acquireRepository();
      const ready = yield* makePreviewReady(repository);
      const control = { failed: 0, failReady: true, pending: 0, ready: 0 };
      const error = yield* refreshDocument(
        ready.compiler,
        makeProvider(control),
        RENDERER_MANIFEST.hash,
        0,
        Effect.succeed(PREVIEW_REPOSITORIES)
      ).pipe(Effect.flip);
      expect(error).toMatchObject({ _tag: "PreviewProviderError" });
    })
  );

  it.effect(
    "propagates restart requirements before and after compilation",
    () =>
      Effect.gen(function* () {
        const repository = yield* acquireRepository();
        const ready = yield* makePreviewReady(repository);
        const restart = new PreviewRestartError({
          sourcePath: ready.document.sourcePath,
        });
        const compileControl = makeControl();
        const compileRestart: PreviewDocumentCompiler = {
          compile: Effect.fail(restart),
          verify: () => Effect.void,
        };
        const compileError = yield* refreshDocument(
          compileRestart,
          makeProvider(compileControl),
          RENDERER_MANIFEST.hash,
          0,
          Effect.die("Repository evidence must not run after restart.")
        ).pipe(Effect.flip);
        const verifyControl = makeControl();
        const verifyRestart: PreviewDocumentCompiler = {
          compile: Effect.succeed(ready.result),
          verify: () => Effect.fail(restart),
        };
        const verifyError = yield* refreshDocument(
          verifyRestart,
          makeProvider(verifyControl),
          RENDERER_MANIFEST.hash,
          0,
          Effect.succeed(PREVIEW_REPOSITORIES)
        ).pipe(Effect.flip);
        expect(compileError).toBe(restart);
        expect(verifyError).toBe(restart);
        expect(compileControl).toEqual(makeControl());
        expect(verifyControl).toEqual(makeControl());
      })
  );
});

layer(NodeServices.layer)("local preview session", (it) => {
  it.effect(
    "opens the real selected corpus and recompiles without a child restart",
    () =>
      Effect.gen(function* () {
        const repository = yield* acquireRepository();
        const capture: {
          input?: Parameters<typeof NakafaApp.Service.start>[0];
        } = {};
        yield* runLocal(
          repository,
          makeApp(capture),
          () => {
            expect(capture.input?.provider.origin.hostname).toBe("127.0.0.1");
            return Effect.void;
          },
          AppLocaleSchema.make("en")
        );
      })
  );

  it.effect("keeps a changed route failed when initial compilation fails", () =>
    Effect.gen(function* () {
      const fileSystem = yield* FileSystem.FileSystem;
      const repository = yield* acquireRepository();
      yield* fileSystem.writeFileString(
        repository.documentPath,
        `${REAL_SOURCE}\n\n{process.env}\n`
      );
      const capture: {
        input?: Parameters<typeof NakafaApp.Service.start>[0];
      } = {};
      yield* runLocal(repository, makeApp(capture), () =>
        Effect.gen(function* () {
          const { input } = capture;
          assert(input !== undefined, "Expected preview application input.");
          const response = yield* Effect.tryPromise(() =>
            fetch(new URL(input.provider.manifestPath, input.provider.origin), {
              headers: {
                authorization: `Bearer ${Redacted.value(input.credentials.providerToken)}`,
              },
            })
          );
          const body = yield* Effect.tryPromise(() => response.json());
          expect(body).toMatchObject({ status: "failed" });
        }).pipe(Effect.orDie)
      );
    })
  );

  it.effect(
    "stops if the actual Nakafa child exits before renderer discovery",
    () =>
      Effect.gen(function* () {
        const repository = yield* acquireRepository();
        const child: RunningNakafa = {
          awaitExit: Effect.fail(makeNakafaAppError("exit", false, 1)),
          origin: new URL("http://localhost:31234"),
        };
        const error = yield* runLocal(
          repository,
          makeApp(
            {},
            child,
            Effect.sleep("20 millis").pipe(Effect.as(RENDERER_MANIFEST))
          ),
          () => Effect.void
        ).pipe(Effect.flip);
        expect(String(error)).toContain("NakafaAppError");
      })
  );
});
