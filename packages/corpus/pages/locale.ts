import { PublicPathSchema } from "@nakafa/aksara-contracts/ids";
import { PageKeySchema } from "@nakafa/aksara-contracts/projection/page";
import { Effect, Schema } from "effect";
import {
  LocaleOverlayAppLocaleCodeSchema,
  type LocalizedSourceMap,
} from "#corpus/locale/source";
import { pageLocaleSources } from "#corpus/pages/locale-registry";
import type { PageSource } from "#corpus/pages/schema";

/** Public page source after permanent locale-owned routes are composed. */
export type LocalizedPageProjectionSource = Omit<PageSource, "publicPaths"> & {
  readonly overlayAppLocale: PageLocaleSource["appLocale"];
  readonly publicPaths: LocalizedSourceMap<PageSource["publicPaths"]["en"]>;
};

/** Locale-owned route reviewed beside one candidate public page body. */
export const PageLocaleSourceSchema = Schema.Struct({
  appLocale: LocaleOverlayAppLocaleCodeSchema,
  pageKey: PageKeySchema,
  publicPath: PublicPathSchema,
});
export type PageLocaleSource = typeof PageLocaleSourceSchema.Type;
export type PageLocaleSourceInput = typeof PageLocaleSourceSchema.Encoded;

/** Candidate public page metadata failed strict source decoding. */
export class PageLocaleCatalogError extends Schema.TaggedError<PageLocaleCatalogError>()(
  "PageLocaleCatalogError",
  { cause: Schema.Unknown }
) {}

/** Candidate public page metadata does not match its stable active owner. */
export class PageLocaleOwnershipError extends Schema.TaggedError<PageLocaleOwnershipError>()(
  "PageLocaleOwnershipError",
  {
    appLocale: LocaleOverlayAppLocaleCodeSchema,
    pageKey: PageKeySchema,
    reason: Schema.Literals(["duplicate", "orphan", "unavailable"]),
  }
) {}

/** Resolves one locale-owned page overlay without changing active source bytes. */
export const composePageLocaleSource = Effect.fn(
  "AksaraCorpus.composePageLocaleSource"
)(function* (active: PageSource, candidate: PageLocaleSource) {
  if (active.pageKey !== candidate.pageKey) {
    return yield* new PageLocaleOwnershipError({
      appLocale: candidate.appLocale,
      pageKey: candidate.pageKey,
      reason: "orphan",
    });
  }
  return {
    ...active,
    overlayAppLocale: candidate.appLocale,
    publicPaths: {
      ...active.publicPaths,
      [candidate.appLocale]: candidate.publicPath,
    },
  } satisfies LocalizedPageProjectionSource;
});

/** Decodes every locale-owned candidate public page route. */
export const decodePageLocaleCatalog = Effect.fn(
  "AksaraCorpus.decodePageLocaleCatalog"
)(function* (input: unknown = pageLocaleSources) {
  return yield* Schema.decodeUnknownEffect(
    Schema.Array(PageLocaleSourceSchema)
  )(input, { onExcessProperty: "error" }).pipe(
    Effect.mapError((cause) => new PageLocaleCatalogError({ cause }))
  );
});

/** Rejects duplicate and orphan locale rows before preview or publication. */
export const validatePageLocaleCatalog = Effect.fn(
  "AksaraCorpus.validatePageLocaleCatalog"
)(function* (
  sources: readonly PageSource[],
  catalog: readonly PageLocaleSource[]
) {
  const identities = new Set<string>();
  for (const row of catalog) {
    const identity = `${row.appLocale}\0${row.pageKey}`;
    if (identities.has(identity)) {
      return yield* new PageLocaleOwnershipError({
        appLocale: row.appLocale,
        pageKey: row.pageKey,
        reason: "duplicate",
      });
    }
    const ownsPage = sources.some(({ pageKey }) => pageKey === row.pageKey);
    if (!ownsPage) {
      return yield* new PageLocaleOwnershipError({
        appLocale: row.appLocale,
        pageKey: row.pageKey,
        reason: "orphan",
      });
    }
    identities.add(identity);
  }
  return catalog;
});

/** Resolves exactly one candidate route for one stable public page. */
export const requirePageLocaleSource = Effect.fn(
  "AksaraCorpus.requirePageLocaleSource"
)(function* (
  active: PageSource,
  catalog: readonly PageLocaleSource[],
  appLocale: PageLocaleSource["appLocale"]
) {
  const candidates = catalog.filter(
    (entry) => entry.appLocale === appLocale && entry.pageKey === active.pageKey
  );
  const [candidate] = candidates;
  if (candidates.length !== 1 || candidate === undefined) {
    return yield* new PageLocaleOwnershipError({
      appLocale,
      pageKey: active.pageKey,
      reason: "unavailable",
    });
  }
  return yield* composePageLocaleSource(active, candidate);
});
