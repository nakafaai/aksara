import { globSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { FileSystem, Path, Error as PlatformError } from "@effect/platform";
import { Effect } from "effect";
import { describe, expect, it } from "vitest";
import { discoverQuestionSources } from "#corpus/question-bank/source";
import {
  loadTryoutProjection,
  projectTryoutSources,
} from "#corpus/tryout/projection";
import { decodeTryoutRegistry } from "#corpus/tryout/registry";

const corpusRoot = resolve(import.meta.dirname, "..", "..", "..");
const sourceRoot = "packages/corpus/question-bank/tryout/indonesia";
const absoluteSourceRoot = resolve(corpusRoot, sourceRoot);
const realEntries = globSync("**/*", { cwd: absoluteSourceRoot });
const realChoices = new Map(
  globSync("**/choices.ts", { cwd: absoluteSourceRoot }).map((sourcePath) => {
    const absolutePath = resolve(absoluteSourceRoot, sourcePath);
    return [absolutePath, readFileSync(absolutePath, "utf8")] as const;
  })
);
const ENGLISH_PATH_PATTERN = /\/mathematics$/u;
const INDONESIAN_PATH_PATTERN = /\/matematika$/u;
/** Supplies the real checked-in question tree through Effect Platform. */
const realFileLayer = FileSystem.layerNoop({
  readDirectory: () => Effect.succeed(realEntries),
  readFileString: (path) => {
    const source = realChoices.get(path);
    if (source !== undefined) {
      return Effect.succeed(source);
    }
    return Effect.fail(
      new PlatformError.SystemError({
        method: "readFileString",
        module: "FileSystem",
        pathOrDescriptor: path,
        reason: "NotFound",
      })
    );
  },
});

/** Loads the exact active projection from the checked-in corpus. */
function loadProjection() {
  return Effect.runPromise(
    loadTryoutProjection(corpusRoot).pipe(
      Effect.provide(realFileLayer),
      Effect.provide(Path.layer)
    )
  );
}

/** Loads reviewed hierarchy and question sources for typed failure tests. */
function loadSources() {
  return Effect.runPromise(
    Effect.all([
      decodeTryoutRegistry(),
      discoverQuestionSources(corpusRoot).pipe(
        Effect.provide(realFileLayer),
        Effect.provide(Path.layer)
      ),
    ])
  );
}

/** Returns one source value or fails the test setup explicitly. */
function requireSource<Value>(value: Value | undefined, label: string): Value {
  if (value === undefined) {
    throw new Error(`Expected ${label}.`);
  }
  return value;
}

describe("tryout projection", () => {
  it("projects the exact active hierarchy and localized placements", {
    timeout: 30_000,
  }, async () => {
    const projection = await loadProjection();
    const counts = Object.fromEntries(
      ["country", "exam", "track", "set", "section"].map((kind) => [
        kind,
        projection.catalog.filter(({ row }) => row.kind === kind).length,
      ])
    );
    const bodyHeads = new Set(
      projection.placements.flatMap((row) => [
        `${row.questionContentKey}\0${row.locale}`,
        `${row.answerContentKey}\0${row.locale}`,
      ])
    );

    expect(counts).toEqual({
      country: 2,
      exam: 4,
      section: 34,
      set: 10,
      track: 4,
    });
    expect(projection.catalog).toHaveLength(54);
    expect(projection.routeCount).toBe(48);
    expect(projection.placements).toHaveLength(840);
    expect(
      new Set(
        projection.placements.map(
          ({ questionContentKey }) => questionContentKey
        )
      ).size
    ).toBe(420);
    expect(bodyHeads.size).toBe(1680);
    expect(
      projection.placements.every(
        ({ choices, scope }) =>
          scope === "server" &&
          choices.filter(({ isCorrect }) => isCorrect).length === 1
      )
    ).toBe(true);
  });

  it("uses exact localized choices without adding question language", {
    timeout: 30_000,
  }, async () => {
    const [projection, [, questions]] = await Promise.all([
      loadProjection(),
      loadSources(),
    ]);
    const english = projection.placements.filter(({ questionContentKey }) =>
      questionContentKey.includes("/snbt/english-language/")
    );
    const placement = requireSource(
      english.find(({ locale }) => locale === "en"),
      "English-language placement"
    );
    const peer = requireSource(
      english.find(
        ({ locale, questionContentKey }) =>
          locale === "id" && questionContentKey === placement.questionContentKey
      ),
      "Indonesian-locale placement"
    );
    const source = requireSource(
      questions.find(
        ({ questionKey }) =>
          `${questionKey}/question` === placement.questionContentKey
      ),
      "physical English-language question"
    );

    expect(placement.choices).toEqual(
      source.choices.en.map(({ label, value }, index) => ({
        isCorrect: value,
        label,
        optionKey: `option-${index + 1}`,
        order: index + 1,
      }))
    );
    expect(peer.choices).toEqual(
      source.choices.id.map(({ label, value }, index) => ({
        isCorrect: value,
        label,
        optionKey: `option-${index + 1}`,
        order: index + 1,
      }))
    );
    expect("questionLanguage" in placement).toBe(false);
  });

  it("derives graph identity from source keys for routes and internal entries", {
    timeout: 30_000,
  }, async () => {
    const projection = await loadProjection();
    const trackEn = requireSource(
      projection.catalog.find(
        ({ row }) =>
          row.kind === "track" && row.examKey === "tka" && row.locale === "en"
      )?.row,
      "English TKA track"
    );
    const trackId = requireSource(
      projection.catalog.find(
        ({ row }) =>
          row.kind === "track" && row.examKey === "tka" && row.locale === "id"
      )?.row,
      "Indonesian TKA track"
    );
    const internal = requireSource(
      projection.catalog.find(
        ({ row }) =>
          row.kind === "section" &&
          row.examKey === "tka" &&
          row.setKey === "set-1" &&
          row.locale === "id"
      )?.row,
      "internal-entry TKA section"
    );

    expect(trackEn.publicPath).toMatch(ENGLISH_PATH_PATTERN);
    expect(trackId.publicPath).toMatch(INDONESIAN_PATH_PATTERN);
    expect(trackEn.graph).toMatchObject({
      conceptId: "concept:tryout:indonesia:tka:mathematics",
      learningObjectId: "lo:tryout-track:indonesia:tka:mathematics",
      lensId: "lens:tryout:indonesia:tka",
    });
    expect(trackId.graph.conceptId).toBe(trackEn.graph.conceptId);
    expect(trackId.graph.assetId).not.toBe(trackEn.graph.assetId);
    expect(internal).toMatchObject({
      graph: {
        conceptId: "concept:tryout:indonesia:tka:mathematics:mathematics",
        learningObjectId:
          "lo:tryout-section:indonesia:tka:mathematics:set-1:mathematics",
        lensId: "lens:tryout:indonesia:tka",
      },
      visibility: "internal-entry",
    });
    expect("publicPath" in internal).toBe(false);
  });

  it("excludes every physical set outside the active source registry", {
    timeout: 30_000,
  }, async () => {
    const projection = await loadProjection();
    const snbt = projection.placements.filter(
      ({ examKey }) => examKey === "snbt"
    );
    const tka = projection.placements.filter(
      ({ examKey }) => examKey === "tka"
    );

    expect(snbt).toHaveLength(600);
    expect(tka).toHaveLength(240);
    expect(
      snbt.some(({ questionContentKey }) =>
        questionContentKey.includes("/set-3/")
      )
    ).toBe(false);
    expect(new Set(tka.map(({ setKey }) => setKey))).toEqual(
      new Set(["set-1", "set-2", "set-3"])
    );
  });

  it("rejects missing, duplicate, malformed, and colliding source facts", {
    timeout: 30_000,
  }, async () => {
    const [sources, questions] = await loadSources();
    const active = requireSource(
      questions.find(({ questionKey }) =>
        questionKey.includes("/snbt/general-reasoning/set-1/question-1")
      ),
      "active question"
    );
    const tka = requireSource(
      sources.find(({ examKey }) => examKey === "tka"),
      "TKA source"
    );
    const snbt = requireSource(
      sources.find(({ examKey }) => examKey === "snbt"),
      "SNBT source"
    );
    const invalidChoices = questions.map((question) =>
      question.questionKey === active.questionKey
        ? {
            ...question,
            choices: {
              ...question.choices,
              en: question.choices.en.map((choice) => ({
                ...choice,
                value: false,
              })),
            },
          }
        : question
    );
    const failures = await Effect.runPromise(
      Effect.all([
        projectTryoutSources(
          sources,
          questions.filter(
            ({ questionKey }) => questionKey !== active.questionKey
          )
        ).pipe(Effect.flip),
        projectTryoutSources(sources, [...questions, active]).pipe(Effect.flip),
        projectTryoutSources(sources, invalidChoices).pipe(Effect.flip),
        projectTryoutSources(
          sources.map((source) =>
            source.examKey === "tka"
              ? {
                  ...tka,
                  examRouteSlugs: snbt.examRouteSlugs,
                }
              : source
          ),
          questions
        ).pipe(Effect.flip),
      ])
    );

    expect(failures.map(({ _tag }) => _tag)).toEqual([
      "TryoutQuestionMissingError",
      "TryoutQuestionDuplicateError",
      "TryoutProjectionDecodeError",
      "TryoutRouteDuplicateError",
    ]);
  });
});
