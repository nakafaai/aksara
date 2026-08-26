import { realpathSync } from "node:fs";
import { relative } from "node:path";
import { NodeServices } from "@effect/platform-node";
import { afterEach, describe, expect, it } from "@effect/vitest";
import {
  ExactProcess,
  type ExactProcessInput,
} from "@nakafa/aksara-utilities/process/exact";
import { Effect } from "effect";
import { NakafaApp } from "#cli/nakafa";
import {
  openRendererSession,
  type RendererSessionSelection,
} from "#cli/renderer/session";
import { makeRepositoryTracker, REPOSITORY_ROOT } from "#test/real";
import { makeApp } from "#test/session";

const MATERIAL_KEY_PATTERN = /^material\/lesson\//u;
const repositories = makeRepositoryTracker();

afterEach(() => {
  repositories.clear();
});

/** Returns deterministic clean Git evidence for both renderer repositories. */
const exactProcess = ExactProcess.of({
  run: (input: ExactProcessInput) =>
    Effect.succeed({
      exitCode: 0,
      stderr: new Uint8Array(),
      stdout: new TextEncoder().encode(
        input.args.includes("rev-parse") ? `${"a".repeat(40)}\n` : ""
      ),
    }),
});

/** Opens one scoped renderer session and returns only durable test evidence. */
function openSession(input: {
  readonly aksaraRoot: string;
  readonly nakafaRoot: string;
  readonly selection: RendererSessionSelection;
}) {
  const capture: {
    input?: Parameters<typeof NakafaApp.Service.start>[0];
  } = {};
  return Effect.runPromise(
    Effect.scoped(
      openRendererSession({
        cwd: input.aksaraRoot,
        environment: { nakafaAppDir: input.nakafaRoot },
        selection: input.selection,
      }).pipe(
        Effect.flatMap((session) =>
          session.repositoryEvidence.pipe(
            Effect.map((evidence) => ({
              aksaraRoot: session.aksaraRoot,
              capture,
              evidence,
              manifest: session.manifest,
              providerHost: session.provider.origin.hostname,
              selected: session.selected,
            }))
          )
        )
      )
    ).pipe(
      Effect.provideService(NakafaApp, makeApp(capture)),
      Effect.provideService(ExactProcess, exactProcess),
      Effect.provide(NodeServices.layer)
    )
  );
}

describe("renderer session", () => {
  it("opens one requested document with current repository evidence", async () => {
    const repository = repositories.create();
    const result = await openSession({
      aksaraRoot: repository.aksaraRoot,
      nakafaRoot: repository.nakafaRoot,
      selection: {
        kind: "document",
        requestedPath: relative(repository.aksaraRoot, repository.documentPath),
      },
    });

    expect(result.aksaraRoot).toBe(realpathSync(repository.aksaraRoot));
    expect(result.capture.input?.root).toBe(
      realpathSync(repository.nakafaRoot)
    );
    expect(result.evidence.aksara.dirty).toBe(false);
    expect(result.manifest).toBeDefined();
    expect(result.providerHost).toBe("127.0.0.1");
  });

  it("discovers the renderer from one real catalog-owned document", async () => {
    const repository = repositories.create();
    const result = await openSession({
      aksaraRoot: REPOSITORY_ROOT,
      nakafaRoot: repository.nakafaRoot,
      selection: { kind: "catalog" },
    });

    expect(result.selected.sources[0].family).toBe("material");
    expect(result.selected.document.family).toBe("material");
    if (result.selected.document.family === "material") {
      expect(result.selected.document.route.contentKey).toMatch(
        MATERIAL_KEY_PATTERN
      );
    }
  });
});
