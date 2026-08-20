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

/** Locale-owned route reviewed beside one localized public page body. */
export const PageLocaleSourceSchema = Schema.Struct({
  appLocale: LocaleOverlayAppLocaleCodeSchema,
  pageKey: PageKeySchema,
  publicPath: PublicPathSchema,
});
export type PageLocaleSource = typeof PageLocaleSourceSchema.Type;
export type PageLocaleSourceInput = typeof PageLocaleSourceSchema.Encoded;

/** Locale-owned public page metadata failed strict source decoding. */
export class PageLocaleCatalogError extends Schema.TaggedError<PageLocaleCatalogError>()(
  "PageLocaleCatalogError",
  { cause: Schema.Unknown }
) {}

/** Locale-owned public page metadata does not match its stable owner. */
export class PageLocaleOwnershipError extends Schema.TaggedError<PageLocaleOwnershipError>()(
  "PageLocaleOwnershipError",
  {
    appLocale: LocaleOverlayAppLocaleCodeSchema,
    pageKey: PageKeySchema,
    reason: Schema.Literals(["duplicate", "orphan", "unavailable"]),
  }
) {}

/** Resolves one locale-owned page overlay without changing base source bytes. */
export const composePageLocaleSource = Effect.fn(
  "AksaraCorpus.composePageLocaleSource"
)(function* (base: PageSource, overlay: PageLocaleSource) {
  if (base.pageKey !== overlay.pageKey) {
    return yield* new PageLocaleOwnershipError({
      appLocale: overlay.appLocale,
      pageKey: overlay.pageKey,
      reason: "orphan",
    });
  }
  return {
    ...base,
    overlayAppLocale: overlay.appLocale,
    publicPaths: {
      ...base.publicPaths,
      [overlay.appLocale]: overlay.publicPath,
    },
  } satisfies LocalizedPageProjectionSource;
});

/** Decodes every locale-owned public page route. */
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

/** Resolves exactly one locale route for one stable public page. */
export const requirePageLocaleSource = Effect.fn(
  "AksaraCorpus.requirePageLocaleSource"
)(function* (
  base: PageSource,
  catalog: readonly PageLocaleSource[],
  appLocale: PageLocaleSource["appLocale"]
) {
  const overlays = catalog.filter(
    (entry) => entry.appLocale === appLocale && entry.pageKey === base.pageKey
  );
  const [overlay] = overlays;
  if (overlays.length !== 1 || overlay === undefined) {
    return yield* new PageLocaleOwnershipError({
      appLocale,
      pageKey: base.pageKey,
      reason: "unavailable",
    });
  }
  return yield* composePageLocaleSource(base, overlay);
});
