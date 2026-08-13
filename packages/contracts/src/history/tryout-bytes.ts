import type { HistoricalLearningGraphIdentity } from "#contracts/history/primitives";
import type {
  HistoricalTryoutCatalogRow,
  HistoricalTryoutPlacement,
} from "#contracts/history/tryout-row";

/** Includes one optional retained string without encoding undefined. */
function optionalField(key: string, value: string | undefined) {
  return value === undefined ? {} : { [key]: value };
}

/** Freezes graph field order used by the retained row hash contract. */
function canonicalizeHistoricalGraph(graph: HistoricalLearningGraphIdentity) {
  return {
    alignmentId: graph.alignmentId,
    assetId: graph.assetId,
    conceptId: graph.conceptId,
    learningObjectId: graph.learningObjectId,
    lensId: graph.lensId,
  };
}

/** Reconstructs exact historical catalog bytes covered by one row hash. */
export function canonicalizeHistoricalTryoutCatalog(
  row: HistoricalTryoutCatalogRow
) {
  const localized = {
    ...optionalField("description", row.description),
    graph: canonicalizeHistoricalGraph(row.graph),
    locale: row.locale,
    sourceRevision: row.sourceRevision,
    title: row.title,
  };
  if (row.kind === "country") {
    return JSON.stringify({
      ...localized,
      countryCode: row.countryCode,
      countryKey: row.countryKey,
      kind: row.kind,
      order: row.order,
      publicPath: row.publicPath,
    });
  }
  if (row.kind === "exam") {
    return JSON.stringify({
      ...localized,
      countryKey: row.countryKey,
      examKey: row.examKey,
      kind: row.kind,
      order: row.order,
      publicPath: row.publicPath,
      scoringStrategy: row.scoringStrategy,
    });
  }
  if (row.kind === "track") {
    return JSON.stringify({
      ...localized,
      countryKey: row.countryKey,
      examKey: row.examKey,
      kind: row.kind,
      order: row.order,
      publicPath: row.publicPath,
      questionCount: row.questionCount,
      sectionCount: row.sectionCount,
      setCount: row.setCount,
      trackKey: row.trackKey,
      trackKind: row.trackKind,
      visibleSectionCount: row.visibleSectionCount,
    });
  }
  if (row.kind === "set") {
    return JSON.stringify({
      ...localized,
      countryKey: row.countryKey,
      examKey: row.examKey,
      ...optionalField("internalEntrySectionKey", row.internalEntrySectionKey),
      kind: row.kind,
      order: row.order,
      publicPath: row.publicPath,
      questionCount: row.questionCount,
      scoringStrategy: row.scoringStrategy,
      sectionCount: row.sectionCount,
      setKey: row.setKey,
      trackKey: row.trackKey,
      visibleSectionCount: row.visibleSectionCount,
    });
  }
  return JSON.stringify({
    ...localized,
    countryKey: row.countryKey,
    examKey: row.examKey,
    kind: row.kind,
    order: row.order,
    ...optionalField("publicPath", row.publicPath),
    questionCount: row.questionCount,
    questionSourcePath: row.questionSourcePath,
    sectionKey: row.sectionKey,
    setKey: row.setKey,
    timeLimitSeconds: row.timeLimitSeconds,
    trackKey: row.trackKey,
    visibility: row.visibility,
  });
}

/** Reconstructs exact historical placement bytes covered by one row hash. */
export function canonicalizeHistoricalTryoutPlacement(
  row: HistoricalTryoutPlacement
) {
  return JSON.stringify({
    answerArtifactHash: row.answerArtifactHash,
    answerContentKey: row.answerContentKey,
    choices: row.choices.map(({ isCorrect, label, optionKey, order }) => ({
      isCorrect,
      label,
      optionKey,
      order,
    })),
    contentHash: row.contentHash,
    countryKey: row.countryKey,
    examKey: row.examKey,
    locale: row.locale,
    questionArtifactHash: row.questionArtifactHash,
    questionContentKey: row.questionContentKey,
    questionOrder: row.questionOrder,
    questionSourcePath: row.questionSourcePath,
    rendererDomain: row.rendererDomain,
    scope: row.scope,
    sectionKey: row.sectionKey,
    setKey: row.setKey,
    sourceRevision: row.sourceRevision,
    title: row.title,
    trackKey: row.trackKey,
  });
}

/** Private hash domain for retained catalog rows. */
export const HISTORICAL_TRYOUT_CATALOG_DOMAIN =
  "nakafa.aksara.tryout-catalog.v1";

/** Private hash domain for retained placement rows. */
export const HISTORICAL_TRYOUT_PLACEMENT_DOMAIN =
  "nakafa.aksara.tryout-placements.v1";
