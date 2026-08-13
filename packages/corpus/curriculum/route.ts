import {
  CorpusSourcePathSchema,
  PublicPathSchema,
} from "@nakafa/aksara-contracts/ids";
import {
  ACTIVE_APP_LOCALES,
  type ActiveAppLocale,
  activeAppLocaleCode,
} from "@nakafa/aksara-contracts/locale";
import {
  type CurriculumRoute,
  type CurriculumRouteDraft,
  CurriculumRouteDraftSchema,
  curriculumNamespace,
  isRenderableCurriculumLevel,
} from "@nakafa/aksara-contracts/program/curriculum";
import {
  type LearningProgram,
  LearningProgramKeySchema,
} from "@nakafa/aksara-contracts/program/spec";
import { compareCodeUnits } from "@nakafa/aksara-contracts/text/order";
import { Effect, Schema } from "effect";

import { addMaterialContext } from "#corpus/curriculum/context";
import {
  type ProjectedCurriculumNode,
  projectCurriculumNodes,
} from "#corpus/curriculum/projection";
import type { CurriculumSource } from "#corpus/curriculum/schema";
import {
  decodeMaterialDomains,
  type MaterialDomainDescriptor,
  requireMaterialDomain,
} from "#corpus/material/domain";
import { materialTopicPath } from "#corpus/material/route";
import type { LessonMaterialSource } from "#corpus/material/schema";

/** Curriculum routes cannot be derived from the supplied source ownership. */
export class CurriculumRouteError extends Schema.TaggedError<CurriculumRouteError>()(
  "CurriculumRouteError",
  {
    code: Schema.Literal("curriculum", "program", "translation"),
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
function routeIcon(
  node: ProjectedCurriculumNode,
  program: LearningProgram,
  descriptor: MaterialDomainDescriptor | undefined
) {
  return node.iconKey ?? descriptor?.navigationIconKey ?? program.iconKey;
}

/** Resolves a node's localized segments through its complete ancestry. */
function nodeSegments(
  node: ProjectedCurriculumNode,
  appLocale: ActiveAppLocale
) {
  const appLocaleCode = activeAppLocaleCode(appLocale);
  return node.path.map((item) => item.translations[appLocaleCode].routeSlug);
}

/** Resolves one required active translation from a decoded program row. */
function requireProgramTranslation(
  program: LearningProgram,
  appLocale: ActiveAppLocale
) {
  const translation = program.translations.find(
    (candidate) => candidate.appLocale === appLocale
  );
  if (translation !== undefined) {
    return Effect.succeed(translation);
  }
  return Effect.fail(
    new CurriculumRouteError({
      code: "translation",
      programKey: program.key,
      value: appLocale,
    })
  );
}

/** Derives the reviewed corpus directory owned by one program tree. */
function curriculumSourcePath(
  programKey: typeof LearningProgramKeySchema.Type
) {
  return CorpusSourcePathSchema.make(
    `packages/corpus/curriculum/${programKey}`
  );
}

/** Projects complete localized roots and node routes from reviewed sources. */
export const projectCurriculumRoutes = Effect.fn(
  "AksaraCorpus.projectCurriculumRoutes"
)(function* (input: {
  readonly curricula: readonly CurriculumSource[];
  readonly domains?: readonly MaterialDomainDescriptor[];
  readonly materials: readonly LessonMaterialSource[];
  readonly programs: readonly LearningProgram[];
}) {
  const domains = input.domains ?? (yield* decodeMaterialDomains());
  yield* validateProgramOwnership(input.curricula, input.programs);
  const programByKey = new Map(
    input.programs.map((program) => [program.key, program])
  );
  const materialByKey = new Map(
    input.materials.map((material) => [material.key, material])
  );
  const nodes = yield* projectCurriculumNodes(
    input.curricula,
    input.materials,
    domains
  );
  const materialAncestors = materialAncestorIdentities(nodes);
  const routes: CurriculumRouteDraft[] = [];
  for (const curriculum of input.curricula) {
    const program = yield* requireProgram(programByKey, curriculum.programKey);
    for (const appLocale of ACTIVE_APP_LOCALES) {
      const translation = yield* requireProgramTranslation(program, appLocale);
      const root = `${curriculumNamespace(appLocale)}/${translation.publicSlug}`;
      const hasMaterials = nodes.some(
        (node) =>
          node.curriculumKey === curriculum.programKey &&
          node.materialKeys.length > 0
      );
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
  for (const node of nodes) {
    const program = yield* requireProgram(programByKey, node.curriculumKey);
    const material = node.materialKeys[0]
      ? materialByKey.get(node.materialKeys[0])
      : undefined;
    const materialDescriptor = material
      ? yield* requireMaterialDomain(domains, material.domain, material.key)
      : undefined;
    const nodeDescriptor = node.materialDomain
      ? yield* requireMaterialDomain(
          domains,
          node.materialDomain,
          `${node.curriculumKey}:${node.key}`
        )
      : undefined;
    for (const appLocale of ACTIVE_APP_LOCALES) {
      const appLocaleCode = activeAppLocaleCode(appLocale);
      const translation = yield* requireProgramTranslation(program, appLocale);
      const segments = nodeSegments(node, appLocale);
      const root = `${curriculumNamespace(appLocale)}/${translation.publicSlug}`;
      const publicPath = `${root}/${segments.join("/")}`;
      routes.push(
        CurriculumRouteDraftSchema.make({
          appLocale,
          canonicalPath:
            material && materialDescriptor
              ? materialTopicPath(material, materialDescriptor, appLocale)
              : undefined,
          displayGroupIconKey: node.displayGroupIconKey,
          displayGroupTitle: node.displayGroup?.[appLocaleCode].title,
          iconKey: routeIcon(node, program, nodeDescriptor),
          kind: "curriculum-context",
          level: node.level,
          materialCardDescription:
            node.materialCard?.[appLocaleCode].description,
          materialCardTitle: node.materialCard?.[appLocaleCode].title,
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
            isRenderableCurriculumLevel(node.level) &&
            materialAncestors.has(`${node.curriculumKey}\0${node.key}`),
          sourcePath: curriculumSourcePath(node.curriculumKey),
          title: node.translations[appLocaleCode].title,
        })
      );
    }
  }
  const contextual = yield* addMaterialContext(routes);
  return contextual.sort((left: CurriculumRoute, right: CurriculumRoute) => {
    const leftKey = `${left.programKey}\0${left.appLocale}\0${left.publicPath}`;
    const rightKey = `${right.programKey}\0${right.appLocale}\0${right.publicPath}`;
    return compareCodeUnits(leftKey, rightKey);
  });
});
