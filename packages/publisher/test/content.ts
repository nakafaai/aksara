import { SignedContentArtifactSchema } from "@nakafa/aksara-contracts/content";
import { MaterialLessonProjectionSchema } from "@nakafa/aksara-contracts/projection/material";
import { ContentReleaseItemSchema } from "@nakafa/aksara-contracts/release";
import { Schema } from "effect";

export const transportReleaseId = "test-http-release";
export const transportArtifactHash = `sha256:${"a".repeat(64)}`;
export const transportSignature = `${"A".repeat(85)}A`;

const item = Schema.decodeUnknownSync(ContentReleaseItemSchema)({
  change: {
    artifactHash: transportArtifactHash,
    contentKey: "test:http",
    delivery: "public",
    locale: "en",
    operation: "upsert",
    publicPath: "subjects/test/http",
    rendererDomain: "mathematics",
    sourcePath: "packages/corpus/test/http/en.mdx",
  },
  index: 0,
  releaseId: transportReleaseId,
});

const deletedItem = Schema.decodeUnknownSync(ContentReleaseItemSchema)({
  change: {
    contentKey: "test:deleted",
    locale: "id",
    operation: "delete",
  },
  index: 1,
  releaseId: transportReleaseId,
});

const projection = Schema.decodeUnknownSync(MaterialLessonProjectionSchema)({
  contentKey: "test:http",
  kind: "subject-lesson",
  locale: "en",
  materialKey: "test.http",
  metadata: { authors: [], date: "2026-01-01", title: "Test protocol" },
  order: 1,
  parentPath: "subjects/test",
  publicPath: "subjects/test/http",
  sectionKey: "test-http",
  sitemap: true,
});

const artifact = Schema.decodeUnknownSync(SignedContentArtifactSchema)({
  artifactHash: transportArtifactHash,
  keyId: "test-http-key",
  payload: {
    byteLength: 1,
    compiledCode: "x",
    compilerConfigHash: transportArtifactHash,
    compilerVersion: "0.1.0",
    contentKey: "test:http",
    format: "mdx-function-body-v1",
    locale: "en",
    mdxCompilerVersion: "3.1.1",
    plainText: "Test protocol",
    rawMdx: "x",
    rendererDomain: "mathematics",
    requiredComponents: [],
    sourceHash: transportArtifactHash,
  },
  signature: transportSignature,
});

export const transportContent = {
  artifact,
  items: [item, deletedItem],
  projection,
};
