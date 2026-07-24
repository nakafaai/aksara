import type { Buffer } from "node:buffer";
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import {
  mkdirSync,
  mkdtempSync,
  readFileSync,
  renameSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { Effect, Schema } from "effect";

import type { RawSources } from "#corpus/scripts/quran/model";
import { parseQuranSources } from "#corpus/scripts/quran/parse";
import { renderQuranFiles } from "#corpus/scripts/quran/render";

const CORPUS_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const REPOSITORY_ROOT = resolve(CORPUS_ROOT, "../..");
const QURAN_ROOT = join(CORPUS_ROOT, "quran");
const SOURCE_ROOT = join(QURAN_ROOT, "sources");
const SOURCE_DOMAIN = "aksara.quran.source-bundle.v2";
const TAFSIR_DOMAIN = "aksara.quranenc.api-bundle.v1";
const EXPECTED_SOURCE_BYTES = 11_506_941;
const EXPECTED_SOURCE_DIGEST =
  "73e50fb15aac4cd95c86151cc43f002b5c76986584846e16d171bd0be99f58d7";
const EXPECTED_TAFSIR_DIGEST =
  "b46b730418767dfacdf34ac35cec4277822a019b631910d603def280c3d56364";

const DATA_FILES = [
  {
    bytes: 1_334_737,
    digest: "ac0724796cbbda0f4801470fbbd11d0f3c5802067bae0493466d0128b0c667af",
    name: "tanzil-text.txt",
    path: "tanzil/text.txt",
  },
  {
    bytes: 77_234,
    digest: "8867c1d88191472adec9db694b3cd9f135b1a2ef580574d32cf888dcb22c5c7a",
    name: "tanzil-data.xml",
    path: "tanzil/data.xml",
  },
  {
    bytes: 1_690_410,
    digest: "213e1aeb515c5bac6ca446955527b8f3c0f9c21e9d1bad9c6857e9e5b282e9b6",
    name: "quranenc-en.xml",
    path: "quranenc/en.xml",
  },
  {
    bytes: 1_820_207,
    digest: "45d0014236443e91af1338fe7b60f9e20741c6ff5b4ee82ead960d111f91071b",
    name: "quranenc-id.xml",
    path: "quranenc/id.xml",
  },
] as const;

const TERMS_FILES = [
  {
    bytes: 7903,
    digest: "795064d93b6b9a9e2df190800a32bfe77add93eb6e978215ddb36f8e0130ccaa",
    name: "tanzil-terms.html",
    path: "tanzil/terms.html",
  },
  {
    bytes: 1_051_521,
    digest: "858791320276bef37616be75f3d57efac5b46463246d7cf5503aab1a6de2c774",
    name: "quranenc-terms.html",
    path: "quranenc/terms.html",
  },
] as const;

/** A pinned source byte, bundle digest, or generated output drifted. */
class QuranSourceFileError extends Schema.TaggedError<QuranSourceFileError>()(
  "QuranSourceFileError",
  { detail: Schema.String }
) {}

/** Reads and verifies one exact official source artifact. */
function readPinned(input: {
  readonly bytes: number;
  readonly digest: string;
  readonly name: string;
  readonly path: string;
}) {
  return Effect.try({
    catch: () =>
      new QuranSourceFileError({
        detail: `Could not verify pinned source ${input.name}.`,
      }),
    try: () => {
      const bytes = readFileSync(join(SOURCE_ROOT, input.path));
      const digest = createHash("sha256").update(bytes).digest("hex");
      if (bytes.byteLength !== input.bytes || digest !== input.digest) {
        return;
      }
      return bytes;
    },
  }).pipe(
    Effect.flatMap((bytes) =>
      bytes
        ? Effect.succeed(bytes)
        : Effect.fail(
            new QuranSourceFileError({
              detail: `Pinned source drifted: ${input.name}.`,
            })
          )
    )
  );
}

/** Adds one named artifact to a domain-separated source bundle digest. */
function updateBundle(
  hash: ReturnType<typeof createHash>,
  name: string,
  bytes: Buffer
) {
  hash.update(`${name}\n${bytes.byteLength}\n`);
  hash.update(bytes);
  hash.update("\n");
}

/** Reads the 114 exact QuranEnc API responses and verifies bundle identity. */
const readTafsir = Effect.fn("AksaraCorpus.readQuranTafsirSources")(
  function* () {
    const hash = createHash("sha256").update(`${TAFSIR_DOMAIN}\n`);
    const buffers: Buffer[] = [];
    for (let number = 1; number <= 114; number += 1) {
      const name = `${number}.json`;
      const bytes = yield* Effect.try({
        catch: () =>
          new QuranSourceFileError({
            detail: `Could not read QuranEnc tafsir source ${name}.`,
          }),
        try: () => readFileSync(join(SOURCE_ROOT, "quranenc", "tafsir", name)),
      });
      updateBundle(hash, name, bytes);
      buffers.push(bytes);
    }
    if (hash.digest("hex") !== EXPECTED_TAFSIR_DIGEST) {
      return yield* new QuranSourceFileError({
        detail: "Pinned QuranEnc tafsir bundle drifted.",
      });
    }
    return buffers;
  }
);

/** Loads and verifies every data and legal source byte before parsing. */
const loadSources = Effect.fn("AksaraCorpus.loadQuranSources")(function* () {
  const arabic = yield* readPinned(DATA_FILES[0]);
  const metadata = yield* readPinned(DATA_FILES[1]);
  const english = yield* readPinned(DATA_FILES[2]);
  const indonesian = yield* readPinned(DATA_FILES[3]);
  yield* Effect.all(TERMS_FILES.map(readPinned), { discard: true });
  const tafsir = yield* readTafsir();
  const bundle = createHash("sha256").update(`${SOURCE_DOMAIN}\n`);
  let sourceBytes = 0;
  for (const [index, input] of DATA_FILES.entries()) {
    const bytes = [arabic, metadata, english, indonesian][index];
    if (!bytes) {
      return yield* new QuranSourceFileError({
        detail: `Missing pinned source ${input.name}.`,
      });
    }
    updateBundle(bundle, input.name, bytes);
    sourceBytes += bytes.byteLength;
  }
  for (const [index, bytes] of tafsir.entries()) {
    updateBundle(bundle, `quranenc-tafsir/${index + 1}.json`, bytes);
    sourceBytes += bytes.byteLength;
  }
  if (
    sourceBytes !== EXPECTED_SOURCE_BYTES ||
    bundle.digest("hex") !== EXPECTED_SOURCE_DIGEST
  ) {
    return yield* new QuranSourceFileError({
      detail: "Complete Quran source bundle drifted.",
    });
  }
  return {
    arabic: arabic.toString("utf8"),
    english: english.toString("utf8"),
    indonesian: indonesian.toString("utf8"),
    metadata: metadata.toString("utf8"),
    tafsir: tafsir.map((bytes) => bytes.toString("utf8")),
  } satisfies RawSources;
});

/** Atomically replaces generated surah modules after every file is ready. */
function writeGenerated(output: ReturnType<typeof renderQuranFiles>) {
  return Effect.try({
    catch: () =>
      new QuranSourceFileError({
        detail: "Could not replace generated Quran modules.",
      }),
    try: () => {
      const staging = mkdtempSync(join(QURAN_ROOT, "surah-stage-"));
      for (const file of output.files) {
        const path = join(staging, file.path);
        mkdirSync(dirname(path), { recursive: true });
        writeFileSync(path, file.content);
      }
      execFileSync("pnpm", ["exec", "biome", "format", "--write", staging], {
        cwd: REPOSITORY_ROOT,
        stdio: "pipe",
      });
      const target = join(QURAN_ROOT, "surah");
      rmSync(target, { force: true, recursive: true });
      renameSync(staging, target);
      writeFileSync(join(QURAN_ROOT, "source.ts"), output.source);
    },
  });
}

/** Regenerates the Quran corpus only from exact verified official bytes. */
const generateQuran = Effect.fn("AksaraCorpus.generateQuran")(function* () {
  const sources = yield* loadSources();
  const surahs = yield* parseQuranSources(sources);
  yield* writeGenerated(renderQuranFiles(surahs));
});

Effect.runSync(generateQuran());
