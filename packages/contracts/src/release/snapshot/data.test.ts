import { describe, expect, it } from "@effect/vitest";
import { Array as Arr, Effect, Exit, HashSet, Schema } from "effect";
import { Hex } from "effect/encoding";
import { ASSESSMENT_ROW_KINDS } from "#contracts/assessment/snapshot";
import { digestSha256 } from "#contracts/hash/digest";

import {
  ContentSnapshotManifestSchema,
  ContentSnapshotRowSchema,
  canonicalizeContentSnapshotRow,
  contentSnapshotId,
} from "#contracts/release/snapshot/data";
import {
  curriculumChildRow,
  curriculumRootRow,
  optionalProgramRow,
  programRow,
} from "#contracts/test/row/program";
import { quranSearchRow } from "#contracts/test/row/quran";
import { makeSnapshotTestData } from "#contracts/test/snapshot";
import { JsonTextSchema } from "#contracts/text/json";

describe("structured snapshot data", () => {
  it.effect("returns every current domain manifest identity", () =>
    Effect.gen(function* () {
      const snapshotData = yield* makeSnapshotTestData();
      const identities = Arr.map(snapshotData.manifests, contentSnapshotId);

      expect(identities).toHaveLength(3);
      expect(HashSet.size(HashSet.fromIterable(identities))).toBe(3);
    })
  );

  it.effect("strictly decodes each family envelope", () =>
    Effect.gen(function* () {
      const snapshotData = yield* makeSnapshotTestData();
      const decode = Schema.decodeUnknownExit(ContentSnapshotManifestSchema, {
        onExcessProperty: "error",
      });

      expect(
        Arr.every(snapshotData.manifests, (value) =>
          Exit.isSuccess(decode(value))
        )
      ).toBe(true);
      expect(
        Arr.every(snapshotData.manifests, (value) =>
          Exit.isFailure(decode({ ...value, extra: true }))
        )
      ).toBe(true);
    })
  );

  it.effect("serializes every current row without ambiguous nesting", () =>
    Effect.gen(function* () {
      const snapshotData = yield* makeSnapshotTestData();
      const decode = Schema.decodeUnknownExit(ContentSnapshotRowSchema, {
        onExcessProperty: "error",
      });

      expect(
        Arr.every(snapshotData.rows, (row) =>
          Exit.isSuccess(
            decode(
              Schema.decodeSync(JsonTextSchema)(
                canonicalizeContentSnapshotRow(row)
              )
            )
          )
        )
      ).toBe(true);
      expect(
        Arr.dedupe(
          Arr.flatMap(snapshotData.rows, (row) =>
            row.family === "assessment" ? [row.record.row.kind] : []
          )
        )
      ).toEqual(ASSESSMENT_ROW_KINDS);
    })
  );

  it("pins the canonical bytes of a program snapshot row", () => {
    expect(canonicalizeContentSnapshotRow(programRow)).toBe(
      '{"family":"program","record":{"kind":"program","row":{"defaultCoverageStatus":"planned","displayOrder":10,"iconKey":"school","key":"test-program-1","kind":"school-curriculum","navigation":{"levels":["stage","subject"],"model":"curriculum-tree"},"provider":{"kind":"nakafa","name":"Nakafa test suite"},"sources":[{"label":"Sumber uji 1 é","retrievedAt":"2026-01-01","type":"nakafa-editorial","url":"https://example.test/program-1"}],"translations":[{"appLocale":"en","publicSlug":"test-program-1","title":"Test Program 1"},{"appLocale":"id","publicSlug":"program-uji-1","title":"Program Uji 1 é"},{"appLocale":"de","publicSlug":"testprogramm-1","title":"Testprogramm 1"}],"version":{"label":"Test version"}},"rowHash":"sha256:8f55b9138a912c8eef38428cafa4735edd6d0eba2e9805d3f5e83731a786ee70"}}'
    );
  });

  it("pins the canonical bytes of a program snapshot row with optional fields", () => {
    expect(canonicalizeContentSnapshotRow(optionalProgramRow)).toBe(
      '{"family":"program","record":{"kind":"program","row":{"defaultCoverageStatus":"available","displayOrder":20,"iconKey":"mathematics","key":"test-program-2","kind":"admission-exam","navigation":{"levels":["section","set"],"model":"exam-domain-set"},"provider":{"homeCountry":"ZZ","kind":"official","name":"Lembaga uji é"},"recommendedCountry":"ZZ","sources":[{"label":"Sumber uji é 2","retrievedAt":"2026-01-02","reviewAfter":"2026-06-30","type":"official-portal","url":"https://example.test/program-2"}],"translations":[{"appLocale":"en","publicSlug":"test-program-2","title":"Test Program 2"},{"appLocale":"id","publicSlug":"program-uji-2","title":"Program Uji 2 é"}],"version":{"endsAt":"2026-12-31","label":"Versi uji 2026","startsAt":"2026-01-01"}},"rowHash":"sha256:1111111111111111111111111111111111111111111111111111111111111111"}}'
    );
  });

  it("pins the canonical bytes of a program curriculum root route row", () => {
    expect(canonicalizeContentSnapshotRow(curriculumRootRow)).toBe(
      '{"family":"program","record":{"kind":"curriculum","row":{"appLocale":"id","iconKey":"school","kind":"curriculum-context","level":"track","nodeKey":"test-program-1:root","order":10,"programKey":"test-program-1","publicPath":"kurikulum/program-uji-1","sitemap":true,"sourcePath":"packages/corpus/curriculum/test-program-1","title":"Program Uji 1 é"},"rowHash":"sha256:2222222222222222222222222222222222222222222222222222222222222222"}}'
    );
  });

  it("pins the canonical bytes of a program curriculum child route row with material ownership", () => {
    expect(canonicalizeContentSnapshotRow(curriculumChildRow)).toBe(
      '{"family":"program","record":{"kind":"curriculum","row":{"appLocale":"id","canonicalPath":"mathematics/algebra/linear-equations","displayGroupIconKey":"mathematics","displayGroupTitle":"Matematika é","iconKey":"mathematics","kind":"curriculum-context","level":"subject","materialCardDescription":"Deskripsi kartu é","materialCardTitle":"Judul kartu é","materialContextNodeKey":"algebra","materialContextParentPath":"kurikulum/program-uji-1","materialContextPublicPath":"kurikulum/program-uji-1/algebra","materialDomain":"mathematics","materialKey":"lesson.mathematics.linear-equations","nodeKey":"algebra","order":2,"parentPath":"kurikulum/program-uji-1","programKey":"test-program-1","publicPath":"kurikulum/program-uji-1/algebra","sitemap":true,"sourcePath":"packages/corpus/curriculum/test-program-1","title":"Aljabar é"},"rowHash":"sha256:3333333333333333333333333333333333333333333333333333333333333333"}}'
    );
  });

  it.effect("pins the sha256 of every canonical assessment snapshot row", () =>
    Effect.gen(function* () {
      const snapshotData = yield* makeSnapshotTestData();
      const assessmentRows = Arr.filter(
        snapshotData.rows,
        (row) => row.family === "assessment"
      );
      const canonical = Arr.join(
        Arr.map(assessmentRows, canonicalizeContentSnapshotRow),
        "\n"
      );

      expect(assessmentRows.length).toBe(24);
      expect(
        Hex.encode(yield* digestSha256(new TextEncoder().encode(canonical)))
      ).toBe(
        "fc191f9d12576439524bbbc854c97422336a1123c9f5262e321be9a65ab2afd4"
      );
    })
  );

  it("pins the canonical bytes of a Quran search snapshot row", () => {
    expect(canonicalizeContentSnapshotRow(quranSearchRow)).toBe(
      '{"family":"quran","record":{"payload":{"appLocale":"id","graph":{"alignmentId":"alignment:quran:quran-surah:1","assetId":"asset:id:quran:quran-surah:1","conceptId":"concept:quran:surah:1","learningObjectId":"lo:quran-surah:1","lensId":"lens:quran"},"kind":"quran-search","route":"quran/1","surahNumber":1,"text":"Surah pembuka é","title":"Al-Fatihah é"},"rowHash":"sha256:bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb","snapshotId":"sha256:cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc"}}'
    );
  });

  it.effect(
    "pins the sha256 of every canonical Quran snapshot row",
    () =>
      Effect.gen(function* () {
        const snapshotData = yield* makeSnapshotTestData();
        const quranRows = Arr.filter(
          snapshotData.rows,
          (row) => row.family === "quran"
        );
        const canonical = Arr.join(
          Arr.map(quranRows, canonicalizeContentSnapshotRow),
          "\n"
        );

        expect(quranRows.length).toBe(1542);
        expect(
          Hex.encode(yield* digestSha256(new TextEncoder().encode(canonical)))
        ).toBe(
          "db50217860f1291996b6d4cd956d50fa42e0ec7892b9a360a83eb5ca72fdefdd"
        );
      }),
    30_000
  );
});
