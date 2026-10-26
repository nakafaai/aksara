import { describe, expect, it } from "@effect/vitest";
import { Sha256HashSchema } from "@nakafa/aksara-contracts/ids";
import { ACTIVE_APP_LOCALES } from "@nakafa/aksara-contracts/locale";
import { Array as Arr, Effect, Option } from "effect";
import { testExamInput, titled } from "#corpus/test/exam";
import { projectTryoutCatalog } from "#corpus/tryout/catalog";
import { paperId } from "#corpus/tryout/exam";
import { defineExamSource } from "#corpus/tryout/schema";

const hash = Sha256HashSchema.make(`sha256:${"a".repeat(64)}`);

/** Freezes a test paper for every set. */
function paperOf(id: string) {
  return Option.some({ hash, id });
}

/** The test exam with a description on its country and on its English exam page. */
const describedExam = defineExamSource({
  ...testExamInput,
  countryTranslations: {
    ...titled("Test Country"),
    en: { description: "A test country.", title: "Test Country" },
  },
  examTranslations: {
    ...titled("Test Exam"),
    en: { description: "A test exam.", title: "Test Exam" },
  },
});

describe("projectTryoutCatalog", () => {
  it.effect("projects every node of the exam in every active locale", () =>
    Effect.gen(function* () {
      const exam = yield* describedExam;
      const rows = yield* projectTryoutCatalog([exam], paperOf);
      const english = Arr.filter(rows, ({ appLocale }) => appLocale === "en");

      expect(rows).toHaveLength(9 * ACTIVE_APP_LOCALES.length);
      expect(english.map((row) => [row.kind, row.publicPath ?? null])).toEqual([
        ["country", "try-out/test-country"],
        ["exam", "try-out/test-country/test-exam"],
        ["track", "try-out/test-country/test-exam/test-subject"],
        ["set", "try-out/test-country/test-exam/test-subject/set-1"],
        ["section", null],
        ["track", "try-out/test-country/test-exam/2027"],
        ["set", "try-out/test-country/test-exam/2027/set-1"],
        ["section", "try-out/test-country/test-exam/2027/set-1/test-reasoning"],
        ["section", "try-out/test-country/test-exam/2027/set-1/test-english"],
      ]);
      expect(english[0]).toMatchObject({ description: "A test country." });
      expect(english[1]).toMatchObject({ description: "A test exam." });
      expect(english[3]).toMatchObject({
        internalEntrySectionKey: "test-subject",
        paper: { hash, id: "test-country/test-exam/test-subject/set-1" },
      });
      expect(english[4]).toMatchObject({
        order: 1,
        sectionKey: "test-subject",
        visibility: "internal-entry",
      });
      expect(english[6]).not.toHaveProperty("internalEntrySectionKey");
      expect(english[8]).toMatchObject({ order: 2, visibility: "visible" });
    })
  );

  it.effect("names the paper of a set from its track's profile", () =>
    Effect.gen(function* () {
      const exam = yield* describedExam;
      const [subject] = exam.tracks;
      const [set] = subject?.sets ?? [];
      if (subject === undefined || set === undefined) {
        return yield* Effect.die("Expected the subject set.");
      }

      expect(paperId(exam, subject, set)).toBe(
        "test-country/test-exam/test-subject/set-1"
      );
    })
  );

  it.effect(
    "refuses a set without a frozen paper, a bad paper, and a missing locale",
    () =>
      Effect.gen(function* () {
        const exam = yield* describedExam;
        const unfrozen = yield* projectTryoutCatalog([exam], () =>
          Option.none()
        ).pipe(Effect.flip);
        const invalid = yield* projectTryoutCatalog([exam], () =>
          Option.some({ hash, id: "Not a paper" })
        ).pipe(Effect.flip);
        const { de: _de, ...partial } = titled("Test Exam");
        const untranslated = yield* projectTryoutCatalog(
          [{ ...exam, examTranslations: partial }],
          paperOf
        ).pipe(Effect.flip);

        expect(unfrozen).toMatchObject({
          _tag: "CatalogPaperError",
          paper: "test-country/test-exam/test-subject/set-1",
        });
        expect(invalid._tag).toBe("TryoutCatalogDecodeError");
        expect(untranslated).toMatchObject({
          _tag: "SourceLocaleUnavailableError",
          owner: "test-country:test-exam",
        });
      })
  );
});
