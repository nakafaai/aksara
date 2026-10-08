import {
  Array as Arr,
  Effect,
  FileSystem,
  HashSet,
  Order,
  Path,
  Schema,
} from "effect";
import { computeLineStarts } from "typescript/unstable/ast";
import { API, type Diagnostic } from "typescript/unstable/sync";

import {
  enforceViolations,
  trackedFiles,
  typescriptFiles,
} from "#scripts/check/files";
import { runEntry } from "#scripts/entry";

const PROJECT_CONFIG_PATTERN =
  /^(?:tsconfig\.json|(?:apps|packages)\/[^/]+\/tsconfig\.json)$/u;

/** Lists root and workspace TypeScript project contracts from tracked files. */
export function projectConfigPaths(files: readonly string[]) {
  return Arr.sort(
    Arr.filter(files, (file) => PROJECT_CONFIG_PATTERN.test(file)),
    Order.String
  );
}

/** Native project loading or diagnostic collection failed. */
export class TypeScriptProjectError extends Schema.TaggedError<TypeScriptProjectError>()(
  "TypeScriptProjectError",
  { cause: Schema.Unknown, configPath: Schema.String }
) {}

/** Renders one native diagnostic as a repository-relative policy violation. */
const diagnosticViolation = Effect.fn("AksaraPolicy.diagnosticViolation")(
  function* (repositoryRoot: string, diagnostic: Diagnostic) {
    const message = `TS${diagnostic.code} ${diagnostic.text}`;
    if (diagnostic.fileName === undefined) {
      return message;
    }
    const fileSystem = yield* FileSystem.FileSystem;
    const path = yield* Path.Path;
    const source = yield* fileSystem.readFileString(diagnostic.fileName);
    let line = 0;
    let character = diagnostic.pos + 1;
    for (const offset of computeLineStarts(source)) {
      if (offset > diagnostic.pos) {
        break;
      }
      line += 1;
      character = diagnostic.pos - offset + 1;
    }
    return `${path.relative(repositoryRoot, diagnostic.fileName)}:${line}:${character} ${message}`;
  }
);

/** Audits exact native project roots while preserving configuration failures. */
export const auditProjectDeprecations = Effect.fn(
  "AksaraPolicy.projectDeprecations"
)(function* (configPath: string, repositoryRoot: string) {
  /** Preserves a native or source-read failure at its project boundary. */
  const failure = (cause: unknown) =>
    new TypeScriptProjectError({ cause, configPath });
  const api = yield* Effect.acquireRelease(
    Effect.try({ catch: failure, try: () => new API({ cwd: repositoryRoot }) }),
    (resource) => Effect.sync(() => resource.close())
  );
  const snapshot = yield* Effect.acquireRelease(
    Effect.try({
      catch: failure,
      try: () => api.updateSnapshot({ openProjects: [configPath] }),
    }),
    (resource) => Effect.sync(() => resource.dispose())
  );
  const project = yield* Effect.try({
    catch: failure,
    try: () => snapshot.getProject(configPath),
  });
  if (project === undefined) {
    return yield* failure("The native TypeScript project could not be opened.");
  }
  const diagnostics = yield* Effect.try({
    catch: failure,
    try: () => {
      const configDiagnostics =
        project.program.getConfigFileParsingDiagnostics();
      if (configDiagnostics.length > 0) {
        return configDiagnostics;
      }
      return Arr.flatMap(project.rootFiles, (file) =>
        Arr.filter(
          project.program.getSuggestionDiagnostics(file),
          (diagnostic) => diagnostic.reportsDeprecated === true
        )
      );
    },
  });
  const violations = yield* Effect.forEach(diagnostics, (diagnostic) =>
    diagnosticViolation(repositoryRoot, diagnostic).pipe(
      Effect.mapError(failure)
    )
  );
  return { fileNames: project.rootFiles, violations };
}, Effect.scoped);

/** Reports authored TypeScript files absent from every audited project. */
export const uncoveredTypeScriptViolations = Effect.fn(
  "AksaraPolicy.uncoveredTypeScript"
)(function* (
  authoredFiles: readonly string[],
  projectFiles: readonly string[],
  repositoryRoot: string
) {
  const path = yield* Path.Path;
  const coveredFiles = HashSet.fromIterable(
    Arr.map(projectFiles, (file) => path.resolve(repositoryRoot, file))
  );
  return Arr.flatMap(authoredFiles, (file) => {
    if (HashSet.has(coveredFiles, path.resolve(repositoryRoot, file))) {
      return [];
    }

    return [`${file}: not included by an audited tsconfig.json`];
  });
});

/** Audits every project in the repository and reports deprecated API use. */
export const deprecationReport = Effect.fn("AksaraPolicy.deprecationReport")(
  function* (repositoryFiles: readonly string[], currentRoot: string) {
    const path = yield* Path.Path;
    const projectAudits = yield* Effect.forEach(
      projectConfigPaths(repositoryFiles),
      (configPath) =>
        auditProjectDeprecations(
          path.resolve(currentRoot, configPath),
          currentRoot
        )
    );
    const uncovered = yield* uncoveredTypeScriptViolations(
      typescriptFiles(repositoryFiles),
      Arr.flatMap(projectAudits, ({ fileNames }) => fileNames),
      currentRoot
    );
    const violations = Arr.dedupe([
      ...uncovered,
      ...Arr.flatMap(projectAudits, ({ violations: found }) => found),
    ]);
    enforceViolations("TypeScript APIs must not be deprecated", violations);
  }
);

runEntry(import.meta.main, deprecationReport(trackedFiles(), process.cwd()));
