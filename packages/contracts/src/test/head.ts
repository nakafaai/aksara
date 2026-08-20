import { Schema } from "effect";
import type { AppLocaleCode } from "#contracts/locale";
import {
  ArticleHeadSchema,
  MaterialHeadSchema,
  PageHeadSchema,
  QuestionHeadSchema,
} from "#contracts/release/head";

const hash = `sha256:${"a".repeat(64)}`;

/** Builds the shared immutable identity fields for one test head. */
function headIdentity(contentKey: string, artifactLocale: AppLocaleCode) {
  return {
    artifactHash: hash,
    artifactLocale,
    compilerConfigHash: hash,
    contentKey,
    projectionHash: hash,
    sourceHash: hash,
  };
}

/** Builds one strict material-head sample at a deterministic identity. */
export function materialHead(
  contentKey: string,
  artifactLocale: AppLocaleCode = "en"
) {
  return Schema.decodeSync(MaterialHeadSchema)({
    ...headIdentity(contentKey, artifactLocale),
    delivery: "public",
    family: "material",
    publicPath: `subjects/test/${contentKey.replace(":", "-")}`,
    rendererDomain: "mathematics",
    sourcePath: `packages/corpus/test/${contentKey.replace(":", "-")}/${artifactLocale}.mdx`,
  });
}

/** Builds one strict article-head sample at a deterministic identity. */
export function articleHead(
  contentKey: string,
  artifactLocale: AppLocaleCode = "en"
) {
  return Schema.decodeSync(ArticleHeadSchema)({
    ...headIdentity(contentKey, artifactLocale),
    delivery: "public",
    family: "article",
    publicPath: contentKey,
    rendererDomain: "politics",
    sourcePath: `packages/corpus/${contentKey}/${artifactLocale}.mdx`,
  });
}

/** Builds one strict public page head at a deterministic identity. */
export function pageHead(
  contentKey: string,
  artifactLocale: AppLocaleCode = "en"
) {
  return Schema.decodeSync(PageHeadSchema)({
    ...headIdentity(contentKey, artifactLocale),
    delivery: "public",
    family: "page",
    publicPath: contentKey.replace("pages/", ""),
    rendererDomain: "site",
    sourcePath: `packages/corpus/${contentKey}/${artifactLocale}.mdx`,
  });
}

/** Builds one strict route-free question-head sample. */
export function questionHead(
  contentKey: string,
  artifactLocale: AppLocaleCode = "en"
) {
  return Schema.decodeSync(QuestionHeadSchema)({
    ...headIdentity(contentKey, artifactLocale),
    delivery: "authenticated",
    family: "question",
    rendererDomain: "snbt-general",
    sourcePath: `packages/corpus/${contentKey}/${artifactLocale}.mdx`,
  });
}
