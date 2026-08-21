import { politicsArticleCategory } from "#corpus/articles/politics/category";
import { references } from "#corpus/articles/politics/nepotism-in/political-governance/ref";
import { defineArticleSource } from "#corpus/articles/schema";

export const nepotismPoliticalGovernanceArticle = defineArticleSource({
  category: politicsArticleCategory,
  references,
  routeSlugs: {
    de: "nepotismus-und-politische-verantwortung",
    en: "nepotism-in-political-governance",
    id: "nepotism-in-political-governance",
  },
  slug: "nepotism-in-political-governance",
  sourceRoot: "articles/politics/nepotism-in/political-governance",
});
