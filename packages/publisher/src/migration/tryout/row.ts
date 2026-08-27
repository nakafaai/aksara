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

import type {
  ArtifactRequirement,
  ConvertedTryoutArtifact,
} from "#publisher/migration/tryout/artifact";
import { migrationFail } from "#publisher/migration/tryout/error";
import type {
  HistoricalTryoutRows,
  IndexedHistoricalRow,
} from "#publisher/migration/tryout/source";
import type { ReplaySpool } from "#publisher/replay/spool";

type CatalogMapping = Extract<
  TryoutHistoryMigrationRowMapping,
  { readonly rowKind: "catalog" }
>;
type PlacementMapping = Extract<
  TryoutHistoryMigrationRowMapping,
  { readonly rowKind: "placement" }
>;

/** Transient artifact facts loaded for one placement conversion. */
interface ConvertedArtifactFact {
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

/** Body-free old-to-current artifact identity retained in target evidence. */
export interface ConvertedArtifactMap {
  readonly index: number;
  readonly newArtifactHash: Sha256Hash;
  readonly oldArtifactHash: Sha256Hash;
}

/** Complete current rows and their exact retained source mappings. */
export interface ConvertedTryoutRows {
  readonly catalog: readonly CatalogMapping[];
  readonly placements: readonly PlacementMapping[];
}

/** Projects one spooled artifact into transient row-conversion facts. */
function convertedArtifactFact(
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

/** Drops all content bytes while retaining deterministic target-map identity. */
export function convertedArtifactMap(
  converted: ConvertedTryoutArtifact
): ConvertedArtifactMap {
  return {
    index: converted.mapping.index,
    newArtifactHash: converted.mapping.artifact.artifactHash,
    oldArtifactHash: converted.mapping.oldArtifactHash,
  };
}

/** Indexes each unique disk-spooled artifact by its stable source identity. */
const indexArtifactRequirements = Effect.fn(
  "AksaraPublisher.indexTryoutArtifactRequirements"
)(function* (requirements: readonly ArtifactRequirement[]) {
  const indexed = new Map<Sha256Hash, ArtifactRequirement>();
  for (const requirement of requirements) {
    if (indexed.has(requirement.oldArtifactHash)) {
      return yield* migrationFail("artifact-count");
    }
    indexed.set(requirement.oldArtifactHash, requirement);
  }
  return indexed;
});

type ArtifactSpool = Pick<
  ReplaySpool<ConvertedTryoutArtifact>,
  "count" | "read"
>;

/** Reads one hash-verified artifact record without retaining its body globally. */
const readArtifactFact = Effect.fn(
  "AksaraPublisher.readConvertedTryoutArtifact"
)(function* (
  artifacts: ArtifactSpool,
  requirements: ReadonlyMap<Sha256Hash, ArtifactRequirement>,
  oldArtifactHash: Sha256Hash
) {
  const requirement = requirements.get(oldArtifactHash);
  if (requirement === undefined) {
    return yield* migrationFail("artifact-requirement");
  }
  const converted = yield* artifacts
    .read(requirement.index)
    .pipe(Effect.mapError(() => migrationFail("artifact-contract")));
  if (
    converted.mapping.index !== requirement.index ||
    converted.mapping.oldArtifactHash !== oldArtifactHash
  ) {
    return yield* migrationFail("artifact-contract");
  }
  return convertedArtifactFact(converted);
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
  requirements: ReadonlyMap<Sha256Hash, ArtifactRequirement>,
  artifacts: ArtifactSpool
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
  const [answer, question] = yield* Effect.all([
    readArtifactFact(artifacts, requirements, source.answerArtifactHash),
    readArtifactFact(artifacts, requirements, source.questionArtifactHash),
  ]);
  if (
    !(
      hasArtifactFacts(answer, {
        artifactLocale: answerArtifactLocale,
        contentKey: source.answerContentKey,
        rendererDomain: source.rendererDomain,
        role: "answer",
      }) &&
      hasArtifactFacts(question, {
        artifactLocale: questionArtifactLocale,
        contentKey: source.questionContentKey,
        rendererDomain: source.rendererDomain,
        role: "question",
      })
    )
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
    requirements: ReadonlyMap<Sha256Hash, ArtifactRequirement>,
    artifacts: ArtifactSpool
  ) {
    return yield* Effect.forEach(placements, ({ index, row }) =>
      convertPlacementRow(row.record.row, requirements, artifacts).pipe(
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
  requirements: readonly ArtifactRequirement[],
  artifacts: ArtifactSpool
) {
  if (artifacts.count !== requirements.length) {
    return yield* migrationFail("artifact-count");
  }
  const indexed = yield* indexArtifactRequirements(requirements);
  const [catalog, placements] = yield* Effect.all([
    convertCatalog(rows.catalog),
    convertPlacements(rows.placements, indexed, artifacts),
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
