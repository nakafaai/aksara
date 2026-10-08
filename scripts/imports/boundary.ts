import { TypeScriptParser } from "@nakafa/aksara-utilities/typescript/parse";
import { Array as Arr, Effect, HashSet } from "effect";
import {
  exposedModuleBindings,
  moduleSpecifiers,
} from "#scripts/imports/syntax";
import type { WorkspaceIdentityResolver } from "#scripts/imports/workspace";

const RELATIVE_IMPORT_PATTERN = /^\.{1,2}(?:\/|$)/u;
const FILESYSTEM_IMPORT_PATTERN = /^(?:\/|file:|packages\/)/u;
const VITEST_CONFIG_PATTERN = /\/vitest\.config\.ts$/u;
const TEST_MODULE_PATTERN = /(?:^|\/)(?:test\/.*|[^/]+\.test\.ts)$/u;
const WORKSPACE_SCRIPT_PATTERN = /^(?:apps|packages)\/[^/]+\/scripts\//u;
const TESTING_PACKAGE = "@nakafa/testing";

/** Reports one module specifier that crosses an Aksara import boundary. */
const importViolation = Effect.fn("AksaraPolicy.importViolation")(function* (
  file: string,
  specifier: string,
  resolveIdentity: WorkspaceIdentityResolver
) {
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

  const identity = yield* resolveIdentity(file);
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
});

/** Collects stable file and line diagnostics for invalid module imports. */
export const importViolations = Effect.fn("AksaraPolicy.imports")(function* (
  file: string,
  sourceText: string,
  resolveIdentity: WorkspaceIdentityResolver
) {
  const parser = yield* TypeScriptParser;
  const { specifiers, viBindings } = yield* parser.inspect(
    { fileName: file, source: sourceText },
    ({ sourceFile }) => ({
      specifiers: Arr.map(moduleSpecifiers(sourceFile), (specifier) => ({
        line:
          sourceFile.getLineAndCharacterOfPosition(specifier.getStart()).line +
          1,
        text: specifier.text,
      })),
      viBindings: Arr.map(
        exposedModuleBindings(sourceFile, "@effect/vitest", "vi"),
        (specifier) =>
          sourceFile.getLineAndCharacterOfPosition(specifier.getStart()).line +
          1
      ),
    })
  );
  const moduleViolations = yield* Effect.forEach(specifiers, (specifier) =>
    importViolation(file, specifier.text, resolveIdentity).pipe(
      Effect.map((violation) =>
        violation === undefined
          ? []
          : [`${file}:${specifier.line} ${specifier.text}: ${violation}`]
      )
    )
  );
  return [
    ...Arr.flatten(moduleViolations),
    ...Arr.map(
      viBindings,
      (line) =>
        `${file}:${line} @effect/vitest#vi: use the configured global vi for mocks`
    ),
  ];
});
