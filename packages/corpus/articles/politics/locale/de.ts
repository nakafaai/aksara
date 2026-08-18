import {
  ArticleCategorySchema,
  ArticleRouteSlugSchema,
} from "@nakafa/aksara-contracts/projection/article";

/** Reviewed German route and title for the stable politics category. */
export const politicsGermanCategory = {
  appLocale: "de",
  category: ArticleCategorySchema.make("politics"),
  routeSlug: ArticleRouteSlugSchema.make("politik"),
  title: "Politik",
} as const;
