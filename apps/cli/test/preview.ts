import { realpathSync } from "node:fs";
import { relative } from "node:path";
import { NodeContext } from "@effect/platform-node";
import { PreviewRepositorySchema } from "@nakafa/aksara-contracts/preview/spec";
import { Effect, Schema } from "effect";
import { makePreviewCredentials } from "#cli/credentials";
import { makePreviewDocumentCompiler } from "#cli/document";
import { selectPreviewDocument } from "#cli/repository";
import { RENDERER_MANIFEST, type TestRepositories } from "#test/real";

export const PREVIEW_REPOSITORIES = {
  aksara: Schema.decodeUnknownSync(PreviewRepositorySchema)({
    dirty: true,
    sha: "a".repeat(40),
  }),
  nakafa: Schema.decodeUnknownSync(PreviewRepositorySchema)({
    dirty: false,
    sha: "b".repeat(40),
  }),
};

/** Compiles and signs the real selected English document for provider tests. */
export async function makePreviewReady(repositories: TestRepositories) {
  const aksaraRoot = realpathSync(repositories.aksaraRoot);
  const documentPath = realpathSync(repositories.documentPath);
  const selected = await Effect.runPromise(
    selectPreviewDocument(aksaraRoot, relative(aksaraRoot, documentPath)).pipe(
      Effect.provide(NodeContext.layer)
    )
  );
  const credentials = await Effect.runPromise(makePreviewCredentials());
  const compiler = await Effect.runPromise(
    makePreviewDocumentCompiler({
      aksaraRoot,
      rendererManifest: RENDERER_MANIFEST,
      selected,
      signer: credentials.signer,
    })
  );
  const result = await Effect.runPromise(
    compiler.compile().pipe(Effect.provide(NodeContext.layer))
  );
  return { credentials, document: selected.document, result };
}
