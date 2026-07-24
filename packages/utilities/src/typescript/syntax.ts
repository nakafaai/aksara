import ts from "typescript";

/** Reports TypeScript syntax errors through the supported public compiler API. */
export function hasTypeScriptSyntaxError(source: string, fileName: string) {
  const { diagnostics } = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2022,
    },
    fileName,
    reportDiagnostics: true,
  });
  return (
    diagnostics?.some(
      ({ category }) => category === ts.DiagnosticCategory.Error
    ) === true
  );
}
