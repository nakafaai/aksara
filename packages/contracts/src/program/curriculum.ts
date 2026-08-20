import { Schema } from "effect";

import { CorpusSourcePathSchema, PublicPathSchema } from "#contracts/ids";
import { type AppLocale, AppLocaleSchema } from "#contracts/locale";
import { MaterialDomainSchema } from "#contracts/material/domain";
import {
  LearningProgramKeySchema,
  ProgramNavigationIconKeySchema,
  ProgramNavigationLevelSchema,
} from "#contracts/program/spec";
import { MaterialKeySchema } from "#contracts/projection/material";
import { isLowerKebab } from "#contracts/text/syntax";

const CurriculumNamespaceMapSchema = Schema.Struct({
  de: Schema.Literal("lehrplaene"),
  en: Schema.Literal("curriculum"),
  id: Schema.Literal("kurikulum"),
});
const RenderableCurriculumLevelSchema = Schema.Literals([
  "class",
  "course",
  "stage",
  "subject",
  "track",
]);

/** Checks one curriculum route key with its optional canonical root suffix. */
function isCurriculumRouteNodeKey(value: string) {
  const rootSuffix = ":root";
  return isLowerKebab(
    value.endsWith(rootSuffix) ? value.slice(0, -rootSuffix.length) : value
  );
}

/** Localized public route namespaces shared by projection and verification. */
export const CURRICULUM_NAMESPACES = CurriculumNamespaceMapSchema.make({
  de: "lehrplaene",
  en: "curriculum",
  id: "kurikulum",
});

/** Resolves the route namespace owned by one application locale. */
export function curriculumNamespace(appLocale: AppLocale) {
  const localeCode = String(appLocale);
  if (localeCode === "de") {
    return CURRICULUM_NAMESPACES.de;
  }
  if (localeCode === "id") {
    return CURRICULUM_NAMESPACES.id;
  }
  return CURRICULUM_NAMESPACES.en;
}

/** Checks whether one curriculum level owns a learner-renderable route. */
export const isRenderableCurriculumLevel = Schema.is(
  RenderableCurriculumLevelSchema
);

/** Stable source-owned identity for one curriculum tree node. */
export const CurriculumNodeKeySchema = Schema.String.pipe(
  Schema.check(
    Schema.makeFilter(isLowerKebab, {
      description: "Lowercase kebab-case curriculum node key.",
      identifier: "CurriculumNodeKey",
      message: "Invalid curriculum node key.",
    })
  ),
  Schema.brand("@NakafaAI/AksaraCurriculumNodeKey")
);
export type CurriculumNodeKey = typeof CurriculumNodeKeySchema.Type;

const CurriculumRouteNodeKeySchema = Schema.String.pipe(
  Schema.check(Schema.makeFilter(isCurriculumRouteNodeKey))
);

const CurriculumRouteFields = {
  appLocale: AppLocaleSchema,
  canonicalPath: Schema.optional(PublicPathSchema),
  displayGroupIconKey: Schema.optional(ProgramNavigationIconKeySchema),
  displayGroupTitle: Schema.optional(Schema.String),
  iconKey: ProgramNavigationIconKeySchema,
  kind: Schema.Literal("curriculum-context"),
  level: ProgramNavigationLevelSchema,
  materialCardDescription: Schema.optional(Schema.String),
  materialCardTitle: Schema.optional(Schema.String),
  materialContextNodeKey: Schema.optional(CurriculumNodeKeySchema),
  materialContextParentPath: Schema.optional(PublicPathSchema),
  materialContextPublicPath: Schema.optional(PublicPathSchema),
  materialDomain: Schema.optional(MaterialDomainSchema),
  materialKey: Schema.optional(MaterialKeySchema),
  nodeKey: CurriculumRouteNodeKeySchema,
  order: Schema.Int.pipe(Schema.check(Schema.isGreaterThanOrEqualTo(0))),
  parentPath: Schema.optional(PublicPathSchema),
  programKey: LearningProgramKeySchema,
  publicPath: PublicPathSchema,
  sitemap: Schema.Boolean,
  sourcePath: CorpusSourcePathSchema,
  title: Schema.String,
};

/** Returns the direct parent of one canonical public path. */
function parentPath(publicPath: string) {
  return publicPath.slice(0, publicPath.lastIndexOf("/"));
}

/** Checks namespace, root, and direct-parent route ownership. */
function hasCoherentRoute(input: {
  readonly appLocale: AppLocale;
  readonly level: string;
  readonly nodeKey: string;
  readonly parentPath?: string | undefined;
  readonly programKey: string;
  readonly publicPath: string;
  readonly sourcePath: string;
}) {
  const namespace = `${curriculumNamespace(input.appLocale)}/`;
  if (!input.publicPath.startsWith(namespace)) {
    return false;
  }
  if (input.sourcePath !== `packages/corpus/curriculum/${input.programKey}`) {
    return false;
  }
  if (input.parentPath === undefined) {
    return (
      input.level === "track" &&
      input.nodeKey === `${input.programKey}:root` &&
      input.publicPath.split("/").length === 2
    );
  }
  return (
    input.nodeKey !== `${input.programKey}:root` &&
    input.parentPath === parentPath(input.publicPath)
  );
}

/** Checks all-or-nothing material and context ownership fields. */
function hasCoherentMaterialLink(input: {
  readonly canonicalPath?: string | undefined;
  readonly materialContextNodeKey?: string | undefined;
  readonly materialContextParentPath?: string | undefined;
  readonly materialContextPublicPath?: string | undefined;
  readonly materialKey?: string | undefined;
}) {
  const ownsMaterial = input.materialKey !== undefined;
  const ownsCanonical = input.canonicalPath !== undefined;
  const contextCount = [
    input.materialContextNodeKey,
    input.materialContextParentPath,
    input.materialContextPublicPath,
  ].filter((value) => value !== undefined).length;
  if (!ownsMaterial) {
    return !ownsCanonical && contextCount === 0;
  }
  return ownsCanonical && (contextCount === 0 || contextCount === 3);
}

/** Checks that every published material has its complete presentation context. */
function hasCompleteMaterialContext(input: {
  readonly materialContextNodeKey?: string | undefined;
  readonly materialContextParentPath?: string | undefined;
  readonly materialContextPublicPath?: string | undefined;
  readonly materialKey?: string | undefined;
}) {
  if (input.materialKey === undefined) {
    return true;
  }
  return (
    input.materialContextNodeKey !== undefined &&
    input.materialContextParentPath !== undefined &&
    input.materialContextPublicPath !== undefined
  );
}

/** Checks that only learner-renderable levels enter the sitemap. */
function hasCoherentSitemap(input: {
  readonly level: string;
  readonly sitemap: boolean;
}) {
  return !input.sitemap || isRenderableCurriculumLevel(input.level);
}

/** Localized curriculum route before material presentation context is added. */
export const CurriculumRouteDraftSchema = Schema.Struct(
  CurriculumRouteFields
).pipe(
  Schema.check(
    Schema.makeFilter(hasCoherentRoute, {
      message: "Expected coherent localized curriculum route ownership.",
    })
  ),
  Schema.check(
    Schema.makeFilter(hasCoherentMaterialLink, {
      message: "Expected coherent curriculum material ownership.",
    })
  ),
  Schema.check(
    Schema.makeFilter(hasCoherentSitemap, {
      message: "Expected only renderable curriculum sitemap routes.",
    })
  )
);
export type CurriculumRouteDraft = typeof CurriculumRouteDraftSchema.Type;

/** Exact localized curriculum route stored inside the program snapshot. */
export const CurriculumRouteSchema = CurriculumRouteDraftSchema.pipe(
  Schema.check(
    Schema.makeFilter(hasCompleteMaterialContext, {
      message: "Expected complete curriculum material context ownership.",
    })
  )
);
export type CurriculumRoute = typeof CurriculumRouteSchema.Type;

/** Serializes one curriculum route in stable signed field order. */
export function canonicalizeCurriculumRoute(route: CurriculumRoute) {
  return JSON.stringify({
    appLocale: route.appLocale,
    ...(route.canonicalPath === undefined
      ? {}
      : { canonicalPath: route.canonicalPath }),
    ...(route.displayGroupIconKey === undefined
      ? {}
      : { displayGroupIconKey: route.displayGroupIconKey }),
    ...(route.displayGroupTitle === undefined
      ? {}
      : { displayGroupTitle: route.displayGroupTitle }),
    iconKey: route.iconKey,
    kind: route.kind,
    level: route.level,
    ...(route.materialCardDescription === undefined
      ? {}
      : { materialCardDescription: route.materialCardDescription }),
    ...(route.materialCardTitle === undefined
      ? {}
      : { materialCardTitle: route.materialCardTitle }),
    ...(route.materialContextNodeKey === undefined
      ? {}
      : { materialContextNodeKey: route.materialContextNodeKey }),
    ...(route.materialContextParentPath === undefined
      ? {}
      : { materialContextParentPath: route.materialContextParentPath }),
    ...(route.materialContextPublicPath === undefined
      ? {}
      : { materialContextPublicPath: route.materialContextPublicPath }),
    ...(route.materialDomain === undefined
      ? {}
      : { materialDomain: route.materialDomain }),
    ...(route.materialKey === undefined
      ? {}
      : { materialKey: route.materialKey }),
    nodeKey: route.nodeKey,
    order: route.order,
    ...(route.parentPath === undefined ? {} : { parentPath: route.parentPath }),
    programKey: route.programKey,
    publicPath: route.publicPath,
    sitemap: route.sitemap,
    sourcePath: route.sourcePath,
    title: route.title,
  });
}
