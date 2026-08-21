import { politicsArticleCategory } from "#corpus/articles/politics/category";
import { references } from "#corpus/articles/politics/kim-plus/empty-box/ref";
import { defineArticleSource } from "#corpus/articles/schema";

export const kimPlusEmptyBoxArticle = defineArticleSource({
  category: politicsArticleCategory,
  references,
  routeSlugs: {
    de: "kim-plus-und-das-leere-feld",
    en: "kim-plus-empty-box",
    id: "kim-plus-empty-box",
  },
  slug: "kim-plus-empty-box",
  sourceRoot: "articles/politics/kim-plus/empty-box",
});
