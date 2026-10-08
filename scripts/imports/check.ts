import { NodeRuntime, NodeServices } from "@effect/platform-node";
import {
  TypeScriptParser,
  TypeScriptSourceError,
} from "@nakafa/aksara-utilities/typescript/parse";
import {
  Array as Arr,
  Effect,
  FileSystem,
  HashMap,
  HashSet,
  Layer,
  Option,
} from "effect";
import {
  enforceViolations,
  trackedFiles,
  typescriptFiles,
} from "#scripts/check/files";
import {
  sourceConditionFromConfig,
  sourceConditionViolations,
} from "#scripts/imports/conditions";
import { effectTestViolations } from "#scripts/imports/effect";
import {
  exposedModuleBindings,
  moduleSpecifiers,
} from "#scripts/imports/syntax";
import {
  createWorkspaceIdentityResolver,
  type WorkspaceIdentityResolver,
} from "#scripts/imports/workspace";

const RELATIVE_IMPORT_PATTERN = /^\.{1,2}(?:\/|$)/u;
const FILESYSTEM_IMPORT_PATTERN = /^(?:\/|file:|packages\/)/u;
const VITEST_CONFIG_PATTERN = /\/vitest\.config\.ts$/u;
const TEST_MODULE_PATTERN = /(?:^|\/)(?:test\/.*|[^/]+\.test\.ts)$/u;
const WORKSPACE_MANIFEST_PATTERN = /^(?:apps|packages)\/[^/]+\/package\.json$/u;
const WORKSPACE_SCRIPT_PATTERN = /^(?:apps|packages)\/[^/]+\/scripts\//u;
const TESTING_PACKAGE = "@nakafa/testing";

/** Reports one module specifier that crosses an Aksara import boundary. */
function importViolation(
  file: string,
  specifier: string,
  resolveIdentity: WorkspaceIdentityResolver
): string | undefined {
  if (
    specifier === "vitest" ||
    (specifier.startsWith("vitest/") && specifier !== "vitest/config")
  ) {
    return "test APIs must come from @effect/vitest";
  }
  if (
    RELATIVE_IMPORT_PATTERN.test(specifier) ||
    FILESYSTEM_IMPORT_PATTERN.test(specifier)
  ) {
    return "relative or filesystem module import";
  }

  const identity = resolveIdentity(file);
  if (!identity) {
    return;
  }
  if (
    specifier.startsWith("#") &&
    !Arr.some(identity.privatePrefixes, (prefix) =>
      specifier.startsWith(prefix)
    )
  ) {
    return "private alias owned by another workspace";
  }
  if (
    specifier === identity.publicName ||
    specifier.startsWith(`${identity.publicName}/`)
  ) {
    return "self-import through public package export";
  }
  if (!specifier.startsWith("@nakafa/")) {
    return;
  }
  const packageName = Arr.join(specifier.split("/").slice(0, 2), "/");
  if (
    WORKSPACE_SCRIPT_PATTERN.test(file) &&
    HashSet.has(identity.developmentDependencies, packageName)
  ) {
    return;
  }
  if (
    packageName === TESTING_PACKAGE &&
    (VITEST_CONFIG_PATTERN.test(file) || TEST_MODULE_PATTERN.test(file))
  ) {
    return HashSet.has(identity.developmentDependencies, packageName)
      ? undefined
      : "test dependency is absent from package devDependencies";
  }
  if (!HashSet.has(identity.allowedDependencies, packageName)) {
    return "workspace dependency violates the architecture graph";
  }
  if (!HashSet.has(identity.runtimeDependencies, packageName)) {
    return "workspace dependency is absent from package dependencies";
  }
}

/** Collects stable file and line diagnostics for invalid module imports. */
export const importViolations = Effect.fn("AksaraPolicy.imports")(function* (
  file: string,
  sourceText: string,
  resolveIdentity: WorkspaceIdentityResolver
) {
  const parser = yield* TypeScriptParser;
  return yield* parser.inspect(
    { fileName: file, source: sourceText },
    ({ sourceFile }) => {
      const moduleViolations = Arr.flatMap(
        moduleSpecifiers(sourceFile),
        (specifier) => {
          const violation = importViolation(
            file,
            specifier.text,
            resolveIdentity
          );
          if (!violation) {
            return [];
          }
          const line =
            sourceFile.getLineAndCharacterOfPosition(specifier.getStart())
              .line + 1;
          return [`${file}:${line} ${specifier.text}: ${violation}`];
        }
      );
      const viImportViolations = Arr.map(
        exposedModuleBindings(sourceFile, "@effect/vitest", "vi"),
        (specifier) => {
          const line =
            sourceFile.getLineAndCharacterOfPosition(specifier.getStart())
              .line + 1;
          return `${file}:${line} @effect/vitest#vi: use the configured global vi for mocks`;
        }
      );

      return [...moduleViolations, ...viImportViolations];
    }
  );
});

/** Reads one repository file as UTF-8 text through the Node file system service. */
const readText = Effect.fn("AksaraPolicy.readText")(function* (path: string) {
  const fileSystem = yield* FileSystem.FileSystem;
  return yield* fileSystem.readFileString(path);
});

/** Reads one authored TypeScript module, reporting a missing module as a source error. */
const readTypescriptSource = Effect.fn("AksaraPolicy.readSource")(function* (
  file: string
) {
  return yield* readText(file).pipe(
    Effect.mapError(
      (cause) => new TypeScriptSourceError({ cause, fileName: file })
    )
  );
});

/** Runs every repository import, test, and source-condition policy and reports each group. */
const checkRepository = Effect.gen(function* () {
  const sources = yield* Effect.forEach(typescriptFiles(), (file) =>
    readTypescriptSource(file).pipe(Effect.map((text) => ({ file, text })))
  );
  const manifests = yield* Effect.forEach(
    Arr.filter(trackedFiles(), (file) => WORKSPACE_MANIFEST_PATTERN.test(file)),
    (file) =>
      readText(file).pipe(
        Effect.map((text): readonly [string, string] => [file, text])
      )
  );
  const manifestTexts = HashMap.fromIterable(manifests);
  const repositoryIdentity = createWorkspaceIdentityResolver((path) =>
    Option.getOrThrow(HashMap.get(manifestTexts, path))
  );
  const results = yield* Effect.forEach(sources, ({ file, text }) =>
    Effect.gen(function* () {
      return {
        imports: yield* importViolations(file, text, repositoryIdentity),
        tests: yield* effectTestViolations(file, text),
      };
    })
  );
  enforceViolations(
    "TypeScript imports must respect workspace aliases",
    Arr.flatMap(results, (result) => result.imports)
  );
  enforceViolations(
    "Effect tests must use native Effect Vitest execution",
    Arr.flatMap(results, (result) => result.tests)
  );
  const workspaceSourceCondition = sourceConditionFromConfig(
    yield* readText("packages/typescript-config/base.json")
  );
  enforceViolations(
    "Workspace source conditions must resolve before generated output",
    Arr.flatMap(manifests, ([file, text]) =>
      sourceConditionViolations(file, text, workspaceSourceCondition)
    )
  );
}).pipe(
  Effect.provide(Layer.mergeAll(NodeServices.layer, TypeScriptParser.layer))
);

NodeRuntime.runMain(checkRepository);
