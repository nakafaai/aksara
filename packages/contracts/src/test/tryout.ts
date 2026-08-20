import { Schema } from "effect";

import { Sha256HashSchema } from "#contracts/ids";
import {
  type AppLocale,
  AppLocaleCodeSchema,
  AppLocaleSchema,
  ArtifactLocaleSchema,
  DeliveryLanguageSchema,
} from "#contracts/locale";
import { materialGraph } from "#contracts/test/graph";
import {
  type TryoutCatalogRecord,
  TryoutCatalogRowSchema,
} from "#contracts/tryout/catalog";
import { makeTryoutCatalogRecord } from "#contracts/tryout/catalog-hash";
import {
  type TryoutPlacementRecord,
  TryoutPlacementSchema,
} from "#contracts/tryout/placement";
import { makeTryoutPlacementRecord } from "#contracts/tryout/placement-hash";

const artifactHash = Sha256HashSchema.make(`sha256:${"a".repeat(64)}`);

/** Builds all five current hierarchy kinds for one app locale. */
function catalogRows(appLocale: AppLocale): TryoutCatalogRecord[] {
  const common = {
    appLocale,
    sourceRevision: "2026-08-12",
    title: "Test-only title",
  } as const;
  return Schema.decodeSync(Schema.Array(TryoutCatalogRowSchema))([
    {
      ...common,
      countryCode: "ID",
      countryKey: "indonesia",
      graph: materialGraph(appLocale, "tryout", "catalog", "country"),
      kind: "country",
      order: 1,
      publicPath: "try-out/indonesia",
    },
    {
      ...common,
      countryKey: "indonesia",
      examKey: "snbt",
      graph: materialGraph(appLocale, "tryout", "catalog", "exam"),
      kind: "exam",
      order: 1,
      publicPath: "try-out/indonesia/snbt",
      scoringStrategy: "irt",
    },
    {
      ...common,
      countryKey: "indonesia",
      examKey: "snbt",
      graph: materialGraph(appLocale, "tryout", "catalog", "track"),
      kind: "track",
      order: 1,
      publicPath: "try-out/indonesia/snbt/2027",
      questionCount: 1,
      sectionCount: 1,
      setCount: 1,
      trackKey: "2027",
      trackKind: "year",
      visibleSectionCount: 0,
    },
    {
      ...common,
      countryKey: "indonesia",
      examKey: "snbt",
      graph: materialGraph(appLocale, "tryout", "catalog", "set"),
      internalEntrySectionKey: "quantitative-knowledge",
      kind: "set",
      order: 1,
      publicPath: "try-out/indonesia/snbt/2027/set-1",
      questionCount: 1,
      scoringStrategy: "irt",
      sectionCount: 1,
      setKey: "set-1",
      trackKey: "2027",
      visibleSectionCount: 0,
    },
    {
      ...common,
      countryKey: "indonesia",
      examKey: "snbt",
      graph: materialGraph(appLocale, "tryout", "catalog", "section"),
      kind: "section",
      order: 1,
      questionCount: 1,
      questionSourcePath:
        "packages/corpus/question-bank/tryout/indonesia/snbt/quantitative-knowledge/set-1",
      sectionKey: "quantitative-knowledge",
      setKey: "set-1",
      timeLimitSeconds: 60,
      trackKey: "2027",
      visibility: "internal-entry",
    },
  ]).map(makeTryoutCatalogRecord);
}

/** Builds one locale-closed placement pair for a non-language section. */
function placement(appLocale: AppLocale): TryoutPlacementRecord {
  const localeCode = Schema.decodeUnknownSync(AppLocaleCodeSchema)(
    String(appLocale)
  );
  const root =
    "question-bank/tryout/indonesia/snbt/quantitative-knowledge/set-1/question-1";
  return makeTryoutPlacementRecord(
    Schema.decodeSync(TryoutPlacementSchema)({
      answerArtifactHash: artifactHash,
      answerArtifactLocale: ArtifactLocaleSchema.make(localeCode),
      answerContentKey: `${root}/answer`,
      appLocale,
      choices: [
        {
          isCorrect: true,
          label: "Test-only choice",
          optionKey: "option-1",
          order: 1,
        },
      ],
      contentHash: "c".repeat(64),
      countryKey: "indonesia",
      deliveryLanguage: DeliveryLanguageSchema.make(localeCode),
      examKey: "snbt",
      questionArtifactHash: artifactHash,
      questionArtifactLocale: ArtifactLocaleSchema.make(localeCode),
      questionContentKey: `${root}/question`,
      questionOrder: 1,
      questionSourcePath: `packages/corpus/${root}`,
      rendererDomain: "snbt-quant",
      scope: "server",
      sectionKey: "quantitative-knowledge",
      setKey: "set-1",
      sourceRevision: "2026-08-12",
      trackKey: "2027",
    })
  );
}

/** Returns a small hierarchy fixture closed over the requested app locales. */
export function makeTryoutTestRows(
  appLocales: readonly AppLocale[] = [
    AppLocaleSchema.make("en"),
    AppLocaleSchema.make("id"),
  ]
) {
  return {
    catalog: appLocales.flatMap(catalogRows),
    placements: appLocales.map(placement),
  };
}
