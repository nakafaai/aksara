import {
  ACTIVE_APP_LOCALES,
  type ActiveAppLocale,
  activeAppLocaleCode,
} from "@nakafa/aksara-contracts/locale";
import {
  type MaterialDomain,
  MaterialDomainSchema,
} from "@nakafa/aksara-contracts/material/domain";
import { ProgramNavigationIconKeySchema } from "@nakafa/aksara-contracts/program/spec";
import { RendererDomainSchema } from "@nakafa/aksara-contracts/renderer/domain";
import { Effect, Schema } from "effect";

import { PublicRouteSlugMapSchema } from "#corpus/route/schema";

/** One reviewed material domain and its physical renderer and public routes. */
export const MaterialDomainDescriptorSchema = Schema.Struct({
  key: MaterialDomainSchema,
  navigationIconKey: Schema.optional(ProgramNavigationIconKeySchema),
  rendererDomain: RendererDomainSchema,
  routeSlugs: PublicRouteSlugMapSchema,
});
export type MaterialDomainDescriptor =
  typeof MaterialDomainDescriptorSchema.Type;

const materialDomainSources = [
  {
    key: "ai-ds",
    rendererDomain: "ai-ds",
    routeSlugs: { en: "ai-ds", id: "ai-ds" },
  },
  {
    key: "biology",
    navigationIconKey: "science",
    rendererDomain: "biology",
    routeSlugs: { en: "biology", id: "biologi" },
  },
  {
    key: "chemistry",
    navigationIconKey: "science",
    rendererDomain: "chemistry",
    routeSlugs: { en: "chemistry", id: "kimia" },
  },
  {
    key: "mathematics",
    navigationIconKey: "mathematics",
    rendererDomain: "mathematics",
    routeSlugs: { en: "mathematics", id: "matematika" },
  },
  {
    key: "physics",
    navigationIconKey: "science",
    rendererDomain: "physics",
    routeSlugs: { en: "physics", id: "fisika" },
  },
];

/** The material-domain descriptor catalog failed strict schema decoding. */
export class MaterialDomainCatalogError extends Schema.TaggedError<MaterialDomainCatalogError>()(
  "MaterialDomainCatalogError",
  { cause: Schema.Unknown }
) {}

/** Two material-domain descriptors claim the same key or localized route. */
export class MaterialDomainConflictError extends Schema.TaggedError<MaterialDomainConflictError>()(
  "MaterialDomainConflictError",
  {
    code: Schema.Literal("key", "route"),
    key: MaterialDomainSchema,
    value: Schema.String,
  }
) {}

/** Reviewed material or curriculum source references an unknown domain. */
export class MaterialDomainMissingError extends Schema.TaggedError<MaterialDomainMissingError>()(
  "MaterialDomainMissingError",
  {
    key: MaterialDomainSchema,
    owner: Schema.String,
  }
) {}

/** Decodes the reviewed domain catalog and rejects ambiguous ownership. */
export const decodeMaterialDomains = Effect.fn(
  "AksaraCorpus.decodeMaterialDomains"
)(function* (input: unknown = materialDomainSources) {
  const descriptors = yield* Schema.decodeUnknown(
    Schema.Array(MaterialDomainDescriptorSchema)
  )(input, { onExcessProperty: "error" }).pipe(
    Effect.mapError(
      (cause) =>
        new MaterialDomainCatalogError({
          cause,
        })
    )
  );
  const keys = new Set<string>();
  const routes = new Map<string, MaterialDomain>();

  for (const descriptor of descriptors) {
    if (keys.has(descriptor.key)) {
      return yield* new MaterialDomainConflictError({
        code: "key",
        key: descriptor.key,
        value: descriptor.key,
      });
    }
    keys.add(descriptor.key);

    for (const appLocale of ACTIVE_APP_LOCALES) {
      const appLocaleCode = activeAppLocaleCode(appLocale);
      const routeSlug = descriptor.routeSlugs[appLocaleCode];
      const identity = `${appLocale}\0${routeSlug}`;
      const owner = routes.get(identity);
      if (owner) {
        return yield* new MaterialDomainConflictError({
          code: "route",
          key: descriptor.key,
          value: `${appLocale}:${routeSlug}:${owner}`,
        });
      }
      routes.set(identity, descriptor.key);
    }
  }

  return descriptors;
});

/** Resolves one descriptor or preserves the missing source owner as typed data. */
export const requireMaterialDomain = Effect.fn(
  "AksaraCorpus.requireMaterialDomain"
)(function* (
  descriptors: readonly MaterialDomainDescriptor[],
  key: MaterialDomain,
  owner: string
) {
  const descriptor = descriptors.find((candidate) => candidate.key === key);
  if (!descriptor) {
    return yield* new MaterialDomainMissingError({ key, owner });
  }
  return descriptor;
});

/** Reads one descriptor's localized public route segment. */
export function materialDomainRoute(
  descriptor: MaterialDomainDescriptor,
  appLocale: ActiveAppLocale
) {
  return descriptor.routeSlugs[activeAppLocaleCode(appLocale)];
}
