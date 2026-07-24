import type { Surah } from "#corpus/scripts/quran/model";

const CHUNK_SIZE = 6;
const GENERATED_NOTICE = `/**
 * Generated from pinned official sources. Do not edit by hand.
 * Tanzil Quran Text (Uthmani, Version 1.1).
 * Copyright (C) 2007-2026 Tanzil Project. CC BY 3.0.
 * Distributed verbatim; changing the text is not allowed.
 * Source and updates: https://tanzil.net and https://tanzil.net/updates/
 * English Rwwad v1.0.19-xml.1, Rowwad Translation Center.
 * Indonesian Affairs v1.0.1-xml.1, Ministry of Religious Affairs.
 * Indonesian Al-Mukhtasar v1.0.0, Tafsir Center for Quranic Studies.
 * QuranEnc content is unmodified. Source and terms: https://quranenc.com/en/
 */`;

export interface GeneratedQuranFile {
  readonly content: string;
  readonly path: string;
}

/** Renders one exact source value as executable TypeScript data. */
function renderValue(value: unknown) {
  return JSON.stringify(value, undefined, 2);
}

/** Renders one bounded verse chunk without adding source fields. */
function renderChunk(
  surahNumber: number,
  firstVerse: number,
  lastVerse: number,
  verses: Surah["verses"]
) {
  const name = `quranSurah${surahNumber}Verses${firstVerse}To${lastVerse}`;
  return `${GENERATED_NOTICE}
export const ${name} = ${renderValue(verses)};
`;
}

/** Renders one surah module that preserves independently bounded chunks. */
function renderSurah(surah: Surah) {
  const imports: string[] = [];
  const spreads: string[] = [];
  for (let index = 0; index < surah.verses.length; index += CHUNK_SIZE) {
    const firstVerse = index + 1;
    const lastVerse = Math.min(index + CHUNK_SIZE, surah.verses.length);
    const name = `quranSurah${surah.number}Verses${firstVerse}To${lastVerse}`;
    imports.push(
      `import { ${name} } from "#corpus/quran/surah/${surah.number}/${firstVerse}-${lastVerse}";`
    );
    spreads.push(`...${name}`);
  }
  const metadata = {
    name: surah.name,
    number: surah.number,
    numberOfVerses: surah.numberOfVerses,
    revelation: surah.revelation,
  };
  const renderedMetadata = renderValue(metadata);
  const body = renderedMetadata.slice(0, -2);
  return `${imports.join("\n")}

${GENERATED_NOTICE}
export const quranSurah${surah.number} = ${body},
  "verses": [${spreads.join(", ")}]
};
`;
}

/** Renders the canonical surah import stream without a facade re-export. */
function renderSource(surahs: readonly Surah[]) {
  const imports = surahs
    .map(
      ({ number }) =>
        `import { quranSurah${number} } from "#corpus/quran/surah/${number}";`
    )
    .join("\n");
  const rows = surahs.map(({ number }) => `  quranSurah${number},`).join("\n");
  return `import { Stream } from "effect";

${imports}

const quranSurahSources: readonly unknown[] = [
${rows}
];

/** Exposes reviewed Quran data as independently consumable surah sources. */
export const quranSurahSourceStream = Stream.fromIterable(quranSurahSources);
`;
}

/** Produces every generated Quran module from one completely decoded model. */
export function renderQuranFiles(surahs: readonly Surah[]) {
  const files: GeneratedQuranFile[] = [];
  for (const surah of surahs) {
    for (let index = 0; index < surah.verses.length; index += CHUNK_SIZE) {
      const firstVerse = index + 1;
      const lastVerse = Math.min(index + CHUNK_SIZE, surah.verses.length);
      files.push({
        content: renderChunk(
          surah.number,
          firstVerse,
          lastVerse,
          surah.verses.slice(index, index + CHUNK_SIZE)
        ),
        path: `${surah.number}/${firstVerse}-${lastVerse}.ts`,
      });
    }
    files.push({
      content: renderSurah(surah),
      path: `${surah.number}.ts`,
    });
  }
  return {
    files,
    source: renderSource(surahs),
  };
}
