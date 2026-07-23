import { readFileSync } from "node:fs";
import ts from "typescript";

import { enforceViolations, typescriptFiles } from "#scripts/files";

const LINE_BREAK_PATTERN = /\r?\n/u;
const MAXIMUM_LINES = 300;

/** Masks only parsed JSDoc ranges while preserving offsets and line breaks. */
function maskDocumentation(file: string, sourceText: string) {
  const masked = sourceText.split("");
  const documentedLines = new Set<number>();
  const sourceFile = ts.createSourceFile(
    file,
    sourceText,
    ts.ScriptTarget.Latest,
    true
  );
  const ranges = new Map<number, number>();
  const nodes: ts.Node[] = [sourceFile];

  for (const node of nodes) {
    for (const doc of ts.getJSDocCommentsAndTags(node).filter(ts.isJSDoc)) {
      const start = doc.getStart(sourceFile);
      ranges.set(start, doc.getEnd());
    }
    ts.forEachChild(node, (child) => {
      nodes.push(child);
    });
  }

  for (const [start, end] of ranges) {
    const firstLine = sourceFile.getLineAndCharacterOfPosition(start).line;
    const lastLine = sourceFile.getLineAndCharacterOfPosition(end - 1).line;
    for (let line = firstLine; line <= lastLine; line += 1) {
      documentedLines.add(line);
    }
    for (let index = start; index < end; index += 1) {
      if (masked[index] !== "\n" && masked[index] !== "\r") {
        masked[index] = " ";
      }
    }
  }

  return { documentedLines, maskedText: masked.join("") };
}

/** Counts physical module lines while excluding lines occupied only by JSDoc. */
export function countModuleLines(file: string, sourceText: string): number {
  if (sourceText.length === 0) {
    return 0;
  }
  const sourceLines = sourceText.split(LINE_BREAK_PATTERN);
  const { documentedLines, maskedText } = maskDocumentation(file, sourceText);
  const maskedLines = maskedText.split(LINE_BREAK_PATTERN);
  const hasTrailingLine = !sourceText.endsWith("\n");
  const lineCount = hasTrailingLine
    ? sourceLines.length
    : sourceLines.length - 1;
  let count = 0;

  for (let line = 0; line < lineCount; line += 1) {
    if (!documentedLines.has(line) || maskedLines[line]?.trim()) {
      count += 1;
    }
  }

  return count;
}

/** Collects authored TypeScript modules that exceed the repository line limit. */
export function lineViolations(
  files: readonly string[],
  readSource: (file: string) => string
): readonly string[] {
  return files.flatMap((file) => {
    const lines = countModuleLines(file, readSource(file));
    return lines > MAXIMUM_LINES ? [`${file}: ${lines} lines`] : [];
  });
}

enforceViolations(
  `TypeScript modules may contain at most ${MAXIMUM_LINES} non-JSDoc lines`,
  lineViolations(typescriptFiles(), (file) => readFileSync(file, "utf8"))
);
