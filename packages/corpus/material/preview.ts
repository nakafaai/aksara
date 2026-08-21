import { CorpusSourcePathSchema } from "@nakafa/aksara-contracts/ids";
import { ACTIVE_APP_LOCALES } from "@nakafa/aksara-contracts/locale";
import { Effect, Schema } from "effect";
import { appLocaleCode } from "#corpus/locale/source";
import {
  decodeMaterialDomains,
  type MaterialDomainDescriptor,
} from "#corpus/material/domain";
import {
  MaterialEntrySchema,
  MaterialRegistryError,
  projectMaterial,
  validateMaterialEntries,
  validateMaterialSources,
} from "#corpus/material/registry";
import { decodeMaterialSources } from "#corpus/material/source";

/** Projects every selected body and validates base and locale-owned metadata together. */
export const decodeMaterialPreviewEntries = Effect.fn(
  "AksaraCorpus.decodeMaterialPreviewEntries"
)(function* (
  sourcePaths: readonly (typeof CorpusSourcePathSchema.Type)[],
  input?: unknown,
  domainDescriptors?: readonly MaterialDomainDescriptor[]
) {
  const selected = new Set(sourcePaths);
  const descriptors = domainDescriptors ?? (yield* decodeMaterialDomains());
  const sources = yield* decodeMaterialSources(input);
  const bindings = yield* validateMaterialSources(sources, descriptors);
  const projected: unknown[] = [];
  for (const binding of bindings) {
    for (const appLocale of ACTIVE_APP_LOCALES) {
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
      for (const [sectionIndex, section] of binding.source.sections.entries()) {
        if (!selectedSections.has(section.slug)) {
          continue;
        }
        projected.push(
          yield* projectMaterial(binding, section, sectionIndex, appLocale)
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

/** Resolves one selected material solely for real-renderer preview. */
export const decodeMaterialPreviewEntry = Effect.fn(
  "AksaraCorpus.decodeMaterialPreviewEntry"
)(function* (
  sourcePath: typeof CorpusSourcePathSchema.Type,
  input?: unknown,
  domainDescriptors?: readonly MaterialDomainDescriptor[]
) {
  const [entry] = yield* decodeMaterialPreviewEntries(
    [sourcePath],
    input,
    domainDescriptors
  );
  return entry;
});
