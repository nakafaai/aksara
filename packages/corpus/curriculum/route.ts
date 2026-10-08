import { PublicPathSchema } from "@nakafa/aksara-contracts/ids";
import {
  ACTIVE_APP_LOCALES,
  type AppLocale,
} from "@nakafa/aksara-contracts/locale";
import {
  type CurriculumRoute,
  type CurriculumRouteDraft,
  CurriculumRouteDraftSchema,
  curriculumNamespace,
} from "@nakafa/aksara-contracts/program/curriculum";
import type { LearningProgram } from "@nakafa/aksara-contracts/program/spec";
import { compareCodeUnits } from "@nakafa/aksara-contracts/text/order";
import { Effect, HashMap, HashSet } from "effect";

import { addMaterialContext } from "#corpus/curriculum/context";
import {
  type CurriculumRouteContext,
  projectCurriculumNodeRoutes,
} from "#corpus/curriculum/node";
import {
  CurriculumRouteError,
  curriculumSourcePath,
  requireCurriculumProgram,
  requireProgramTranslation,
} from "#corpus/curriculum/ownership";
import {
  type ProjectedCurriculumNode,
  projectCurriculumNodes,
} from "#corpus/curriculum/projection";
import type { CurriculumSource } from "#corpus/curriculum/schema";
import {
  decodeMaterialDomains,
  type MaterialDomainDescriptor,
} from "#corpus/material/domain";
import type { LessonMaterialSource } from "#corpus/material/schema";

/** Validates one-to-one ownership between curriculum-tree programs and trees. */
const validateProgramOwnership = Effect.fn(
  "AksaraCorpus.validateCurriculumPrograms"
)(function* (
  curricula: readonly CurriculumSource[],
  programs: readonly LearningProgram[]
) {
  const curriculumKeys = HashSet.fromIterable(
    curricula.map((curriculum) => curriculum.programKey)
  );
  for (const program of programs) {
    if (
      program.navigation.model === "curriculum-tree" &&
      !HashSet.has(curriculumKeys, program.key)
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
  return HashSet.fromIterable(
    nodes.flatMap((node) =>
      node.materialKeys.length === 0
        ? []
        : node.path.map((ancestor) => `${node.curriculumKey}\0${ancestor.key}`)
    )
  );
}

/** Projects every localized program root before its curriculum descendants. */
const projectCurriculumRoots = Effect.fn("AksaraCorpus.projectCurriculumRoots")(
  function* (input: {
    readonly appLocales: readonly AppLocale[];
    readonly curricula: readonly CurriculumSource[];
    readonly nodes: readonly ProjectedCurriculumNode[];
    readonly programByKey: HashMap.HashMap<string, LearningProgram>;
  }) {
    const routes: CurriculumRouteDraft[] = [];
    for (const curriculum of input.curricula) {
      const program = yield* requireCurriculumProgram(
        input.programByKey,
        curriculum.programKey
      );
      const hasMaterials = input.nodes.some(
        (node) =>
          node.curriculumKey === curriculum.programKey &&
          node.materialKeys.length > 0
      );
      for (const appLocale of input.appLocales) {
        const translation = yield* requireProgramTranslation(
          program,
          appLocale
        );
        const root = `${curriculumNamespace(appLocale)}/${translation.publicSlug}`;
        routes.push(
          CurriculumRouteDraftSchema.make({
            appLocale,
            iconKey: program.iconKey,
            kind: "curriculum-context",
            level: "track",
            nodeKey: `${program.key}:root`,
            order: program.displayOrder,
            programKey: program.key,
            publicPath: PublicPathSchema.make(root),
            sitemap: hasMaterials,
            sourcePath: curriculumSourcePath(program.key),
            title: translation.title,
          })
        );
      }
    }
    return routes;
  }
);

/** Projects complete localized roots and node routes from reviewed sources. */
export const projectCurriculumRoutes = Effect.fn(
  "AksaraCorpus.projectCurriculumRoutes"
)(function* (input: {
  readonly curricula: readonly CurriculumSource[];
  readonly domains?: readonly MaterialDomainDescriptor[];
  readonly appLocales?: readonly AppLocale[];
  readonly materials: readonly LessonMaterialSource[];
  readonly programs: readonly LearningProgram[];
}) {
  const appLocales = input.appLocales ?? ACTIVE_APP_LOCALES;
  const domains = input.domains ?? (yield* decodeMaterialDomains());
  yield* validateProgramOwnership(input.curricula, input.programs);
  const programByKey = HashMap.fromIterable(
    input.programs.map((program): [string, LearningProgram] => [
      program.key,
      program,
    ])
  );
  const materialByKey = HashMap.fromIterable(
    input.materials.map((material): [string, LessonMaterialSource] => [
      material.key,
      material,
    ])
  );
  const nodes = yield* projectCurriculumNodes(
    input.curricula,
    input.materials,
    domains
  );
  const context: CurriculumRouteContext = {
    appLocales,
    domains,
    materialAncestors: materialAncestorIdentities(nodes),
    materialByKey,
    programByKey,
  };
  const [roots, nodesRoutes] = yield* Effect.all(
    [
      projectCurriculumRoots({
        appLocales,
        curricula: input.curricula,
        nodes,
        programByKey,
      }),
      projectCurriculumNodeRoutes(nodes, context),
    ],
    { concurrency: 2 }
  );
  const contextual = yield* addMaterialContext([...roots, ...nodesRoutes]);
  return contextual.sort((left: CurriculumRoute, right: CurriculumRoute) => {
    const leftKey = `${left.programKey}\0${left.appLocale}\0${left.publicPath}`;
    const rightKey = `${right.programKey}\0${right.appLocale}\0${right.publicPath}`;
    return compareCodeUnits(leftKey, rightKey);
  });
});
