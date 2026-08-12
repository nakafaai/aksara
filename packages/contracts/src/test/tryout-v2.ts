import { Schema } from "effect";

import type { ContentLocale } from "#contracts/content";
import { Sha256HashSchema } from "#contracts/ids";
import { materialGraph } from "#contracts/test/graph";
import { makeTryoutCatalogV2Record } from "#contracts/tryout/catalog-hash";
import {
  type TryoutCatalogV2Record,
  TryoutCatalogV2RowSchema,
} from "#contracts/tryout/catalog-v2";
import {
  type TryoutPlacementV2Record,
  TryoutPlacementV2Schema,
} from "#contracts/tryout/placement";
import { makeTryoutPlacementV2Record } from "#contracts/tryout/placement-hash";

const artifactHash = Sha256HashSchema.make(`sha256:${"a".repeat(64)}`);

/** Builds all five current hierarchy kinds for one app locale. */
function catalogRows(appLocale: ContentLocale): TryoutCatalogV2Record[] {
  const common = {
    appLocale,
    sourceRevision: "2026-08-12",
    title: "Test-only title",
  } as const;
  return Schema.decodeUnknownSync(Schema.Array(TryoutCatalogV2RowSchema))([
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
  ]).map(makeTryoutCatalogV2Record);
}

/** Builds one locale-closed placement pair for a non-language section. */
function placement(appLocale: ContentLocale): TryoutPlacementV2Record {
  const root =
    "question-bank/tryout/indonesia/snbt/quantitative-knowledge/set-1/question-1";
  return makeTryoutPlacementV2Record(
    Schema.decodeUnknownSync(TryoutPlacementV2Schema)({
      answerArtifactHash: artifactHash,
      answerArtifactLocale: appLocale,
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
      deliveryLanguage: appLocale,
      examKey: "snbt",
      questionArtifactHash: artifactHash,
      questionArtifactLocale: appLocale,
      questionContentKey: `${root}/question`,
      questionOrder: 1,
      questionSourcePath: `packages/corpus/${root}`,
      rendererDomain: "snbt-quant",
      scope: "server",
      sectionKey: "quantitative-knowledge",
      setKey: "set-1",
      sourceRevision: "2026-08-12",
      title: "Test-only question",
      trackKey: "2027",
    })
  );
}

/** Returns a small complete en and id v2 hierarchy and placement fixture. */
export function makeTryoutV2TestRows() {
  return {
    catalog: ["en", "id"].flatMap((locale) =>
      catalogRows(Schema.decodeUnknownSync(Schema.Literal("en", "id"))(locale))
    ),
    placements: [placement("en"), placement("id")],
  };
}
