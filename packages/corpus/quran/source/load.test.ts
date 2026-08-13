import { globSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

import { FileSystem, Path, Error as PlatformError } from "@effect/platform";
import { Effect } from "effect";
import { describe, expect, it } from "vitest";

import { loadPinnedQuranSources } from "#corpus/quran/source/load";

const repositoryRoot = resolve(import.meta.dirname, "../../../..");
const sourceRoot = resolve(repositoryRoot, "packages/corpus/quran/sources");
const sourceBytes = new Map<string, Uint8Array>(
  globSync("**/*.*", { cwd: sourceRoot }).map((relativePath) => [
    resolve(sourceRoot, relativePath),
    new Uint8Array(readFileSync(resolve(sourceRoot, relativePath))),
  ])
);

/** Provides deterministic byte reads for every pinned Quran source. */
function fileLayer(sources: ReadonlyMap<string, Uint8Array>) {
  return FileSystem.layerNoop({
    readFile: (path) => {
      const bytes = sources.get(path);
      if (bytes !== undefined) {
        return Effect.succeed(bytes);
      }
      return Effect.fail(
        new PlatformError.SystemError({
          method: "readFile",
          module: "FileSystem",
          pathOrDescriptor: path,
          reason: "NotFound",
        })
      );
    },
  });
}

/** Loads pinned sources through one deterministic file adapter. */
function load(sources: ReadonlyMap<string, Uint8Array>) {
  return Effect.runPromise(
    loadPinnedQuranSources(repositoryRoot).pipe(
      Effect.provide([fileLayer(sources), Path.layer])
    )
  );
}

/** Returns one typed pinned-source rejection at the test boundary. */
function reject(sources: ReadonlyMap<string, Uint8Array>) {
  return Effect.runPromise(
    loadPinnedQuranSources(repositoryRoot).pipe(
      Effect.provide([fileLayer(sources), Path.layer]),
      Effect.flip
    )
  );
}

/** Replaces one exact source path without mutating the shared fixture. */
function replace(relativePath: string, bytes: Uint8Array) {
  const sources = new Map(sourceBytes);
  sources.set(resolve(sourceRoot, relativePath), bytes);
  return sources;
}

/** Mutates one byte while preserving the source byte count and UTF-8. */
function drift(relativePath: string) {
  const path = resolve(sourceRoot, relativePath);
  const bytes = Uint8Array.from(sourceBytes.get(path) ?? []);
  bytes[0] = bytes[0] === 65 ? 66 : 65;
  return replace(relativePath, bytes);
}

describe("Quran source loading", () => {
  it("derives the complete signed summary from authenticated source bytes", async () => {
    const loaded = await load(sourceBytes);

    expect(loaded.summary).toEqual({
      byteCount: 11_506_941,
      digest:
        "sha256:73e50fb15aac4cd95c86151cc43f002b5c76986584846e16d171bd0be99f58d7",
      fileCount: 118,
    });
    expect(loaded.sources.tafsir).toHaveLength(114);
  });

  it("rejects missing data, legal, and Tafsir source files", async () => {
    const missingData = new Map(sourceBytes);
    missingData.delete(resolve(sourceRoot, "tanzil/text.txt"));
    const missingTerms = new Map(sourceBytes);
    missingTerms.delete(resolve(sourceRoot, "tanzil/terms.html"));
    const missingTafsir = new Map(sourceBytes);
    missingTafsir.delete(resolve(sourceRoot, "quranenc/tafsir/114.json"));

    const errors = await Promise.all([
      reject(missingData),
      reject(missingTerms),
      reject(missingTafsir),
    ]);

    expect(errors.map(({ detail }) => detail)).toEqual([
      "Could not read pinned source tanzil-text.txt.",
      "Could not read pinned source tanzil-terms.html.",
      "Could not read QuranEnc Tafsir source 114.json.",
    ]);
  });

  it("rejects both changed byte counts and changed same-length data", async () => {
    const english = sourceBytes.get(resolve(sourceRoot, "quranenc/en.xml"));
    if (english === undefined) {
      throw new Error("Expected the pinned English source fixture.");
    }

    const errors = await Promise.all([
      reject(replace("quranenc/en.xml", english.slice(1))),
      reject(drift("quranenc/en.xml")),
    ]);

    expect(errors.map(({ detail }) => detail)).toEqual([
      "Pinned source drifted: quranenc-en.xml.",
      "Pinned source drifted: quranenc-en.xml.",
    ]);
  });

  it("rejects invalid UTF-8 before parsing official text", async () => {
    const error = await reject(
      replace("quranenc/id.xml", Uint8Array.from([255]))
    );

    expect(error).toMatchObject({
      _tag: "QuranSourceFileError",
      detail: "Pinned source is not valid UTF-8: quranenc-id.xml.",
    });
  });

  it("rejects changed Tafsir byte counts and same-length bundle content", async () => {
    const first = sourceBytes.get(
      resolve(sourceRoot, "quranenc/tafsir/1.json")
    );
    if (first === undefined) {
      throw new Error("Expected the first pinned Tafsir source fixture.");
    }

    const errors = await Promise.all([
      reject(replace("quranenc/tafsir/1.json", first.slice(1))),
      reject(drift("quranenc/tafsir/1.json")),
    ]);

    expect(errors.map(({ detail }) => detail)).toEqual([
      "Pinned QuranEnc Tafsir bundle drifted.",
      "Pinned QuranEnc Tafsir bundle drifted.",
    ]);
  });
});
