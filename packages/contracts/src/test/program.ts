import { Effect } from "effect";
import { type ContentLocale, ContentLocaleSchema } from "#contracts/content";
import { CorpusSourcePathSchema, PublicPathSchema } from "#contracts/ids";
import { CurriculumRouteSchema } from "#contracts/program/curriculum";
import {
  makeCurriculumSnapshotRow,
  makeProgramSnapshotRow,
} from "#contracts/program/row-hash";
import {
  LearningProgramKeySchema,
  LearningProgramSchema,
} from "#contracts/program/spec";

/** Builds one clearly test-only learning program at a stable display position. */
export function makeTestProgram(index: number) {
  return LearningProgramSchema.make({
    defaultCoverageStatus: "planned",
    displayOrder: index * 10,
    iconKey: "school",
    key: LearningProgramKeySchema.make(`test-program-${index}`),
    kind: "school-curriculum",
    navigation: {
      levels: ["stage", "subject"],
      model: "curriculum-tree",
    },
    provider: { kind: "nakafa", name: "Nakafa test suite" },
    sources: [
      {
        label: `Test source ${index}`,
        retrievedAt: "2026-01-01",
        type: "nakafa-editorial",
        url: `https://example.test/program-${index}`,
      },
    ],
    translations: {
      en: {
        publicSlug: `test-program-${index}`,
        title: `Test Program ${index}`,
      },
      id: {
        publicSlug: `program-uji-${index}`,
        title: `Program Uji ${index}`,
      },
    },
    version: { label: "Test version" },
  });
}

/** Builds one localized root route owned by a test-only program. */
export function makeTestCurriculumRoot(
  program: ReturnType<typeof makeTestProgram>,
  locale: ContentLocale,
  publicPath?: string
) {
  const translation = program.translations[locale];
  const namespace = locale === "en" ? "curriculum" : "kurikulum";
  return CurriculumRouteSchema.make({
    iconKey: program.iconKey,
    kind: "curriculum-context",
    level: "track",
    locale,
    nodeKey: `${program.key}:root`,
    order: program.displayOrder,
    programKey: program.key,
    publicPath: PublicPathSchema.make(
      publicPath ?? `${namespace}/${translation.publicSlug}`
    ),
    sitemap: true,
    sourcePath: CorpusSourcePathSchema.make(
      `packages/corpus/curriculum/${program.key}`
    ),
    title: translation.title,
  });
}

/** Builds every technical child route required by the exact snapshot counts. */
function makeTestCurriculumChildren(
  program: ReturnType<typeof makeTestProgram>,
  locale: ContentLocale
) {
  const translation = program.translations[locale];
  const namespace = locale === "en" ? "curriculum" : "kurikulum";
  const root = `${namespace}/${translation.publicSlug}`;
  const childCount = locale === "en" ? 32 : 31;
  let sitemapCount = 2;
  if (locale === "en") {
    sitemapCount = 4;
  } else if (program.displayOrder <= 40) {
    sitemapCount = 3;
  }
  return Array.from({ length: childCount }, (_, index) => {
    const position = index + 1;
    const nodeKey = `node-${String(position).padStart(2, "0")}`;
    return CurriculumRouteSchema.make({
      iconKey: program.iconKey,
      kind: "curriculum-context",
      level: "subject",
      locale,
      nodeKey,
      order: position,
      parentPath: PublicPathSchema.make(root),
      programKey: program.key,
      publicPath: PublicPathSchema.make(`${root}/${nodeKey}`),
      sitemap: position <= sitemapCount,
      sourcePath: CorpusSourcePathSchema.make(
        `packages/corpus/curriculum/${program.key}`
      ),
      title: `Test Node ${position}`,
    });
  });
}

/** Hashes the exact-size test-only program and curriculum snapshot rows. */
export const makeTestProgramRecords = Effect.fn(
  "AksaraContracts.makeTestProgramRecords"
)(function* () {
  const programs = [1, 2, 3, 4, 5, 6].map(makeTestProgram);
  const programRecords = yield* Effect.forEach(
    programs,
    makeProgramSnapshotRow
  );
  const curriculumRecords = yield* Effect.forEach(
    programs.flatMap((program) =>
      ContentLocaleSchema.literals.flatMap((locale) => [
        makeTestCurriculumRoot(program, locale),
        ...makeTestCurriculumChildren(program, locale),
      ])
    ),
    makeCurriculumSnapshotRow
  );
  return { curriculumRecords, programRecords };
});
