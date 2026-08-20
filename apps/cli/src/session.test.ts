import { writeFileSync } from "node:fs";
import { AppLocaleSchema } from "@nakafa/aksara-contracts/locale";
import { Effect, Logger, Redacted } from "effect";
import { afterEach, describe, expect, it } from "vitest";
import { makeNakafaAppError } from "#cli/app-error";
import type { RunningNakafa } from "#cli/child/session";
import type { PreviewDocumentCompiler } from "#cli/document";
import { PreviewEvidenceError } from "#cli/evidence";
import { PreviewRepositoryError, PreviewRestartError } from "#cli/integrity";
import type { NakafaApp } from "#cli/nakafa";
import { refreshDocument } from "#cli/session";
import { runNode } from "#test/effect";
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
afterEach(() => repositories.clear());

describe("preview document refresh", () => {
  it("publishes success and sanitizes typed compilation failures", async () => {
    const repository = repositories.create();
    const ready = await makePreviewReady(repository);
    const control = makeControl();
    const provider = makeProvider(control);
    await runNode(
      refreshDocument(
        ready.compiler,
        provider,
        RENDERER_MANIFEST.hash,
        0,
        Effect.succeed(PREVIEW_REPOSITORIES)
      )
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
    await runNode(
      refreshDocument(
        failure,
        provider,
        RENDERER_MANIFEST.hash,
        1,
        Effect.succeed(PREVIEW_REPOSITORIES)
      )
    );

    expect(control).toMatchObject({ failed: 1, pending: 0, ready: 1 });
    expect(control.failure).toEqual({
      code: "PreviewRepositoryError",
      message: `PreviewRepositoryError at ${ready.document.sourcePath} (missing).`,
    });
  });

  it("logs actionable diagnostics from a real compiler failure", async () => {
    const repository = repositories.create();
    const ready = await makePreviewReady(repository);
    const control = makeControl();
    const logs: string[] = [];
    const logger = Logger.make(({ message }) => {
      logs.push(String(message));
    });
    writeFileSync(repository.documentPath, `${REAL_SOURCE}\n\n{process.env}\n`);

    await runNode(
      refreshDocument(
        ready.compiler,
        makeProvider(control),
        RENDERER_MANIFEST.hash,
        0,
        Effect.succeed(PREVIEW_REPOSITORIES)
      ).pipe(Effect.provide(Logger.layer([logger])))
    );
    writeFileSync(repository.documentPath, REAL_SOURCE);

    expect(control.failure).toEqual({
      code: "ExecutablePolicyError",
      message: expect.stringContaining("ExecutablePolicyError at material/"),
    });
    expect(logs).toEqual([expect.stringMatching(POLICY_DIAGNOSTIC_PATTERN)]);
  });

  it("publishes current repository evidence and fails closed without it", async () => {
    const repository = repositories.create();
    const ready = await makePreviewReady(repository);
    const currentRepositories = {
      aksara: { ...PREVIEW_REPOSITORIES.aksara, dirty: true },
      nakafa: PREVIEW_REPOSITORIES.nakafa,
    };
    const control = makeControl();
    await runNode(
      refreshDocument(
        ready.compiler,
        makeProvider(control),
        RENDERER_MANIFEST.hash,
        1,
        Effect.succeed(currentRepositories)
      )
    );
    const missingEvidence = new PreviewEvidenceError({
      repository: "aksara",
      stage: "status",
    });
    const blocked = makeControl();
    const error = await runNode(
      refreshDocument(
        ready.compiler,
        makeProvider(blocked),
        RENDERER_MANIFEST.hash,
        0,
        Effect.fail(missingEvidence)
      ).pipe(Effect.flip)
    );

    expect(control.readyRepositories).toEqual(currentRepositories);
    expect(blocked).toMatchObject({
      failed: 0,
      pending: 0,
      ready: 0,
    });
    expect(error).toBe(missingEvidence);
  });

  it("rejects source drift after repository evidence is captured", async () => {
    const repository = repositories.create();
    const ready = await makePreviewReady(repository);
    const control = makeControl();
    const evidence = Effect.sync(() => {
      writeFileSync(repository.documentPath, `${REAL_SOURCE}\n`);
      return PREVIEW_REPOSITORIES;
    });
    const result = await runNode(
      refreshDocument(
        ready.compiler,
        makeProvider(control),
        RENDERER_MANIFEST.hash,
        0,
        evidence
      )
    );
    writeFileSync(repository.documentPath, REAL_SOURCE);

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
  });

  it("propagates provider failures instead of relabeling them", async () => {
    const repository = repositories.create();
    const ready = await makePreviewReady(repository);
    const control = { failed: 0, failReady: true, pending: 0, ready: 0 };
    const error = await runNode(
      refreshDocument(
        ready.compiler,
        makeProvider(control),
        RENDERER_MANIFEST.hash,
        0,
        Effect.succeed(PREVIEW_REPOSITORIES)
      ).pipe(Effect.flip)
    );
    expect(error).toMatchObject({ _tag: "PreviewProviderError" });
  });

  it("propagates restart requirements before and after compilation", async () => {
    const repository = repositories.create();
    const ready = await makePreviewReady(repository);
    const restart = new PreviewRestartError({
      sourcePath: ready.document.sourcePath,
    });
    const compileControl = makeControl();
    const compileRestart: PreviewDocumentCompiler = {
      compile: Effect.fail(restart),
      verify: () => Effect.void,
    };
    const compileError = await runNode(
      refreshDocument(
        compileRestart,
        makeProvider(compileControl),
        RENDERER_MANIFEST.hash,
        0,
        Effect.die("Repository evidence must not run after restart.")
      ).pipe(Effect.flip)
    );
    const verifyControl = makeControl();
    const verifyRestart: PreviewDocumentCompiler = {
      compile: Effect.succeed(ready.result),
      verify: () => Effect.fail(restart),
    };
    const verifyError = await runNode(
      refreshDocument(
        verifyRestart,
        makeProvider(verifyControl),
        RENDERER_MANIFEST.hash,
        0,
        Effect.succeed(PREVIEW_REPOSITORIES)
      ).pipe(Effect.flip)
    );

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
  });
});

describe("local preview session", () => {
  it("opens the real selected corpus and recompiles without a child restart", async () => {
    const repository = repositories.create();
    const capture: { input?: Parameters<typeof NakafaApp.Service.start>[0] } =
      {};
    await runLocal(
      repository,
      makeApp(capture),
      () => {
        expect(capture.input?.provider.origin.hostname).toBe("127.0.0.1");
        return Effect.void;
      },
      AppLocaleSchema.make("en")
    );
  });

  it("keeps a changed route failed when initial compilation fails", async () => {
    const repository = repositories.create();
    writeFileSync(repository.documentPath, `${REAL_SOURCE}\n\n{process.env}\n`);
    const capture: { input?: Parameters<typeof NakafaApp.Service.start>[0] } =
      {};
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
              authorization: `Bearer ${Redacted.value(input.credentials.providerToken)}`,
            },
          }
        );
        expect(await response.json()).toMatchObject({ status: "failed" });
      })
    );
  });

  it("stops if the actual Nakafa child exits before renderer discovery", async () => {
    const repository = repositories.create();
    const child: RunningNakafa = {
      awaitExit: Effect.fail(makeNakafaAppError("exit", false, 1)),
      origin: new URL("http://localhost:31234"),
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
