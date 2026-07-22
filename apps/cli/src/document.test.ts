import {
  copyFileSync,
  existsSync,
  realpathSync,
  renameSync,
  symlinkSync,
  unlinkSync,
  writeFileSync,
} from "node:fs";
import { relative, resolve } from "node:path";
import type { FileSystem, Path } from "@effect/platform";
import { NodeContext } from "@effect/platform-node";
import type { PublicationSigner } from "@nakafa/aksara-publisher/signing";
import { ContentSigningError } from "@nakafa/aksara-publisher/signing-errors";
import { Effect } from "effect";
import { afterEach, describe, expect, it } from "vitest";
import { makePreviewCredentials } from "#cli/credentials";
import { makePreviewDocumentCompiler } from "#cli/document";
import { selectPreviewDocument } from "#cli/repository";
import {
  makeTestRepositories,
  REAL_SOURCE,
  RENDERER_MANIFEST,
  removeTestRepositories,
  type TestRepositories,
} from "#test/real";

const repositories: TestRepositories[] = [];

afterEach(() => {
  for (const repository of repositories.splice(0)) {
    if (existsSync(repository.root)) {
      removeTestRepositories(repository);
    }
  }
});

/** Creates and tracks one isolated final-corpus repository pair. */
function makeRepositories() {
  const repository = makeTestRepositories();
  repositories.push(repository);
  return repository;
}

/** Runs a platform-dependent compiler operation at the Vitest boundary. */
function runNode<A, E>(
  program: Effect.Effect<A, E, FileSystem.FileSystem | Path.Path>
) {
  return Effect.runPromise(program.pipe(Effect.provide(NodeContext.layer)));
}

/** Builds one compiler from the selected real English registry document. */
async function makeCompiler(
  repository: TestRepositories,
  signer?: PublicationSigner
) {
  const aksaraRoot = realpathSync(repository.aksaraRoot);
  const documentPath = realpathSync(repository.documentPath);
  const selected = await runNode(
    selectPreviewDocument(aksaraRoot, relative(aksaraRoot, documentPath))
  );
  const credentials = await Effect.runPromise(makePreviewCredentials());
  const compiler = await Effect.runPromise(
    makePreviewDocumentCompiler({
      aksaraRoot,
      rendererManifest: RENDERER_MANIFEST,
      selected,
      signer: signer ?? credentials.signer,
    })
  );
  return { compiler, credentials, selected };
}

describe("preview document compiler", () => {
  it("compiles the real source once and reuses its exact incremental cache", async () => {
    const repository = makeRepositories();
    const { compiler } = await makeCompiler(repository);
    const first = await runNode(compiler.compile());
    const second = await runNode(compiler.compile());

    expect(first.compileKind).toBe("compiled");
    expect(second.compileKind).toBe("unchanged");
    expect(second.artifact).toEqual(first.artifact);
    expect(first.projection).toMatchObject({
      locale: "en",
      metadata: { title: "Function Concept" },
    });
  });

  it("rejects invalid real metadata and executable source changes", async () => {
    const repository = makeRepositories();
    writeFileSync(
      repository.documentPath,
      REAL_SOURCE.replace('date: "2025-04-27"', 'date: "invalid"')
    );
    const invalidMetadata = await makeCompiler(repository);
    const metadataError = await runNode(
      invalidMetadata.compiler.compile().pipe(Effect.flip)
    );
    writeFileSync(
      repository.documentPath,
      `${REAL_SOURCE}\n\n{process.env.NODE_ENV}\n`
    );
    const invalidCode = await makeCompiler(repository);
    const compilerError = await runNode(
      invalidCode.compiler.compile().pipe(Effect.flip)
    );

    expect(metadataError).toMatchObject({ _tag: "PreviewMetadataError" });
    expect(compilerError).toMatchObject({ _tag: "ExecutablePolicyError" });
  });

  it("surfaces signing failures without caching an unsigned result", async () => {
    const repository = makeRepositories();
    const credentials = await Effect.runPromise(makePreviewCredentials());
    const signer: PublicationSigner = {
      signArtifact: () =>
        Effect.fail(
          new ContentSigningError({
            message: "Test-only artifact signing failure.",
            stage: "artifact",
          })
        ),
      signRelease: credentials.signer.signRelease,
    };
    const { compiler } = await makeCompiler(repository, signer);
    const error = await runNode(compiler.compile().pipe(Effect.flip));

    expect(error).toMatchObject({
      _tag: "ContentSigningError",
      stage: "artifact",
    });
  });

  it("fails closed across rename and delete before accepting a restored file", async () => {
    const repository = makeRepositories();
    const { compiler } = await makeCompiler(repository);
    const renamedPath = `${repository.documentPath}.moved`;
    renameSync(repository.documentPath, renamedPath);
    const renamedError = await runNode(compiler.compile().pipe(Effect.flip));
    renameSync(renamedPath, repository.documentPath);
    await expect(runNode(compiler.compile())).resolves.toMatchObject({
      compileKind: "compiled",
    });
    unlinkSync(repository.documentPath);
    const deletedError = await runNode(compiler.compile().pipe(Effect.flip));
    writeFileSync(repository.documentPath, REAL_SOURCE);
    await expect(runNode(compiler.compile())).resolves.toMatchObject({
      compileKind: "unchanged",
    });

    expect(renamedError).toMatchObject({ reason: "missing" });
    expect(deletedError).toMatchObject({ reason: "missing" });
  });

  it("rejects a source replaced by a symlink after initial selection", async () => {
    const repository = makeRepositories();
    const { compiler } = await makeCompiler(repository);
    unlinkSync(repository.documentPath);
    const indonesianPath = resolve(
      repository.aksaraRoot,
      "packages/corpus/material/lesson/mathematics/function-composition_/inverse-function/function-concept/id.mdx"
    );
    symlinkSync(indonesianPath, repository.documentPath);
    const error = await runNode(compiler.compile().pipe(Effect.flip));

    expect(error).toMatchObject({ reason: "symlink" });
    unlinkSync(repository.documentPath);
    copyFileSync(indonesianPath, repository.documentPath);
  });
});
