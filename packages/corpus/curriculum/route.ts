import { ContentLocaleSchema } from "@nakafa/aksara-contracts/content";
import { PublicPathSchema } from "@nakafa/aksara-contracts/ids";
import {
  type CurriculumRoute,
  type CurriculumRouteDraft,
  CurriculumRouteDraftSchema,
} from "@nakafa/aksara-contracts/program/curriculum";
import {
  type LearningProgram,
  LearningProgramKeySchema,
} from "@nakafa/aksara-contracts/program/spec";
import { Effect, Schema } from "effect";

import { addMaterialContext } from "#corpus/curriculum/context";
import {
  type ProjectedCurriculumNode,
  projectCurriculumNodes,
} from "#corpus/curriculum/projection";
import type { CurriculumSource } from "#corpus/curriculum/schema";
import { materialTopicPath } from "#corpus/material/route";
import type { LessonMaterialSource } from "#corpus/material/schema";

const curriculumNamespaces = { en: "curriculum", id: "kurikulum" };
const renderableLevels = new Set([
  "class",
  "course",
  "stage",
  "subject",
  "track",
]);

/** Curriculum routes cannot be derived from the supplied source ownership. */
export class CurriculumRouteError extends Schema.TaggedError<CurriculumRouteError>()(
  "CurriculumRouteError",
  {
    code: Schema.Literal("curriculum", "program"),
    programKey: LearningProgramKeySchema,
    value: Schema.String,
  }
) {}

/** Finds a program or fails with its missing curriculum ownership. */
function requireProgram(
  programByKey: ReadonlyMap<string, LearningProgram>,
  programKey: typeof LearningProgramKeySchema.Type
) {
  const program = programByKey.get(programKey);
  if (program?.navigation.model === "curriculum-tree") {
    return Effect.succeed(program);
  }
  return Effect.fail(
    new CurriculumRouteError({
      code: "program",
      programKey,
      value: program?.navigation.model ?? "missing",
    })
  );
}

/** Validates one-to-one ownership between curriculum-tree programs and trees. */
const validateProgramOwnership = Effect.fn(
  "AksaraCorpus.validateCurriculumPrograms"
)(function* (
  curricula: readonly CurriculumSource[],
  programs: readonly LearningProgram[]
) {
  const curriculumKeys = new Set(
    curricula.map((curriculum) => curriculum.programKey)
  );
  for (const program of programs) {
    if (
      program.navigation.model === "curriculum-tree" &&
      !curriculumKeys.has(program.key)
    ) {
      return yield* new CurriculumRouteError({
        code: "curriculum",
        programKey: program.key,
        value: "missing",
      });
    }
  }
});

/** Identifies every curriculum node with at least one material descendant. */
function materialAncestorIdentities(nodes: readonly ProjectedCurriculumNode[]) {
  const identities = new Set<string>();
  for (const node of nodes) {
    if (node.materialKeys.length === 0) {
      continue;
    }
    for (const ancestor of node.path) {
      identities.add(`${node.curriculumKey}\0${ancestor.key}`);
    }
  }
  return identities;
}

/** Selects the exact icon fallback used by Nakafa curriculum navigation. */
function routeIcon(node: ProjectedCurriculumNode, program: LearningProgram) {
  if (node.iconKey) {
    return node.iconKey;
  }
  if (node.materialDomain === "mathematics") {
    return "mathematics";
  }
  if (
    node.materialDomain === "biology" ||
    node.materialDomain === "chemistry" ||
    node.materialDomain === "physics"
  ) {
    return "science";
  }
  return program.iconKey;
}

/** Resolves a node's localized segments through its complete ancestry. */
function nodeSegments(
  node: ProjectedCurriculumNode,
  locale: typeof ContentLocaleSchema.Type
) {
  return node.path.map((item) => item.translations[locale].routeSlug);
}

/** Projects complete localized roots and node routes from reviewed sources. */
export const projectCurriculumRoutes = Effect.fn(
  "AksaraCorpus.projectCurriculumRoutes"
)(function* (input: {
  readonly curricula: readonly CurriculumSource[];
  readonly materials: readonly LessonMaterialSource[];
  readonly programs: readonly LearningProgram[];
}) {
  yield* validateProgramOwnership(input.curricula, input.programs);
  const programByKey = new Map(
    input.programs.map((program) => [program.key, program])
  );
  const materialByKey = new Map(
    input.materials.map((material) => [material.key, material])
  );
  const nodes = yield* projectCurriculumNodes(input.curricula, input.materials);
  const materialAncestors = materialAncestorIdentities(nodes);
  const routes: CurriculumRouteDraft[] = [];
  for (const curriculum of input.curricula) {
    const program = yield* requireProgram(programByKey, curriculum.programKey);
    for (const locale of ContentLocaleSchema.literals) {
      const root = `${curriculumNamespaces[locale]}/${program.translations[locale].publicSlug}`;
      const hasMaterials = nodes.some(
        (node) =>
          node.curriculumKey === curriculum.programKey &&
          node.materialKeys.length > 0
      );
      routes.push(
        CurriculumRouteDraftSchema.make({
          iconKey: program.iconKey,
          kind: "curriculum-context",
          level: "track",
          locale,
          nodeKey: `${program.key}:root`,
          order: program.displayOrder,
          programKey: program.key,
          publicPath: PublicPathSchema.make(root),
          sitemap: hasMaterials,
          title: program.translations[locale].title,
        })
      );
    }
  }
  for (const node of nodes) {
    const program = yield* requireProgram(programByKey, node.curriculumKey);
    for (const locale of ContentLocaleSchema.literals) {
      const segments = nodeSegments(node, locale);
      const root = `${curriculumNamespaces[locale]}/${program.translations[locale].publicSlug}`;
      const publicPath = `${root}/${segments.join("/")}`;
      const material = node.materialKeys[0]
        ? materialByKey.get(node.materialKeys[0])
        : undefined;
      routes.push(
        CurriculumRouteDraftSchema.make({
          canonicalPath: material
            ? materialTopicPath(material, locale)
            : undefined,
          displayGroupIconKey: node.displayGroupIconKey,
          displayGroupTitle: node.displayGroup?.[locale].title,
          iconKey: routeIcon(node, program),
          kind: "curriculum-context",
          level: node.level,
          locale,
          materialCardDescription: node.materialCard?.[locale].description,
          materialCardTitle: node.materialCard?.[locale].title,
          materialDomain: node.materialDomain,
          materialKey: node.materialKeys[0],
          nodeKey: node.key,
          order: node.order,
          parentPath: PublicPathSchema.make(
            publicPath.slice(0, publicPath.lastIndexOf("/"))
          ),
          programKey: node.curriculumKey,
          publicPath: PublicPathSchema.make(publicPath),
          sitemap:
            renderableLevels.has(node.level) &&
            materialAncestors.has(`${node.curriculumKey}\0${node.key}`),
          title: node.translations[locale].title,
        })
      );
    }
  }
  const contextual = yield* addMaterialContext(routes);
  return contextual.sort((left: CurriculumRoute, right: CurriculumRoute) => {
    const leftKey = `${left.programKey}\0${left.locale}\0${left.publicPath}`;
    const rightKey = `${right.programKey}\0${right.locale}\0${right.publicPath}`;
    return leftKey < rightKey ? -1 : 1;
  });
});
