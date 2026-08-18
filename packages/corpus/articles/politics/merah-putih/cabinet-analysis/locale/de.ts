import {
  ArticleCategorySchema,
  ArticleRouteSlugSchema,
  ArticleSlugSchema,
} from "@nakafa/aksara-contracts/projection/article";

/** Reviewed German route for the stable Merah Putih cabinet analysis. */
export const merahPutihCabinetAnalysisGermanArticle = {
  appLocale: "de",
  articleSlug: ArticleSlugSchema.make("merah-putih-cabinet-analysis"),
  category: ArticleCategorySchema.make("politics"),
  routeSlug: ArticleRouteSlugSchema.make(
    "kabinett-merah-putih-und-koalitionspolitik"
  ),
} as const;
