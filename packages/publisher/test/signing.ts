import { compileContent } from "@nakafa/aksara-compiler/compile";
import { hashCompiledContentPayload } from "@nakafa/aksara-contracts/artifact/integrity";
import {
  CompileDocumentSourceSchema,
  compareContentHeads,
} from "@nakafa/aksara-contracts/content";
import { type ReleaseId, ReleaseIdSchema } from "@nakafa/aksara-contracts/ids";
import {
  type ContentChange,
  ContentChangeSchema,
  ContentReleaseItemSchema,
  ContentReleaseManifestSchema,
} from "@nakafa/aksara-contracts/release";
import { digestItems } from "@nakafa/aksara-contracts/release/digest";
import { EMPTY_RESULT_CATALOG_DIGEST } from "@nakafa/aksara-contracts/release/result/spec";
import { inheritContentSnapshots } from "@nakafa/aksara-contracts/release/snapshot/spec";
import { createRendererManifest } from "@nakafa/aksara-contracts/renderer/manifest";
import { Effect, Schema, Stream } from "effect";

import { testRendererDomains } from "#test/renderer";

const rendererManifest = await Effect.runPromise(
  createRendererManifest({
    base: {
      authoringComponents: [{ name: "BlockMath", version: 1 }],
      supportedComponents: [{ name: "BlockMath", version: 1 }],
    },
    domains: testRendererDomains({
      chemistry: [{ name: "AtomShellLab", version: 1 }],
      mathematics: [{ name: "FunctionMachine", version: 1 }],
    }),
    publishedDomains: ["mathematics"],
  })
);

const source = Schema.decodeUnknownSync(CompileDocumentSourceSchema)({
  artifactLocale: "en",
  contentKey: "test:signing",
  rawMdx: 'export const metadata = {}\n\n<BlockMath math="x" />',
  rendererDomain: "mathematics",
  sourcePath: "packages/corpus/test/signing/en.mdx",
});

/** Compiled payload used by publication signer tests. */
export const signingPayload = (
  await Effect.runPromise(compileContent({ ...source, rendererManifest }))
).payload;

const releaseId = Schema.decodeUnknownSync(ReleaseIdSchema)("test-release");

/** Builds canonically ordered release items for signing fixtures. */
function makeItems(release: ReleaseId, changes: readonly ContentChange[]) {
  return [...changes]
    .sort(compareContentHeads)
    .map((change, index) =>
      ContentReleaseItemSchema.make({ change, index, releaseId: release })
    );
}

const items = makeItems(
  releaseId,
  Schema.decodeUnknownSync(Schema.Array(ContentChangeSchema))([
    {
      artifactHash: hashCompiledContentPayload(signingPayload),
      artifactLocale: signingPayload.artifactLocale,
      contentKey: signingPayload.contentKey,
      delivery: "public",
      family: "material",
      operation: "upsert",
      rendererDomain: source.rendererDomain,
      sourcePath: source.sourcePath,
    },
  ])
);

const itemSummary = await Effect.runPromise(
  digestItems(releaseId, Stream.fromIterable(items))
);

/** Current release manifest used by publication signer tests. */
export const signingManifest = Schema.decodeUnknownSync(
  ContentReleaseManifestSchema
)({
  activeAppLocales: ["en", "id"],
  baseActiveAppLocales: null,
  baseEditorialReviewDigest: null,
  baseManifestHash: null,
  baseReleaseId: null,
  baseResultCount: 0,
  baseResultDigest: EMPTY_RESULT_CATALOG_DIGEST,
  deleteCount: 0,
  editorialReviewDigest: `sha256:${"1".repeat(64)}`,
  format: "localized-content-release",
  itemCount: items.length,
  itemsDigest: itemSummary.digest,
  origin: { kind: "git", sha: "d".repeat(40) },
  projectionCount: 1,
  projectionDigest: `sha256:${"c".repeat(64)}`,
  releaseId,
  rendererContractVersion: "1.0.0",
  rendererManifestHash: rendererManifest.hash,
  resultCount: 1,
  resultDigest: `sha256:${"e".repeat(64)}`,
  rollbackCount: items.length,
  rollbackDigest: `sha256:${"f".repeat(64)}`,
  routeCount: 0,
  routeDigest: `sha256:${"0".repeat(64)}`,
  scope: { content: [], families: ["material"], snapshots: [] },
  snapshots: inheritContentSnapshots(null),
  upsertCount: items.length,
});
