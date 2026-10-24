import { SignedContentArtifactSchema } from "@nakafa/aksara-contracts/content";
import { AppLocaleSchema } from "@nakafa/aksara-contracts/locale";
import { MaterialLessonProjectionSchema } from "@nakafa/aksara-contracts/projection/material";
import { ContentReleaseItemSchema } from "@nakafa/aksara-contracts/release";
import type { ContentTreeElement } from "@nakafa/aksara-contracts/tree";
import { Schema } from "effect";
import { materialGraph } from "#test/graph";

export const transportReleaseId = "test-http-release";
export const transportArtifactHash = `sha256:${"a".repeat(64)}`;
export const transportSignature = `${"A".repeat(85)}A`;

const item = Schema.decodeUnknownSync(ContentReleaseItemSchema)({
  change: {
    artifactHash: transportArtifactHash,
    artifactLocale: "en",
    contentKey: "test:http",
    delivery: "public",
    family: "material",
    operation: "upsert",
    publicPath: "subjects/test/http",
    rendererDomain: "mathematics",
    sourcePath: "packages/corpus/test/http/en.mdx",
  },
  index: 0,
  releaseId: transportReleaseId,
});

const deletedItem = Schema.decodeSync(ContentReleaseItemSchema)({
  change: {
    artifactLocale: "id",
    contentKey: "test:deleted",
    family: "material",
    operation: "delete",
  },
  index: 1,
  releaseId: transportReleaseId,
});

const projection = Schema.decodeSync(MaterialLessonProjectionSchema)({
  appLocale: "en",
  artifactLocale: "en",
  contentKey: "test:http",
  graph: materialGraph(AppLocaleSchema.make("en"), "http", "test-http"),
  kind: "subject-lesson",
  materialKey: "lesson.test.http",
  metadata: {
    authors: [],
    datePublished: "2026-01-01",
    title: "Test protocol",
  },
  order: 1,
  parentPath: "subjects/test",
  publicPath: "subjects/test/http",
  sectionKey: "test-http",
  sitemap: true,
  topicTitle: "Test HTTP Topic",
});

const artifact = Schema.decodeSync(SignedContentArtifactSchema)({
  artifactHash: transportArtifactHash,
  keyId: "test-http-key",
  payload: {
    artifactLocale: "en",
    compilerConfigHash: transportArtifactHash,
    compilerVersion: "0.2.0",
    contentKey: "test:http",
    contentTree: {
      $node: "element",
      children: [],
      name: "fragment",
      props: {},
    },
    format: "content-tree",
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

/** Builds one fragment whose single text child holds the given text. */
export function textTree(text: string): ContentTreeElement {
  return {
    $node: "element",
    children: [text],
    name: "fragment",
    props: {},
  };
}
