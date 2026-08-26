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
import { NodeServices } from "@effect/platform-node";
import { afterEach, expect, layer } from "@effect/vitest";
import { ContentSigningError } from "@nakafa/aksara-publisher/signing/error";
import type { PublicationSigner } from "@nakafa/aksara-publisher/signing/service";
import { Effect } from "effect";
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
  const aksaraRoot = realpathSync(repository.aksaraRoot);
  const documentPath = realpathSync(repository.documentPath);
  const selected = yield* selectPreviewDocument(
    aksaraRoot,
    relative(aksaraRoot, documentPath)
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
    const aksaraRoot = realpathSync(REPOSITORY_ROOT);
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
        const repository = repositories.create();
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
          "packages/corpus/question-bank/tryout/indonesia/snbt/general-knowledge/set-2/question-1/answer.en.mdx"
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
      const repository = repositories.create();
      writeFileSync(
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
      writeFileSync(
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
        const repository = repositories.create();
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
        const repository = repositories.create();
        const credentials = yield* makePreviewCredentials();
        let signingAttempts = 0;
        const signer: PublicationSigner = {
          ...credentials.signer,
          signArtifact: (payload) =>
            Effect.sync(() => {
              signingAttempts += 1;
              if (signingAttempts === 1) {
                writeFileSync(repository.documentPath, `${REAL_SOURCE}\n`);
              }
            }).pipe(Effect.andThen(credentials.signer.signArtifact(payload))),
        };
        const { compiler } = yield* makeCompiler(repository, signer);
        const error = yield* compiler.compile.pipe(Effect.flip);
        writeFileSync(repository.documentPath, REAL_SOURCE);
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
        const repository = repositories.create();
        const { compiler } = yield* makeCompiler(repository);
        const renamedPath = `${repository.documentPath}.moved`;
        renameSync(repository.documentPath, renamedPath);
        const renamedError = yield* compiler.compile.pipe(Effect.flip);
        renameSync(renamedPath, repository.documentPath);
        expect(yield* compiler.compile).toMatchObject({
          results: [{ compileKind: "compiled" }],
        });
        unlinkSync(repository.documentPath);
        const deletedError = yield* compiler.compile.pipe(Effect.flip);
        writeFileSync(repository.documentPath, REAL_SOURCE);
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
        const repository = repositories.create();
        const { compiler } = yield* makeCompiler(repository);
        unlinkSync(repository.documentPath);
        const indonesianPath = resolve(
          repository.aksaraRoot,
          "packages/corpus/material/lesson/mathematics/function-composition-inverse-function/function-concept/id.mdx"
        );
        symlinkSync(indonesianPath, repository.documentPath);
        const error = yield* compiler.compile.pipe(Effect.flip);

        expect(error).toMatchObject({ reason: "symlink" });
        unlinkSync(repository.documentPath);
        copyFileSync(indonesianPath, repository.documentPath);
      })
  );

  it.effect(
    "rejects topology that no longer matches the startup registry",
    () =>
      Effect.gen(function* () {
        const repository = repositories.create();
        const { compiler, selected } = yield* makeCompiler(repository);
        const topology = selected.files.find(({ mode }) => mode === "restart");
        if (topology === undefined) {
          return yield* Effect.die(
            "Expected the selected material topology source."
          );
        }
        const source = readFileSync(topology.absolutePath, "utf8");
        writeFileSync(topology.absolutePath, `${source}\n`);
        const error = yield* compiler.compile.pipe(Effect.flip);
        writeFileSync(topology.absolutePath, source);

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
