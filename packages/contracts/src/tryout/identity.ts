import { compareCodeUnits } from "#contracts/text/order";
import type {
  TryoutCatalogNodeIdentity,
  TryoutCatalogRow,
} from "#contracts/tryout/catalog";
import type { TryoutPlacementSource } from "#contracts/tryout/placement";

/** Builds one deterministic current node identity before its row is loaded. */
export function tryoutCatalogNodeIdentity(input: TryoutCatalogNodeIdentity) {
  return [
    input.appLocale,
    input.kind,
    input.countryKey,
    "examKey" in input ? input.examKey : "",
    "trackKey" in input ? input.trackKey : "",
    "setKey" in input ? input.setKey : "",
    "sectionKey" in input ? input.sectionKey : "",
  ].join("\0");
}

/** Builds one deterministic current hierarchy identity from its signed row. */
export function tryoutCatalogIdentity(row: TryoutCatalogRow) {
  return tryoutCatalogNodeIdentity(row);
}

/** Builds the deterministic placement identity across application locales. */
export function tryoutPlacementIdentity(row: TryoutPlacementSource) {
  return [
    row.countryKey,
    row.examKey,
    row.trackKey,
    row.setKey,
    row.sectionKey,
    row.questionOrder,
    row.questionContentKey,
    row.appLocale,
  ].join("\0");
}

/** Builds one locale-neutral placement identity for closure checks. */
export function tryoutPlacementLogicalIdentity(row: TryoutPlacementSource) {
  return [
    row.countryKey,
    row.examKey,
    row.trackKey,
    row.setKey,
    row.sectionKey,
    row.questionOrder,
    row.questionContentKey,
  ].join("\0");
}

/** Compares placements in the order used by question-head binding. */
export function compareTryoutPlacements(
  left: TryoutPlacementSource,
  right: TryoutPlacementSource
) {
  return compareCodeUnits(
    tryoutPlacementIdentity(left),
    tryoutPlacementIdentity(right)
  );
}
