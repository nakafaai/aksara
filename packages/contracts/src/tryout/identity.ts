import { compareCodeUnits } from "#contracts/text/order";
import type { TryoutPlacementV2Source } from "#contracts/tryout/placement";
import type {
  TryoutCountry,
  TryoutExam,
  TryoutPlacementSource,
  TryoutSection,
  TryoutSet,
  TryoutTrack,
} from "#contracts/tryout/spec";

/** Minimal hierarchy keys required to derive one canonical catalog identity. */
export type TryoutCatalogIdentityInput =
  | Pick<TryoutCountry, "countryKey" | "kind" | "locale">
  | Pick<TryoutExam, "countryKey" | "examKey" | "kind" | "locale">
  | Pick<TryoutTrack, "countryKey" | "examKey" | "kind" | "locale" | "trackKey">
  | Pick<
      TryoutSet,
      "countryKey" | "examKey" | "kind" | "locale" | "setKey" | "trackKey"
    >
  | Pick<
      TryoutSection,
      | "countryKey"
      | "examKey"
      | "kind"
      | "locale"
      | "sectionKey"
      | "setKey"
      | "trackKey"
    >;

/** Builds the deterministic hierarchy identity used for sorting and dedupe. */
export function tryoutCatalogIdentity(row: TryoutCatalogIdentityInput) {
  return [
    row.locale,
    row.kind,
    row.countryKey,
    "examKey" in row ? row.examKey : "",
    "trackKey" in row ? row.trackKey : "",
    "setKey" in row ? row.setKey : "",
    "sectionKey" in row ? row.sectionKey : "",
  ].join("\0");
}

/** Compares immutable hierarchy rows by their stable locale identity. */
export function compareTryoutCatalog(
  left: TryoutCatalogIdentityInput,
  right: TryoutCatalogIdentityInput
) {
  return compareCodeUnits(
    tryoutCatalogIdentity(left),
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
  return compareCodeUnits(
    tryoutPlacementIdentity(left),
    tryoutPlacementIdentity(right)
  );
}

/** Builds the deterministic v2 placement identity across app locales. */
export function tryoutPlacementV2Identity(row: TryoutPlacementV2Source) {
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

/** Compares v2 placements in the order used by question-head binding. */
export function compareTryoutPlacementsV2(
  left: TryoutPlacementV2Source,
  right: TryoutPlacementV2Source
) {
  return compareCodeUnits(
    tryoutPlacementV2Identity(left),
    tryoutPlacementV2Identity(right)
  );
}
