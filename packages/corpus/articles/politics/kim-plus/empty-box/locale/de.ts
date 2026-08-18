import {
  ArticleCategorySchema,
  ArticleRouteSlugSchema,
  ArticleSlugSchema,
} from "@nakafa/aksara-contracts/projection/article";

/** Reviewed German route for the stable KIM Plus article. */
export const kimPlusEmptyBoxGermanArticle = {
  appLocale: "de",
  articleSlug: ArticleSlugSchema.make("kim-plus-empty-box"),
  category: ArticleCategorySchema.make("politics"),
  routeSlug: ArticleRouteSlugSchema.make("kim-plus-und-das-leere-feld"),
} as const;
