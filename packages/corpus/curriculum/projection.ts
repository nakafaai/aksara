import {
  type MaterialDomain,
  MaterialDomainSchema,
} from "@nakafa/aksara-contracts/material/domain";
import { CurriculumNodeKeySchema } from "@nakafa/aksara-contracts/program/curriculum";
import {
  LearningProgramKeySchema,
  ProgramNavigationIconKeySchema,
  ProgramNavigationLevelSchema,
} from "@nakafa/aksara-contracts/program/spec";
import { MaterialKeySchema } from "@nakafa/aksara-contracts/projection/material";
import {
  Effect,
  Array as EffectArray,
  HashMap,
  MutableList,
  Schema,
} from "effect";

import { resolveCurriculumMaterial } from "#corpus/curriculum/material";
import {
  CurriculumDisplayGroupMapSchema,
  CurriculumMaterialCardMapSchema,
  CurriculumNodeTranslationMapSchema,
  type CurriculumSource,
  CurriculumTreeNodeSchema,
} from "#corpus/curriculum/schema";
import {
  decodeMaterialDomains,
  type MaterialDomainDescriptor,
  requireMaterialDomain,
} from "#corpus/material/domain";
import type { LessonMaterialSource } from "#corpus/material/schema";

const CurriculumPathNodeSchema = Schema.Struct({
  key: CurriculumNodeKeySchema,
  materialKeys: Schema.Array(MaterialKeySchema),
  translations: CurriculumNodeTranslationMapSchema,
});

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
  order: Schema.Int.pipe(Schema.check(Schema.isGreaterThanOrEqualTo(0))),
  parentKey: Schema.optional(CurriculumNodeKeySchema),
  path: Schema.NonEmptyArray(CurriculumPathNodeSchema),
  translations: CurriculumNodeTranslationMapSchema,
});
export type ProjectedCurriculumNode = typeof ProjectedCurriculumNodeSchema.Type;

/** A tree node waiting for its ancestors and the material domain it inherits. */
const PendingCurriculumNodeSchema = Schema.Struct({
  ancestors: Schema.Array(CurriculumPathNodeSchema),
  inheritedDomain: Schema.UndefinedOr(MaterialDomainSchema),
  node: CurriculumTreeNodeSchema,
  parentKey: Schema.optionalKey(CurriculumNodeKeySchema),
});
type PendingCurriculumNode = typeof PendingCurriculumNodeSchema.Type;

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
    materialByKey: HashMap.HashMap<string, LessonMaterialSource>,
    descriptors: readonly MaterialDomainDescriptor[]
  ) {
    const nodes = MutableList.make<ProjectedCurriculumNode>();
    // The head of pending is the next node in pre-order, so pending is a stack.
    const pending = MutableList.make<PendingCurriculumNode>();
    MutableList.prependAll(
      pending,
      EffectArray.map(curriculum.tree, (node) => ({
        ancestors: [],
        inheritedDomain: undefined,
        node,
      }))
    );
    let next = MutableList.take(pending);
    while (next !== MutableList.Empty) {
      const current = next;
      const { inheritedDomain, node } = current;
      const ownsMaterial = "materialKeys" in node;
      let materialDomain = inheritedDomain;
      let translations: typeof CurriculumNodeTranslationMapSchema.Type;
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
      MutableList.append(nodes, projected.node);
      if ("children" in node && node.children) {
        MutableList.prependAll(
          pending,
          EffectArray.map(node.children, (child) => ({
            ancestors: projected.path,
            inheritedDomain: materialDomain,
            node: child,
            parentKey: node.key,
          }))
        );
      }
      next = MutableList.take(pending);
    }
    return MutableList.toArray(nodes);
  }
);

/** Flattens reviewed curriculum trees after validating all material references. */
export const projectCurriculumNodes = Effect.fn(
  "AksaraCorpus.projectCurriculumNodes"
)(function* (
  curricula: readonly CurriculumSource[],
  materials: readonly LessonMaterialSource[],
  domainDescriptors?: readonly MaterialDomainDescriptor[]
) {
  const descriptors = domainDescriptors ?? (yield* decodeMaterialDomains());
  const materialByKey = HashMap.fromIterable(
    EffectArray.map(materials, (material): [string, LessonMaterialSource] => [
      material.key,
      material,
    ])
  );
  const projected = yield* Effect.forEach(curricula, (curriculum) =>
    projectCurriculum(curriculum, materialByKey, descriptors)
  );
  return EffectArray.flatten(projected);
});
