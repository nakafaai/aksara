import {
  ArticleCategorySchema,
  ArticleRouteSlugSchema,
  ArticleSlugSchema,
} from "@nakafa/aksara-contracts/projection/article";

/** Reviewed German route for the stable social-assistance politics analysis. */
export const porkBarrelPoliticsPowerGermanArticle = {
  appLocale: "de",
  articleSlug: ArticleSlugSchema.make("pork-barrel-politics-power"),
  category: ArticleCategorySchema.make("politics"),
  routeSlug: ArticleRouteSlugSchema.make(
    "sozialhilfe-und-wahlpolitische-anreize"
  ),
} as const;
