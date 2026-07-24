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

import {
  CurriculumDisplayGroupMapSchema,
  CurriculumMaterialCardMapSchema,
  CurriculumNodeTranslationMapSchema,
  type CurriculumSource,
  type CurriculumTreeNode,
} from "#corpus/curriculum/schema";
import type { LessonMaterialSource } from "#corpus/material/schema";

const ProjectedCurriculumPathNodeSchema = Schema.Struct({
  key: CurriculumNodeKeySchema,
  materialKeys: Schema.Array(MaterialKeySchema),
  translations: CurriculumNodeTranslationMapSchema,
});
type ProjectedCurriculumPathNode =
  typeof ProjectedCurriculumPathNodeSchema.Type;

/** Flat validated curriculum node used to derive localized route rows. */
export const ProjectedCurriculumNodeSchema = Schema.Struct({
  curriculumKey: LearningProgramKeySchema,
  displayGroup: Schema.optional(CurriculumDisplayGroupMapSchema),
  displayGroupIconKey: Schema.optional(ProgramNavigationIconKeySchema),
  iconKey: Schema.optional(ProgramNavigationIconKeySchema),
  key: CurriculumNodeKeySchema,
  level: ProgramNavigationLevelSchema,
  materialCard: Schema.optional(CurriculumMaterialCardMapSchema),
  materialDomain: Schema.optional(MaterialDomainSchema),
  materialKeys: Schema.Array(MaterialKeySchema),
  order: Schema.Int.pipe(Schema.nonNegative()),
  parentKey: Schema.optional(CurriculumNodeKeySchema),
  path: Schema.NonEmptyArray(ProjectedCurriculumPathNodeSchema),
  translations: CurriculumNodeTranslationMapSchema,
});
export type ProjectedCurriculumNode = typeof ProjectedCurriculumNodeSchema.Type;

interface PendingCurriculumNode {
  readonly ancestors: readonly ProjectedCurriculumPathNode[];
  readonly inheritedDomain: MaterialDomain | undefined;
  readonly node: CurriculumTreeNode;
  readonly parentKey?: CurriculumNodeKey;
}

/** One curriculum mapping cannot be projected from reviewed material sources. */
export class CurriculumProjectionError extends Schema.TaggedError<CurriculumProjectionError>()(
  "CurriculumProjectionError",
  {
    code: Schema.Literal("display", "material", "multi-material"),
    nodeKey: CurriculumNodeKeySchema,
    programKey: LearningProgramKeySchema,
    value: Schema.String,
  }
) {}

/** Reads source-owned translations for one validated material reference. */
function materialTranslations(material: LessonMaterialSource) {
  return {
    en: {
      routeSlug: material.routeSlugs.en,
      title: material.translations.en.title,
    },
    id: {
      routeSlug: material.routeSlugs.id,
      title: material.translations.id.title,
    },
  };
}

/** Checks whether an override redundantly copies material-owned display data. */
function duplicatesMaterialDisplay(
  override: NonNullable<
    Extract<
      CurriculumTreeNode,
      { materialKeys: readonly unknown[] }
    >["displayOverride"]
  >,
  material: LessonMaterialSource
) {
  const translations = materialTranslations(material);
  return (["en", "id"] as const).every(
    (locale) =>
      override[locale].routeSlug === translations[locale].routeSlug &&
      override[locale].title === translations[locale].title
  );
}

/** Resolves one material leaf through exact catalog membership and copy rules. */
const resolveMaterialLeaf = Effect.fn("AksaraCorpus.resolveMaterialLeaf")(
  function* (
    curriculum: CurriculumSource,
    node: Extract<CurriculumTreeNode, { materialKeys: readonly unknown[] }>,
    materialByKey: ReadonlyMap<string, LessonMaterialSource>
  ) {
    const [firstMaterialKey] = node.materialKeys;
    const firstMaterial = materialByKey.get(firstMaterialKey);
    if (!firstMaterial) {
      return yield* new CurriculumProjectionError({
        code: "material",
        nodeKey: node.key,
        programKey: curriculum.programKey,
        value: firstMaterialKey,
      });
    }
    const materials = [firstMaterial];
    for (const materialKey of node.materialKeys.slice(1)) {
      const material = materialByKey.get(materialKey);
      if (!material) {
        return yield* new CurriculumProjectionError({
          code: "material",
          nodeKey: node.key,
          programKey: curriculum.programKey,
          value: materialKey,
        });
      }
      materials.push(material);
    }
    if (materials.length > 1) {
      if (!node.displayOverride) {
        return yield* new CurriculumProjectionError({
          code: "multi-material",
          nodeKey: node.key,
          programKey: curriculum.programKey,
          value: node.materialKeys.join(","),
        });
      }
      return node.displayOverride;
    }
    if (
      node.displayOverride &&
      duplicatesMaterialDisplay(node.displayOverride, firstMaterial)
    ) {
      return yield* new CurriculumProjectionError({
        code: "display",
        nodeKey: node.key,
        programKey: curriculum.programKey,
        value: firstMaterial.key,
      });
    }
    return node.displayOverride ?? materialTranslations(firstMaterial);
  }
);

/** Maps one resolved tree node and its ancestry onto the flat route model. */
function makeProjectedNode(
  curriculum: CurriculumSource,
  current: PendingCurriculumNode,
  materialDomain: MaterialDomain | undefined,
  translations: typeof CurriculumNodeTranslationMapSchema.Type
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
    materialByKey: ReadonlyMap<string, LessonMaterialSource>
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
      const materialDomain = ownsMaterial
        ? inheritedDomain
        : (node.materialDomain ?? inheritedDomain);
      const translations = ownsMaterial
        ? yield* resolveMaterialLeaf(curriculum, node, materialByKey)
        : node.translations;
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
  materials: readonly LessonMaterialSource[]
) {
  const materialByKey = new Map(
    materials.map((material) => [material.key, material])
  );
  const projected = yield* Effect.forEach(curricula, (curriculum) =>
    projectCurriculum(curriculum, materialByKey)
  );
  return projected.flat();
});
