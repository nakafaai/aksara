import type { BinaryLike } from "node:crypto";
import { describe, expect, it } from "@effect/vitest";
import { Effect } from "effect";

import {
  canonicalizeQuranRow,
  hashQuranRow,
} from "#contracts/quran/snapshot/row/hash";
import { quranRepresentativePayloads } from "#contracts/test/quran";

const failures = vi.hoisted(() => ({ rowHash: false }));

vi.mock("node:crypto", async (importOriginal) => {
  const crypto = await importOriginal<typeof import("node:crypto")>();
  return {
    ...crypto,
    /** Injects deterministic failures into current Quran row hashing. */
    createHash(algorithm: string) {
      const hash = crypto.createHash(algorithm);
      return new Proxy(hash, {
        /** Preserves native binding while intercepting the current row domain. */
        get(target, property, receiver) {
          if (property === "update") {
            return (data: BinaryLike) => {
              if (
                failures.rowHash &&
                String(data).startsWith("nakafa.aksara.quran-row\n")
              ) {
                throw new TypeError("injected current Quran row hash failure");
              }
              target.update(data);
              return receiver;
            };
          }
          const value = Reflect.get(target, property, target);
          return typeof value === "function" ? value.bind(target) : value;
        },
      });
    },
  };
});

describe("Quran row golden identities", () => {
  it("pins the canonical bytes of each representative row kind", () => {
    const expected = {
      "quran-attribution":
        '{"activeAppLocales":["en","id","de"],"kind":"quran-attribution","sources":[{"artifact":{"byteCount":1,"digest":"sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa","fileCount":1},"copy":[{"appLocale":"en","notice":"Technical en notice for tanzil-text.","title":"Technical en source tanzil-text."},{"appLocale":"id","notice":"Technical id notice for tanzil-text.","title":"Technical id source tanzil-text."},{"appLocale":"de","notice":"Technical de notice for tanzil-text.","title":"Technical de source tanzil-text."}],"id":"tanzil-text","kind":"embedded","publisher":"Technical publisher for tanzil-text.","retrievedAt":"2026-07-24T17:57:50Z","sourceUrl":"https://example.test/source/tanzil-text","terms":{"artifact":{"byteCount":1,"digest":"sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa","fileCount":1},"url":"https://example.test/terms/tanzil-text"},"updateUrl":"https://example.test/update/tanzil-text","version":"test-source"},{"artifact":{"byteCount":1,"digest":"sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa","fileCount":1},"copy":[{"appLocale":"en","notice":"Technical en notice for tanzil-metadata.","title":"Technical en source tanzil-metadata."},{"appLocale":"id","notice":"Technical id notice for tanzil-metadata.","title":"Technical id source tanzil-metadata."},{"appLocale":"de","notice":"Technical de notice for tanzil-metadata.","title":"Technical de source tanzil-metadata."}],"id":"tanzil-metadata","kind":"embedded","publisher":"Technical publisher for tanzil-metadata.","retrievedAt":"2026-07-24T17:57:50Z","sourceUrl":"https://example.test/source/tanzil-metadata","terms":{"artifact":{"byteCount":1,"digest":"sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa","fileCount":1},"url":"https://example.test/terms/tanzil-metadata"},"updateUrl":"https://example.test/update/tanzil-metadata","version":"test-source"},{"artifact":{"byteCount":1,"digest":"sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa","fileCount":1},"copy":[{"appLocale":"en","notice":"Technical en notice for kemenag-names.","title":"Technical en source kemenag-names."},{"appLocale":"id","notice":"Technical id notice for kemenag-names.","title":"Technical id source kemenag-names."},{"appLocale":"de","notice":"Technical de notice for kemenag-names.","title":"Technical de source kemenag-names."}],"id":"kemenag-names","kind":"embedded","publisher":"Technical publisher for kemenag-names.","retrievedAt":"2026-07-24T17:57:50Z","sourceUrl":"https://example.test/source/kemenag-names","terms":{"artifact":{"byteCount":1,"digest":"sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa","fileCount":1},"url":"https://example.test/terms/kemenag-names"},"updateUrl":"https://example.test/update/kemenag-names","version":"test-source"},{"artifact":{"byteCount":1,"digest":"sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa","fileCount":1},"copy":[{"appLocale":"en","notice":"Technical en notice for bubenheim-names.","title":"Technical en source bubenheim-names."},{"appLocale":"id","notice":"Technical id notice for bubenheim-names.","title":"Technical id source bubenheim-names."},{"appLocale":"de","notice":"Technical de notice for bubenheim-names.","title":"Technical de source bubenheim-names."}],"id":"bubenheim-names","kind":"embedded","publisher":"Technical publisher for bubenheim-names.","retrievedAt":"2026-07-24T17:57:50Z","sourceUrl":"https://example.test/source/bubenheim-names","terms":{"artifact":{"byteCount":1,"digest":"sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa","fileCount":1},"url":"https://example.test/terms/bubenheim-names"},"updateUrl":"https://example.test/update/bubenheim-names","version":"test-source"},{"artifact":{"byteCount":1,"digest":"sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa","fileCount":1},"copy":[{"appLocale":"en","notice":"Technical en notice for quranenc-english.","title":"Technical en source quranenc-english."},{"appLocale":"id","notice":"Technical id notice for quranenc-english.","title":"Technical id source quranenc-english."},{"appLocale":"de","notice":"Technical de notice for quranenc-english.","title":"Technical de source quranenc-english."}],"id":"quranenc-english","kind":"embedded","publisher":"Technical publisher for quranenc-english.","retrievedAt":"2026-07-24T17:57:50Z","sourceUrl":"https://example.test/source/quranenc-english","terms":{"artifact":{"byteCount":1,"digest":"sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa","fileCount":1},"url":"https://example.test/terms/quranenc-english"},"updateUrl":"https://example.test/update/quranenc-english","version":"test-source"},{"artifact":{"byteCount":1,"digest":"sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa","fileCount":1},"copy":[{"appLocale":"en","notice":"Technical en notice for quranenc-indonesian.","title":"Technical en source quranenc-indonesian."},{"appLocale":"id","notice":"Technical id notice for quranenc-indonesian.","title":"Technical id source quranenc-indonesian."},{"appLocale":"de","notice":"Technical de notice for quranenc-indonesian.","title":"Technical de source quranenc-indonesian."}],"id":"quranenc-indonesian","kind":"embedded","publisher":"Technical publisher for quranenc-indonesian.","retrievedAt":"2026-07-24T17:57:50Z","sourceUrl":"https://example.test/source/quranenc-indonesian","terms":{"artifact":{"byteCount":1,"digest":"sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa","fileCount":1},"url":"https://example.test/terms/quranenc-indonesian"},"updateUrl":"https://example.test/update/quranenc-indonesian","version":"test-source"},{"artifact":{"byteCount":1,"digest":"sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa","fileCount":1},"copy":[{"appLocale":"en","notice":"Technical en notice for quranenc-german.","title":"Technical en source quranenc-german."},{"appLocale":"id","notice":"Technical id notice for quranenc-german.","title":"Technical id source quranenc-german."},{"appLocale":"de","notice":"Technical de notice for quranenc-german.","title":"Technical de source quranenc-german."}],"id":"quranenc-german","kind":"embedded","publisher":"Technical publisher for quranenc-german.","retrievedAt":"2026-07-24T17:57:50Z","sourceUrl":"https://example.test/source/quranenc-german","terms":{"artifact":{"byteCount":1,"digest":"sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa","fileCount":1},"url":"https://example.test/terms/quranenc-german"},"updateUrl":"https://example.test/update/quranenc-german","version":"test-source"},{"artifact":{"byteCount":1,"digest":"sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa","fileCount":114},"copy":[{"appLocale":"en","notice":"Technical en notice for quranenc-tafsir.","title":"Technical en source quranenc-tafsir."},{"appLocale":"id","notice":"Technical id notice for quranenc-tafsir.","title":"Technical id source quranenc-tafsir."},{"appLocale":"de","notice":"Technical de notice for quranenc-tafsir.","title":"Technical de source quranenc-tafsir."}],"id":"quranenc-tafsir","kind":"embedded","publisher":"Technical publisher for quranenc-tafsir.","retrievedAt":"2026-07-24T17:57:50Z","sourceUrl":"https://example.test/source/quranenc-tafsir","terms":{"artifact":{"byteCount":1,"digest":"sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa","fileCount":1},"url":"https://example.test/terms/quranenc-tafsir"},"updateUrl":"https://example.test/update/quranenc-tafsir","version":"test-source"},{"copy":[{"appLocale":"en","notice":"Technical en notice for mokhtasar-english.","title":"Technical en source mokhtasar-english."},{"appLocale":"id","notice":"Technical id notice for mokhtasar-english.","title":"Technical id source mokhtasar-english."},{"appLocale":"de","notice":"Technical de notice for mokhtasar-english.","title":"Technical de source mokhtasar-english."}],"id":"mokhtasar-english","kind":"external","publisher":"Technical publisher for mokhtasar-english.","retrievedAt":"2026-07-24T17:57:50Z","sourceUrl":"https://example.test/source/mokhtasar-english","terms":{"access":"link-only","url":"https://example.test/terms/mokhtasar-english"},"updateUrl":"https://example.test/update/mokhtasar-english","version":"test-source"},{"copy":[{"appLocale":"en","notice":"Technical en notice for mokhtasar-german.","title":"Technical en source mokhtasar-german."},{"appLocale":"id","notice":"Technical id notice for mokhtasar-german.","title":"Technical id source mokhtasar-german."},{"appLocale":"de","notice":"Technical de notice for mokhtasar-german.","title":"Technical de source mokhtasar-german."}],"id":"mokhtasar-german","kind":"external","publisher":"Technical publisher for mokhtasar-german.","retrievedAt":"2026-07-24T17:57:50Z","sourceUrl":"https://example.test/source/mokhtasar-german","terms":{"access":"link-only","url":"https://example.test/terms/mokhtasar-german"},"updateUrl":"https://example.test/update/mokhtasar-german","version":"test-source"}],"tafsirAccess":[{"appLocale":"en","kind":"external","notice":"Technical English external Tafsir notice.","sourceId":"mokhtasar-english"},{"appLocale":"id","kind":"embedded","notice":"Catatan teknis tafsir Indonesia.","sourceId":"quranenc-tafsir"},{"appLocale":"de","kind":"external","notice":"Technischer deutscher externer Tafsirhinweis.","sourceId":"mokhtasar-german"}]}',
      "quran-chunk":
        '{"firstQuranNumber":1,"firstVerse":1,"kind":"quran-chunk","lastVerse":2,"surahNumber":1,"verses":[{"meta":{"hizbQuarter":1,"juz":1,"manzil":1,"page":1,"ruku":1,"sajda":null},"number":{"inQuran":1,"inSurah":1},"tafsir":[{"appLocale":"id","footnotes":null,"text":"Tafsir teknis"}],"text":{"arabic":"نص"},"translations":[{"appLocale":"en","value":{"footnotes":"","text":"Technical text"}},{"appLocale":"id","value":{"footnotes":"","text":"Teks teknis"}},{"appLocale":"de","value":{"footnotes":"","text":"Technischer Text"}}]},{"meta":{"hizbQuarter":1,"juz":1,"manzil":1,"page":1,"ruku":1,"sajda":null},"number":{"inQuran":2,"inSurah":2},"tafsir":[{"appLocale":"id","footnotes":null,"text":"Tafsir teknis"}],"text":{"arabic":"نص"},"translations":[{"appLocale":"en","value":{"footnotes":"","text":"Technical text"}},{"appLocale":"id","value":{"footnotes":"","text":"Teks teknis"}},{"appLocale":"de","value":{"footnotes":"","text":"Technischer Text"}}]}]}',
      "quran-search":
        '{"appLocale":"en","graph":{"alignmentId":"alignment:quran:quran-surah:1","assetId":"asset:en:quran:quran-surah:1","conceptId":"concept:quran:surah:1","learningObjectId":"lo:quran-surah:1","lensId":"lens:quran"},"kind":"quran-search","route":"quran/1","surahNumber":1,"text":"Test-only Quran search text","title":"Test-only Quran title"}',
      "quran-surah":
        '{"kind":"quran-surah","name":{"arabic":"سورة 1","meaning":{"de":"Technische Sure 1","en":"Test Surah 1","id":"Surah Teknis 1"},"transliteration":"Test-Surah-1"},"number":1,"numberOfVerses":2,"revelation":{"order":1,"place":"Meccan"}}',
    };
    for (const payload of quranRepresentativePayloads()) {
      expect(canonicalizeQuranRow(payload)).toBe(expected[payload.kind]);
    }
  });

  it.effect(
    "pins the authenticated identity of each representative row kind",
    () =>
      Effect.gen(function* () {
        const expected = {
          "quran-attribution":
            "sha256:46ba00c852995a77e84fbde18d23d89c4638f91dc9fbd6589ec0628fb0678e4b",
          "quran-chunk":
            "sha256:5a2963937b483574eb2808eeb1ad5985f6823d4bb7af8e9818b04b81ec3ad50d",
          "quran-search":
            "sha256:2365807d01791dc0f54aa80419b211f63ae510c6643d9b7438e457f63524c861",
          "quran-surah":
            "sha256:a781e90e24f96c26699f6fbc72300111c187c0815a2a8ae6e96065643bf34419",
        };
        for (const payload of quranRepresentativePayloads()) {
          expect(yield* hashQuranRow(payload)).toBe(expected[payload.kind]);
        }
      })
  );
});

describe("Quran row hashing", () => {
  it("signs the source locale and text of a surah name meaning", () => {
    const payload = quranRepresentativePayloads().find(
      (candidate) => candidate.kind === "quran-surah"
    );

    expect(payload && canonicalizeQuranRow(payload)).toContain(
      '"meaning":{"de":"Technische Sure 1","en":"Test Surah 1","id":"Surah Teknis 1"}'
    );
  });

  it.effect("maps current row hashing failures to the typed error", () =>
    Effect.gen(function* () {
      const payload = yield* Effect.fromNullishOr(
        quranRepresentativePayloads().find(
          (candidate) => candidate.kind === "quran-surah"
        )
      );
      yield* Effect.acquireRelease(
        Effect.sync(() => {
          failures.rowHash = true;
        }),
        () =>
          Effect.sync(() => {
            failures.rowHash = false;
          })
      );

      const error = yield* hashQuranRow(payload).pipe(Effect.flip);

      expect(error).toMatchObject({
        _tag: "QuranRowHashError",
        scope: "row",
      });
    })
  );
});
