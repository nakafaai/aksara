import { CorpusSourcePathSchema } from "@nakafa/aksara-contracts/ids";
import { ACTIVE_APP_LOCALES } from "@nakafa/aksara-contracts/locale";
import { Effect, Schema } from "effect";
import {
  appLocaleCode,
  LOCALE_OVERLAY_APP_LOCALE_CODES,
  localeOverlayAppLocaleCode,
} from "#corpus/locale/source";
import {
  decodePageLocaleCatalog,
  requirePageLocaleSource,
  validatePageLocaleCatalog,
} from "#corpus/pages/locale";
import {
  PageEntrySchema,
  PageRegistryError,
  projectPage,
  validatePageRoutes,
  validatePageSources,
} from "#corpus/pages/registry";
import { decodePageSources } from "#corpus/pages/source";

/** Projects selected page bodies with their exact locale-owned routes. */
export const decodePagePreviewEntries = Effect.fn(
  "AksaraCorpus.decodePagePreviewEntries"
)(function* (
  sourcePaths: readonly (typeof CorpusSourcePathSchema.Type)[],
  input?: unknown,
  localeInput?: unknown
) {
  const selected = new Set(sourcePaths);
  const sources = yield* decodePageSources(input);
  const needsLocaleOverlays = sourcePaths.some((sourcePath) =>
    LOCALE_OVERLAY_APP_LOCALE_CODES.some((appLocale) =>
      sourcePath.endsWith(`/${appLocale}.mdx`)
    )
  );
  const localeCatalog =
    needsLocaleOverlays || localeInput !== undefined
      ? yield* decodePageLocaleCatalog(localeInput)
      : [];
  yield* validatePageSources(sources);
  yield* validatePageLocaleCatalog(sources, localeCatalog);
  const projected: unknown[] = [];
  for (const source of sources) {
    for (const appLocale of ACTIVE_APP_LOCALES) {
      const expectedPath = CorpusSourcePathSchema.make(
        `packages/corpus/${source.sourceRoot}/${appLocaleCode(appLocale)}.mdx`
      );
      if (!selected.has(expectedPath)) {
        continue;
      }
      const overlayLocale = localeOverlayAppLocaleCode(appLocale);
      const projectionSource =
        overlayLocale === undefined
          ? source
          : yield* requirePageLocaleSource(
              source,
              localeCatalog,
              overlayLocale
            );
      projected.push(yield* projectPage(projectionSource, appLocale));
    }
  }
  const entries = yield* Schema.decodeUnknownEffect(
    Schema.Array(PageEntrySchema)
  )(projected, { onExcessProperty: "error" }).pipe(
    Effect.mapError((cause) => new PageRegistryError({ cause }))
  );
  return yield* validatePageRoutes(entries);
});

/** Resolves one selected page solely for real-renderer preview. */
export const decodePagePreviewEntry = Effect.fn(
  "AksaraCorpus.decodePagePreviewEntry"
)(function* (
  sourcePath: typeof CorpusSourcePathSchema.Type,
  input?: unknown,
  localeInput?: unknown
) {
  const [entry] = yield* decodePagePreviewEntries(
    [sourcePath],
    input,
    localeInput
  );
  return entry;
});
