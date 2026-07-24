import { politicsArticleCategory } from "#corpus/articles/politics/category";
import { references } from "#corpus/articles/politics/nepotism-in/political-governance/ref";
import { defineArticleSource } from "#corpus/articles/schema";

export const nepotismPoliticalGovernanceArticle = defineArticleSource({
  ...politicsArticleCategory,
  references,
  slug: "nepotism-in-political-governance",
  sourceRoot: "articles/politics/nepotism-in/political-governance",
});
