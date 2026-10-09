import {
  CurriculumNodeKeySchema,
  type CurriculumRoute,
  type CurriculumRouteDraft,
  CurriculumRouteSchema,
} from "@nakafa/aksara-contracts/program/curriculum";
import { LearningProgramKeySchema } from "@nakafa/aksara-contracts/program/spec";
import {
  Array as Arr,
  Effect,
  HashMap,
  MutableList,
  Option,
  Schema,
} from "effect";

/** A material route has no complete subject or course presentation context. */
export class CurriculumContextError extends Schema.TaggedError<CurriculumContextError>()(
  "CurriculumContextError",
  {
    nodeKey: Schema.String,
    programKey: LearningProgramKeySchema,
  }
) {}

/** Finds the closest card group and subject/course parent for one material. */
function findMaterialContext(
  route: CurriculumRouteDraft,
  routeByPath: HashMap.HashMap<string, CurriculumRouteDraft>
) {
  let current: CurriculumRouteDraft = route;
  while (current.parentPath) {
    const parent = Option.getOrUndefined(
      HashMap.get(
        routeByPath,
        `${current.programKey}\0${current.appLocale}\0${current.parentPath}`
      )
    );
    if (!parent) {
      return;
    }
    if (parent.level === "subject" || parent.level === "course") {
      return { group: current, parent };
    }
    current = parent;
  }
}

/** Adds complete source-owned material presentation context to every leaf. */
export const addMaterialContext = Effect.fn("AksaraCorpus.addMaterialContext")(
  function* (routes: readonly CurriculumRouteDraft[]) {
    const routeByPath = HashMap.fromIterable(
      Arr.map(routes, (route): [string, CurriculumRouteDraft] => [
        `${route.programKey}\0${route.appLocale}\0${route.publicPath}`,
        route,
      ])
    );
    const contextualRoutes = MutableList.make<CurriculumRoute>();
    for (const route of routes) {
      if (!route.materialKey) {
        MutableList.append(contextualRoutes, route);
        continue;
      }
      const context = findMaterialContext(route, routeByPath);
      if (!context) {
        return yield* new CurriculumContextError({
          nodeKey: route.nodeKey,
          programKey: route.programKey,
        });
      }
      MutableList.append(
        contextualRoutes,
        CurriculumRouteSchema.make({
          ...route,
          materialContextNodeKey: CurriculumNodeKeySchema.make(
            context.group.nodeKey
          ),
          materialContextParentPath: context.parent.publicPath,
          materialContextPublicPath: context.group.publicPath,
        })
      );
    }
    return MutableList.toArray(contextualRoutes);
  }
);
