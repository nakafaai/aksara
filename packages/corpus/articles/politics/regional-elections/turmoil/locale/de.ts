import {
  ArticleCategorySchema,
  ArticleRouteSlugSchema,
  ArticleSlugSchema,
} from "@nakafa/aksara-contracts/projection/article";

/** Reviewed German route for the stable 2024 regional-election analysis. */
export const regionalElectionsTurmoilGermanArticle = {
  appLocale: "de",
  articleSlug: ArticleSlugSchema.make("regional-elections-turmoil"),
  category: ArticleCategorySchema.make("politics"),
  routeSlug: ArticleRouteSlugSchema.make(
    "pilkada-2024-gerichtsurteile-und-kandidaturen"
  ),
} as const;
