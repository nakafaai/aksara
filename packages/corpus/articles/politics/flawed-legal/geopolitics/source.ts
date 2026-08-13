import { politicsArticleCategory } from "#corpus/articles/politics/category";
import { references } from "#corpus/articles/politics/flawed-legal/geopolitics/ref";
import { defineArticleSource } from "#corpus/articles/schema";

export const flawedLegalGeopoliticsArticle = defineArticleSource({
  category: politicsArticleCategory,
  references,
  routeSlugs: {
    en: "flawed-legal-geopolitics",
    id: "flawed-legal-geopolitics",
  },
  slug: "flawed-legal-geopolitics",
  sourceRoot: "articles/politics/flawed-legal/geopolitics",
});
