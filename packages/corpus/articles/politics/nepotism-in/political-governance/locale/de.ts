import {
  ArticleCategorySchema,
  ArticleRouteSlugSchema,
  ArticleSlugSchema,
} from "@nakafa/aksara-contracts/projection/article";

/** Reviewed German route for the stable political-nepotism analysis. */
export const nepotismPoliticalGovernanceGermanArticle = {
  appLocale: "de",
  articleSlug: ArticleSlugSchema.make("nepotism-in-political-governance"),
  category: ArticleCategorySchema.make("politics"),
  routeSlug: ArticleRouteSlugSchema.make(
    "nepotismus-und-politische-verantwortung"
  ),
} as const;
