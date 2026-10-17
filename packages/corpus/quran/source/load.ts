import { digestSha256 } from "@nakafa/aksara-contracts/hash/digest";
import { Sha256HashSchema } from "@nakafa/aksara-contracts/ids";
import {
  ACTIVE_APP_LOCALES,
  type ActiveAppLocaleList,
  AppLocaleSchema,
} from "@nakafa/aksara-contracts/locale";
import {
  QuranSourceArtifactSchema,
  quranSourceFileCount,
} from "@nakafa/aksara-contracts/quran/source";
import {
  Array as Arr,
  Effect,
  FileSystem,
  MutableList,
  Path,
  Record,
  Schema,
} from "effect";
import { Hex } from "effect/encoding";
import { mapLocalizedSource } from "#corpus/locale/source";
import { RawSourcesSchema } from "#corpus/quran/source/model";
import {
  type PinnedQuranFile,
  QURAN_SOURCE_BUNDLE_DOMAIN,
  QURAN_SOURCE_POLICY,
  QURAN_TAFSIR_BUNDLE_DOMAIN,
  sha256Hex,
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

const LoadedQuranSourcesSchema = Schema.Struct({
  sources: RawSourcesSchema,
  summary: QuranSourceArtifactSchema,
});
/** Exact raw source text and byte identity accepted by Quran publication. */
type LoadedQuranSources = typeof LoadedQuranSourcesSchema.Type;

/** Compares two canonical locale lists without weakening their order contract. */
function matchesExactLocales(
  appLocales: ActiveAppLocaleList,
  expected: ActiveAppLocaleList
) {
  return (
    appLocales.length === expected.length &&
    Arr.every(appLocales, (appLocale, index) => appLocale === expected[index])
  );
}

/** Rejects subsets that would make the source summary misstate its inventory. */
const requireExactSourceLocales = Effect.fn(
  "AksaraCorpus.requireExactQuranSourceLocales"
)(function* (appLocales: ActiveAppLocaleList) {
  if (matchesExactLocales(appLocales, ACTIVE_APP_LOCALES)) {
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

/** Reads one source-controlled artifact without changing its bytes. */
const readSourceFile = Effect.fn("AksaraCorpus.readQuranSourceFile")(function* (
  fileSystem: FileSystem.FileSystem,
  path: Path.Path,
  sourceRoot: string,
  source: PinnedQuranFile
) {
  return yield* fileSystem.readFile(path.join(sourceRoot, source.path)).pipe(
    Effect.mapError(
      () =>
        new QuranSourceFileError({
          detail: `Could not read pinned source ${source.name}.`,
        })
    )
  );
});

/** Maps one failed digest of pinned Quran source bytes to a source error that names what failed. */
function digestFailure(detail: string) {
  return () => new QuranSourceFileError({ detail });
}

/** Authenticates one source-controlled artifact against its pinned identity. */
const authenticateSource = Effect.fn("AksaraCorpus.authenticateQuranSource")(
  function* (source: PinnedQuranFile, bytes: Uint8Array) {
    const digest = yield* sha256Hex(bytes).pipe(
      Effect.mapError(
        digestFailure(`Could not digest pinned source ${source.name}.`)
      )
    );
    if (
      bytes.byteLength !== source.artifact.byteCount ||
      digest !== source.artifact.digest.slice("sha256:".length)
    ) {
      return yield* new QuranSourceFileError({
        detail: `Pinned source drifted: ${source.name}.`,
      });
    }
    return bytes;
  }
);

/** Reads one binary source artifact and verifies its exact byte identity. */
const readPinnedFile = Effect.fn("AksaraCorpus.readPinnedQuranFile")(function* (
  fileSystem: FileSystem.FileSystem,
  path: Path.Path,
  sourceRoot: string,
  source: PinnedQuranFile
) {
  const bytes = yield* readSourceFile(fileSystem, path, sourceRoot, source);
  return yield* authenticateSource(source, bytes);
});

/** Reads one authenticated text source without accepting replacement bytes. */
const readPinnedText = Effect.fn("AksaraCorpus.readPinnedQuranText")(function* (
  fileSystem: FileSystem.FileSystem,
  path: Path.Path,
  sourceRoot: string,
  source: PinnedQuranFile
) {
  const bytes = yield* readSourceFile(fileSystem, path, sourceRoot, source);
  const text = yield* decodeSource(source.name, bytes);
  yield* authenticateSource(source, bytes);
  return { bytes, text };
});

/** Encodes one named source as the exact parts that a domain-separated bundle digest covers. */
function bundleParts(name: string, bytes: Uint8Array) {
  return [
    new TextEncoder().encode(`${name}\n${bytes.byteLength}\n`),
    bytes,
    new TextEncoder().encode("\n"),
  ];
}

/** Joins byte parts, in order, into one buffer that a single digest can cover. */
function concatBytes(parts: readonly Uint8Array[]) {
  const joined = new Uint8Array(
    Arr.reduce(parts, 0, (size, part) => size + part.byteLength)
  );
  let offset = 0;
  for (const part of parts) {
    joined.set(part, offset);
    offset += part.byteLength;
  }
  return joined;
}

/** Digests the ordered parts of one bundle, which the loader already holds in memory. */
const digestBundle = Effect.fn("AksaraCorpus.digestQuranBundle")(function* (
  parts: readonly Uint8Array[]
) {
  const digest = yield* digestSha256(concatBytes(parts)).pipe(
    Effect.mapError(
      digestFailure("Could not digest a pinned Quran source bundle.")
    )
  );
  return Hex.encode(digest);
});

/** Reads the exact 114 QuranEnc responses and authenticates their bundle. */
const readTafsirSources = Effect.fn("AksaraCorpus.readPinnedQuranTafsir")(
  function* (
    fileSystem: FileSystem.FileSystem,
    path: Path.Path,
    sourceRoot: string
  ) {
    const parts = MutableList.make<Uint8Array>();
    MutableList.append(
      parts,
      new TextEncoder().encode(`${QURAN_TAFSIR_BUNDLE_DOMAIN}\n`)
    );
    const sourceBytes = MutableList.make<Uint8Array>();
    const sources = MutableList.make<string>();
    let byteCount = 0;
    for (let number = 1; number <= 114; number += 1) {
      const name = `${number}.json`;
      const bytes = yield* Effect.mapError(
        fileSystem.readFile(
          path.join(sourceRoot, QURAN_SOURCE_POLICY.tafsir.directory, name)
        ),
        () =>
          new QuranSourceFileError({
            detail: `Could not read QuranEnc Tafsir source ${name}.`,
          })
      );
      const text = yield* decodeSource(name, bytes);
      for (const part of bundleParts(name, bytes)) {
        MutableList.append(parts, part);
      }
      byteCount += bytes.byteLength;
      MutableList.append(sourceBytes, bytes);
      MutableList.append(sources, text);
    }
    const expected = QURAN_SOURCE_POLICY.tafsir.artifact;
    const digest = yield* digestBundle(MutableList.toArray(parts));
    if (
      byteCount !== expected.byteCount ||
      digest !== expected.digest.slice("sha256:".length)
    ) {
      return yield* new QuranSourceFileError({
        detail: "Pinned QuranEnc Tafsir bundle drifted.",
      });
    }
    return {
      sourceBytes: MutableList.toArray(sourceBytes),
      sources: MutableList.toArray(sources),
    };
  }
);

/** Loads and authenticates every official byte before Quran parsing. */
export const loadPinnedQuranSources = Effect.fn(
  "AksaraCorpus.loadPinnedQuranSources"
)(function* (
  checkoutRoot: string,
  appLocales: ActiveAppLocaleList = ACTIVE_APP_LOCALES
) {
  yield* requireExactSourceLocales(appLocales);
  const fileSystem = yield* FileSystem.FileSystem;
  const path = yield* Path.Path;
  const sourceRoot = path.join(checkoutRoot, "packages/corpus/quran/sources");
  const dataBytes = yield* Effect.all(
    {
      arabic: readPinnedText(
        fileSystem,
        path,
        sourceRoot,
        QURAN_SOURCE_POLICY.data.arabic
      ),
      metadata: readPinnedText(
        fileSystem,
        path,
        sourceRoot,
        QURAN_SOURCE_POLICY.data.metadata
      ),
    },
    { concurrency: 4 }
  );
  const translations = yield* Effect.all(
    {
      de: readPinnedText(
        fileSystem,
        path,
        sourceRoot,
        QURAN_SOURCE_POLICY.data.translations.de
      ),
      en: readPinnedText(
        fileSystem,
        path,
        sourceRoot,
        QURAN_SOURCE_POLICY.data.translations.en
      ),
      id: readPinnedText(
        fileSystem,
        path,
        sourceRoot,
        QURAN_SOURCE_POLICY.data.translations.id
      ),
    },
    { concurrency: 3 }
  );
  const names = yield* Effect.all(
    {
      de: readPinnedFile(
        fileSystem,
        path,
        sourceRoot,
        QURAN_SOURCE_POLICY.data.names.de
      ),
      id: readPinnedFile(
        fileSystem,
        path,
        sourceRoot,
        QURAN_SOURCE_POLICY.data.names.id
      ),
    },
    { concurrency: 2 }
  );
  yield* Effect.forEach(
    Record.values(QURAN_SOURCE_POLICY.evidence),
    (source) => readPinnedFile(fileSystem, path, sourceRoot, source),
    { concurrency: 2, discard: true }
  );
  yield* Effect.forEach(
    Record.values(QURAN_SOURCE_POLICY.terms),
    (source) => readPinnedFile(fileSystem, path, sourceRoot, source),
    { concurrency: 2, discard: true }
  );
  const tafsir = yield* readTafsirSources(fileSystem, path, sourceRoot);

  const bundle = MutableList.make<Uint8Array>();
  MutableList.append(
    bundle,
    new TextEncoder().encode(`${QURAN_SOURCE_BUNDLE_DOMAIN}\n`)
  );
  let byteCount = 0;
  const canonicalData: (readonly [string, Uint8Array])[] = [
    [QURAN_SOURCE_POLICY.data.arabic.name, dataBytes.arabic.bytes],
    [QURAN_SOURCE_POLICY.data.metadata.name, dataBytes.metadata.bytes],
    [QURAN_SOURCE_POLICY.data.names.id.name, names.id],
    [QURAN_SOURCE_POLICY.data.names.de.name, names.de],
    [QURAN_SOURCE_POLICY.data.translations.en.name, translations.en.bytes],
    [QURAN_SOURCE_POLICY.data.translations.id.name, translations.id.bytes],
    [QURAN_SOURCE_POLICY.data.translations.de.name, translations.de.bytes],
  ];
  for (const [name, bytes] of canonicalData) {
    for (const part of bundleParts(name, bytes)) {
      MutableList.append(bundle, part);
    }
    byteCount += bytes.byteLength;
  }
  Arr.forEach(tafsir.sourceBytes, (bytes, index) => {
    for (const part of bundleParts(
      `${QURAN_SOURCE_POLICY.tafsir.name}/${index + 1}.json`,
      bytes
    )) {
      MutableList.append(bundle, part);
    }
    byteCount += bytes.byteLength;
  });
  const digest = yield* digestBundle(MutableList.toArray(bundle));
  const summary = QuranSourceArtifactSchema.make({
    byteCount,
    digest: Sha256HashSchema.make(`sha256:${digest}`),
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
