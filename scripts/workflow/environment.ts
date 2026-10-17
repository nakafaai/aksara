import { Array as Arr, Effect, HashMap, HashSet, Option } from "effect";
import type { YAMLMap } from "yaml";
import {
  ensure,
  mapValue,
  requireMap,
  requireText,
  scalarText,
} from "#scripts/workflow/requirement";

const TOOLCHAIN_ENV_NAMES = HashSet.make("NODE_VERSION", "PNPM_VERSION");
const ENVIRONMENT_ALIAS_PATTERNS = [
  /\$\{\{\s*env\.([A-Za-z_][A-Za-z0-9_]*)\s*\}\}/gu,
  /\$(?:\{([A-Za-z_][A-Za-z0-9_]*)\}|([A-Za-z_][A-Za-z0-9_]*))/gu,
] as const;

/** Returns the environment entry that one YAML pair declares, or none when its value is not text. */
const environmentEntry = Effect.fn("AksaraScripts.workflowEnvironmentEntry")(
  function* (item: YAMLMap["items"][number]) {
    const name = yield* requireText(
      item.key,
      "Workflow environment names must be strings"
    );
    yield* ensure(
      !HashSet.has(TOOLCHAIN_ENV_NAMES, name),
      "Workflows must not duplicate Node or pnpm versions"
    );

    const value = scalarText(item.value);
    return value === undefined
      ? Option.none<readonly [string, string]>()
      : Option.some<readonly [string, string]>([name, value]);
  }
);

/** Returns environment values declared by one workflow scope. */
export const environmentValues = Effect.fn("AksaraScripts.workflowEnvironment")(
  function* (scope: YAMLMap) {
    const environment = mapValue(scope, "env");
    if (environment === undefined) {
      return HashMap.empty<string, string>();
    }

    const variables = yield* requireMap(
      environment,
      "Workflow environment must be a mapping"
    );
    const entries = yield* Effect.forEach(variables.items, environmentEntry);
    return HashMap.fromIterable(Arr.getSomes(entries));
  }
);

/** Merges inherited and local workflow environment values. */
export function mergeEnvironment(
  inherited: HashMap.HashMap<string, string>,
  local: HashMap.HashMap<string, string>
): HashMap.HashMap<string, string> {
  return HashMap.union(inherited, local);
}

/** Reports whether one shell command executes pnpm through an environment alias. */
export function usesPnpmAlias(
  command: string,
  environment: HashMap.HashMap<string, string>
): boolean {
  for (const pattern of ENVIRONMENT_ALIAS_PATTERNS) {
    for (const match of command.matchAll(pattern)) {
      const name = match[1] ?? match[2];
      if (
        name !== undefined &&
        Option.contains(HashMap.get(environment, name), "pnpm")
      ) {
        return true;
      }
    }
  }

  return false;
}
