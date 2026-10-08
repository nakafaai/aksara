import { NodeServices } from "@effect/platform-node";
import { afterEach, expect, layer } from "@effect/vitest";
import { ContentSigningError } from "@nakafa/aksara-publisher/signing/error";
import type { PublicationSigner } from "@nakafa/aksara-publisher/signing/service";
import { Effect, FileSystem, Path } from "effect";
import { makePreviewCredentials } from "#cli/credentials";
import { makePreviewDocumentCompiler } from "#cli/document";
import { selectPreviewDocument } from "#cli/repository";
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
const makeCompiler = Effect.fn("AksaraCliTest.makeCompiler")(function* (
  repository: TestRepositories,
  signer?: PublicationSigner
) {
  const fileSystem = yield* FileSystem.FileSystem;
  const path = yield* Path.Path;
  const aksaraRoot = yield* fileSystem.realPath(repository.aksaraRoot);
  const documentPath = yield* fileSystem.realPath(repository.documentPath);
  const selected = yield* selectPreviewDocument(
    aksaraRoot,
    path.relative(aksaraRoot, documentPath)
  );
  const credentials = yield* makePreviewCredentials();
  const compiler = yield* makePreviewDocumentCompiler({
    aksaraRoot,
    rendererManifest: RENDERER_MANIFEST,
    selected,
    signer: signer ?? credentials.signer,
  });
  return { compiler, credentials, selected };
});

/** Compiles one immutable document directly from the real reviewed checkout. */
const compileRealDocument = Effect.fn("AksaraCliTest.compileRealDocument")(
  function* (sourcePath: string) {
    const fileSystem = yield* FileSystem.FileSystem;
    const aksaraRoot = yield* fileSystem.realPath(REPOSITORY_ROOT);
    const selected = yield* selectPreviewDocument(aksaraRoot, sourcePath);
    const credentials = yield* makePreviewCredentials();
    const compiler = yield* makePreviewDocumentCompiler({
      aksaraRoot,
      rendererManifest: RENDERER_MANIFEST,
      selected,
      signer: credentials.signer,
    });
    return yield* compiler.compile;
  }
);

layer(NodeServices.layer)("preview document compiler", (it) => {
  it.effect(
    "compiles the real source once and reuses its exact incremental cache",
    () =>
      Effect.gen(function* () {
        const repository = yield* repositories.create();
        const { compiler } = yield* makeCompiler(repository);
        const first = yield* compiler.compile;
        const second = yield* compiler.compile;
        const [firstResult] = first.results;
        const [secondResult] = second.results;

        expect(firstResult.compileKind).toBe("compiled");
        expect(secondResult.compileKind).toBe("unchanged");
        expect(secondResult.artifact).toEqual(firstResult.artifact);
        expect(firstResult.projection).toMatchObject({
          appLocale: "en",
          metadata: { title: "Function Concept" },
        });
      })
  );

  it.effect(
    "compiles real article and answer closures through their domain projections",
    () =>
      Effect.gen(function* () {
        const article = yield* compileRealDocument(
          "packages/corpus/articles/politics/dynastic-politics/asian-values/en.mdx"
        );
        const answer = yield* compileRealDocument(
          "packages/corpus/question-bank/tryout/indonesia/snbt/general-knowledge-and-understanding/set-2/question-1/answer.en.mdx"
        );

        const [articleResult] = article.results;
        expect(article.results).toHaveLength(1);
        expect(articleResult.projection).toMatchObject({
          appLocale: "en",
          kind: "article",
        });
        expect(answer.results).toHaveLength(2);
        expect(
          answer.results.map(({ projection }) => projection)
        ).toMatchObject([
          { bodyKind: "question", kind: "question-body" },
          { bodyKind: "answer", kind: "question-body" },
        ]);
      })
  );

  it.effect("rejects invalid real metadata and executable source changes", () =>
    Effect.gen(function* () {
      const fileSystem = yield* FileSystem.FileSystem;
      const repository = yield* repositories.create();
      yield* fileSystem.writeFileString(
        repository.documentPath,
        REAL_SOURCE.replace(
          'datePublished: "2025-04-27"',
          'datePublished: "invalid"'
        )
      );
      const invalidMetadata = yield* makeCompiler(repository);
      const metadataError = yield* invalidMetadata.compiler.compile.pipe(
        Effect.flip
      );
      yield* fileSystem.writeFileString(
        repository.documentPath,
        `${REAL_SOURCE}\n\n{process.env.NODE_ENV}\n`
      );
      const invalidCode = yield* makeCompiler(repository);
      const compilerError = yield* invalidCode.compiler.compile.pipe(
        Effect.flip
      );

      expect(metadataError).toMatchObject({ _tag: "MaterialMetadataError" });
      expect(compilerError).toMatchObject({ _tag: "ExecutablePolicyError" });
    })
  );

  it.effect(
    "surfaces signing failures without caching an unsigned result",
    () =>
      Effect.gen(function* () {
        const repository = yield* repositories.create();
        const credentials = yield* makePreviewCredentials();
        const signer: PublicationSigner = {
          ...credentials.signer,
          signArtifact: () =>
            Effect.fail(
              new ContentSigningError({
                message: "Test-only artifact signing failure.",
                stage: "artifact",
              })
            ),
        };
        const { compiler } = yield* makeCompiler(repository, signer);
        const error = yield* compiler.compile.pipe(Effect.flip);

        expect(error).toMatchObject({
          _tag: "ContentSigningError",
          stage: "artifact",
        });
      })
  );

  it.effect(
    "rejects a save during signing without committing mixed-state cache",
    () =>
      Effect.gen(function* () {
        const fileSystem = yield* FileSystem.FileSystem;
        const repository = yield* repositories.create();
        const credentials = yield* makePreviewCredentials();
        let signingAttempts = 0;
        const signer: PublicationSigner = {
          ...credentials.signer,
          signArtifact: (payload) =>
            Effect.gen(function* () {
              signingAttempts += 1;
              if (signingAttempts === 1) {
                yield* fileSystem
                  .writeFileString(repository.documentPath, `${REAL_SOURCE}\n`)
                  .pipe(Effect.orDie);
              }
              return yield* credentials.signer.signArtifact(payload);
            }),
        };
        const { compiler } = yield* makeCompiler(repository, signer);
        const error = yield* compiler.compile.pipe(Effect.flip);
        yield* fileSystem.writeFileString(repository.documentPath, REAL_SOURCE);
        const recovered = yield* compiler.compile;

        expect(error).toMatchObject({
          _tag: "PreviewRepositoryError",
          reason: "changed",
        });
        expect(recovered).toMatchObject({
          results: [{ compileKind: "compiled" }],
        });
      })
  );

  it.effect(
    "fails closed across rename and delete before accepting a restored file",
    () =>
      Effect.gen(function* () {
        const fileSystem = yield* FileSystem.FileSystem;
        const repository = yield* repositories.create();
        const { compiler } = yield* makeCompiler(repository);
        const renamedPath = `${repository.documentPath}.moved`;
        yield* fileSystem.rename(repository.documentPath, renamedPath);
        const renamedError = yield* compiler.compile.pipe(Effect.flip);
        yield* fileSystem.rename(renamedPath, repository.documentPath);
        expect(yield* compiler.compile).toMatchObject({
          results: [{ compileKind: "compiled" }],
        });
        yield* fileSystem.remove(repository.documentPath);
        const deletedError = yield* compiler.compile.pipe(Effect.flip);
        yield* fileSystem.writeFileString(repository.documentPath, REAL_SOURCE);
        expect(yield* compiler.compile).toMatchObject({
          results: [{ compileKind: "unchanged" }],
        });

        expect(renamedError).toMatchObject({ reason: "missing" });
        expect(deletedError).toMatchObject({ reason: "missing" });
      })
  );

  it.effect(
    "rejects a source replaced by a symlink after initial selection",
    () =>
      Effect.gen(function* () {
        const fileSystem = yield* FileSystem.FileSystem;
        const path = yield* Path.Path;
        const repository = yield* repositories.create();
        const { compiler } = yield* makeCompiler(repository);
        yield* fileSystem.remove(repository.documentPath);
        const indonesianPath = path.resolve(
          repository.aksaraRoot,
          "packages/corpus/material/lesson/mathematics/function-composition-inverse-function/function-concept/id.mdx"
        );
        yield* fileSystem.symlink(indonesianPath, repository.documentPath);
        const error = yield* compiler.compile.pipe(Effect.flip);

        expect(error).toMatchObject({ reason: "symlink" });
        yield* fileSystem.remove(repository.documentPath);
        yield* fileSystem.copyFile(indonesianPath, repository.documentPath);
      })
  );

  it.effect(
    "rejects topology that no longer matches the startup registry",
    () =>
      Effect.gen(function* () {
        const fileSystem = yield* FileSystem.FileSystem;
        const repository = yield* repositories.create();
        const { compiler, selected } = yield* makeCompiler(repository);
        const topology = selected.files.find(({ mode }) => mode === "restart");
        if (topology === undefined) {
          return yield* Effect.die(
            "Expected the selected material topology source."
          );
        }
        const source = yield* fileSystem.readFileString(topology.absolutePath);
        yield* fileSystem.writeFileString(topology.absolutePath, `${source}\n`);
        const error = yield* compiler.compile.pipe(Effect.flip);
        yield* fileSystem.writeFileString(topology.absolutePath, source);

        expect(error).toMatchObject({
          _tag: "PreviewRestartError",
          sourcePath: topology.sourcePath,
        });
        expect(yield* compiler.compile).toMatchObject({
          results: [{ compileKind: "compiled" }],
        });
      })
  );
});
