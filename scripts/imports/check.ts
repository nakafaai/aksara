import { readFileSync } from "node:fs";
import { isObject } from "effect/Predicate";
import ts from "typescript";
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

const WORKSPACE_SOURCE_PATTERN = /^(apps|packages)\/([^/]+)\//u;
const RELATIVE_IMPORT_PATTERN = /^\.{1,2}(?:\/|$)/u;
const FILESYSTEM_IMPORT_PATTERN = /^(?:\/|file:|packages\/)/u;
const IMPORT_WILDCARD_PATTERN = /\*$/u;
const VITEST_CONFIG_PATTERN = /\/vitest\.config\.ts$/u;
const TEST_MODULE_PATTERN = /(?:^|\/)(?:test\/.*|[^/]+\.test\.ts)$/u;
const WORKSPACE_MANIFEST_PATTERN = /^(?:apps|packages)\/[^/]+\/package\.json$/u;
const TESTING_PACKAGE = "@nakafa/testing";

interface WorkspaceIdentity {
  readonly allowedDependencies: ReadonlySet<string>;
  readonly developmentDependencies: ReadonlySet<string>;
  readonly privatePrefixes: readonly string[];
  readonly publicName: string;
  readonly runtimeDependencies: ReadonlySet<string>;
}

type WorkspaceIdentityResolver = (
  file: string
) => WorkspaceIdentity | undefined;

const allowedWorkspaceDependencies: ReadonlyMap<
  string,
  ReadonlySet<string>
> = new Map([
  [
    "cli",
    new Set([
      "@nakafa/aksara-compiler",
      "@nakafa/aksara-contracts",
      "@nakafa/aksara-corpus",
      "@nakafa/aksara-publisher",
      "@nakafa/aksara-utilities",
    ]),
  ],
  ["compiler", new Set(["@nakafa/aksara-contracts"])],
  ["contracts", new Set()],
  ["corpus", new Set(["@nakafa/aksara-contracts", "@nakafa/aksara-utilities"])],
  [
    "publisher",
    new Set([
      "@nakafa/aksara-compiler",
      "@nakafa/aksara-contracts",
      "@nakafa/aksara-corpus",
      "@nakafa/aksara-utilities",
    ]),
  ],
  ["testing", new Set()],
  ["utilities", new Set()],
]);

/** Returns declared package names from one manifest dependency section. */
function dependencyNames(input: unknown): readonly string[] {
  return isObject(input) ? Object.keys(input) : [];
}

/** Creates one cached workspace identity resolver from package manifests. */
export function createWorkspaceIdentityResolver(
  readManifest: (path: string) => string
): WorkspaceIdentityResolver {
  const identities = new Map<string, WorkspaceIdentity>();
  return (file) => {
    const match = WORKSPACE_SOURCE_PATTERN.exec(file);
    const workspaceRoot = match?.[1];
    const workspace = match?.[2];
    if (!workspace || workspace === "typescript-config") {
      return;
    }
    const cached = identities.get(workspace);
    if (cached) {
      return cached;
    }
    const manifest: unknown = JSON.parse(
      readManifest(`${workspaceRoot}/${workspace}/package.json`)
    );
    if (!isObject(manifest) || typeof manifest.name !== "string") {
      throw new Error(
        `${workspaceRoot}/${workspace}/package.json has no package name`
      );
    }
    const allowedDependencies = allowedWorkspaceDependencies.get(workspace);
    if (!allowedDependencies) {
      throw new Error(
        `${workspaceRoot}/${workspace} has no import-boundary policy`
      );
    }
    const imports = isObject(manifest.imports)
      ? Object.keys(manifest.imports)
      : [];
    const identity = {
      allowedDependencies,
      developmentDependencies: new Set(
        dependencyNames(manifest.devDependencies)
      ),
      privatePrefixes: imports
        .filter((specifier) => specifier.startsWith("#"))
        .map((specifier) => specifier.replace(IMPORT_WILDCARD_PATTERN, "")),
      publicName: manifest.name,
      runtimeDependencies: new Set(dependencyNames(manifest.dependencies)),
    } satisfies WorkspaceIdentity;
    identities.set(workspace, identity);
    return identity;
  };
}

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
    !identity.privatePrefixes.some((prefix) => specifier.startsWith(prefix))
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
  const packageName = specifier.split("/").slice(0, 2).join("/");
  if (
    packageName === TESTING_PACKAGE &&
    (VITEST_CONFIG_PATTERN.test(file) || TEST_MODULE_PATTERN.test(file))
  ) {
    return identity.developmentDependencies.has(packageName)
      ? undefined
      : "test dependency is absent from package devDependencies";
  }
  if (!identity.allowedDependencies.has(packageName)) {
    return "workspace dependency violates the architecture graph";
  }
  if (!identity.runtimeDependencies.has(packageName)) {
    return "workspace dependency is absent from package dependencies";
  }
}

/** Collects stable file and line diagnostics for invalid module imports. */
export function importViolations(
  file: string,
  sourceText: string,
  resolveIdentity: WorkspaceIdentityResolver
): readonly string[] {
  const sourceFile = ts.createSourceFile(
    file,
    sourceText,
    ts.ScriptTarget.Latest,
    true
  );

  const moduleViolations = moduleSpecifiers(sourceFile).flatMap((specifier) => {
    const violation = importViolation(file, specifier.text, resolveIdentity);
    if (!violation) {
      return [];
    }
    const line =
      sourceFile.getLineAndCharacterOfPosition(specifier.getStart()).line + 1;
    return [`${file}:${line} ${specifier.text}: ${violation}`];
  });
  const viImportViolations = exposedModuleBindings(
    sourceFile,
    "@effect/vitest",
    "vi"
  ).map((specifier) => {
    const line =
      sourceFile.getLineAndCharacterOfPosition(specifier.getStart()).line + 1;
    return `${file}:${line} @effect/vitest#vi: use the configured global vi for mocks`;
  });

  return [...moduleViolations, ...viImportViolations];
}

const repositoryIdentity = createWorkspaceIdentityResolver((path) =>
  readFileSync(path, "utf8")
);
enforceViolations(
  "TypeScript imports must respect workspace aliases",
  typescriptFiles().flatMap((file) =>
    importViolations(file, readFileSync(file, "utf8"), repositoryIdentity)
  )
);
enforceViolations(
  "Effect tests must use native Effect Vitest execution",
  typescriptFiles().flatMap((file) =>
    effectTestViolations(file, readFileSync(file, "utf8"))
  )
);
const workspaceSourceCondition = sourceConditionFromConfig(
  readFileSync("packages/typescript-config/base.json", "utf8")
);
enforceViolations(
  "Workspace source conditions must resolve before generated output",
  trackedFiles()
    .filter((file) => WORKSPACE_MANIFEST_PATTERN.test(file))
    .flatMap((file) =>
      sourceConditionViolations(
        file,
        readFileSync(file, "utf8"),
        workspaceSourceCondition
      )
    )
);
