import { PublicPathSchema } from "@nakafa/aksara-contracts/ids";
import { AppLocaleSchema } from "@nakafa/aksara-contracts/locale";
import type { TryoutCatalogRow } from "@nakafa/aksara-contracts/tryout/catalog";
import { Effect, Schema } from "effect";

/** Two source-derived nodes claim one locale-specific public route. */
export class TryoutRouteDuplicateError extends Schema.TaggedError<TryoutRouteDuplicateError>()(
  "TryoutRouteDuplicateError",
  { appLocale: AppLocaleSchema, publicPath: PublicPathSchema }
) {}

/** A public route does not spell the title of the page it opens. */
export class TryoutRouteTitleError extends Schema.TaggedError<TryoutRouteTitleError>()(
  "TryoutRouteTitleError",
  {
    appLocale: AppLocaleSchema,
    publicPath: PublicPathSchema,
    title: Schema.String,
  }
) {}

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

/**
 * Reads whether a route ends in the slug of its page title. A year track is
 * the exception: its route segment is the year itself.
 */
function spellsTitle(row: TryoutCatalogRow, publicPath: string) {
  if (row.kind === "track" && row.trackKind === "year") {
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
)(function* (rows: readonly TryoutCatalogRow[]) {
  const routes = new Set<string>();
  for (const row of rows) {
    if (!("publicPath" in row) || row.publicPath === undefined) {
      continue;
    }
    const identity = `${row.appLocale}\0${row.publicPath}`;
    if (routes.has(identity)) {
      return yield* new TryoutRouteDuplicateError({
        appLocale: row.appLocale,
        publicPath: row.publicPath,
      });
    }
    if (!spellsTitle(row, row.publicPath)) {
      return yield* new TryoutRouteTitleError({
        appLocale: row.appLocale,
        publicPath: row.publicPath,
        title: row.title,
      });
    }
    routes.add(identity);
  }
});
