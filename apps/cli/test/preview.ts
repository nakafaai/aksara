import { PreviewRepositorySchema } from "@nakafa/aksara-contracts/preview/spec";
import { Effect, FileSystem, Path, Schema } from "effect";
import { makePreviewCredentials } from "#cli/credentials";
import { makePreviewDocumentCompiler } from "#cli/document";
import { selectPreviewDocument } from "#cli/repository";
import { RENDERER_MANIFEST, type TestRepositories } from "#test/real";

export const PREVIEW_REPOSITORIES = {
  aksara: Schema.decodeSync(PreviewRepositorySchema)({
    dirty: true,
    sha: "a".repeat(40),
  }),
  nakafa: Schema.decodeSync(PreviewRepositorySchema)({
    dirty: false,
    sha: "b".repeat(40),
  }),
};

/** Compiles and signs the real selected English document for provider tests. */
export const makePreviewReady = Effect.fn("AksaraCliTest.makePreviewReady")(
  function* (repositories: TestRepositories) {
    const fileSystem = yield* FileSystem.FileSystem;
    const path = yield* Path.Path;
    const aksaraRoot = yield* fileSystem.realPath(repositories.aksaraRoot);
    const documentPath = yield* fileSystem.realPath(repositories.documentPath);
    const selected = yield* selectPreviewDocument(
      aksaraRoot,
      path.relative(aksaraRoot, documentPath)
    );
    const credentials = yield* makePreviewCredentials();
    const compiler = yield* makePreviewDocumentCompiler({
      aksaraRoot,
      rendererManifest: RENDERER_MANIFEST,
      selected,
      signer: credentials.signer,
    });
    const result = yield* compiler.compile;
    return { compiler, credentials, document: selected.document, result };
  }
);
