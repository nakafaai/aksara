import { politicsArticleCategory } from "#corpus/articles/politics/category";
import { references } from "#corpus/articles/politics/merah-putih/cabinet-analysis/ref";
import { defineArticleSource } from "#corpus/articles/schema";

export const merahPutihCabinetAnalysisArticle = defineArticleSource({
  category: politicsArticleCategory,
  references,
  routeSlugs: {
    en: "merah-putih-cabinet-analysis",
    id: "merah-putih-cabinet-analysis",
  },
  slug: "merah-putih-cabinet-analysis",
  sourceRoot: "articles/politics/merah-putih/cabinet-analysis",
});
