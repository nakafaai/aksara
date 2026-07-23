import { references } from "#corpus/articles/politics/merah-putih/cabinet-analysis/ref";
import { defineArticleSource } from "#corpus/articles/schema";

export const merahPutihCabinetAnalysisArticle = defineArticleSource({
  category: "politics",
  references,
  slug: "merah-putih-cabinet-analysis",
  sourceRoot: "articles/politics/merah-putih/cabinet-analysis",
});
