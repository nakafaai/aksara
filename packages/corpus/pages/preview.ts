import { CorpusSourcePathSchema } from "@nakafa/aksara-contracts/ids";
import { ACTIVE_APP_LOCALES } from "@nakafa/aksara-contracts/locale";
import { Effect, Schema } from "effect";
import { appLocaleCode } from "#corpus/locale/source";
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
  input?: unknown
) {
  const selected = new Set(sourcePaths);
  const sources = yield* decodePageSources(input);
  yield* validatePageSources(sources);
  const projected: unknown[] = [];
  for (const source of sources) {
    for (const appLocale of ACTIVE_APP_LOCALES) {
      const localeCode = appLocaleCode(appLocale);
      const expectedPath = CorpusSourcePathSchema.make(
        `packages/corpus/${source.sourceRoot}/${localeCode}.mdx`
      );
      if (!selected.has(expectedPath)) {
        continue;
      }
      projected.push(yield* projectPage(source, appLocale));
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
)(function* (sourcePath: typeof CorpusSourcePathSchema.Type, input?: unknown) {
  const [entry] = yield* decodePagePreviewEntries([sourcePath], input);
  return entry;
});
