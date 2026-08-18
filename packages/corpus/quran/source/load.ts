import { createHash, type Hash } from "node:crypto";

import { FileSystem, Path } from "@effect/platform";
import { Sha256HashSchema } from "@nakafa/aksara-contracts/ids";
import {
  ACTIVE_APP_LOCALES,
  type ActiveAppLocaleList,
  AppLocaleSchema,
} from "@nakafa/aksara-contracts/locale";
import {
  type QuranSourceArtifact,
  QuranSourceArtifactSchema,
  quranSourceFileCount,
} from "@nakafa/aksara-contracts/quran/source";
import { Effect, Schema } from "effect";
import {
  AUTHORING_APP_LOCALES,
  type LocalizedSourceMap,
  mapLocalizedSource,
  traverseLocalizedSources,
} from "#corpus/locale/source";
import type { RawSources } from "#corpus/quran/source/model";
import {
  type PinnedQuranFile,
  QURAN_SOURCE_BUNDLE_DOMAIN,
  QURAN_SOURCE_POLICY,
  QURAN_TAFSIR_BUNDLE_DOMAIN,
} from "#corpus/quran/source/policy";

/** One exact official source file or bundle could not be authenticated. */
export class QuranSourceFileError extends Schema.TaggedError<QuranSourceFileError>()(
  "QuranSourceFileError",
  {
    detail: Schema.String,
  }
) {}

/** A source load requested a locale subset that has no honest physical bundle. */
export class QuranSourceLocaleError extends Schema.TaggedError<QuranSourceLocaleError>()(
  "QuranSourceLocaleError",
  {
    appLocales: Schema.Array(AppLocaleSchema),
  }
) {}

/** Exact raw source text and byte identity accepted by Quran publication. */
export interface LoadedQuranSources {
  readonly sources: RawSources;
  readonly summary: QuranSourceArtifact;
}

/** Returns one lowercase SHA-256 digest without a wire prefix. */
function digest(bytes: Uint8Array) {
  return createHash("sha256").update(bytes).digest("hex");
}

/** Compares one canonical locale list to a supported source lifecycle. */
function matchesLocaleLifecycle(
  appLocales: ActiveAppLocaleList,
  lifecycle: ActiveAppLocaleList
) {
  return (
    appLocales.length === lifecycle.length &&
    appLocales.every((appLocale, index) => appLocale === lifecycle[index])
  );
}

/** Rejects subsets that would make the source summary misstate its inventory. */
const requireSourceLocaleLifecycle = Effect.fn(
  "AksaraCorpus.requireQuranSourceLocaleLifecycle"
)(function* (appLocales: ActiveAppLocaleList) {
  if (
    matchesLocaleLifecycle(appLocales, ACTIVE_APP_LOCALES) ||
    matchesLocaleLifecycle(appLocales, AUTHORING_APP_LOCALES)
  ) {
    return appLocales;
  }
  return yield* new QuranSourceLocaleError({ appLocales });
});

/** Decodes one source without replacing invalid UTF-8 bytes. */
function decodeSource(name: string, bytes: Uint8Array) {
  return Effect.try({
    catch: () =>
      new QuranSourceFileError({
        detail: `Pinned source is not valid UTF-8: ${name}.`,
      }),
    try: () => new TextDecoder("utf-8", { fatal: true }).decode(bytes),
  });
}

/** Reads one source-controlled file and verifies its exact byte identity. */
const readPinnedFile = Effect.fn("AksaraCorpus.readPinnedQuranFile")(function* (
  fileSystem: FileSystem.FileSystem,
  path: Path.Path,
  sourceRoot: string,
  source: PinnedQuranFile
) {
  const bytes = yield* fileSystem
    .readFile(path.join(sourceRoot, source.path))
    .pipe(
      Effect.mapError(
        () =>
          new QuranSourceFileError({
            detail: `Could not read pinned source ${source.name}.`,
          })
      )
    );
  const text = yield* decodeSource(source.name, bytes);
  if (
    bytes.byteLength !== source.artifact.byteCount ||
    digest(bytes) !== source.artifact.digest.slice("sha256:".length)
  ) {
    return yield* new QuranSourceFileError({
      detail: `Pinned source drifted: ${source.name}.`,
    });
  }
  return { bytes, text };
});

/** Selects the exact translation source policy for one locale lifecycle. */
function translationPolicyFor(
  appLocales: ActiveAppLocaleList
): LocalizedSourceMap<PinnedQuranFile> {
  const active = {
    en: QURAN_SOURCE_POLICY.data.translations.en,
    id: QURAN_SOURCE_POLICY.data.translations.id,
  };
  if (!appLocales.some((appLocale) => appLocale === "de")) {
    return active;
  }
  return {
    ...active,
    de: QURAN_SOURCE_POLICY.data.translations.de,
  };
}

/** Adds one named source to a domain-separated ordered bundle digest. */
function updateBundle(hash: Hash, name: string, bytes: Uint8Array) {
  hash.update(`${name}\n${bytes.byteLength}\n`);
  hash.update(bytes);
  hash.update("\n");
}

/** Reads the exact 114 QuranEnc responses and authenticates their bundle. */
const readTafsirSources = Effect.fn("AksaraCorpus.readPinnedQuranTafsir")(
  function* (
    fileSystem: FileSystem.FileSystem,
    path: Path.Path,
    sourceRoot: string
  ) {
    const hash = createHash("sha256").update(`${QURAN_TAFSIR_BUNDLE_DOMAIN}\n`);
    const sourceBytes: Uint8Array[] = [];
    const sources: string[] = [];
    let byteCount = 0;
    for (let number = 1; number <= 114; number += 1) {
      const name = `${number}.json`;
      const bytes = yield* fileSystem
        .readFile(
          path.join(sourceRoot, QURAN_SOURCE_POLICY.tafsir.directory, name)
        )
        .pipe(
          Effect.mapError(
            () =>
              new QuranSourceFileError({
                detail: `Could not read QuranEnc Tafsir source ${name}.`,
              })
          )
        );
      const text = yield* decodeSource(name, bytes);
      updateBundle(hash, name, bytes);
      byteCount += bytes.byteLength;
      sourceBytes.push(bytes);
      sources.push(text);
    }
    const expected = QURAN_SOURCE_POLICY.tafsir.artifact;
    if (
      byteCount !== expected.byteCount ||
      hash.digest("hex") !== expected.digest.slice("sha256:".length)
    ) {
      return yield* new QuranSourceFileError({
        detail: "Pinned QuranEnc Tafsir bundle drifted.",
      });
    }
    return { sourceBytes, sources };
  }
);

/** Loads and authenticates every official byte before Quran parsing. */
export const loadPinnedQuranSources = Effect.fn(
  "AksaraCorpus.loadPinnedQuranSources"
)(function* (
  checkoutRoot: string,
  appLocales: ActiveAppLocaleList = ACTIVE_APP_LOCALES
) {
  yield* requireSourceLocaleLifecycle(appLocales);
  const fileSystem = yield* FileSystem.FileSystem;
  const path = yield* Path.Path;
  const sourceRoot = path.join(checkoutRoot, "packages/corpus/quran/sources");
  const dataBytes = yield* Effect.all(
    {
      arabic: readPinnedFile(
        fileSystem,
        path,
        sourceRoot,
        QURAN_SOURCE_POLICY.data.arabic
      ),
      metadata: readPinnedFile(
        fileSystem,
        path,
        sourceRoot,
        QURAN_SOURCE_POLICY.data.metadata
      ),
    },
    { concurrency: 4 }
  );
  const translationPolicy = translationPolicyFor(appLocales);
  const translations: LocalizedSourceMap<{
    readonly bytes: Uint8Array;
    readonly text: string;
  }> = yield* traverseLocalizedSources(translationPolicy, (source) =>
    readPinnedFile(fileSystem, path, sourceRoot, source)
  );
  if (translations.de !== undefined) {
    yield* readPinnedFile(
      fileSystem,
      path,
      sourceRoot,
      QURAN_SOURCE_POLICY.evidence.germanPublication
    );
  }
  yield* Effect.forEach(
    Object.values(QURAN_SOURCE_POLICY.terms),
    (source) => readPinnedFile(fileSystem, path, sourceRoot, source),
    { concurrency: 2, discard: true }
  );
  const tafsir = yield* readTafsirSources(fileSystem, path, sourceRoot);

  const bundle = createHash("sha256").update(`${QURAN_SOURCE_BUNDLE_DOMAIN}\n`);
  let byteCount = 0;
  const canonicalData: (readonly [string, Uint8Array])[] = [
    [QURAN_SOURCE_POLICY.data.arabic.name, dataBytes.arabic.bytes],
    [QURAN_SOURCE_POLICY.data.metadata.name, dataBytes.metadata.bytes],
    [QURAN_SOURCE_POLICY.data.translations.en.name, translations.en.bytes],
    [QURAN_SOURCE_POLICY.data.translations.id.name, translations.id.bytes],
  ];
  if (translations.de !== undefined) {
    canonicalData.push([
      QURAN_SOURCE_POLICY.data.translations.de.name,
      translations.de.bytes,
    ]);
  }
  for (const [name, bytes] of canonicalData) {
    updateBundle(bundle, name, bytes);
    byteCount += bytes.byteLength;
  }
  for (const [index, bytes] of tafsir.sourceBytes.entries()) {
    updateBundle(
      bundle,
      `${QURAN_SOURCE_POLICY.tafsir.name}/${index + 1}.json`,
      bytes
    );
    byteCount += bytes.byteLength;
  }
  const summary = QuranSourceArtifactSchema.make({
    byteCount,
    digest: Sha256HashSchema.make(`sha256:${bundle.digest("hex")}`),
    fileCount: quranSourceFileCount(appLocales),
  });
  return {
    sources: {
      arabic: dataBytes.arabic.text,
      metadata: dataBytes.metadata.text,
      tafsir: tafsir.sources,
      translations: mapLocalizedSource(translations, ({ text }) => text),
    },
    summary,
  } satisfies LoadedQuranSources;
});
