import { CorpusSourcePathSchema } from "@nakafa/aksara-contracts/ids";
import { Effect, Schema } from "effect";
import {
  AUTHORING_APP_LOCALES,
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

/** Projects every physically present candidate public page body together. */
export const decodePagePreviewEntries = Effect.fn(
  "AksaraCorpus.decodePagePreviewEntries"
)(function* (
  sourcePaths: readonly (typeof CorpusSourcePathSchema.Type)[],
  input?: unknown,
  candidateInput?: unknown
) {
  const selected = new Set(sourcePaths);
  const sources = yield* decodePageSources(input);
  const needsLocaleOverlays = sourcePaths.some((sourcePath) =>
    LOCALE_OVERLAY_APP_LOCALE_CODES.some((appLocale) =>
      sourcePath.endsWith(`/${appLocale}.mdx`)
    )
  );
  const localeCatalog =
    needsLocaleOverlays || candidateInput !== undefined
      ? yield* decodePageLocaleCatalog(candidateInput)
      : [];
  yield* validatePageSources(sources);
  yield* validatePageLocaleCatalog(sources, localeCatalog);
  const projected: unknown[] = [];
  for (const source of sources) {
    for (const appLocale of AUTHORING_APP_LOCALES) {
      const expectedPath = CorpusSourcePathSchema.make(
        `packages/corpus/${source.sourceRoot}/${appLocaleCode(appLocale)}.mdx`
      );
      if (!selected.has(expectedPath)) {
        continue;
      }
      const candidateLocale = localeOverlayAppLocaleCode(appLocale);
      const projectionSource =
        candidateLocale === undefined
          ? source
          : yield* requirePageLocaleSource(
              source,
              localeCatalog,
              candidateLocale
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

/** Resolves one active or candidate page solely for real-renderer preview. */
export const decodePagePreviewEntry = Effect.fn(
  "AksaraCorpus.decodePagePreviewEntry"
)(function* (
  sourcePath: typeof CorpusSourcePathSchema.Type,
  input?: unknown,
  candidateInput?: unknown
) {
  const [entry] = yield* decodePagePreviewEntries(
    [sourcePath],
    input,
    candidateInput
  );
  return entry;
});
