import { references } from "#corpus/articles/politics/kim-plus/empty-box/ref";
import { defineArticleSource } from "#corpus/articles/schema";

export const kimPlusEmptyBoxArticle = defineArticleSource({
  category: "politics",
  references,
  slug: "kim-plus-empty-box",
  sourceRoot: "articles/politics/kim-plus/empty-box",
});
