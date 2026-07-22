import { posix } from "node:path";
import { createProcessor } from "@mdx-js/mdx";
import { Effect } from "effect";
import {
  MdxImportParseError,
  type NormalizeMdxImportsInput,
  rejectImport,
} from "#compiler/normalize/spec";
import { normalizeMdxTree } from "#compiler/normalize/tree";

const LEGACY_SOURCE_ROOT = "packages/contents";

/** Parses reviewed MDX through the official processor with a typed failure. */
const parseMdx = Effect.fn("AksaraCompiler.parseMdxForNormalization")(
  (rawMdx: string, sourcePath: string) =>
    Effect.try({
      catch: (cause) => new MdxImportParseError({ cause, sourcePath }),
      try: () => createProcessor().parse(rawMdx),
    })
);

/**
 * Parses one authored document before running the import-free migration core.
 * Delete this Module after every reviewed corpus document is committed without
 * imports; the production compiler continues to reject all module syntax.
 */
export const normalizeMdxImports = Effect.fn(
  "AksaraCompiler.normalizeMdxImports"
)(function* (input: NormalizeMdxImportsInput) {
  if (
    input.sourceRoot !== LEGACY_SOURCE_ROOT ||
    posix.normalize(input.sourcePath) !== input.sourcePath ||
    !input.sourcePath.startsWith(`${input.sourceRoot}/`) ||
    !input.sourcePath.endsWith(".mdx")
  ) {
    return yield* rejectImport(input.sourcePath, "source-path");
  }
  const tree = yield* parseMdx(input.rawMdx, input.sourcePath);
  return yield* normalizeMdxTree(input, tree);
});
