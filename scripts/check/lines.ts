import { readFileSync } from "node:fs";
import {
  TypeScriptParser,
  TypeScriptSourceError,
} from "@nakafa/aksara-utilities/typescript/parse";
import { Effect } from "effect";
import { isJSDoc, type Node, type SourceFile } from "typescript/unstable/ast";

import { enforceViolations, typescriptFiles } from "#scripts/check/files";

const LINE_BREAK_PATTERN = /\r?\n/u;
const MAXIMUM_LINES = 300;

/** Masks only parsed JSDoc ranges while preserving offsets and line breaks. */
function maskDocumentation(sourceFile: SourceFile, sourceText: string) {
  const masked = sourceText.split("");
  const documentedLines = new Set<number>();
  const ranges = new Map<number, number>();
  const nodes: Node[] = [sourceFile];

  for (const node of nodes) {
    for (const doc of (node.jsDoc ?? []).filter(isJSDoc)) {
      const start = doc.getStart(sourceFile);
      ranges.set(start, doc.getEnd());
    }
    node.forEachChild((child) => {
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
export const countModuleLines = Effect.fn("AksaraPolicy.countModuleLines")(
  function* (file: string, sourceText: string) {
    if (sourceText.length === 0) {
      return 0;
    }
    const parser = yield* TypeScriptParser;
    return yield* parser.inspect(
      { fileName: file, source: sourceText },
      ({ sourceFile }) => {
        const sourceLines = sourceText.split(LINE_BREAK_PATTERN);
        const { documentedLines, maskedText } = maskDocumentation(
          sourceFile,
          sourceText
        );
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
    );
  }
);

/** Collects authored TypeScript modules that exceed the repository line limit. */
export const lineViolations = Effect.fn("AksaraPolicy.moduleLines")(function* (
  files: readonly string[],
  readSource: (file: string) => string
) {
  const violations = yield* Effect.forEach(files, (file) =>
    Effect.try({
      catch: (cause) => new TypeScriptSourceError({ cause, fileName: file }),
      try: () => readSource(file),
    }).pipe(
      Effect.flatMap((source) => countModuleLines(file, source)),
      Effect.map((lines) =>
        lines > MAXIMUM_LINES ? [`${file}: ${lines} lines`] : []
      )
    )
  );
  return violations.flat();
});

const violations = await Effect.runPromise(
  lineViolations(typescriptFiles(), (file) => readFileSync(file, "utf8")).pipe(
    Effect.provide(TypeScriptParser.layer)
  )
);
enforceViolations(
  `TypeScript modules may contain at most ${MAXIMUM_LINES} non-JSDoc lines`,
  violations
);
