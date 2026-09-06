import { readFileSync } from "node:fs";
import { relative, resolve } from "node:path";
import { Effect, Schema } from "effect";
import { computeLineStarts } from "typescript/unstable/ast";
import { API } from "typescript/unstable/sync";

import {
  enforceViolations,
  trackedFiles,
  typescriptFiles,
} from "#scripts/check/files";

const PROJECT_CONFIG_PATTERN =
  /^(?:tsconfig\.json|(?:apps|packages)\/[^/]+\/tsconfig\.json)$/u;

/** Lists root and workspace TypeScript project contracts from tracked files. */
export function projectConfigPaths(files: readonly string[]) {
  return files.filter((file) => PROJECT_CONFIG_PATTERN.test(file)).sort();
}

/** Native project loading or diagnostic collection failed. */
export class TypeScriptProjectError extends Schema.TaggedError<TypeScriptProjectError>()(
  "TypeScriptProjectError",
  { cause: Schema.Unknown, configPath: Schema.String }
) {}

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
  return yield* Effect.try({
    catch: failure,
    try: () => {
      const configDiagnostics =
        project.program.getConfigFileParsingDiagnostics();
      const diagnostics =
        configDiagnostics.length > 0
          ? configDiagnostics
          : project.rootFiles.flatMap((file) =>
              project.program
                .getSuggestionDiagnostics(file)
                .filter((diagnostic) => diagnostic.reportsDeprecated === true)
            );
      return {
        fileNames: project.rootFiles,
        violations: diagnostics.map((diagnostic) => {
          const message = `TS${diagnostic.code} ${diagnostic.text}`;
          if (diagnostic.fileName === undefined) {
            return message;
          }
          const source = readFileSync(diagnostic.fileName, "utf8");
          let line = 0;
          let character = diagnostic.pos + 1;
          for (const offset of computeLineStarts(source)) {
            if (offset > diagnostic.pos) {
              break;
            }
            line += 1;
            character = diagnostic.pos - offset + 1;
          }
          return `${relative(repositoryRoot, diagnostic.fileName)}:${line}:${character} ${message}`;
        }),
      };
    },
  });
}, Effect.scoped);

/** Reports authored TypeScript files absent from every audited project. */
export function uncoveredTypeScriptViolations(
  authoredFiles: readonly string[],
  projectFiles: readonly string[],
  repositoryRoot: string
) {
  const coveredFiles = new Set(
    projectFiles.map((file) => resolve(repositoryRoot, file))
  );
  return authoredFiles.flatMap((file) => {
    if (coveredFiles.has(resolve(repositoryRoot, file))) {
      return [];
    }

    return [`${file}: not included by an audited tsconfig.json`];
  });
}

const currentRoot = process.cwd();
const repositoryFiles = trackedFiles();
const projectAudits = await Effect.runPromise(
  Effect.forEach(projectConfigPaths(repositoryFiles), (configPath) =>
    auditProjectDeprecations(resolve(currentRoot, configPath), currentRoot)
  )
);
const violations = [
  ...new Set([
    ...uncoveredTypeScriptViolations(
      typescriptFiles(repositoryFiles),
      projectAudits.flatMap(({ fileNames }) => fileNames),
      currentRoot
    ),
    ...projectAudits.flatMap(
      ({ violations: projectViolations }) => projectViolations
    ),
  ]),
];
enforceViolations("TypeScript APIs must not be deprecated", violations);
