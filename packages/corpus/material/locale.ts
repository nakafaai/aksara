import { MaterialDomainSchema } from "@nakafa/aksara-contracts/material/domain";
import { MaterialKeySchema } from "@nakafa/aksara-contracts/projection/material";
import { Effect, Schema } from "effect";
import {
  decodeGermanGlossary,
  type GermanGlossaryEntry,
  GermanGlossaryKeySchema,
} from "#corpus/locale/german/glossary";
import {
  type LocaleOverlayAppLocaleCode,
  LocaleOverlayAppLocaleCodeSchema,
  type LocalizedSourceMap,
} from "#corpus/locale/source";
import { MaterialCardDescriptionSchema } from "#corpus/material/description";
import type { MaterialDomainDescriptor } from "#corpus/material/domain";
import { materialLocaleSources } from "#corpus/material/locale-registry";
import type { LessonMaterialSource } from "#corpus/material/schema";
import { PublicRouteSegmentSchema } from "#corpus/route/schema";

/** Preview-only material domain after locale-owned route composition. */
export type LocalizedMaterialProjectionDomain = Omit<
  MaterialDomainDescriptor,
  "routeSlugs"
> & {
  readonly overlayAppLocale: MaterialLocaleDomain["appLocale"];
  readonly routeSlugs: LocalizedSourceMap<
    MaterialDomainDescriptor["routeSlugs"]["en"]
  >;
};

/** Preview-only material source after locale-owned copy composition. */
export type LocalizedMaterialProjectionSource = Omit<
  LessonMaterialSource,
  "routeSlugs" | "sections" | "translations"
> & {
  readonly overlayAppLocale: MaterialLocaleSource["appLocale"];
  readonly routeSlugs: LocalizedSourceMap<
    LessonMaterialSource["routeSlugs"]["en"]
  >;
  readonly sections: readonly (Omit<
    LessonMaterialSource["sections"][number],
    "routeSlugs"
  > & {
    readonly routeSlugs: LocalizedSourceMap<
      LessonMaterialSource["sections"][number]["routeSlugs"]["en"]
    >;
  })[];
  readonly translations: LocalizedSourceMap<
    LessonMaterialSource["translations"]["en"]
  >;
};

/** Locale-owned route for one material domain before locale activation. */
export const MaterialLocaleDomainSchema = Schema.Struct({
  appLocale: LocaleOverlayAppLocaleCodeSchema,
  key: MaterialDomainSchema,
  routeSlug: PublicRouteSegmentSchema,
});
export type MaterialLocaleDomain = typeof MaterialLocaleDomainSchema.Type;

/** Locale-owned material and section copy for one candidate body family. */
export const MaterialLocaleSourceSchema = Schema.Struct({
  appLocale: LocaleOverlayAppLocaleCodeSchema,
  materialKey: MaterialKeySchema,
  routeSlug: PublicRouteSegmentSchema,
  sections: Schema.Array(
    Schema.Struct({
      routeSlug: PublicRouteSegmentSchema,
      sectionKey: PublicRouteSegmentSchema,
    })
  ),
  translation: Schema.Struct({
    description: MaterialCardDescriptionSchema,
    title: Schema.String,
  }),
});
export type MaterialLocaleSource = typeof MaterialLocaleSourceSchema.Type;
export type MaterialLocaleSourceInput =
  typeof MaterialLocaleSourceSchema.Encoded;

/** Complete locale-owned metadata registry for candidate material bodies. */
export const MaterialLocaleCatalogSchema = Schema.Struct({
  domains: Schema.Array(MaterialLocaleDomainSchema),
  sources: Schema.Array(MaterialLocaleSourceSchema),
});
export type MaterialLocaleCatalog = typeof MaterialLocaleCatalogSchema.Type;

const GERMAN_APP_LOCALE: LocaleOverlayAppLocaleCode = "de";

/** Candidate material metadata does not match its stable active owner. */
export class MaterialLocaleOwnershipError extends Schema.TaggedError<MaterialLocaleOwnershipError>()(
  "MaterialLocaleOwnershipError",
  {
    domain: MaterialDomainSchema,
    materialKey: Schema.optional(MaterialKeySchema),
    scope: Schema.Literal("domain", "material", "section"),
  }
) {}

/** Candidate material metadata failed strict source decoding. */
export class MaterialLocaleCatalogError extends Schema.TaggedError<MaterialLocaleCatalogError>()(
  "MaterialLocaleCatalogError",
  { cause: Schema.Unknown }
) {}

/** Resolves one candidate domain descriptor outside active reviewed sources. */
export const composeMaterialLocaleDomain = Effect.fn(
  "AksaraCorpus.composeMaterialLocaleDomain"
)(function* (
  active: MaterialDomainDescriptor,
  candidate: MaterialLocaleDomain
) {
  if (active.key !== candidate.key) {
    return yield* new MaterialLocaleOwnershipError({
      domain: candidate.key,
      scope: "domain",
    });
  }
  return {
    ...active,
    overlayAppLocale: candidate.appLocale,
    routeSlugs: {
      ...active.routeSlugs,
      [candidate.appLocale]: candidate.routeSlug,
    },
  } satisfies LocalizedMaterialProjectionDomain;
});

/** Resolves one candidate material overlay without changing active source bytes. */
export const composeMaterialLocaleSource = Effect.fn(
  "AksaraCorpus.composeMaterialLocaleSource"
)(function* (active: LessonMaterialSource, candidate: MaterialLocaleSource) {
  if (active.key !== candidate.materialKey) {
    return yield* new MaterialLocaleOwnershipError({
      domain: active.domain,
      materialKey: candidate.materialKey,
      scope: "material",
    });
  }
  const sections = yield* Effect.forEach(active.sections, (section) =>
    Effect.gen(function* () {
      const overlay = candidate.sections.find(
        ({ sectionKey }) => sectionKey === section.slug
      );
      if (overlay === undefined) {
        return yield* new MaterialLocaleOwnershipError({
          domain: active.domain,
          materialKey: candidate.materialKey,
          scope: "section",
        });
      }
      return {
        ...section,
        routeSlugs: {
          ...section.routeSlugs,
          [candidate.appLocale]: overlay.routeSlug,
        },
      };
    })
  );
  if (candidate.sections.length !== sections.length) {
    return yield* new MaterialLocaleOwnershipError({
      domain: active.domain,
      materialKey: candidate.materialKey,
      scope: "section",
    });
  }
  return {
    ...active,
    overlayAppLocale: candidate.appLocale,
    routeSlugs: {
      ...active.routeSlugs,
      [candidate.appLocale]: candidate.routeSlug,
    },
    sections,
    translations: {
      ...active.translations,
      [candidate.appLocale]: candidate.translation,
    },
  } satisfies LocalizedMaterialProjectionSource;
});

/** Maps one stable material domain to its glossary-owned German route term. */
function germanDomainGlossaryKey(domain: string) {
  return GermanGlossaryKeySchema.make(
    domain === "ai-ds" ? "artificial-intelligence-data-science" : domain
  );
}

/** Requires one glossary route without manufacturing a fallback slug. */
const requireGermanDomainRoute = Effect.fn(
  "AksaraCorpus.requireGermanMaterialDomainRoute"
)(function* (
  descriptor: MaterialDomainDescriptor,
  glossary: readonly GermanGlossaryEntry[]
) {
  const key = germanDomainGlossaryKey(descriptor.key);
  const routeSlug = glossary.find((entry) => entry.key === key)?.routeSlug;
  if (routeSlug === undefined) {
    return yield* new MaterialLocaleOwnershipError({
      domain: descriptor.key,
      scope: "domain",
    });
  }
  return routeSlug;
});

/** Decodes locale-owned candidate metadata with glossary-derived domains. */
export const decodeMaterialLocaleCatalog = Effect.fn(
  "AksaraCorpus.decodeMaterialLocaleCatalog"
)(function* (
  descriptors: readonly MaterialDomainDescriptor[],
  input?: unknown
) {
  let sourceInput = input;
  if (sourceInput === undefined) {
    const glossary = yield* decodeGermanGlossary();
    const domains = yield* Effect.forEach(descriptors, (descriptor) =>
      Effect.gen(function* () {
        return MaterialLocaleDomainSchema.make({
          appLocale: GERMAN_APP_LOCALE,
          key: descriptor.key,
          routeSlug: yield* requireGermanDomainRoute(descriptor, glossary),
        });
      })
    );
    sourceInput = { domains, sources: materialLocaleSources };
  }
  return yield* Schema.decodeUnknown(MaterialLocaleCatalogSchema)(sourceInput, {
    onExcessProperty: "error",
  }).pipe(
    Effect.mapError((cause) => new MaterialLocaleCatalogError({ cause }))
  );
});

/** Resolves one exact candidate source and domain binding. */
export const requireMaterialLocaleBinding = Effect.fn(
  "AksaraCorpus.requireMaterialLocaleBinding"
)(function* (
  descriptor: MaterialDomainDescriptor,
  source: LessonMaterialSource,
  catalog: MaterialLocaleCatalog,
  appLocale: MaterialLocaleSource["appLocale"]
) {
  const domains = catalog.domains.filter(
    (candidate) =>
      candidate.appLocale === appLocale && candidate.key === descriptor.key
  );
  const sources = catalog.sources.filter(
    (candidate) =>
      candidate.appLocale === appLocale && candidate.materialKey === source.key
  );
  const [domain] = domains;
  const [candidateSource] = sources;
  if (domains.length !== 1 || domain === undefined) {
    return yield* new MaterialLocaleOwnershipError({
      domain: descriptor.key,
      scope: "domain",
    });
  }
  if (sources.length !== 1 || candidateSource === undefined) {
    return yield* new MaterialLocaleOwnershipError({
      domain: descriptor.key,
      materialKey: source.key,
      scope: "material",
    });
  }
  return {
    descriptor: yield* composeMaterialLocaleDomain(descriptor, domain),
    source: yield* composeMaterialLocaleSource(source, candidateSource),
  };
});
