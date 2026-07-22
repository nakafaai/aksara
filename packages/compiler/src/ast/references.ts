import { analyze } from "eslint-scope";
import type { Program } from "estree-jsx";

/** Returns unresolved identifier references from one official ESTree program. */
export function readFreeReferences(program: Program) {
  const { scopes } = analyze(program, {
    ecmaVersion: 2022,
    jsx: true,
    sourceType: "module",
  });
  return scopes.flatMap((scope) =>
    scope.type === "global"
      ? scope.through.flatMap(({ identifier }) =>
          identifier.type === "Identifier" ? [identifier] : []
        )
      : []
  );
}
