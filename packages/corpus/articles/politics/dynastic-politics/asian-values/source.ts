import { politicsArticleCategory } from "#corpus/articles/politics/category";
import { references } from "#corpus/articles/politics/dynastic-politics/asian-values/ref";
import { defineArticleSource } from "#corpus/articles/schema";

export const dynasticPoliticsAsianValuesArticle = defineArticleSource({
  category: politicsArticleCategory,
  references,
  slug: "dynastic-politics-asian-values",
  sourceRoot: "articles/politics/dynastic-politics/asian-values",
});
