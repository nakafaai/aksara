import { globSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

import { FileSystem, Path, Error as PlatformError } from "@effect/platform";
import {
  type ActiveAppLocaleList,
  ActiveAppLocaleListSchema,
} from "@nakafa/aksara-contracts/locale";
import { Effect, Schema } from "effect";
import { describe, expect, it } from "vitest";

import { AUTHORING_APP_LOCALES } from "#corpus/locale/source";
import { loadPinnedQuranSources } from "#corpus/quran/source/load";

const repositoryRoot = resolve(import.meta.dirname, "../../../..");
const sourceRoot = resolve(repositoryRoot, "packages/corpus/quran/sources");
const sourceBytes = new Map<string, Uint8Array>(
  globSync("**/*.*", { cwd: sourceRoot }).map((relativePath) => [
    resolve(sourceRoot, relativePath),
    new Uint8Array(readFileSync(resolve(sourceRoot, relativePath))),
  ])
);
const germanOnly = Schema.decodeUnknownSync(ActiveAppLocaleListSchema)(["de"]);

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
function load(
  sources: ReadonlyMap<string, Uint8Array>,
  appLocales?: ActiveAppLocaleList
) {
  const program =
    appLocales === undefined
      ? loadPinnedQuranSources(repositoryRoot)
      : loadPinnedQuranSources(repositoryRoot, appLocales);
  return Effect.runPromise(
    program.pipe(Effect.provide([fileLayer(sources), Path.layer]))
  );
}

/** Returns one typed pinned-source rejection at the test boundary. */
function reject(
  sources: ReadonlyMap<string, Uint8Array>,
  appLocales?: ActiveAppLocaleList
) {
  const program =
    appLocales === undefined
      ? loadPinnedQuranSources(repositoryRoot)
      : loadPinnedQuranSources(repositoryRoot, appLocales);
  return Effect.runPromise(
    program.pipe(Effect.provide([fileLayer(sources), Path.layer]), Effect.flip)
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

  it("derives the German authoring bundle without activating it", async () => {
    const loaded = await load(sourceBytes, AUTHORING_APP_LOCALES);

    expect(loaded.summary).toEqual({
      byteCount: 13_030_246,
      digest:
        "sha256:4834b7d8ca7e55e622c3e27a37c4b210af0ab58f066162603b1d76beb0dd91b8",
      fileCount: 119,
    });
    expect(loaded.sources.translations.de).toContain(
      "Im Namen Allahs, des Allerbarmers, des Barmherzigen."
    );
  });

  it("rejects locale subsets that cannot describe the physical source bundle", async () => {
    const error = await reject(sourceBytes, germanOnly);

    expect(error).toMatchObject({
      _tag: "QuranSourceLocaleError",
      appLocales: ["de"],
    });
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

    expect(errors).toMatchObject([
      {
        _tag: "QuranSourceFileError",
        detail: "Could not read pinned source tanzil-text.txt.",
      },
      {
        _tag: "QuranSourceFileError",
        detail: "Could not read pinned source tanzil-terms.html.",
      },
      {
        _tag: "QuranSourceFileError",
        detail: "Could not read QuranEnc Tafsir source 114.json.",
      },
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

    expect(errors).toMatchObject([
      {
        _tag: "QuranSourceFileError",
        detail: "Pinned source drifted: quranenc-en.xml.",
      },
      {
        _tag: "QuranSourceFileError",
        detail: "Pinned source drifted: quranenc-en.xml.",
      },
    ]);
  });

  it("authenticates the candidate German publication record", async () => {
    const error = await reject(
      drift("german/publication.json"),
      AUTHORING_APP_LOCALES
    );

    expect(error).toMatchObject({
      _tag: "QuranSourceFileError",
      detail: "Pinned source drifted: islamhouse-german-bubenheim.json.",
    });
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

    expect(errors).toMatchObject([
      {
        _tag: "QuranSourceFileError",
        detail: "Pinned QuranEnc Tafsir bundle drifted.",
      },
      {
        _tag: "QuranSourceFileError",
        detail: "Pinned QuranEnc Tafsir bundle drifted.",
      },
    ]);
  });
});
