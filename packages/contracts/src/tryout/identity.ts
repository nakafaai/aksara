import type { ContentLocale } from "#contracts/content";
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
  return tryoutCatalogIdentity(left).localeCompare(
    tryoutCatalogIdentity(right)
  );
}

/** Builds the locale root used as the parent of every country row. */
export function tryoutCatalogRootIdentity(locale: ContentLocale) {
  return `${locale}\0root`;
}

/** Builds the exact parent catalog identity for one hierarchy row. */
export function tryoutCatalogParentIdentity(row: TryoutCatalogIdentityInput) {
  if (row.kind === "country") {
    return tryoutCatalogRootIdentity(row.locale);
  }
  if (row.kind === "exam") {
    return tryoutCatalogIdentity({
      countryKey: row.countryKey,
      kind: "country",
      locale: row.locale,
    });
  }
  if (row.kind === "track") {
    return tryoutCatalogIdentity({
      countryKey: row.countryKey,
      examKey: row.examKey,
      kind: "exam",
      locale: row.locale,
    });
  }
  if (row.kind === "set") {
    return tryoutCatalogIdentity({
      countryKey: row.countryKey,
      examKey: row.examKey,
      kind: "track",
      locale: row.locale,
      trackKey: row.trackKey,
    });
  }
  return tryoutCatalogIdentity({
    countryKey: row.countryKey,
    examKey: row.examKey,
    kind: "set",
    locale: row.locale,
    setKey: row.setKey,
    trackKey: row.trackKey,
  });
}

/** Builds the canonical section identity that owns one active placement. */
export function tryoutPlacementParentIdentity(row: TryoutPlacementSource) {
  return tryoutCatalogIdentity({
    countryKey: row.countryKey,
    examKey: row.examKey,
    kind: "section",
    locale: row.locale,
    sectionKey: row.sectionKey,
    setKey: row.setKey,
    trackKey: row.trackKey,
  });
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
