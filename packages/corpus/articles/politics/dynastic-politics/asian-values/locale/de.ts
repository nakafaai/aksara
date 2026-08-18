import {
  ArticleCategorySchema,
  ArticleRouteSlugSchema,
  ArticleSlugSchema,
} from "@nakafa/aksara-contracts/projection/article";

/** Reviewed German route for the stable political-dynasties article. */
export const dynasticPoliticsAsianValuesGermanArticle = {
  appLocale: "de",
  articleSlug: ArticleSlugSchema.make("dynastic-politics-asian-values"),
  category: ArticleCategorySchema.make("politics"),
  routeSlug: ArticleRouteSlugSchema.make(
    "politische-dynastien-und-asiatische-werte"
  ),
} as const;
