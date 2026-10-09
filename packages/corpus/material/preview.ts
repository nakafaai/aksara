import { CorpusSourcePathSchema } from "@nakafa/aksara-contracts/ids";
import { ACTIVE_APP_LOCALES } from "@nakafa/aksara-contracts/locale";
import { Array as Arr, Effect, HashSet, MutableList, Schema } from "effect";
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
  const selected = HashSet.fromIterable(sourcePaths);
  const descriptors = domainDescriptors ?? (yield* decodeMaterialDomains());
  const sources = yield* decodeMaterialSources(input);
  const bindings = yield* validateMaterialSources(sources, descriptors);
  const projected = MutableList.make<unknown>();
  for (const binding of bindings) {
    for (const appLocale of ACTIVE_APP_LOCALES) {
      const selectedSections = HashSet.fromIterable(
        Arr.map(
          Arr.filter(binding.source.sections, (section) =>
            HashSet.has(
              selected,
              CorpusSourcePathSchema.make(
                `packages/corpus/${binding.source.assetRoot}/${section.slug}/${appLocaleCode(appLocale)}.mdx`
              )
            )
          ),
          ({ slug }) => slug
        )
      );
      if (HashSet.size(selectedSections) === 0) {
        continue;
      }
      yield* Effect.forEach(
        binding.source.sections,
        (section, sectionIndex) =>
          Effect.gen(function* () {
            if (!HashSet.has(selectedSections, section.slug)) {
              return;
            }
            MutableList.append(
              projected,
              yield* projectMaterial(binding, section, sectionIndex, appLocale)
            );
          }),
        { discard: true }
      );
    }
  }
  const entries = yield* Schema.decodeUnknownEffect(
    Schema.Array(MaterialEntrySchema)
  )(MutableList.toArray(projected), { onExcessProperty: "error" }).pipe(
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
