import { Effect, Path } from "effect";

/** Resolves the repository checkout that holds the authored corpus. */
export const authoredCheckoutRoot = Effect.gen(function* () {
  const path = yield* Path.Path;
  return path.resolve(import.meta.dirname, "..", "..", "..");
});

/** Keeps the leading static metadata export, the only part metadata decoding reads. */
export function metadataExport(rawMdx: string) {
  const end = rawMdx.indexOf("\n};\n");
  return end === -1 ? rawMdx : rawMdx.slice(0, end + 4);
}
