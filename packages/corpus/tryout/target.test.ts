import { CorpusSourcePathSchema } from "@nakafa/aksara-contracts/ids";
import {
  AppLocaleSchema,
  ArtifactLocaleSchema,
  artifactLocaleCode,
} from "@nakafa/aksara-contracts/locale";
import { QuestionKeySchema } from "@nakafa/aksara-contracts/question/identity";
import type { TryoutCatalogRow } from "@nakafa/aksara-contracts/tryout/catalog";
import { describe, expect, it } from "@nakafa/testing/effect";
import { Effect, Path } from "effect";
import type { QuestionEntry } from "#corpus/question-bank/content";
import { selectQuestionContent } from "#corpus/question-bank/content";
import type { QuestionSource } from "#corpus/question-bank/source";
import { corpusRoot, makeQuestionLayer } from "#corpus/test/question-layer";
import { projectTryoutCatalog } from "#corpus/tryout/catalog";
import { decodeTryoutRegistry } from "#corpus/tryout/registry";
import type { TryoutExamSource } from "#corpus/tryout/schema";
import { selectTryoutTarget } from "#corpus/tryout/target";

const questionRoot =
  "packages/corpus/question-bank/tryout/indonesia/snbt/reading-and-writing-skills/set-1/question-1";
const promptPath = CorpusSourcePathSchema.make(
  `${questionRoot}/question.en.mdx`
);
const answerPath = CorpusSourcePathSchema.make(`${questionRoot}/answer.id.mdx`);
type TargetRowKind = Exclude<TryoutCatalogRow["kind"], "country">;

interface TargetFixture {
  readonly answer: QuestionEntry;
  readonly prompt: QuestionEntry;
  readonly question: QuestionSource;
  readonly rows: readonly TryoutCatalogRow[];
  readonly sources: readonly TryoutExamSource[];
}

/** Returns one required test value without weakening its inferred type. */
function requireValue<Value>(value: Value | undefined, label: string): Value {
  if (value === undefined) {
    throw new Error(`Expected ${label}.`);
  }
  return value;
}

/** Loads canonical question and hierarchy inputs for target behavior tests. */
async function loadFixture(): Promise<TargetFixture> {
  const sources = await Effect.runPromise(decodeTryoutRegistry());
  const [answer, prompt] = await Effect.runPromise(
    Effect.all([
      selectQuestionContent(corpusRoot, sources, answerPath),
      selectQuestionContent(corpusRoot, sources, promptPath),
    ]).pipe(Effect.provide([makeQuestionLayer(), Path.layer]))
  );
  const rows = await Effect.runPromise(projectTryoutCatalog(sources));
  return {
    answer: answer.selected,
    prompt: prompt.selected,
    question: prompt.source,
    rows,
    sources,
  };
}

/** Resolves one target failure from controlled source and catalog inputs. */
function rejectTarget(
  rows: readonly TryoutCatalogRow[],
  sources: readonly TryoutExamSource[],
  entry: QuestionEntry,
  question: QuestionSource
) {
  const appLocale = AppLocaleSchema.make(
    artifactLocaleCode(entry.artifactLocale)
  );
  return Effect.runPromise(
    selectTryoutTarget(rows, sources, entry, question, appLocale).pipe(
      Effect.flip
    )
  );
}

/** Finds the canonical English SNBT track without weakening the row union. */
function findSelectedTrack(rows: readonly TryoutCatalogRow[]) {
  for (const row of rows) {
    if (
      row.kind === "track" &&
      row.examKey === "snbt" &&
      row.appLocale === "en"
    ) {
      return row;
    }
  }
}

describe("tryout target", () => {
  it("resolves real prompt and answer targets without duplicating choices", {
    timeout: 30_000,
  }, async () => {
    const fixture = await loadFixture();
    const [prompt, answer] = await Effect.runPromise(
      Effect.all([
        selectTryoutTarget(
          fixture.rows,
          fixture.sources,
          fixture.prompt,
          fixture.question,
          AppLocaleSchema.make("en")
        ),
        selectTryoutTarget(
          fixture.rows,
          fixture.sources,
          fixture.answer,
          fixture.question,
          AppLocaleSchema.make("id")
        ),
      ])
    );

    expect(prompt).toMatchObject({
      exam: { appLocale: "en", examKey: "snbt" },
      placement: {
        questionOrder: 1,
        questionSourcePath: questionRoot,
      },
      section: { sectionKey: "reading-and-writing-skills" },
      set: { setKey: "set-1" },
      track: { trackKey: "2027" },
    });
    expect("choices" in prompt.placement).toBe(false);
    expect(answer).toMatchObject({
      exam: { appLocale: "id", examKey: "snbt" },
      placement: {
        appLocale: "id",
        questionOrder: 1,
        questionSourcePath: questionRoot,
      },
    });
  });

  it("reports missing and repeated source or catalog hierarchy owners", {
    timeout: 30_000,
  }, async () => {
    const fixture = await loadFixture();
    const snbt = requireValue(
      fixture.sources.find(({ examKey }) => examKey === "snbt"),
      "SNBT source"
    );
    /** Finds every catalog row that owns the selected hierarchy kind. */
    const matches = (kind: TargetRowKind) =>
      fixture.rows.filter(
        (row) =>
          row.kind === kind &&
          row.examKey === "snbt" &&
          row.appLocale === "en" &&
          (row.kind === "exam" || row.trackKey === "2027") &&
          (row.kind === "exam" ||
            row.kind === "track" ||
            row.setKey === "set-1") &&
          (row.kind !== "section" ||
            row.sectionKey === "reading-and-writing-skills")
      );
    /** Removes the selected row kind from the canonical catalog. */
    const without = (kind: TargetRowKind) =>
      fixture.rows.filter((row) => !matches(kind).includes(row));
    /** Duplicates the selected row kind in the canonical catalog. */
    const duplicate = (kind: TargetRowKind) => [
      ...fixture.rows,
      ...matches(kind),
    ];
    const hierarchyFailures = (["exam", "track", "set", "section"] as const)
      .flatMap((kind) => [without(kind), duplicate(kind)])
      .map((rows) =>
        rejectTarget(rows, fixture.sources, fixture.prompt, fixture.question)
      );
    const failures = await Promise.all([
      rejectTarget(
        fixture.rows,
        fixture.sources.filter(({ examKey }) => examKey !== "snbt"),
        fixture.prompt,
        fixture.question
      ),
      rejectTarget(
        fixture.rows,
        [...fixture.sources, snbt],
        fixture.prompt,
        fixture.question
      ),
      ...hierarchyFailures,
    ]);
    const targetFailures = failures.filter(
      (error) => error._tag === "TryoutTargetError"
    );

    expect(targetFailures.map(({ rowKind }) => rowKind)).toEqual([
      "context",
      "context",
      "exam",
      "exam",
      "track",
      "track",
      "set",
      "set",
      "section",
      "section",
    ]);
    expect(targetFailures.map(({ count }) => count)).toEqual([
      0, 2, 0, 2, 0, 2, 0, 2, 0, 2,
    ]);
  });

  it("rejects a catalog whose selected hierarchy revision is incoherent", {
    timeout: 30_000,
  }, async () => {
    const fixture = await loadFixture();
    const rows = fixture.rows.map((row) =>
      row.kind === "set" &&
      row.examKey === "snbt" &&
      row.appLocale === "en" &&
      row.setKey === "set-1"
        ? { ...row, sourceRevision: "mismatch" }
        : row
    );
    const error = await rejectTarget(
      rows,
      fixture.sources,
      fixture.prompt,
      fixture.question
    );

    expect(error).toMatchObject({ count: 1, rowKind: "target" });
  });

  it("rejects a body joined to another source or an unrepresented locale", {
    timeout: 30_000,
  }, async () => {
    const fixture = await loadFixture();
    const [sourceError, localeError] = await Promise.all([
      rejectTarget(fixture.rows, fixture.sources, fixture.prompt, {
        ...fixture.question,
        questionKey: QuestionKeySchema.make(
          "question-bank/tryout/indonesia/snbt/reading-and-writing-skills/set-1/question-2"
        ),
      }),
      rejectTarget(
        fixture.rows.filter(({ appLocale }) => appLocale !== "de"),
        fixture.sources,
        { ...fixture.prompt, artifactLocale: ArtifactLocaleSchema.make("de") },
        fixture.question
      ),
    ]);

    expect(sourceError).toMatchObject({ count: 0, rowKind: "context" });
    expect(localeError).toMatchObject({ count: 0, rowKind: "target" });
  });

  it("ignores a same-exam catalog row owned by another track", {
    timeout: 30_000,
  }, async () => {
    const fixture = await loadFixture();
    const track = requireValue(
      findSelectedTrack(fixture.rows),
      "selected track"
    );
    const result = await Effect.runPromise(
      selectTryoutTarget(
        [...fixture.rows, { ...track, trackKey: "other-track" }],
        fixture.sources,
        fixture.prompt,
        fixture.question,
        AppLocaleSchema.make("en")
      )
    );

    expect(result.track.trackKey).toBe("2027");
  });
});
