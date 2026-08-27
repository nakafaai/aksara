import { CompiledContentPayloadSchema } from "@nakafa/aksara-contracts/content";
import { ArtifactLocaleSchema } from "@nakafa/aksara-contracts/locale";
import { Effect } from "effect";

import { ConvertedTryoutArtifactSchema } from "#publisher/migration/tryout/artifact";
import { historicalArtifact } from "#test/migration/artifact";
import { migrationSigner } from "#test/migration/signing";

/** Re-signs one retained artifact under the current immutable contract. */
const convert = Effect.fn("AksaraPublisherTest.convertArtifact")(function* (
  role: "answer" | "question"
) {
  const source = historicalArtifact(
    role === "answer" ? `sha256:${"a".repeat(64)}` : `sha256:${"b".repeat(64)}`
  );
  if (source === undefined) {
    return yield* Effect.die(`Expected the retained ${role} fixture.`);
  }
  const payload = CompiledContentPayloadSchema.make({
    artifactLocale: ArtifactLocaleSchema.make(source.payload.locale),
    byteLength: source.payload.byteLength,
    compiledCode: source.payload.compiledCode,
    compilerConfigHash: source.payload.compilerConfigHash,
    compilerVersion: source.payload.compilerVersion,
    contentKey: source.payload.contentKey,
    format: "mdx-function-body",
    mdxCompilerVersion: source.payload.mdxCompilerVersion,
    plainText: source.payload.plainText,
    rawMdx: source.payload.rawMdx,
    rendererDomain: source.payload.rendererDomain,
    requiredComponents: source.payload.requiredComponents,
    sourceHash: source.payload.sourceHash,
  });
  const artifact = yield* migrationSigner.signArtifact(payload);
  return ConvertedTryoutArtifactSchema.make({
    bodyMdx: `Retained ${role}`,
    date: "2026-01-01",
    mapping: {
      artifact,
      index: role === "answer" ? 0 : 1,
      oldArtifactHash: source.artifactHash,
    },
    role,
  });
});

export const convertedArtifacts = await Effect.runPromise(
  Effect.all([convert("answer"), convert("question")])
);
