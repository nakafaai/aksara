import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "@effect/vitest";
import { Effect } from "effect";

import {
  parseQuranMetadata,
  quranMarkerAt,
} from "#corpus/quran/source/metadata";

const metadataSource = readFileSync(
  resolve(import.meta.dirname, "../sources/tanzil/data.xml"),
  "utf8"
);
const LAST_SURAH_PATTERN = /\s*<sura index="114"[^>]+\/>/u;

/** Parses one metadata source only at the test runner boundary. */
function parse(source: string) {
  return Effect.runPromise(parseQuranMetadata(source));
}

/** Returns one typed metadata rejection at the test runner boundary. */
function reject(source: string) {
  return Effect.runPromise(parseQuranMetadata(source).pipe(Effect.flip));
}

describe("Quran metadata parsing", () => {
  it("parses the complete ordered Tanzil metadata model", async () => {
    const metadata = await parse(metadataSource);

    expect(metadata.surahs).toHaveLength(114);
    expect(metadata.sajdas).toHaveLength(15);
    expect(quranMarkerAt(metadata.juzs, 0)).toBeUndefined();
    expect(quranMarkerAt(metadata.juzs, 1)).toBe(1);
    expect(quranMarkerAt(metadata.juzs, 6236)).toBe(30);
  });

  it("rejects incomplete and malformed surah attributes", async () => {
    const errors = await Promise.all([
      reject(metadataSource.replace('name="الفاتحة"', 'name=""')),
      reject(metadataSource.replace('ename="The Opening"', 'ename=""')),
      reject(metadataSource.replace('tname="Al-Faatiha"', 'tname=""')),
      reject(metadataSource.replace('type="Meccan"', 'type="Other"')),
      reject(metadataSource.replace('order="5"', 'order="invalid"')),
    ]);

    expect(
      errors.every(({ detail }) =>
        detail.startsWith("Invalid Tanzil surah metadata:")
      )
    ).toBe(true);
  });

  it("rejects incomplete, unordered, and miscounted surah inventories", async () => {
    const withoutLast = metadataSource.replace(LAST_SURAH_PATTERN, "");
    const errors = await Promise.all([
      reject(withoutLast),
      reject(metadataSource.replace('sura index="2"', 'sura index="3"')),
      reject(
        metadataSource.replace('index="1" ayas="7"', 'index="1" ayas="8"')
      ),
    ]);

    expect(errors.map(({ detail }) => detail)).toEqual([
      "Tanzil surah inventory is incomplete.",
      "Tanzil surah inventory is incomplete.",
      "Tanzil surah inventory is incomplete.",
    ]);
  });

  it("rejects invalid marker indexes and verse positions", async () => {
    const errors = await Promise.all([
      reject(metadataSource.replace('<juz index="1"', '<juz index="x"')),
      reject(
        metadataSource.replace(
          '<juz index="1" sura="1" aya="1" />',
          '<juz index="1" sura="0" aya="1" />'
        )
      ),
    ]);

    expect(
      errors.every(({ detail }) =>
        detail.startsWith("Invalid Tanzil juz marker:")
      )
    ).toBe(true);
  });

  it("rejects absent and misplaced first partition markers", async () => {
    const errors = await Promise.all([
      reject(metadataSource.replace(/\s*<manzil [^>]+\/>/gu, "")),
      reject(
        metadataSource.replace(
          '<ruku index="1" sura="1" aya="1" />',
          '<ruku index="1" sura="1" aya="2" />'
        )
      ),
    ]);

    expect(errors.map(({ detail }) => detail)).toEqual([
      "Missing first Tanzil manzil marker.",
      "Missing first Tanzil ruku marker.",
    ]);
  });

  it("rejects invalid sajda positions and classifications", async () => {
    const errors = await Promise.all([
      reject(
        metadataSource.replace(
          '<sajda index="1" sura="7" aya="206"',
          '<sajda index="1" sura="0" aya="206"'
        )
      ),
      reject(metadataSource.replace('type="recommended"', 'type="other"')),
    ]);

    expect(
      errors.every(({ detail }) =>
        detail.startsWith("Invalid Tanzil sajda marker:")
      )
    ).toBe(true);
  });
});
