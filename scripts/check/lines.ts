import {
  TypeScriptParser,
  TypeScriptSourceError,
} from "@nakafa/aksara-utilities/typescript/parse";
import {
  Array as Arr,
  Effect,
  FileSystem,
  MutableHashMap,
  MutableHashSet,
} from "effect";
import { isJSDoc, type SourceFile } from "typescript/unstable/ast";

import {
  enforceViolations,
  trackedFiles,
  typescriptFiles,
} from "#scripts/check/files";
import { syntaxNodes } from "#scripts/check/syntax";
import { runEntry } from "#scripts/entry";

const LINE_BREAK_PATTERN = /\r?\n/u;
const MAXIMUM_LINES = 300;

/** Masks only parsed JSDoc ranges while preserving offsets and line breaks. */
function maskDocumentation(sourceFile: SourceFile, sourceText: string) {
  const masked = sourceText.split("");
  const documentedLines = MutableHashSet.empty<number>();
  const ranges = MutableHashMap.empty<number, number>();

  for (const node of syntaxNodes(sourceFile)) {
    for (const doc of Arr.filter(node.jsDoc ?? [], isJSDoc)) {
      MutableHashMap.set(ranges, doc.getStart(sourceFile), doc.getEnd());
    }
  }

  for (const [start, end] of ranges) {
    const firstLine = sourceFile.getLineAndCharacterOfPosition(start).line;
    const lastLine = sourceFile.getLineAndCharacterOfPosition(end - 1).line;
    for (let line = firstLine; line <= lastLine; line += 1) {
      MutableHashSet.add(documentedLines, line);
    }
    for (let index = start; index < end; index += 1) {
      if (masked[index] !== "\n" && masked[index] !== "\r") {
        masked[index] = " ";
      }
    }
  }

  return { documentedLines, maskedText: Arr.join(masked, "") };
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
          if (
            !MutableHashSet.has(documentedLines, line) ||
            maskedLines[line]?.trim()
          ) {
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
  readSource: (file: string) => Effect.Effect<string, unknown>
) {
  const violations = yield* Effect.forEach(files, (file) =>
    readSource(file).pipe(
      Effect.mapError(
        (cause) => new TypeScriptSourceError({ cause, fileName: file })
      ),
      Effect.flatMap((source) => countModuleLines(file, source)),
      Effect.map((lines) =>
        lines > MAXIMUM_LINES ? [`${file}: ${lines} lines`] : []
      )
    )
  );
  return Arr.flatten(violations);
});

/** Reports every module in the given files that exceeds the line limit. */
export const lineReport = Effect.fn("AksaraPolicy.lineReport")(function* (
  files: readonly string[]
) {
  const fileSystem = yield* FileSystem.FileSystem;
  const violations = yield* lineViolations(files, (file) =>
    fileSystem.readFileString(file)
  );
  enforceViolations(
    `TypeScript modules may contain at most ${MAXIMUM_LINES} non-JSDoc lines`,
    violations
  );
});

runEntry(
  import.meta.main,
  trackedFiles().pipe(
    Effect.map(typescriptFiles),
    Effect.flatMap(lineReport),
    Effect.provide(TypeScriptParser.layer)
  )
);
