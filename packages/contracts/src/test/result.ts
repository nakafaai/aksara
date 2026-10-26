import { Schema } from "effect";
import { ArticleHeadSchema, MaterialHeadSchema } from "#contracts/release/head";

/** Builds one canonical compact material head at a test-only identity. */
export function head(contentKey: string) {
  const slug = contentKey.replace(":", "-");
  return Schema.decodeSync(MaterialHeadSchema)({
    artifactHash: `sha256:${"a".repeat(64)}`,
    artifactLocale: "en",
    compilerConfigHash: `sha256:${"b".repeat(64)}`,
    contentKey,
    delivery: "public",
    family: "material",
    projectionHash: `sha256:${"c".repeat(64)}`,
    publicPath: `subjects/test/${slug}`,
    rendererDomain: "mathematics",
    sourceHash: `sha256:${"d".repeat(64)}`,
    sourcePath: `packages/corpus/test/${slug}/en.mdx`,
  });
}

export const firstHead = head("test:a");
export const secondHead = head("test:b");
export const heads = [firstHead, secondHead];

const article = Schema.decodeSync(ArticleHeadSchema)({
  artifactHash: `sha256:${"a".repeat(64)}`,
  artifactLocale: "en",
  compilerConfigHash: `sha256:${"b".repeat(64)}`,
  contentKey: "articles/test/result",
  delivery: "public",
  family: "article",
  projectionHash: `sha256:${"c".repeat(64)}`,
  publicPath: "articles/test/result",
  rendererDomain: "politics",
  sourceHash: `sha256:${"d".repeat(64)}`,
  sourcePath: "packages/corpus/articles/test/result/en.mdx",
});

/** Canonically ordered three-head result catalog of two families. */
export const catalog = [article, firstHead, secondHead];
