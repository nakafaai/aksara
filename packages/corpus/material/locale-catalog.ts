import type { AppLocale } from "@nakafa/aksara-contracts/locale";
import { Effect, Schema } from "effect";

import {
  type LocaleOverlayAppLocaleCode,
  LocaleOverlayAppLocaleCodeSchema,
  localeOverlayAppLocaleCode,
} from "#corpus/locale/source";
import type { MaterialDomainDescriptor } from "#corpus/material/domain";
import {
  composeMaterialLocaleDomain,
  composeMaterialLocaleSource,
  type MaterialLocaleCatalog,
} from "#corpus/material/locale";
import type { LessonMaterialSource } from "#corpus/material/schema";

/** Locale catalog rows do not close over their exact material owners. */
export class MaterialLocaleCatalogOwnershipError extends Schema.TaggedError<MaterialLocaleCatalogOwnershipError>()(
  "MaterialLocaleCatalogOwnershipError",
  {
    appLocale: LocaleOverlayAppLocaleCodeSchema,
    key: Schema.NonEmptyTrimmedString,
    reason: Schema.Literal("duplicate", "missing", "orphan"),
    scope: Schema.Literal("domain", "material"),
  }
) {}

interface MaterialLocaleOwners {
  readonly catalog: MaterialLocaleCatalog;
  readonly descriptors: readonly MaterialDomainDescriptor[];
  readonly sources: readonly LessonMaterialSource[];
}

/** Validates duplicate, orphan, and source-shape ownership for present rows. */
export const validateMaterialLocaleCatalog = Effect.fn(
  "AksaraCorpus.validateMaterialLocaleCatalog"
)(function* (input: MaterialLocaleOwners) {
  const domains = new Set<string>();
  for (const row of input.catalog.domains) {
    const identity = `${row.appLocale}\0${row.key}`;
    if (domains.has(identity)) {
      return yield* new MaterialLocaleCatalogOwnershipError({
        appLocale: row.appLocale,
        key: row.key,
        reason: "duplicate",
        scope: "domain",
      });
    }
    const owner = input.descriptors.find(({ key }) => key === row.key);
    if (owner === undefined) {
      return yield* new MaterialLocaleCatalogOwnershipError({
        appLocale: row.appLocale,
        key: row.key,
        reason: "orphan",
        scope: "domain",
      });
    }
    yield* composeMaterialLocaleDomain(owner, row);
    domains.add(identity);
  }

  const materials = new Set<string>();
  for (const row of input.catalog.sources) {
    const identity = `${row.appLocale}\0${row.materialKey}`;
    if (materials.has(identity)) {
      return yield* new MaterialLocaleCatalogOwnershipError({
        appLocale: row.appLocale,
        key: row.materialKey,
        reason: "duplicate",
        scope: "material",
      });
    }
    const owner = input.sources.find(({ key }) => key === row.materialKey);
    if (owner === undefined) {
      return yield* new MaterialLocaleCatalogOwnershipError({
        appLocale: row.appLocale,
        key: row.materialKey,
        reason: "orphan",
        scope: "material",
      });
    }
    yield* composeMaterialLocaleSource(owner, row);
    materials.add(identity);
  }
  return input.catalog;
});

/** Composes one complete locale inventory for activation-equivalent projection. */
export const composeCompleteMaterialLocaleCatalog = Effect.fn(
  "AksaraCorpus.composeCompleteMaterialLocaleCatalog"
)(function* (
  input: MaterialLocaleOwners & {
    readonly appLocale: LocaleOverlayAppLocaleCode;
  }
) {
  yield* validateMaterialLocaleCatalog(input);
  const domains = yield* Effect.forEach(input.descriptors, (descriptor) =>
    Effect.gen(function* () {
      const rows = input.catalog.domains.filter(
        (candidate) =>
          candidate.appLocale === input.appLocale &&
          candidate.key === descriptor.key
      );
      const [row] = rows;
      if (row === undefined) {
        return yield* new MaterialLocaleCatalogOwnershipError({
          appLocale: input.appLocale,
          key: descriptor.key,
          reason: "missing",
          scope: "domain",
        });
      }
      return yield* composeMaterialLocaleDomain(descriptor, row);
    })
  );
  const sources = yield* Effect.forEach(input.sources, (source) =>
    Effect.gen(function* () {
      const rows = input.catalog.sources.filter(
        (candidate) =>
          candidate.appLocale === input.appLocale &&
          candidate.materialKey === source.key
      );
      const [row] = rows;
      if (row === undefined) {
        return yield* new MaterialLocaleCatalogOwnershipError({
          appLocale: input.appLocale,
          key: source.key,
          reason: "missing",
          scope: "material",
        });
      }
      return yield* composeMaterialLocaleSource(source, row);
    })
  );
  return { domains, sources };
});

/** Composes every requested permanent overlay onto one material source set. */
export const composeMaterialLocaleCatalog = Effect.fn(
  "AksaraCorpus.composeMaterialLocaleCatalog"
)(function* (
  input: MaterialLocaleOwners & { readonly appLocales: readonly AppLocale[] }
) {
  let domains: readonly MaterialDomainDescriptor[] = input.descriptors;
  let sources: readonly LessonMaterialSource[] = input.sources;
  for (const appLocale of input.appLocales) {
    const overlay = localeOverlayAppLocaleCode(appLocale);
    if (overlay === undefined) {
      continue;
    }
    const composed = yield* composeCompleteMaterialLocaleCatalog({
      appLocale: overlay,
      catalog: input.catalog,
      descriptors: domains,
      sources,
    });
    ({ domains, sources } = composed);
  }
  return { domains, sources };
});
