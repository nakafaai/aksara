import { politicsArticleCategory } from "#corpus/articles/politics/category";
import { references } from "#corpus/articles/politics/pork-barrel/politics-power/ref";
import { defineArticleSource } from "#corpus/articles/schema";

export const porkBarrelPoliticsPowerArticle = defineArticleSource({
  category: politicsArticleCategory,
  references,
  slug: "pork-barrel-politics-power",
  sourceRoot: "articles/politics/pork-barrel/politics-power",
});
