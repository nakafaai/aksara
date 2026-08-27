import type { SignedContentArtifact } from "#contracts/content";
import type {
  HistoricalCompiledContentPayload,
  HistoricalSignedContentArtifact,
} from "#contracts/history/artifact-spec";
import type {
  HistoricalTryoutCatalogRow,
  HistoricalTryoutPlacement,
} from "#contracts/history/tryout-row";
import type { TryoutCatalogRow } from "#contracts/tryout/catalog";
import type { TryoutPlacement } from "#contracts/tryout/placement";

/** Exact bytes that must survive an old artifact wire-format conversion. */
function historicalArtifactBytes(
  payload: HistoricalCompiledContentPayload | SignedContentArtifact["payload"]
) {
  return JSON.stringify({
    byteLength: payload.byteLength,
    compiledCode: payload.compiledCode,
    compilerConfigHash: payload.compilerConfigHash,
    compilerVersion: payload.compilerVersion,
    contentKey: payload.contentKey,
    mdxCompilerVersion: payload.mdxCompilerVersion,
    plainText: payload.plainText,
    rawMdx: payload.rawMdx,
    rendererDomain: payload.rendererDomain,
    requiredComponents: payload.requiredComponents,
    sourceHash: payload.sourceHash,
  });
}

/** Proves a current artifact preserves every historical executable byte. */
export function hasLosslessHistoricalArtifactMapping(
  source: HistoricalSignedContentArtifact,
  target: SignedContentArtifact
) {
  return (
    target.payload.format === "mdx-function-body" &&
    historicalArtifactBytes(source.payload) ===
      historicalArtifactBytes(target.payload)
  );
}

/** Canonical semantic projection shared by old and current catalog rows. */
function catalogFacts(row: HistoricalTryoutCatalogRow | TryoutCatalogRow) {
  const appLocale = "locale" in row ? row.locale : row.appLocale;
  const { description, graph, sourceRevision, title } = row;
  const common = { appLocale, description, graph, sourceRevision, title };
  if (row.kind === "country") {
    return {
      ...common,
      countryCode: row.countryCode,
      countryKey: row.countryKey,
      kind: row.kind,
      order: row.order,
      publicPath: row.publicPath,
    };
  }
  if (row.kind === "exam") {
    return {
      ...common,
      countryKey: row.countryKey,
      examKey: row.examKey,
      kind: row.kind,
      order: row.order,
      publicPath: row.publicPath,
      scoringStrategy: row.scoringStrategy,
    };
  }
  if (row.kind === "track") {
    return {
      ...common,
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
    };
  }
  if (row.kind === "set") {
    return {
      ...common,
      countryKey: row.countryKey,
      examKey: row.examKey,
      internalEntrySectionKey: row.internalEntrySectionKey,
      kind: row.kind,
      order: row.order,
      publicPath: row.publicPath,
      questionCount: row.questionCount,
      scoringStrategy: row.scoringStrategy,
      sectionCount: row.sectionCount,
      setKey: row.setKey,
      trackKey: row.trackKey,
      visibleSectionCount: row.visibleSectionCount,
    };
  }
  return {
    ...common,
    countryKey: row.countryKey,
    examKey: row.examKey,
    kind: row.kind,
    order: row.order,
    publicPath: row.publicPath,
    questionCount: row.questionCount,
    questionSourcePath: row.questionSourcePath,
    sectionKey: row.sectionKey,
    setKey: row.setKey,
    timeLimitSeconds: row.timeLimitSeconds,
    trackKey: row.trackKey,
    visibility: row.visibility,
  };
}

/** Proves locale renaming is the only catalog-row semantic change. */
export function hasLosslessHistoricalCatalogMapping(
  source: HistoricalTryoutCatalogRow,
  target: TryoutCatalogRow
) {
  return (
    JSON.stringify(catalogFacts(source)) ===
    JSON.stringify(catalogFacts(target))
  );
}

/** Stable placement fields that must survive current-schema conversion. */
function placementFacts(row: HistoricalTryoutPlacement | TryoutPlacement) {
  return {
    answerContentKey: row.answerContentKey,
    appLocale: "locale" in row ? row.locale : row.appLocale,
    choices: row.choices,
    countryKey: row.countryKey,
    examKey: row.examKey,
    questionContentKey: row.questionContentKey,
    questionOrder: row.questionOrder,
    questionSourcePath: row.questionSourcePath,
    rendererDomain: row.rendererDomain,
    scope: row.scope,
    sectionKey: row.sectionKey,
    setKey: row.setKey,
    sourceRevision: row.sourceRevision,
    trackKey: row.trackKey,
  };
}

/** Proves a converted placement preserves every historical learner fact. */
export function hasLosslessHistoricalPlacementMapping(
  source: HistoricalTryoutPlacement,
  target: TryoutPlacement
) {
  return (
    JSON.stringify(placementFacts(source)) ===
    JSON.stringify(placementFacts(target))
  );
}
