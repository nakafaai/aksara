import {
  copyFileSync,
  readFileSync,
  realpathSync,
  renameSync,
  symlinkSync,
  unlinkSync,
  writeFileSync,
} from "node:fs";
import { relative, resolve } from "node:path";
import { ContentSigningError } from "@nakafa/aksara-publisher/signing/error";
import type { PublicationSigner } from "@nakafa/aksara-publisher/signing/service";
import { Effect } from "effect";
import { afterEach, describe, expect, it } from "vitest";
import { makePreviewCredentials } from "#cli/credentials";
import { makePreviewDocumentCompiler } from "#cli/document";
import { selectPreviewDocument } from "#cli/repository";
import { runNode } from "#test/effect";
import {
  makeRepositoryTracker,
  REAL_SOURCE,
  RENDERER_MANIFEST,
  REPOSITORY_ROOT,
  type TestRepositories,
} from "#test/real";

const repositories = makeRepositoryTracker();

afterEach(() => {
  repositories.clear();
});

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

/** Compiles one immutable document directly from the real reviewed checkout. */
async function compileRealDocument(sourcePath: string) {
  const aksaraRoot = realpathSync(REPOSITORY_ROOT);
  const selected = await runNode(selectPreviewDocument(aksaraRoot, sourcePath));
  const credentials = await Effect.runPromise(makePreviewCredentials());
  const compiler = await Effect.runPromise(
    makePreviewDocumentCompiler({
      aksaraRoot,
      rendererManifest: RENDERER_MANIFEST,
      selected,
      signer: credentials.signer,
    })
  );
  return runNode(compiler.compile());
}

describe("preview document compiler", () => {
  it("compiles the real source once and reuses its exact incremental cache", async () => {
    const repository = repositories.create();
    const { compiler } = await makeCompiler(repository);
    const first = await runNode(compiler.compile());
    const second = await runNode(compiler.compile());
    const [firstResult] = first.results;
    const [secondResult] = second.results;

    expect(firstResult.compileKind).toBe("compiled");
    expect(secondResult.compileKind).toBe("unchanged");
    expect(secondResult.artifact).toEqual(firstResult.artifact);
    expect(firstResult.projection).toMatchObject({
      locale: "en",
      metadata: { title: "Function Concept" },
    });
  });

  it("compiles real article and answer closures through their domain projections", async () => {
    const article = await compileRealDocument(
      "packages/corpus/articles/politics/dynastic-politics/asian-values/en.mdx"
    );
    const answer = await compileRealDocument(
      "packages/corpus/question-bank/tryout/indonesia/snbt/general-knowledge/set-2/question-1/answer.en.mdx"
    );

    const [articleResult] = article.results;
    expect(article.results).toHaveLength(1);
    expect(articleResult.projection).toMatchObject({
      kind: "article",
      locale: "en",
    });
    expect(answer.results).toHaveLength(2);
    expect(answer.results.map(({ projection }) => projection)).toMatchObject([
      { bodyKind: "question", kind: "question-body" },
      { bodyKind: "answer", kind: "question-body" },
    ]);
  });

  it("rejects invalid real metadata and executable source changes", async () => {
    const repository = repositories.create();
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

    expect(metadataError).toMatchObject({ _tag: "MaterialMetadataError" });
    expect(compilerError).toMatchObject({ _tag: "ExecutablePolicyError" });
  });

  it("surfaces signing failures without caching an unsigned result", async () => {
    const repository = repositories.create();
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
      signReleaseV2: credentials.signer.signReleaseV2,
    };
    const { compiler } = await makeCompiler(repository, signer);
    const error = await runNode(compiler.compile().pipe(Effect.flip));

    expect(error).toMatchObject({
      _tag: "ContentSigningError",
      stage: "artifact",
    });
  });

  it("rejects a save during signing without committing mixed-state cache", async () => {
    const repository = repositories.create();
    const credentials = await Effect.runPromise(makePreviewCredentials());
    let signingAttempts = 0;
    const signer: PublicationSigner = {
      signArtifact: (payload) =>
        Effect.sync(() => {
          signingAttempts += 1;
          if (signingAttempts === 1) {
            writeFileSync(repository.documentPath, `${REAL_SOURCE}\n`);
          }
        }).pipe(Effect.zipRight(credentials.signer.signArtifact(payload))),
      signRelease: credentials.signer.signRelease,
      signReleaseV2: credentials.signer.signReleaseV2,
    };
    const { compiler } = await makeCompiler(repository, signer);
    const error = await runNode(compiler.compile().pipe(Effect.flip));
    writeFileSync(repository.documentPath, REAL_SOURCE);
    const recovered = await runNode(compiler.compile());

    expect(error).toMatchObject({
      _tag: "PreviewRepositoryError",
      reason: "changed",
    });
    expect(recovered).toMatchObject({
      results: [{ compileKind: "compiled" }],
    });
  });

  it("fails closed across rename and delete before accepting a restored file", async () => {
    const repository = repositories.create();
    const { compiler } = await makeCompiler(repository);
    const renamedPath = `${repository.documentPath}.moved`;
    renameSync(repository.documentPath, renamedPath);
    const renamedError = await runNode(compiler.compile().pipe(Effect.flip));
    renameSync(renamedPath, repository.documentPath);
    await expect(runNode(compiler.compile())).resolves.toMatchObject({
      results: [{ compileKind: "compiled" }],
    });
    unlinkSync(repository.documentPath);
    const deletedError = await runNode(compiler.compile().pipe(Effect.flip));
    writeFileSync(repository.documentPath, REAL_SOURCE);
    await expect(runNode(compiler.compile())).resolves.toMatchObject({
      results: [{ compileKind: "unchanged" }],
    });

    expect(renamedError).toMatchObject({ reason: "missing" });
    expect(deletedError).toMatchObject({ reason: "missing" });
  });

  it("rejects a source replaced by a symlink after initial selection", async () => {
    const repository = repositories.create();
    const { compiler } = await makeCompiler(repository);
    unlinkSync(repository.documentPath);
    const indonesianPath = resolve(
      repository.aksaraRoot,
      "packages/corpus/material/lesson/mathematics/function-composition-inverse-function/function-concept/id.mdx"
    );
    symlinkSync(indonesianPath, repository.documentPath);
    const error = await runNode(compiler.compile().pipe(Effect.flip));

    expect(error).toMatchObject({ reason: "symlink" });
    unlinkSync(repository.documentPath);
    copyFileSync(indonesianPath, repository.documentPath);
  });

  it("rejects topology that no longer matches the startup registry", async () => {
    const repository = repositories.create();
    const { compiler, selected } = await makeCompiler(repository);
    const topology = selected.files.find(({ mode }) => mode === "restart");
    if (topology === undefined) {
      throw new Error("Expected the selected material topology source.");
    }
    const source = readFileSync(topology.absolutePath, "utf8");
    writeFileSync(topology.absolutePath, `${source}\n`);
    const error = await runNode(compiler.compile().pipe(Effect.flip));
    writeFileSync(topology.absolutePath, source);

    expect(error).toMatchObject({
      _tag: "PreviewRestartError",
      sourcePath: topology.sourcePath,
    });
    await expect(runNode(compiler.compile())).resolves.toMatchObject({
      results: [{ compileKind: "compiled" }],
    });
  });
});
