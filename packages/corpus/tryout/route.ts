import { PublicPathSchema } from "@nakafa/aksara-contracts/ids";
import { AppLocaleSchema } from "@nakafa/aksara-contracts/locale";
import type { TryoutCatalogRow } from "@nakafa/aksara-contracts/tryout/catalog";
import { Effect, Schema } from "effect";

/** Two source-derived nodes claim one locale-specific public route. */
export class TryoutRouteDuplicateError extends Schema.TaggedError<TryoutRouteDuplicateError>()(
  "TryoutRouteDuplicateError",
  { appLocale: AppLocaleSchema, publicPath: PublicPathSchema }
) {}

/** Rejects locale-specific route collisions in the canonical catalog. */
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
    routes.add(identity);
  }
});
