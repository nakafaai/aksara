import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import ts from "typescript";

const TYPESCRIPT_PATTERN = /\.(?:[cm]?ts|tsx)$/u;
const GENERATED_PATH_PATTERN =
  /(?:^|\/)(?:dist|node_modules|_generated)(?:\/|$)/u;
const LINE_BREAK_PATTERN = /\r?\n/u;
const MAXIMUM_LINES = 300;

/** Lists authored TypeScript modules governed by the module-size limit. */
function sourceFiles(): string[] {
  return execFileSync(
    "git",
    ["ls-files", "--cached", "--others", "--exclude-standard"],
    { encoding: "utf8" }
  )
    .split("\n")
    .filter(
      (file) =>
        file.length > 0 &&
        existsSync(file) &&
        TYPESCRIPT_PATTERN.test(file) &&
        !GENERATED_PATH_PATTERN.test(file)
    );
}

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

  while (nodes.length > 0) {
    const node = nodes.pop();
    if (!node) {
      continue;
    }
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
function countModuleLines(file: string, sourceText: string): number {
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

const violations = sourceFiles().flatMap((file) => {
  const lines = countModuleLines(file, readFileSync(file, "utf8"));
  return lines > MAXIMUM_LINES ? [`${file}: ${lines} lines`] : [];
});

if (violations.length > 0) {
  process.stderr.write(
    `TypeScript modules may contain at most ${MAXIMUM_LINES} non-JSDoc lines:\n${violations.join("\n")}\n`
  );
  process.exitCode = 1;
}
