import { createHash } from "node:crypto";
import { describe, expect, it } from "@effect/vitest";
import { Effect, Exit, Schema } from "effect";

import {
  ContentSnapshotManifestSchema,
  ContentSnapshotRowSchema,
  canonicalizeContentSnapshotRow,
  contentSnapshotId,
} from "#contracts/release/snapshot/data";
import {
  countryRow,
  entrySectionRow,
  examRow,
  fullSetRow,
  markedSectionRow,
  setRow,
  trackRow,
} from "#contracts/test/row/catalog";
import {
  placementRow,
  scoredPlacementRow,
} from "#contracts/test/row/placement";
import {
  curriculumChildRow,
  curriculumRootRow,
  optionalProgramRow,
  programRow,
} from "#contracts/test/row/program";
import { quranSearchRow } from "#contracts/test/row/quran";
import { makeSnapshotTestData } from "#contracts/test/snapshot";

describe("structured snapshot data", () => {
  it.effect("returns every current domain manifest identity", () =>
    Effect.gen(function* () {
      const snapshotData = yield* makeSnapshotTestData();
      const identities = snapshotData.manifests.map(contentSnapshotId);

      expect(identities).toHaveLength(3);
      expect(new Set(identities).size).toBe(3);
    })
  );

  it.effect("strictly decodes each family envelope", () =>
    Effect.gen(function* () {
      const snapshotData = yield* makeSnapshotTestData();
      const decode = Schema.decodeUnknownExit(ContentSnapshotManifestSchema, {
        onExcessProperty: "error",
      });

      expect(
        snapshotData.manifests.every((value) => Exit.isSuccess(decode(value)))
      ).toBe(true);
      expect(
        snapshotData.manifests.every((value) =>
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
        snapshotData.rows.every((row) =>
          Exit.isSuccess(
            decode(JSON.parse(canonicalizeContentSnapshotRow(row)))
          )
        )
      ).toBe(true);
      expect(
        snapshotData.rows
          .filter((row) => row.family === "tryout")
          .map((row) => row.rowKind)
      ).toContain("placement");
    })
  );

  it("pins the canonical bytes of a program snapshot row", () => {
    expect(canonicalizeContentSnapshotRow(programRow)).toBe(
      '{"family":"program","record":{"kind":"program","row":{"defaultCoverageStatus":"planned","displayOrder":10,"iconKey":"school","key":"test-program-1","kind":"school-curriculum","navigation":{"levels":["stage","subject"],"model":"curriculum-tree"},"provider":{"kind":"nakafa","name":"Nakafa test suite"},"sources":[{"label":"Sumber uji 1 é","retrievedAt":"2026-01-01","type":"nakafa-editorial","url":"https://example.test/program-1"}],"translations":[{"appLocale":"en","publicSlug":"test-program-1","title":"Test Program 1"},{"appLocale":"id","publicSlug":"program-uji-1","title":"Program Uji 1 é"},{"appLocale":"de","publicSlug":"testprogramm-1","title":"Testprogramm 1"}],"version":{"label":"Test version"}},"rowHash":"sha256:8f55b9138a912c8eef38428cafa4735edd6d0eba2e9805d3f5e83731a786ee70"}}'
    );
  });

  it("pins the canonical bytes of a program snapshot row with optional fields", () => {
    expect(canonicalizeContentSnapshotRow(optionalProgramRow)).toBe(
      '{"family":"program","record":{"kind":"program","row":{"defaultCoverageStatus":"available","displayOrder":20,"iconKey":"mathematics","key":"test-program-2","kind":"admission-exam","navigation":{"levels":["section","set"],"model":"exam-domain-set"},"provider":{"homeCountry":"ID","kind":"official","name":"Lembaga uji é"},"recommendedCountry":"ID","sources":[{"label":"Sumber uji é 2","retrievedAt":"2026-01-02","reviewAfter":"2026-06-30","type":"official-portal","url":"https://example.test/program-2"}],"translations":[{"appLocale":"en","publicSlug":"test-program-2","title":"Test Program 2"},{"appLocale":"id","publicSlug":"program-uji-2","title":"Program Uji 2 é"}],"version":{"endsAt":"2026-12-31","label":"Versi uji 2026","startsAt":"2026-01-01"}},"rowHash":"sha256:1111111111111111111111111111111111111111111111111111111111111111"}}'
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

  it("pins the canonical bytes of a try-out catalog row", () => {
    expect(canonicalizeContentSnapshotRow(countryRow)).toBe(
      '{"family":"tryout","record":{"row":{"appLocale":"de","graph":{"alignmentId":"alignment:material:lesson:tryout:material-section:tryout:catalog:country","assetId":"asset:de:material:lesson:tryout:material-section:tryout:catalog:country","conceptId":"concept:material:lesson:tryout:catalog","learningObjectId":"lo:material-section:tryout:catalog:country","lensId":"lens:material:lesson:tryout"},"sourceRevision":"2026-08-12","title":"Judul uji é","countryCode":"ID","countryKey":"indonesia","kind":"country","order":1,"publicPath":"try-out/indonesia"},"rowHash":"sha256:5837245a718549d1811a9d3d95a6b163bd51cf88b2682ac35fbbf579f41e53de"},"rowKind":"catalog"}'
    );
  });

  it("pins the canonical bytes of a try-out exam catalog row with a description", () => {
    expect(canonicalizeContentSnapshotRow(examRow)).toBe(
      '{"family":"tryout","record":{"row":{"appLocale":"id","description":"Deskripsi ujian é","graph":{"alignmentId":"alignment:material:lesson:tryout:material-section:tryout:catalog:exam","assetId":"asset:id:material:lesson:tryout:material-section:tryout:catalog:exam","conceptId":"concept:material:lesson:tryout:catalog","learningObjectId":"lo:material-section:tryout:catalog:exam","lensId":"lens:material:lesson:tryout"},"sourceRevision":"2026-08-12","title":"Ujian uji é","countryKey":"indonesia","examKey":"snbt","kind":"exam","order":1,"publicPath":"try-out/indonesia/snbt","scoringStrategy":"irt"},"rowHash":"sha256:4444444444444444444444444444444444444444444444444444444444444444"},"rowKind":"catalog"}'
    );
  });

  it("pins the canonical bytes of a try-out track catalog row", () => {
    expect(canonicalizeContentSnapshotRow(trackRow)).toBe(
      '{"family":"tryout","record":{"row":{"appLocale":"en","graph":{"alignmentId":"alignment:material:lesson:tryout:material-section:tryout:catalog:track","assetId":"asset:en:material:lesson:tryout:material-section:tryout:catalog:track","conceptId":"concept:material:lesson:tryout:catalog","learningObjectId":"lo:material-section:tryout:catalog:track","lensId":"lens:material:lesson:tryout"},"sourceRevision":"2026-08-12","title":"Trek uji é","countryKey":"indonesia","examKey":"snbt","kind":"track","order":1,"publicPath":"try-out/indonesia/snbt/2027","questionCount":2,"sectionCount":2,"setCount":1,"trackKey":"2027","trackKind":"year","visibleSectionCount":0},"rowHash":"sha256:5555555555555555555555555555555555555555555555555555555555555555"},"rowKind":"catalog"}'
    );
  });

  it("pins the canonical bytes of a try-out set catalog row with an internal entry section", () => {
    expect(canonicalizeContentSnapshotRow(setRow)).toBe(
      '{"family":"tryout","record":{"row":{"appLocale":"en","graph":{"alignmentId":"alignment:material:lesson:tryout:material-section:tryout:catalog:set","assetId":"asset:en:material:lesson:tryout:material-section:tryout:catalog:set","conceptId":"concept:material:lesson:tryout:catalog","learningObjectId":"lo:material-section:tryout:catalog:set","lensId":"lens:material:lesson:tryout"},"sourceRevision":"2026-08-12","title":"Set uji é","countryKey":"indonesia","examKey":"snbt","internalEntrySectionKey":"quantitative-knowledge","kind":"set","order":1,"publicPath":"try-out/indonesia/snbt/2027/set-1","questionCount":1,"scoringStrategy":"irt","sectionCount":1,"setKey":"set-1","trackKey":"2027","visibleSectionCount":0},"rowHash":"sha256:6666666666666666666666666666666666666666666666666666666666666666"},"rowKind":"catalog"}'
    );
  });

  it("pins the canonical bytes of a try-out set catalog row with every section visible", () => {
    expect(canonicalizeContentSnapshotRow(fullSetRow)).toBe(
      '{"family":"tryout","record":{"row":{"appLocale":"en","graph":{"alignmentId":"alignment:material:lesson:tryout:material-section:tryout:catalog:set-2","assetId":"asset:en:material:lesson:tryout:material-section:tryout:catalog:set-2","conceptId":"concept:material:lesson:tryout:catalog","learningObjectId":"lo:material-section:tryout:catalog:set-2","lensId":"lens:material:lesson:tryout"},"sourceRevision":"2026-08-12","title":"Set dua é","countryKey":"indonesia","examKey":"snbt","kind":"set","order":2,"publicPath":"try-out/indonesia/snbt/2027/set-2","questionCount":2,"scoringStrategy":"penalized","sectionCount":2,"setKey":"set-2","trackKey":"2027","visibleSectionCount":2},"rowHash":"sha256:7777777777777777777777777777777777777777777777777777777777777777"},"rowKind":"catalog"}'
    );
  });

  it("pins the canonical bytes of a visible try-out section catalog row with marks", () => {
    expect(canonicalizeContentSnapshotRow(markedSectionRow)).toBe(
      '{"family":"tryout","record":{"row":{"appLocale":"en","description":"Deskripsi bagian é","graph":{"alignmentId":"alignment:material:lesson:tryout:material-section:tryout:catalog:section-visible","assetId":"asset:en:material:lesson:tryout:material-section:tryout:catalog:section-visible","conceptId":"concept:material:lesson:tryout:catalog","learningObjectId":"lo:material-section:tryout:catalog:section-visible","lensId":"lens:material:lesson:tryout"},"sourceRevision":"2026-08-12","title":"Bagian uji é","countryKey":"indonesia","examKey":"snbt","kind":"section","marks":{"blank":0,"correct":4,"wrong":-1},"order":1,"publicPath":"try-out/indonesia/snbt/2027/set-2/quantitative-knowledge","questionCount":2,"questionSourcePath":"packages/corpus/question-bank/tryout/indonesia/snbt/quantitative-knowledge/set-2","sectionKey":"quantitative-knowledge","setKey":"set-2","timeLimitSeconds":1800,"trackKey":"2027","visibility":"visible"},"rowHash":"sha256:8888888888888888888888888888888888888888888888888888888888888888"},"rowKind":"catalog"}'
    );
  });

  it("pins the canonical bytes of an internal-entry try-out section catalog row", () => {
    expect(canonicalizeContentSnapshotRow(entrySectionRow)).toBe(
      '{"family":"tryout","record":{"row":{"appLocale":"de","graph":{"alignmentId":"alignment:material:lesson:tryout:material-section:tryout:catalog:section-entry","assetId":"asset:de:material:lesson:tryout:material-section:tryout:catalog:section-entry","conceptId":"concept:material:lesson:tryout:catalog","learningObjectId":"lo:material-section:tryout:catalog:section-entry","lensId":"lens:material:lesson:tryout"},"sourceRevision":"2026-08-12","title":"Test-only Abschnitt ü","countryKey":"indonesia","examKey":"snbt","kind":"section","order":2,"questionCount":1,"questionSourcePath":"packages/corpus/question-bank/tryout/indonesia/snbt/quantitative-knowledge/set-1","sectionKey":"quantitative-knowledge","setKey":"set-1","timeLimitSeconds":60,"trackKey":"2027","visibility":"internal-entry"},"rowHash":"sha256:9999999999999999999999999999999999999999999999999999999999999999"},"rowKind":"catalog"}'
    );
  });

  it("pins the canonical bytes of a try-out placement row", () => {
    expect(canonicalizeContentSnapshotRow(placementRow)).toBe(
      '{"family":"tryout","record":{"row":{"answerArtifactLocale":"de","answerContentKey":"question-bank/tryout/indonesia/snbt/quantitative-knowledge/set-1/question-1/answer","appLocale":"de","countryKey":"indonesia","deliveryLanguage":"de","examKey":"snbt","languagePolicy":{"kind":"app-locale"},"questionArtifactLocale":"de","questionContentKey":"question-bank/tryout/indonesia/snbt/quantitative-knowledge/set-1/question-1/question","questionOrder":1,"questionSourcePath":"packages/corpus/question-bank/tryout/indonesia/snbt/quantitative-knowledge/set-1/question-1","rendererDomain":"snbt-quant","response":{"kind":"single-choice","options":[{"isCorrect":true,"label":"Test-only correct option","optionKey":"option-1","order":1},{"isCorrect":false,"label":"Test-only distractor","optionKey":"option-2","order":2}]},"scope":"server","sectionKey":"quantitative-knowledge","setKey":"set-1","sourceRevision":"2026-08-12","trackKey":"2027","answerArtifactHash":"sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa","contentHash":"cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc","questionArtifactHash":"sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"},"rowHash":"sha256:23bb7e0ce445a0f594e73a1985db5b3e64b6f45dba3cd357ac0a04460c20674b"},"rowKind":"placement"}'
    );
  });

  it("pins the canonical bytes of a try-out placement row with points, blueprint, and stimulus", () => {
    expect(canonicalizeContentSnapshotRow(scoredPlacementRow)).toBe(
      '{"family":"tryout","record":{"row":{"answerArtifactLocale":"id","answerContentKey":"question-bank/tryout/indonesia/snbt/quantitative-knowledge/set-1/question-2/answer","appLocale":"id","blueprint":{"cognitiveLevel":"apply","contentDomain":"algebra","topic":"linear-equations"},"countryKey":"indonesia","deliveryLanguage":"id","examKey":"snbt","languagePolicy":{"kind":"app-locale"},"points":2,"questionArtifactLocale":"id","questionContentKey":"question-bank/tryout/indonesia/snbt/quantitative-knowledge/set-1/question-2/question","questionOrder":2,"questionSourcePath":"packages/corpus/question-bank/tryout/indonesia/snbt/quantitative-knowledge/set-1/question-2","rendererDomain":"snbt-quant","response":{"kind":"single-choice","options":[{"isCorrect":true,"label":"Jawaban benar é","optionKey":"option-1","order":1},{"isCorrect":false,"label":"Pengecoh é","optionKey":"option-2","order":2}]},"scope":"server","sectionKey":"quantitative-knowledge","setKey":"set-1","sourceRevision":"2026-08-12","stimulusKey":"stimulus-1","trackKey":"2027","answerArtifactHash":"sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa","contentHash":"dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd","questionArtifactHash":"sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"},"rowHash":"sha256:cafecafecafecafecafecafecafecafecafecafecafecafecafecafecafecafe"},"rowKind":"placement"}'
    );
  });

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
        const quranRows = snapshotData.rows.filter(
          (row) => row.family === "quran"
        );
        const canonical = quranRows
          .map(canonicalizeContentSnapshotRow)
          .join("\n");

        expect(quranRows.length).toBe(1542);
        expect(createHash("sha256").update(canonical).digest("hex")).toBe(
          "db50217860f1291996b6d4cd956d50fa42e0ec7892b9a360a83eb5ca72fdefdd"
        );
      }),
    30_000
  );
});
