import { compareCodeUnits } from "#contracts/text/order";
import type { TryoutPlacementSource } from "#contracts/tryout/placement";

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
