import { Schema } from "effect";
import {
  MaterialHeadSchema,
  QuestionHeadSchema,
} from "#contracts/release/head";

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

const question = Schema.decodeSync(QuestionHeadSchema)({
  artifactHash: `sha256:${"a".repeat(64)}`,
  artifactLocale: "en",
  compilerConfigHash: `sha256:${"b".repeat(64)}`,
  contentKey: "question-bank/test/question",
  delivery: "authenticated",
  family: "question",
  projectionHash: `sha256:${"c".repeat(64)}`,
  rendererDomain: "snbt-general",
  sourceHash: `sha256:${"d".repeat(64)}`,
  sourcePath: "packages/corpus/question-bank/test/question/en.mdx",
});

/** Canonically ordered three-head result catalog with one question head. */
export const catalog = [question, firstHead, secondHead];
