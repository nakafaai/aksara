import { posix } from "node:path";
import { Effect } from "effect";
import type { Program } from "estree-jsx";
import { nameRelativeComponents } from "#compiler/normalize/names";
import {
  type NormalizeMdxImportsInput,
  type RelativeComponentModule,
  rejectImport,
} from "#compiler/normalize/spec";

const DESIGN_SOURCE_PREFIX = "@repo/design-system/components/";
const COMPONENT_PATTERN = /^[A-Z][A-Za-z0-9]*$/u;

/** One imported local binding and its final renderer contract identity. */
export interface ImportBinding {
  readonly contractName: string;
  readonly localName: string;
  readonly relative: boolean;
}

/** Validated lookup indexes shared by every import in one MDX document. */
export interface ModuleContracts {
  readonly approved: ReadonlyMap<string, ReadonlySet<string>>;
  readonly names: ReadonlyMap<string, string>;
  readonly relative: ReadonlyMap<string, RelativeComponentModule>;
}

/** Validates and indexes the source-revision component contracts once. */
export const createModuleContracts = Effect.fn(
  "AksaraCompiler.createModuleContracts"
)(function* (input: NormalizeMdxImportsInput) {
  const approved = new Map<string, ReadonlySet<string>>();
  const approvedNames = new Set<string>();
  for (const entry of input.approvedImports) {
    if (
      !entry.source.startsWith(DESIGN_SOURCE_PREFIX) ||
      approved.has(entry.source) ||
      entry.components.length === 0 ||
      entry.components.some((name) => !COMPONENT_PATTERN.test(name)) ||
      new Set(entry.components).size !== entry.components.length ||
      entry.components.some((name) => approvedNames.has(name))
    ) {
      return yield* rejectImport(input.sourcePath, "contract", {
        importSource: entry.source,
      });
    }
    approved.set(entry.source, new Set(entry.components));
    for (const componentName of entry.components) {
      approvedNames.add(componentName);
    }
  }
  const relative = new Map<string, RelativeComponentModule>();
  for (const module of input.relativeModules) {
    if (
      relative.has(module.sourcePath) ||
      module.exports.length === 0 ||
      module.exports.some(
        ({ componentName, exportName }) =>
          (exportName !== "default" && exportName !== componentName) ||
          !COMPONENT_PATTERN.test(componentName)
      )
    ) {
      return yield* rejectImport(input.sourcePath, "contract", {
        importSource: module.sourcePath,
      });
    }
    relative.set(module.sourcePath, module);
  }
  const identities = input.relativeModules.flatMap((module) =>
    module.exports.map(({ componentName }) => ({
      componentName,
      rendererDomain: module.rendererDomain,
      sourcePath: module.sourcePath,
    }))
  );
  const named = yield* nameRelativeComponents(identities);
  const names = new Map(
    named.map((component) => [
      `${component.sourcePath}#${component.componentName}`,
      component.contractName,
    ])
  );
  return { approved, names, relative } satisfies ModuleContracts;
});

/** Resolves one lexical relative specifier against the exact module inventory. */
function resolveRelativeModule(
  input: NormalizeMdxImportsInput,
  contracts: ModuleContracts,
  importSource: string
) {
  const resolved = posix.normalize(
    posix.join(posix.dirname(input.sourcePath), importSource)
  );
  if (
    posix.isAbsolute(importSource) ||
    importSource.includes("\\") ||
    !(
      resolved === input.sourceRoot ||
      resolved.startsWith(`${input.sourceRoot}/`)
    )
  ) {
    return Effect.fail(
      rejectImport(input.sourcePath, "escaping", { importSource })
    );
  }
  const candidates = posix.extname(resolved)
    ? [resolved]
    : [`${resolved}.tsx`, posix.join(resolved, "index.tsx")];
  const matches = candidates.flatMap((candidate) => {
    const module = contracts.relative.get(candidate);
    return module ? [module] : [];
  });
  const [matched] = matches;
  if (matched && matches.length === 1) {
    return Effect.succeed(matched);
  }
  return Effect.fail(
    rejectImport(
      input.sourcePath,
      matches.length > 1 ? "contract" : "unresolved",
      { importSource }
    )
  );
}

type ImportDeclaration = Extract<
  Program["body"][number],
  { type: "ImportDeclaration" }
>;

type ImportSpecifier = ImportDeclaration["specifiers"][number];

/** Returns the exported component name without accepting local aliases. */
function importedComponentName(specifier: ImportSpecifier) {
  if (specifier.type === "ImportDefaultSpecifier") {
    return "default";
  }
  if (
    specifier.type === "ImportSpecifier" &&
    specifier.imported.type === "Identifier"
  ) {
    return specifier.imported.name;
  }
}

/** Resolves one reviewed specifier within an already selected module. */
const resolveSpecifier = Effect.fn("AksaraCompiler.resolveImportSpecifier")(
  function* (
    input: NormalizeMdxImportsInput,
    contracts: ModuleContracts,
    specifier: ImportSpecifier,
    importSource: string,
    relativeModule: RelativeComponentModule | undefined,
    approvedComponents: ReadonlySet<string> | undefined
  ) {
    if (specifier.type === "ImportNamespaceSpecifier") {
      return yield* rejectImport(input.sourcePath, "namespace", {
        importSource,
      });
    }
    const importedName = importedComponentName(specifier);
    if (importedName === undefined) {
      return yield* rejectImport(input.sourcePath, "alias", {
        binding: specifier.local.name,
        importSource,
      });
    }
    const exported = relativeModule?.exports.find(
      ({ exportName }) => exportName === importedName
    );
    if (relativeModule && !exported) {
      return yield* rejectImport(input.sourcePath, "unknown-component", {
        binding: specifier.local.name,
        importSource,
      });
    }
    if (!(relativeModule || approvedComponents?.has(importedName))) {
      return yield* rejectImport(input.sourcePath, "unknown-component", {
        binding: specifier.local.name,
        importSource,
      });
    }
    const componentName = exported?.componentName ?? importedName;
    if (specifier.local.name !== componentName) {
      return yield* rejectImport(input.sourcePath, "alias", {
        binding: specifier.local.name,
        importSource,
      });
    }
    const contractName = relativeModule
      ? contracts.names.get(`${relativeModule.sourcePath}#${componentName}`)
      : componentName;
    if (!contractName) {
      return yield* rejectImport(input.sourcePath, "contract", {
        binding: componentName,
        importSource,
      });
    }
    return {
      contractName,
      localName: specifier.local.name,
      relative: relativeModule !== undefined,
    } satisfies ImportBinding;
  }
);

/** Resolves one import declaration into exact renderer component bindings. */
export const resolveComponentImport = Effect.fn(
  "AksaraCompiler.resolveComponentImport"
)(function* (
  input: NormalizeMdxImportsInput,
  contracts: ModuleContracts,
  statement: ImportDeclaration
) {
  const importSource = statement.source.value;
  if (typeof importSource !== "string") {
    return yield* rejectImport(input.sourcePath, "unknown-module");
  }
  if (statement.specifiers.length === 0) {
    return yield* rejectImport(input.sourcePath, "side-effect", {
      importSource,
    });
  }
  const isRelative =
    importSource.startsWith("./") || importSource.startsWith("../");
  const relativeModule = isRelative
    ? yield* resolveRelativeModule(input, contracts, importSource)
    : undefined;
  const approvedComponents = isRelative
    ? undefined
    : contracts.approved.get(importSource);
  if (!(relativeModule || approvedComponents)) {
    return yield* rejectImport(input.sourcePath, "unknown-module", {
      importSource,
    });
  }
  return yield* Effect.forEach(statement.specifiers, (specifier) =>
    resolveSpecifier(
      input,
      contracts,
      specifier,
      importSource,
      relativeModule,
      approvedComponents
    )
  );
});
