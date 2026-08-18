import {
  ArticleCategorySchema,
  ArticleRouteSlugSchema,
  ArticleSlugSchema,
} from "@nakafa/aksara-contracts/projection/article";

/** Reviewed German route for the stable Nusantara legal analysis. */
export const flawedLegalGeopoliticsGermanArticle = {
  appLocale: "de",
  articleSlug: ArticleSlugSchema.make("flawed-legal-geopolitics"),
  category: ArticleCategorySchema.make("politics"),
  routeSlug: ArticleRouteSlugSchema.make(
    "nusantara-rechtsgrundlage-und-sicherheit"
  ),
} as const;
