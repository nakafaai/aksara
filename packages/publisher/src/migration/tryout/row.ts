import type {
  StoredTryoutCatalogRow,
  StoredTryoutPlacementRow,
} from "@nakafa/aksara-contracts/history/decode";
import type { Sha256Hash } from "@nakafa/aksara-contracts/ids";
import {
  AppLocaleSchema,
  type ArtifactLocale,
  ArtifactLocaleSchema,
} from "@nakafa/aksara-contracts/locale";
import {
  hasLosslessHistoricalCatalogMapping,
  hasLosslessHistoricalPlacementMapping,
} from "@nakafa/aksara-contracts/migration/tryout/history/lossless";
import { QuestionKeySchema } from "@nakafa/aksara-contracts/question/identity";
import type { TryoutHistoryMigrationRowMapping } from "@nakafa/aksara-contracts/transport/migration/tryout/request";
import {
  type TryoutCatalogRecord,
  TryoutCatalogRowSchema,
} from "@nakafa/aksara-contracts/tryout/catalog";
import { makeTryoutCatalogRecord } from "@nakafa/aksara-contracts/tryout/catalog-hash";
import { hashTryoutContent } from "@nakafa/aksara-contracts/tryout/content-hash";
import {
  deliveryLanguageForSection,
  questionArtifactLocaleForSection,
} from "@nakafa/aksara-contracts/tryout/language";
import {
  type TryoutPlacementRecord,
  TryoutPlacementSchema,
} from "@nakafa/aksara-contracts/tryout/placement";
import { makeTryoutPlacementRecord } from "@nakafa/aksara-contracts/tryout/placement-hash";
import { Effect, Schema } from "effect";

import type { ConvertedTryoutArtifact } from "#publisher/migration/tryout/artifact";
import { migrationFail } from "#publisher/migration/tryout/error";
import type {
  HistoricalTryoutRows,
  IndexedHistoricalRow,
} from "#publisher/migration/tryout/source";

type CatalogMapping = Extract<
  TryoutHistoryMigrationRowMapping,
  { readonly rowKind: "catalog" }
>;
type PlacementMapping = Extract<
  TryoutHistoryMigrationRowMapping,
  { readonly rowKind: "placement" }
>;

/** Lightweight signed-artifact facts required after the disk spool is sealed. */
export interface ConvertedArtifactFact {
  readonly artifactLocale: ArtifactLocale;
  readonly bodyMdx: string;
  readonly contentKey: string;
  readonly date: string;
  readonly index: number;
  readonly newArtifactHash: Sha256Hash;
  readonly oldArtifactHash: Sha256Hash;
  readonly rendererDomain: string;
  readonly role: "answer" | "question";
}

/** Complete current rows and their exact retained source mappings. */
export interface ConvertedTryoutRows {
  readonly catalog: readonly CatalogMapping[];
  readonly placements: readonly PlacementMapping[];
}

/** Drops compiled bytes after spooling while retaining row-conversion facts. */
export function convertedArtifactFact(
  converted: ConvertedTryoutArtifact
): ConvertedArtifactFact {
  const { artifact, oldArtifactHash } = converted.mapping;
  return {
    artifactLocale: artifact.payload.artifactLocale,
    bodyMdx: converted.bodyMdx,
    contentKey: artifact.payload.contentKey,
    date: converted.date,
    index: converted.mapping.index,
    newArtifactHash: artifact.artifactHash,
    oldArtifactHash,
    rendererDomain: artifact.payload.rendererDomain,
    role: converted.role,
  };
}

/** Indexes each unique converted artifact by its retained source hash. */
const indexArtifactFacts = Effect.fn(
  "AksaraPublisher.indexConvertedTryoutArtifacts"
)(function* (facts: readonly ConvertedArtifactFact[]) {
  const indexed = new Map<Sha256Hash, ConvertedArtifactFact>();
  for (const fact of facts) {
    if (indexed.has(fact.oldArtifactHash)) {
      return yield* migrationFail("artifact-count");
    }
    indexed.set(fact.oldArtifactHash, fact);
  }
  return indexed;
});

/** Converts locale naming without changing any catalog semantics. */
const convertCatalogRow = Effect.fn("AksaraPublisher.convertTryoutCatalogRow")(
  function* (source: StoredTryoutCatalogRow["record"]["row"]) {
    const { locale, ...historical } = source;
    const row = yield* Schema.decodeEffect(TryoutCatalogRowSchema)(
      { ...historical, appLocale: AppLocaleSchema.make(locale) },
      { onExcessProperty: "error" }
    ).pipe(Effect.mapError(() => migrationFail("catalog-conversion")));
    if (!hasLosslessHistoricalCatalogMapping(source, row)) {
      return yield* migrationFail("catalog-conversion");
    }
    return makeTryoutCatalogRecord(row);
  }
);

/** Converts all catalog rows while preserving their retained global indices. */
const convertCatalog = Effect.fn("AksaraPublisher.convertTryoutCatalog")(
  (catalog: readonly IndexedHistoricalRow<StoredTryoutCatalogRow>[]) =>
    Effect.forEach(catalog, ({ index, row }) =>
      convertCatalogRow(row.record.row).pipe(
        Effect.map(
          (record): CatalogMapping => ({
            index,
            oldRowHash: row.record.rowHash,
            record,
            rowKind: "catalog",
          })
        )
      )
    )
);

/** Checks one converted artifact matches its placement role and target fields. */
function hasArtifactFacts(
  fact: ConvertedArtifactFact,
  input: {
    readonly artifactLocale: string;
    readonly contentKey: string;
    readonly rendererDomain: string;
    readonly role: "answer" | "question";
  }
) {
  return (
    fact.artifactLocale === input.artifactLocale &&
    fact.contentKey === input.contentKey &&
    fact.rendererDomain === input.rendererDomain &&
    fact.role === input.role
  );
}

/** Converts one placement and recomputes its current complete-content hash. */
const convertPlacementRow = Effect.fn(
  "AksaraPublisher.convertTryoutPlacementRow"
)(function* (
  source: StoredTryoutPlacementRow["record"]["row"],
  artifacts: ReadonlyMap<Sha256Hash, ConvertedArtifactFact>
) {
  const appLocale = AppLocaleSchema.make(source.locale);
  const answerArtifactLocale = ArtifactLocaleSchema.make(source.locale);
  const deliveryLanguage = deliveryLanguageForSection(
    source.sectionKey,
    appLocale
  );
  const questionArtifactLocale = questionArtifactLocaleForSection(
    source.sectionKey,
    appLocale
  );
  const answer = artifacts.get(source.answerArtifactHash);
  const question = artifacts.get(source.questionArtifactHash);
  if (
    answer === undefined ||
    question === undefined ||
    !hasArtifactFacts(answer, {
      artifactLocale: answerArtifactLocale,
      contentKey: source.answerContentKey,
      rendererDomain: source.rendererDomain,
      role: "answer",
    }) ||
    !hasArtifactFacts(question, {
      artifactLocale: questionArtifactLocale,
      contentKey: source.questionContentKey,
      rendererDomain: source.rendererDomain,
      role: "question",
    })
  ) {
    return yield* migrationFail("artifact-requirement");
  }
  const questionSuffix = "/question";
  const questionKey = yield* Schema.decodeEffect(QuestionKeySchema)(
    source.questionContentKey.slice(0, -questionSuffix.length)
  ).pipe(Effect.mapError(() => migrationFail("placement-conversion")));
  const row = TryoutPlacementSchema.make({
    answerArtifactHash: answer.newArtifactHash,
    answerArtifactLocale,
    answerContentKey: source.answerContentKey,
    appLocale,
    choices: source.choices,
    contentHash: hashTryoutContent({
      answerArtifactLocale,
      answerBody: answer.bodyMdx,
      appLocale,
      choices: source.choices.map(({ isCorrect, label }) => ({
        label,
        value: isCorrect,
      })),
      date: question.date,
      deliveryLanguage,
      questionArtifactLocale,
      questionBody: question.bodyMdx,
      sourcePath: questionKey,
      sourceRevision: source.sourceRevision,
    }),
    countryKey: source.countryKey,
    deliveryLanguage,
    examKey: source.examKey,
    questionArtifactHash: question.newArtifactHash,
    questionArtifactLocale,
    questionContentKey: source.questionContentKey,
    questionOrder: source.questionOrder,
    questionSourcePath: source.questionSourcePath,
    rendererDomain: source.rendererDomain,
    scope: source.scope,
    sectionKey: source.sectionKey,
    setKey: source.setKey,
    sourceRevision: source.sourceRevision,
    trackKey: source.trackKey,
  });
  if (!hasLosslessHistoricalPlacementMapping(source, row)) {
    return yield* migrationFail("placement-conversion");
  }
  return makeTryoutPlacementRecord(row);
});

/** Converts all placements while preserving their retained global indices. */
const convertPlacements = Effect.fn("AksaraPublisher.convertTryoutPlacements")(
  function* (
    placements: readonly IndexedHistoricalRow<StoredTryoutPlacementRow>[],
    artifacts: ReadonlyMap<Sha256Hash, ConvertedArtifactFact>
  ) {
    return yield* Effect.forEach(placements, ({ index, row }) =>
      convertPlacementRow(row.record.row, artifacts).pipe(
        Effect.map(
          (record): PlacementMapping => ({
            index,
            oldRowHash: row.record.rowHash,
            record,
            rowKind: "placement",
          })
        )
      )
    );
  }
);

/** Converts the complete retained snapshot into current immutable rows. */
export const convertTryoutRows = Effect.fn(
  "AksaraPublisher.convertTryoutHistoryRows"
)(function* (
  rows: HistoricalTryoutRows,
  artifactFacts: readonly ConvertedArtifactFact[]
) {
  const artifacts = yield* indexArtifactFacts(artifactFacts);
  const [catalog, placements] = yield* Effect.all([
    convertCatalog(rows.catalog),
    convertPlacements(rows.placements, artifacts),
  ]);
  return { catalog, placements } satisfies ConvertedTryoutRows;
});

/** Projects current records for deterministic target digest computation. */
export function convertedCatalogRecords(
  rows: ConvertedTryoutRows
): readonly TryoutCatalogRecord[] {
  return rows.catalog.map(({ record }) => record);
}

/** Projects current records for deterministic target digest computation. */
export function convertedPlacementRecords(
  rows: ConvertedTryoutRows
): readonly TryoutPlacementRecord[] {
  return rows.placements.map(({ record }) => record);
}
