import { PublicPathSchema } from "@nakafa/aksara-contracts/ids";
import {
  type AppLocale,
  AppLocaleSchema,
} from "@nakafa/aksara-contracts/locale";
import {
  CurriculumRouteDraftSchema,
  curriculumNamespace,
  isRenderableCurriculumLevel,
} from "@nakafa/aksara-contracts/program/curriculum";
import {
  type LearningProgram,
  LearningProgramSchema,
} from "@nakafa/aksara-contracts/program/spec";
import { Array as Arr, Effect, HashMap, HashSet, Option, Schema } from "effect";
import {
  curriculumSourcePath,
  requireCurriculumProgram,
  requireProgramTranslation,
} from "#corpus/curriculum/ownership";
import type { ProjectedCurriculumNode } from "#corpus/curriculum/projection";
import { requireSourceLocale } from "#corpus/locale/source";
import {
  type MaterialDomainDescriptor,
  MaterialDomainDescriptorSchema,
  requireMaterialDomain,
} from "#corpus/material/domain";
import { materialTopicPath } from "#corpus/material/route";
import { LessonMaterialSourceSchema } from "#corpus/material/schema";

const CurriculumRouteContextSchema = Schema.Struct({
  appLocales: Schema.Array(AppLocaleSchema),
  domains: Schema.Array(MaterialDomainDescriptorSchema),
  materialAncestors: Schema.HashSet(Schema.String),
  materialByKey: Schema.HashMap(Schema.String, LessonMaterialSourceSchema),
  programByKey: Schema.HashMap(Schema.String, LearningProgramSchema),
});

/** Complete decoded ownership needed to project curriculum descendants. */
export type CurriculumRouteContext = typeof CurriculumRouteContextSchema.Type;

/** Selects the exact icon fallback used by Nakafa curriculum navigation. */
function routeIcon(
  node: ProjectedCurriculumNode,
  program: LearningProgram,
  descriptor: MaterialDomainDescriptor | undefined
) {
  return node.iconKey ?? descriptor?.navigationIconKey ?? program.iconKey;
}

/** Resolves a node's localized segments through its complete ancestry. */
const nodeSegments = Effect.fn("AksaraCorpus.curriculumNodeSegments")(
  function* (node: ProjectedCurriculumNode, appLocale: AppLocale) {
    return yield* Effect.forEach(node.path, (item) =>
      requireSourceLocale(
        item.translations,
        appLocale,
        `${node.curriculumKey}:${item.key}`
      ).pipe(Effect.map(({ routeSlug }) => routeSlug))
    );
  }
);

/** Projects one localized curriculum node with its material-owned context. */
const projectCurriculumNodeRoute = Effect.fn(
  "AksaraCorpus.projectCurriculumNodeRoute"
)(function* (
  node: ProjectedCurriculumNode,
  appLocale: AppLocale,
  context: CurriculumRouteContext
) {
  const program = yield* requireCurriculumProgram(
    context.programByKey,
    node.curriculumKey
  );
  const [materialKey] = node.materialKeys;
  const material =
    materialKey === undefined
      ? undefined
      : Option.getOrUndefined(HashMap.get(context.materialByKey, materialKey));
  const materialDescriptor =
    material === undefined
      ? undefined
      : yield* requireMaterialDomain(
          context.domains,
          material.domain,
          material.key
        );
  const nodeDescriptor =
    node.materialDomain === undefined
      ? undefined
      : yield* requireMaterialDomain(
          context.domains,
          node.materialDomain,
          `${node.curriculumKey}:${node.key}`
        );
  const translation = yield* requireProgramTranslation(program, appLocale);
  const segments = yield* nodeSegments(node, appLocale);
  const root = `${curriculumNamespace(appLocale)}/${translation.publicSlug}`;
  const publicPath = `${root}/${Arr.join(segments, "/")}`;
  const canonicalPath =
    material === undefined || materialDescriptor === undefined
      ? undefined
      : yield* materialTopicPath(material, materialDescriptor, appLocale);
  const displayGroup =
    node.displayGroup === undefined
      ? undefined
      : yield* requireSourceLocale(
          node.displayGroup,
          appLocale,
          `${node.curriculumKey}:${node.key}:display-group`
        );
  const materialCard =
    node.materialCard === undefined
      ? undefined
      : yield* requireSourceLocale(
          node.materialCard,
          appLocale,
          `${node.curriculumKey}:${node.key}:material-card`
        );
  const nodeTranslation = yield* requireSourceLocale(
    node.translations,
    appLocale,
    `${node.curriculumKey}:${node.key}`
  );
  return CurriculumRouteDraftSchema.make({
    appLocale,
    canonicalPath,
    displayGroupIconKey: node.displayGroupIconKey,
    displayGroupTitle: displayGroup?.title,
    iconKey: routeIcon(node, program, nodeDescriptor),
    kind: "curriculum-context",
    level: node.level,
    materialCardDescription: materialCard?.description,
    materialCardTitle: materialCard?.title,
    materialDomain: node.materialDomain,
    materialKey,
    nodeKey: node.key,
    order: node.order,
    parentPath: PublicPathSchema.make(
      publicPath.slice(0, publicPath.lastIndexOf("/"))
    ),
    programKey: node.curriculumKey,
    publicPath: PublicPathSchema.make(publicPath),
    sitemap:
      isRenderableCurriculumLevel(node.level) &&
      HashSet.has(
        context.materialAncestors,
        `${node.curriculumKey}\0${node.key}`
      ),
    sourcePath: curriculumSourcePath(node.curriculumKey),
    title: nodeTranslation.title,
  });
});

/** Projects every localized node while preserving source and locale order. */
export const projectCurriculumNodeRoutes = Effect.fn(
  "AksaraCorpus.projectCurriculumNodeRoutes"
)(function* (
  nodes: readonly ProjectedCurriculumNode[],
  context: CurriculumRouteContext
) {
  const routes = yield* Effect.forEach(nodes, (node) =>
    Effect.forEach(context.appLocales, (appLocale) =>
      projectCurriculumNodeRoute(node, appLocale, context)
    )
  );
  return Arr.flatten(routes);
});
