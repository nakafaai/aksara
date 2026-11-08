import type { CatalogRow } from "@nakafa/aksara-contracts/assessment/catalog";
import { PublicRouteFields } from "@nakafa/aksara-contracts/preview/target";
import { Effect, MutableHashSet, Schema } from "effect";

/** Two source-derived nodes claim one locale-specific public route. */
export class TryoutRouteDuplicateError extends Schema.TaggedError<
  TryoutRouteDuplicateError,
  { readonly brand: unique symbol }
>()("TryoutRouteDuplicateError", { ...PublicRouteFields }) {}

/** A public route does not spell the title of the page it opens. */
export class TryoutRouteTitleError extends Schema.TaggedError<
  TryoutRouteTitleError,
  { readonly brand: unique symbol }
>()("TryoutRouteTitleError", {
  ...PublicRouteFields,
  title: Schema.String,
}) {}

/**
 * Spells one localized title as the route segment of the page that shows it,
 * writing German letters out the way Nakafa's public URLs already do.
 */
function toTitleSlug(title: string) {
  return title
    .toLowerCase()
    .replaceAll("ä", "ae")
    .replaceAll("ö", "oe")
    .replaceAll("ü", "ue")
    .replaceAll("ß", "ss")
    .normalize("NFKD")
    .replace(/\p{Mn}/gu, "")
    .replace(/[^a-z0-9]+/gu, "-")
    .replace(/^-+|-+$/gu, "");
}

/** The locale, country, and exam of an exam or a group row, which name the exam's group axis. */
function examIdentity(row: {
  readonly appLocale: string;
  readonly countryKey: string;
  readonly examKey: string;
}) {
  return `${row.appLocale}\0${row.countryKey}\0${row.examKey}`;
}

/**
 * Reads whether a route ends in the slug of its page title. A group of a year
 * axis is the exception: its route segment is the year itself.
 */
function spellsTitle(
  row: CatalogRow,
  publicPath: string,
  yearExams: MutableHashSet.MutableHashSet<string>
) {
  if (
    row.kind === "group" &&
    MutableHashSet.has(yearExams, examIdentity(row))
  ) {
    return true;
  }
  const segment = publicPath.slice(publicPath.lastIndexOf("/") + 1);
  return segment === toTitleSlug(row.title);
}

/**
 * Rejects locale-specific route collisions in the canonical catalog, and every
 * public route that does not spell the official name its page shows.
 */
export const validateTryoutRoutes = Effect.fn(
  "AksaraCorpus.validateTryoutRoutes"
)(function* (rows: readonly CatalogRow[]) {
  const routes = MutableHashSet.empty<string>();
  const yearExams = MutableHashSet.empty<string>();
  for (const row of rows) {
    if (row.kind === "exam" && row.groupAxis === "year") {
      MutableHashSet.add(yearExams, examIdentity(row));
    }
  }
  for (const row of rows) {
    if (row.publicPath === undefined) {
      continue;
    }
    const identity = `${row.appLocale}\0${row.publicPath}`;
    if (MutableHashSet.has(routes, identity)) {
      return yield* new TryoutRouteDuplicateError({
        appLocale: row.appLocale,
        publicPath: row.publicPath,
      });
    }
    if (!spellsTitle(row, row.publicPath, yearExams)) {
      return yield* new TryoutRouteTitleError({
        appLocale: row.appLocale,
        publicPath: row.publicPath,
        title: row.title,
      });
    }
    MutableHashSet.add(routes, identity);
  }
});
