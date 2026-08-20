import { CorpusSourcePathSchema } from "@nakafa/aksara-contracts/ids";
import { Effect, Schema } from "effect";
import {
  AUTHORING_APP_LOCALES,
  appLocaleCode,
  localeOverlayAppLocaleCode,
} from "#corpus/locale/source";
import {
  decodeMaterialDomains,
  type MaterialDomainDescriptor,
} from "#corpus/material/domain";
import {
  decodeMaterialLocaleCatalog,
  requireMaterialLocaleBinding,
} from "#corpus/material/locale";
import {
  MaterialEntrySchema,
  MaterialRegistryError,
  projectMaterial,
  validateMaterialEntries,
  validateMaterialSources,
} from "#corpus/material/registry";
import { decodeMaterialSources } from "#corpus/material/source";

/** Projects every physically present candidate body and validates them together. */
export const decodeMaterialPreviewEntries = Effect.fn(
  "AksaraCorpus.decodeMaterialPreviewEntries"
)(function* (
  sourcePaths: readonly (typeof CorpusSourcePathSchema.Type)[],
  input?: unknown,
  domainDescriptors?: readonly MaterialDomainDescriptor[],
  candidateInput?: unknown
) {
  const selected = new Set(sourcePaths);
  const descriptors = domainDescriptors ?? (yield* decodeMaterialDomains());
  const sources = yield* decodeMaterialSources(input);
  const bindings = yield* validateMaterialSources(sources, descriptors);
  const candidates = yield* decodeMaterialLocaleCatalog(
    descriptors,
    candidateInput
  );
  const projected: unknown[] = [];
  for (const binding of bindings) {
    for (const appLocale of AUTHORING_APP_LOCALES) {
      const selectedSections = new Set(
        binding.source.sections
          .filter((section) =>
            selected.has(
              CorpusSourcePathSchema.make(
                `packages/corpus/${binding.source.assetRoot}/${section.slug}/${appLocaleCode(appLocale)}.mdx`
              )
            )
          )
          .map(({ slug }) => slug)
      );
      if (selectedSections.size === 0) {
        continue;
      }
      const candidateLocale = localeOverlayAppLocaleCode(appLocale);
      const projectionBinding =
        candidateLocale === undefined
          ? binding
          : yield* requireMaterialLocaleBinding(
              binding.descriptor,
              binding.source,
              candidates,
              candidateLocale
            );
      for (const [
        sectionIndex,
        section,
      ] of projectionBinding.source.sections.entries()) {
        if (!selectedSections.has(section.slug)) {
          continue;
        }
        projected.push(
          yield* projectMaterial(
            projectionBinding,
            section,
            sectionIndex,
            appLocale
          )
        );
      }
    }
  }
  const entries = yield* Schema.decodeUnknownEffect(
    Schema.Array(MaterialEntrySchema)
  )(projected, { onExcessProperty: "error" }).pipe(
    Effect.mapError((cause) => new MaterialRegistryError({ cause }))
  );
  return yield* validateMaterialEntries(entries);
});

/** Resolves one active or candidate material solely for real-renderer preview. */
export const decodeMaterialPreviewEntry = Effect.fn(
  "AksaraCorpus.decodeMaterialPreviewEntry"
)(function* (
  sourcePath: typeof CorpusSourcePathSchema.Type,
  input?: unknown,
  domainDescriptors?: readonly MaterialDomainDescriptor[],
  candidateInput?: unknown
) {
  const [entry] = yield* decodeMaterialPreviewEntries(
    [sourcePath],
    input,
    domainDescriptors,
    candidateInput
  );
  return entry;
});
