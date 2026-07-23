import type {
  TryoutCatalogRow,
  TryoutPlacementSource,
} from "#contracts/tryout/spec";

/** Builds the deterministic hierarchy identity used for sorting and dedupe. */
export function tryoutCatalogIdentity(row: TryoutCatalogRow) {
  const keys = [
    row.locale,
    row.kind,
    row.countryKey,
    "examKey" in row ? row.examKey : "",
    "trackKey" in row ? row.trackKey : "",
    "setKey" in row ? row.setKey : "",
    "sectionKey" in row ? row.sectionKey : "",
  ];
  return keys.join("\0");
}

/** Compares immutable hierarchy rows by their stable locale identity. */
export function compareTryoutCatalog(
  left: TryoutCatalogRow,
  right: TryoutCatalogRow
) {
  return tryoutCatalogIdentity(left).localeCompare(
    tryoutCatalogIdentity(right)
  );
}

/** Builds the deterministic active-placement identity across locales. */
export function tryoutPlacementIdentity(row: TryoutPlacementSource) {
  return [
    row.countryKey,
    row.examKey,
    row.trackKey,
    row.setKey,
    row.sectionKey,
    row.questionOrder,
    row.questionContentKey,
    row.locale,
  ].join("\0");
}

/** Compares active placements in the order used by question-head binding. */
export function compareTryoutPlacements(
  left: TryoutPlacementSource,
  right: TryoutPlacementSource
) {
  return tryoutPlacementIdentity(left).localeCompare(
    tryoutPlacementIdentity(right)
  );
}
