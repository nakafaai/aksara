import { expect, layer } from "@effect/vitest";
import { TypeScriptParser } from "@nakafa/aksara-utilities/typescript/parse";
import { Array as Arr, Effect } from "effect";
import { SyntaxKind } from "typescript/unstable/ast";
import { syntaxNodes } from "#scripts/check/syntax";

layer(TypeScriptParser.layer)("syntax nodes", (it) => {
  it.effect("lists the module first and then each level before the next", () =>
    Effect.gen(function* () {
      const parser = yield* TypeScriptParser;
      const kinds = yield* parser.inspect(
        { fileName: "order.ts", source: "f(a);\nconst b = 1;" },
        ({ sourceFile }) =>
          Arr.map(syntaxNodes(sourceFile).slice(0, 3), (node) => node.kind)
      );

      expect(kinds).toEqual([
        SyntaxKind.SourceFile,
        SyntaxKind.ExpressionStatement,
        SyntaxKind.VariableStatement,
      ]);
    })
  );
});
