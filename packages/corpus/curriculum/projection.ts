import type { AppLocale } from "@nakafa/aksara-contracts/locale";
import {
  type MaterialDomain,
  MaterialDomainSchema,
} from "@nakafa/aksara-contracts/material/domain";
import {
  type CurriculumNodeKey,
  CurriculumNodeKeySchema,
} from "@nakafa/aksara-contracts/program/curriculum";
import {
  LearningProgramKeySchema,
  ProgramNavigationIconKeySchema,
  ProgramNavigationLevelSchema,
} from "@nakafa/aksara-contracts/program/spec";
import { MaterialKeySchema } from "@nakafa/aksara-contracts/projection/material";
import { Effect, Array as EffectArray, Schema } from "effect";

import { composeCurriculumLocaleCatalog } from "#corpus/curriculum/locale";
import { decodeCurriculumLocaleCatalog } from "#corpus/curriculum/locale-source";
import { resolveCurriculumMaterial } from "#corpus/curriculum/material";
import {
  type CurriculumSource,
  type CurriculumTreeNode,
  LocalizedCurriculumDisplayGroupMapSchema,
  LocalizedCurriculumMaterialCardMapSchema,
  LocalizedCurriculumNodeTranslationMapSchema,
} from "#corpus/curriculum/schema";
import { LocaleOverlayAppLocaleSchema } from "#corpus/locale/source";
import {
  decodeMaterialDomains,
  type MaterialDomainDescriptor,
  requireMaterialDomain,
} from "#corpus/material/domain";
import type { LessonMaterialSource } from "#corpus/material/schema";

const CurriculumPathNodeSchema = Schema.Struct({
  key: CurriculumNodeKeySchema,
  materialKeys: Schema.Array(MaterialKeySchema),
  translations: LocalizedCurriculumNodeTranslationMapSchema,
});
type CurriculumPathNode = typeof CurriculumPathNodeSchema.Type;

/** Flat validated curriculum node used to derive localized route rows. */
export const ProjectedCurriculumNodeSchema = Schema.Struct({
  curriculumKey: LearningProgramKeySchema,
  displayGroup: Schema.optional(LocalizedCurriculumDisplayGroupMapSchema),
  displayGroupIconKey: Schema.optional(ProgramNavigationIconKeySchema),
  iconKey: Schema.optional(ProgramNavigationIconKeySchema),
  key: CurriculumNodeKeySchema,
  level: ProgramNavigationLevelSchema,
  materialCard: Schema.optional(LocalizedCurriculumMaterialCardMapSchema),
  materialDomain: Schema.optional(MaterialDomainSchema),
  materialKeys: Schema.Array(MaterialKeySchema),
  order: Schema.Int.pipe(Schema.nonNegative()),
  parentKey: Schema.optional(CurriculumNodeKeySchema),
  path: Schema.NonEmptyArray(CurriculumPathNodeSchema),
  translations: LocalizedCurriculumNodeTranslationMapSchema,
});
export type ProjectedCurriculumNode = typeof ProjectedCurriculumNodeSchema.Type;

interface PendingCurriculumNode {
  readonly ancestors: readonly CurriculumPathNode[];
  readonly inheritedDomain: MaterialDomain | undefined;
  readonly node: CurriculumTreeNode;
  readonly parentKey?: CurriculumNodeKey;
}

/** Maps one resolved tree node and its ancestry onto the flat route model. */
function makeProjectedNode(
  curriculum: CurriculumSource,
  current: PendingCurriculumNode,
  materialDomain: MaterialDomain | undefined,
  translations: typeof LocalizedCurriculumNodeTranslationMapSchema.Type
) {
  const { node } = current;
  const ownsMaterial = "materialKeys" in node;
  const path = EffectArray.append(current.ancestors, {
    key: node.key,
    materialKeys: ownsMaterial ? node.materialKeys : [],
    translations,
  });
  return {
    node: ProjectedCurriculumNodeSchema.make({
      curriculumKey: curriculum.programKey,
      displayGroup: "displayGroup" in node ? node.displayGroup : undefined,
      displayGroupIconKey:
        "displayGroupIconKey" in node ? node.displayGroupIconKey : undefined,
      iconKey: "iconKey" in node ? node.iconKey : undefined,
      key: node.key,
      level: node.level,
      materialCard: "materialCard" in node ? node.materialCard : undefined,
      materialDomain,
      materialKeys: ownsMaterial ? node.materialKeys : [],
      order: node.order,
      parentKey: current.parentKey,
      path,
      translations,
    }),
    path,
  };
}

/** Projects one source tree in pre-order while inheriting material domains. */
const projectCurriculum = Effect.fn("AksaraCorpus.projectCurriculum")(
  function* (
    curriculum: CurriculumSource,
    materialByKey: ReadonlyMap<string, LessonMaterialSource>,
    descriptors: readonly MaterialDomainDescriptor[]
  ) {
    const nodes: ProjectedCurriculumNode[] = [];
    const pending: PendingCurriculumNode[] = [...curriculum.tree]
      .reverse()
      .map((node) => ({ ancestors: [], inheritedDomain: undefined, node }));
    while (EffectArray.isNonEmptyArray(pending)) {
      const current = EffectArray.lastNonEmpty(pending);
      pending.pop();
      const { inheritedDomain, node } = current;
      const ownsMaterial = "materialKeys" in node;
      let materialDomain = inheritedDomain;
      let translations: typeof LocalizedCurriculumNodeTranslationMapSchema.Type;
      if (ownsMaterial) {
        const resolved = yield* resolveCurriculumMaterial(
          curriculum,
          node,
          materialByKey,
          descriptors,
          inheritedDomain
        );
        ({ materialDomain, translations } = resolved);
      } else {
        const {
          materialDomain: sourceDomain,
          translations: sourceTranslations,
        } = node;
        translations = sourceTranslations;
        if (sourceDomain) {
          yield* requireMaterialDomain(
            descriptors,
            sourceDomain,
            `${curriculum.programKey}:${node.key}`
          );
          materialDomain = sourceDomain;
        }
      }
      const projected = makeProjectedNode(
        curriculum,
        current,
        materialDomain,
        translations
      );
      nodes.push(projected.node);
      if ("children" in node && node.children) {
        pending.push(
          ...[...node.children].reverse().map((child) => ({
            ancestors: projected.path,
            inheritedDomain: materialDomain,
            node: child,
            parentKey: node.key,
          }))
        );
      }
    }
    return nodes;
  }
);

/** Flattens reviewed curriculum trees after validating all material references. */
export const projectCurriculumNodes = Effect.fn(
  "AksaraCorpus.projectCurriculumNodes"
)(function* (
  curricula: readonly CurriculumSource[],
  materials: readonly LessonMaterialSource[],
  domainDescriptors?: readonly MaterialDomainDescriptor[],
  localeInput?: {
    readonly appLocales: readonly AppLocale[];
    readonly rows?: unknown;
  }
) {
  const descriptors = domainDescriptors ?? (yield* decodeMaterialDomains());
  const materialByKey = new Map(
    materials.map((material) => [material.key, material])
  );
  const projected = yield* Effect.forEach(curricula, (curriculum) =>
    projectCurriculum(curriculum, materialByKey, descriptors)
  );
  const nodes = projected.flat();
  if (
    localeInput === undefined ||
    !localeInput.appLocales.some(Schema.is(LocaleOverlayAppLocaleSchema))
  ) {
    return nodes;
  }
  const rows = yield* decodeCurriculumLocaleCatalog(localeInput.rows);
  return yield* composeCurriculumLocaleCatalog({
    appLocales: localeInput.appLocales,
    curricula,
    nodes,
    rows,
  });
});
