import { expect, layer } from "@effect/vitest";
import { TypeScriptParser } from "@nakafa/aksara-utilities/typescript/parse";
import { Array as Arr, Effect } from "effect";
import { SyntaxKind } from "typescript/unstable/ast";
import { syntaxNodes, syntaxNodesSkippingTypes } from "#scripts/check/syntax";

layer(TypeScriptParser.layer)("syntax nodes", (it) => {
  it.effect("lists the module first and then each level before the next", () =>
    Effect.gen(function* () {
      const parser = yield* TypeScriptParser;
      const kinds = yield* parser.inspect(
        { fileName: "order.ts", source: "f(a);\nconst b = 1;" },
        ({ sourceFile }) =>
          Arr.map(Arr.take(syntaxNodes(sourceFile), 3), (node) => node.kind)
      );

      expect(kinds).toEqual([
        SyntaxKind.SourceFile,
        SyntaxKind.ExpressionStatement,
        SyntaxKind.VariableStatement,
      ]);
    })
  );

  it.effect("leaves out the children of type nodes only when asked", () =>
    Effect.gen(function* () {
      const parser = yield* TypeScriptParser;
      const kinds = yield* parser.inspect(
        { fileName: "types.ts", source: "let value: { field: string };" },
        ({ sourceFile }) => ({
          all: Arr.map(syntaxNodes(sourceFile), (node) => node.kind),
          outsideTypes: Arr.map(
            syntaxNodesSkippingTypes(sourceFile),
            (node) => node.kind
          ),
        })
      );

      expect(kinds.all).toContain(SyntaxKind.PropertySignature);
      expect(kinds.outsideTypes).toContain(SyntaxKind.TypeLiteral);
      expect(kinds.outsideTypes).not.toContain(SyntaxKind.PropertySignature);
    })
  );
});
