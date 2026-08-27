import type { StoredTryoutPlacementRow } from "@nakafa/aksara-contracts/history/decode";
import type { Sha256Hash } from "@nakafa/aksara-contracts/ids";
import {
  AppLocaleSchema,
  type ArtifactLocale,
  ArtifactLocaleSchema,
} from "@nakafa/aksara-contracts/locale";
import { hasLosslessHistoricalPlacementMapping } from "@nakafa/aksara-contracts/migration/tryout/history/lossless";
import { QuestionKeySchema } from "@nakafa/aksara-contracts/question/identity";
import type { TryoutHistoryMigrationRowMapping } from "@nakafa/aksara-contracts/transport/migration/tryout/request";
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
import type { IndexedHistoricalRow } from "#publisher/migration/tryout/source";
import type { ReplaySpool } from "#publisher/replay/spool";

/** One current placement bound to its retained global identity. */
export type ConvertedPlacementMapping = Extract<
  TryoutHistoryMigrationRowMapping,
  { readonly rowKind: "placement" }
>;

/** Random-access private artifact storage used during row conversion. */
export type ConvertedArtifactSpool = Pick<
  ReplaySpool<ConvertedTryoutArtifact>,
  "count" | "read"
>;

/** Transient artifact facts loaded for one placement conversion. */
interface ConvertedArtifactFact {
  readonly artifactLocale: ArtifactLocale;
  readonly bodyMdx: string;
  readonly contentKey: string;
  readonly date: string;
  readonly newArtifactHash: Sha256Hash;
  readonly rendererDomain: string;
  readonly role: "answer" | "question";
}

/** Projects one spooled artifact into transient row-conversion facts. */
function convertedArtifactFact(
  converted: ConvertedTryoutArtifact
): ConvertedArtifactFact {
  const { artifact } = converted.mapping;
  return {
    artifactLocale: artifact.payload.artifactLocale,
    bodyMdx: converted.bodyMdx,
    contentKey: artifact.payload.contentKey,
    date: converted.date,
    newArtifactHash: artifact.artifactHash,
    rendererDomain: artifact.payload.rendererDomain,
    role: converted.role,
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

/** Reads one hash-verified artifact record without retaining its body globally. */
const readArtifactFact = Effect.fn(
  "AksaraPublisher.readConvertedTryoutArtifact"
)(function* (
  artifacts: ConvertedArtifactSpool,
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
  artifacts: ConvertedArtifactSpool
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
export const convertTryoutPlacements = Effect.fn(
  "AksaraPublisher.convertTryoutPlacements"
)(function* (
  placements: readonly IndexedHistoricalRow<StoredTryoutPlacementRow>[],
  requirements: readonly ArtifactRequirement[],
  artifacts: ConvertedArtifactSpool
) {
  if (artifacts.count !== requirements.length) {
    return yield* migrationFail("artifact-count");
  }
  const indexed = yield* indexArtifactRequirements(requirements);
  return yield* Effect.forEach(placements, ({ index, row }) =>
    convertPlacementRow(row.record.row, indexed, artifacts).pipe(
      Effect.map(
        (record): ConvertedPlacementMapping => ({
          index,
          oldRowHash: row.record.rowHash,
          record,
          rowKind: "placement",
        })
      )
    )
  );
});

/** Projects current placement records for deterministic target computation. */
export function convertedPlacementRecords(
  rows: readonly ConvertedPlacementMapping[]
): readonly TryoutPlacementRecord[] {
  return rows.map(({ record }) => record);
}
