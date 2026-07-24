import { dirname, relative, resolve } from "node:path";
import ts from "typescript";

import {
  enforceViolations,
  trackedFiles,
  typescriptFiles,
} from "#scripts/files";

const PROJECT_CONFIG_PATTERN =
  /^(?:tsconfig\.json|(?:apps|packages)\/[^/]+\/tsconfig\.json)$/u;

/** Lists root and workspace TypeScript project contracts from tracked files. */
export function projectConfigPaths(files: readonly string[]) {
  return files.filter((file) => PROJECT_CONFIG_PATTERN.test(file)).sort();
}

/** Formats one TypeScript diagnostic relative to its repository root. */
function formatDiagnostic(diagnostic: ts.Diagnostic, repositoryRoot: string) {
  const message = ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n");
  if (diagnostic.file === undefined || diagnostic.start === undefined) {
    return `TS${diagnostic.code} ${message}`;
  }

  const position = diagnostic.file.getLineAndCharacterOfPosition(
    diagnostic.start
  );
  const sourcePath = relative(repositoryRoot, diagnostic.file.fileName);
  return `${sourcePath}:${position.line + 1}:${position.character + 1} TS${
    diagnostic.code
  } ${message}`;
}

/** Reports deprecated API usage from one resolved TypeScript language service. */
function deprecatedViolations(
  languageService: ts.LanguageService,
  fileNames: readonly string[],
  repositoryRoot: string
) {
  return fileNames.flatMap((fileName) =>
    languageService
      .getSuggestionDiagnostics(fileName)
      .filter((diagnostic) => diagnostic.reportsDeprecated !== undefined)
      .map((diagnostic) => formatDiagnostic(diagnostic, repositoryRoot))
  );
}

/** Reads one TypeScript source snapshot while preserving missing-file absence. */
export function readScriptSnapshot(fileName: string) {
  const source = ts.sys.readFile(fileName);
  if (source === undefined) {
    return;
  }

  return ts.ScriptSnapshot.fromString(source);
}

/** Creates and audits one TypeScript project without suppressing config errors. */
export function auditProjectDeprecations(
  configPath: string,
  repositoryRoot: string
) {
  const configDiagnostics: ts.Diagnostic[] = [];
  const parsed = ts.getParsedCommandLineOfConfigFile(
    configPath,
    {},
    {
      ...ts.sys,
      onUnRecoverableConfigFileDiagnostic: (diagnostic) => {
        configDiagnostics.push(diagnostic);
      },
    }
  );
  if (parsed === undefined) {
    return {
      fileNames: [],
      violations: configDiagnostics.map((diagnostic) =>
        formatDiagnostic(diagnostic, repositoryRoot)
      ),
    };
  }

  const parseDiagnostics = [...configDiagnostics, ...parsed.errors];
  if (parseDiagnostics.length > 0) {
    return {
      fileNames: parsed.fileNames,
      violations: parseDiagnostics.map((diagnostic) =>
        formatDiagnostic(diagnostic, repositoryRoot)
      ),
    };
  }

  const languageService = ts.createLanguageService({
    fileExists: ts.sys.fileExists,
    getCompilationSettings: () => parsed.options,
    getCurrentDirectory: () => dirname(configPath),
    getDefaultLibFileName: ts.getDefaultLibFilePath,
    getProjectReferences: () => parsed.projectReferences,
    getScriptFileNames: () => parsed.fileNames,
    getScriptSnapshot: readScriptSnapshot,
    getScriptVersion: () => "0",
    readFile: ts.sys.readFile,
    useCaseSensitiveFileNames: () => ts.sys.useCaseSensitiveFileNames,
  });
  const violations = deprecatedViolations(
    languageService,
    parsed.fileNames,
    repositoryRoot
  );
  languageService.dispose();
  return {
    fileNames: parsed.fileNames,
    violations,
  };
}

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
const projectAudits = projectConfigPaths(repositoryFiles).map((configPath) =>
  auditProjectDeprecations(resolve(currentRoot, configPath), currentRoot)
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
