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
import {
  Array as Arr,
  Effect,
  HashMap,
  HashSet,
  MutableList,
  Order,
} from "effect";

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
    Arr.map(curricula, (curriculum) => curriculum.programKey)
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
    Arr.flatMap(nodes, (node) =>
      node.materialKeys.length === 0
        ? []
        : Arr.map(
            node.path,
            (ancestor) => `${node.curriculumKey}\0${ancestor.key}`
          )
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
    const routes = MutableList.make<CurriculumRouteDraft>();
    for (const curriculum of input.curricula) {
      const program = yield* requireCurriculumProgram(
        input.programByKey,
        curriculum.programKey
      );
      const hasMaterials = Arr.some(
        input.nodes,
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
        MutableList.append(
          routes,
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
    return MutableList.toArray(routes);
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
    Arr.map(input.programs, (program): [string, LearningProgram] => [
      program.key,
      program,
    ])
  );
  const materialByKey = HashMap.fromIterable(
    Arr.map(input.materials, (material): [string, LessonMaterialSource] => [
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
  return Arr.sort(
    contextual,
    Order.mapInput(
      Order.String,
      (route: CurriculumRoute) =>
        `${route.programKey}\0${route.appLocale}\0${route.publicPath}`
    )
  );
});
