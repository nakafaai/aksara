import { writeFileSync } from "node:fs";
import { NodeServices } from "@effect/platform-node";
import { afterEach, expect, layer } from "@effect/vitest";
import { Effect, Logger } from "effect";

import type { PreviewDocumentCompiler } from "#cli/document";
import { PreviewEvidenceError } from "#cli/evidence";
import { PreviewRepositoryError, PreviewRestartError } from "#cli/integrity";
import { refreshDocument } from "#cli/session";
import { makePreviewReady, PREVIEW_REPOSITORIES } from "#test/preview";
import {
  makeRepositoryTracker,
  REAL_SOURCE,
  RENDERER_MANIFEST,
} from "#test/real";
import { makeProvider } from "#test/session";

const repositories = makeRepositoryTracker();
const POLICY_DIAGNOSTIC_PATTERN =
  /^ExecutablePolicyError at material\/.+ \(rejected executable syntax: process \(process\)\)\.$/;
type ProviderControl = Parameters<typeof makeProvider>[0];

/** Creates pristine provider transition counts for one behavior test. */
function makeControl(): ProviderControl {
  return { failed: 0, pending: 0, ready: 0 };
}

afterEach(() => repositories.clear());

layer(NodeServices.layer)("preview document refresh", (it) => {
  it.effect("publishes success and sanitizes typed compilation failures", () =>
    Effect.gen(function* () {
      const repository = yield* Effect.sync(repositories.create);
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
      const repository = yield* Effect.sync(repositories.create);
      const ready = yield* makePreviewReady(repository);
      const control = makeControl();
      const logs: string[] = [];
      const logger = Logger.make(({ message }) => {
        logs.push(String(message));
      });
      yield* Effect.sync(() =>
        writeFileSync(
          repository.documentPath,
          `${REAL_SOURCE}\n\n{process.env}\n`
        )
      );

      yield* refreshDocument(
        ready.compiler,
        makeProvider(control),
        RENDERER_MANIFEST.hash,
        0,
        Effect.succeed(PREVIEW_REPOSITORIES)
      ).pipe(Effect.provide(Logger.layer([logger])));
      yield* Effect.sync(() =>
        writeFileSync(repository.documentPath, REAL_SOURCE)
      );

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
        const repository = yield* Effect.sync(repositories.create);
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
        expect(blocked).toMatchObject({
          failed: 0,
          pending: 0,
          ready: 0,
        });
        expect(error).toBe(missingEvidence);
      })
  );

  it.effect("rejects source drift after repository evidence is captured", () =>
    Effect.gen(function* () {
      const repository = yield* Effect.sync(repositories.create);
      const ready = yield* makePreviewReady(repository);
      const control = makeControl();
      const evidence = Effect.sync(() => {
        writeFileSync(repository.documentPath, `${REAL_SOURCE}\n`);
        return PREVIEW_REPOSITORIES;
      });
      const result = yield* refreshDocument(
        ready.compiler,
        makeProvider(control),
        RENDERER_MANIFEST.hash,
        0,
        evidence
      );
      yield* Effect.sync(() =>
        writeFileSync(repository.documentPath, REAL_SOURCE)
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
      const repository = yield* Effect.sync(repositories.create);
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
        const repository = yield* Effect.sync(repositories.create);
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
        expect(compileControl).toMatchObject({
          failed: 0,
          pending: 0,
          ready: 0,
        });
        expect(verifyControl).toMatchObject({
          failed: 0,
          pending: 0,
          ready: 0,
        });
      })
  );
});
