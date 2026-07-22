import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { FileSystem, Path, Error as PlatformError } from "@effect/platform";
import { Effect } from "effect";
import { describe, expect, it } from "vitest";
import { decodeMaterialRegistry } from "#corpus/material/registry";
import { readMaterialDocument } from "#corpus/material/source";

const corpusRoot = resolve(import.meta.dirname, "..", "..", "..", "..");
const sourcePaths = [
  "packages/corpus/material/lesson/mathematics/function-composition_/inverse-function/function-concept/en.mdx",
  "packages/corpus/material/lesson/mathematics/function-composition_/inverse-function/function-concept/id.mdx",
] as const;
const sourceByPath = new Map(
  sourcePaths.map((sourcePath) => {
    const absolutePath = resolve(corpusRoot, sourcePath);
    return [absolutePath, readFileSync(absolutePath, "utf8")] as const;
  })
);
const entries = await Effect.runPromise(decodeMaterialRegistry());

/** Provides deterministic file reads for the checked-in real corpus slice. */
function fileLayer(sources: ReadonlyMap<string, string>) {
  return FileSystem.layerNoop({
    readFileString: (path) => {
      const source = sources.get(path);
      if (source !== undefined) {
        return Effect.succeed(source);
      }
      return Effect.fail(
        new PlatformError.SystemError({
          method: "readFileString",
          module: "FileSystem",
          pathOrDescriptor: path,
          reason: "NotFound",
        })
      );
    },
  });
}

/** Reads the bounded real registry only at the Vitest runner boundary. */
function readSources(sources: ReadonlyMap<string, string>) {
  return Effect.runPromise(
    Effect.forEach(entries, (entry) =>
      readMaterialDocument(corpusRoot, entry)
    ).pipe(Effect.provide(fileLayer(sources)), Effect.provide(Path.layer))
  );
}

describe("material source", () => {
  it("reads byte-exact real MDX with signed Git source paths", async () => {
    const documents = await readSources(sourceByPath);
    expect(documents.map(({ route }) => route.locale)).toEqual(["en", "id"]);
    expect(documents.map(({ route }) => route.publicPath)).toEqual([
      "subjects/mathematics/function-composition-inverse-function/function-concept",
      "materi/matematika/fungsi-komposisi-dan-fungsi-invers/konsep-fungsi",
    ]);
    expect(
      documents.map(({ rawMdx }) =>
        createHash("sha256").update(rawMdx).digest("hex")
      )
    ).toEqual([
      "c1340893d18fbddf9e4b1437d593d6dae3476073bcf0c0228eabbe4a63b60086",
      "603f5c129cf43207f9305d945b67e54c103c6c5a907df6d104dca7b53e8fdece",
    ]);
    expect(documents.every(({ rawMdx }) => !rawMdx.includes("import "))).toBe(
      true
    );
  });

  it("maps missing reviewed source files to one typed failure", async () => {
    const error = await Effect.runPromise(
      Effect.forEach(entries, (entry) =>
        readMaterialDocument(corpusRoot, entry)
      ).pipe(
        Effect.provide(fileLayer(new Map())),
        Effect.provide(Path.layer),
        Effect.flip
      )
    );
    expect(error).toMatchObject({
      _tag: "MaterialReadError",
      sourcePath:
        "packages/corpus/material/lesson/mathematics/function-composition_/inverse-function/function-concept/en.mdx",
    });
  });
});
