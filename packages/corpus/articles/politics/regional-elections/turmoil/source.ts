import { politicsArticleCategory } from "#corpus/articles/politics/category";
import { references } from "#corpus/articles/politics/regional-elections/turmoil/ref";
import { defineArticleSource } from "#corpus/articles/schema";

export const regionalElectionsTurmoilArticle = defineArticleSource({
  category: politicsArticleCategory,
  references,
  slug: "regional-elections-turmoil",
  sourceRoot: "articles/politics/regional-elections/turmoil",
});
