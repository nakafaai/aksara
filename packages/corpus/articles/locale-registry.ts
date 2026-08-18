import type {
  ArticleLocaleCategory,
  ArticleLocaleSource,
} from "#corpus/articles/locale";
import { dynasticPoliticsAsianValuesGermanArticle } from "#corpus/articles/politics/dynastic-politics/asian-values/locale/de";
import { flawedLegalGeopoliticsGermanArticle } from "#corpus/articles/politics/flawed-legal/geopolitics/locale/de";
import { kimPlusEmptyBoxGermanArticle } from "#corpus/articles/politics/kim-plus/empty-box/locale/de";
import { politicsGermanCategory } from "#corpus/articles/politics/locale/de";
import { merahPutihCabinetAnalysisGermanArticle } from "#corpus/articles/politics/merah-putih/cabinet-analysis/locale/de";
import { nepotismPoliticalGovernanceGermanArticle } from "#corpus/articles/politics/nepotism-in/political-governance/locale/de";
import { porkBarrelPoliticsPowerGermanArticle } from "#corpus/articles/politics/pork-barrel/politics-power/locale/de";
import { regionalElectionsTurmoilGermanArticle } from "#corpus/articles/politics/regional-elections/turmoil/locale/de";

/** Every checked-in locale-owned article category row. */
export const articleLocaleCategories: readonly ArticleLocaleCategory[] = [
  politicsGermanCategory,
];

/** Every checked-in locale-owned article route row. */
export const articleLocaleSources: readonly ArticleLocaleSource[] = [
  dynasticPoliticsAsianValuesGermanArticle,
  flawedLegalGeopoliticsGermanArticle,
  kimPlusEmptyBoxGermanArticle,
  merahPutihCabinetAnalysisGermanArticle,
  nepotismPoliticalGovernanceGermanArticle,
  porkBarrelPoliticsPowerGermanArticle,
  regionalElectionsTurmoilGermanArticle,
];
