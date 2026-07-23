import { references } from "#corpus/articles/politics/flawed-legal/geopolitics/ref";
import { defineArticleSource } from "#corpus/articles/schema";

export const flawedLegalGeopoliticsArticle = defineArticleSource({
  category: "politics",
  references,
  slug: "flawed-legal-geopolitics",
  sourceRoot: "articles/politics/flawed-legal/geopolitics",
});
