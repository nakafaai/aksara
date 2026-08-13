import { Effect } from "effect";

import { CorpusSourcePathSchema, PublicPathSchema } from "#contracts/ids";
import { type AppLocale, AppLocaleSchema } from "#contracts/locale";
import {
  CurriculumRouteSchema,
  curriculumNamespace,
} from "#contracts/program/curriculum";
import type { ProgramSnapshotRow } from "#contracts/program/snapshot/row";
import {
  makeCurriculumSnapshotRow,
  makeProgramSnapshotRow,
} from "#contracts/program/snapshot/row-hash";
import {
  LearningProgramKeySchema,
  LearningProgramSchema,
} from "#contracts/program/spec";

const english = AppLocaleSchema.make("en");
const indonesian = AppLocaleSchema.make("id");
const activeAppLocales = [english, indonesian] as const;

/** Builds one clearly test-only learning program at a stable position. */
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
    translations: [
      {
        appLocale: english,
        publicSlug: `test-program-${index}`,
        title: `Test Program ${index}`,
      },
      {
        appLocale: indonesian,
        publicSlug: `program-uji-${index}`,
        title: `Program Uji ${index}`,
      },
    ],
    version: { label: "Test version" },
  });
}

/** Resolves one required localized program translation. */
function programTranslation(
  program: ReturnType<typeof makeTestProgram>,
  appLocale: AppLocale
) {
  const translation = program.translations.find(
    (candidate) => candidate.appLocale === appLocale
  );
  if (translation === undefined) {
    throw new Error("Expected a test program translation.");
  }
  return translation;
}

/** Builds one localized root route owned by a test-only program. */
export function makeTestCurriculumRoot(
  program: ReturnType<typeof makeTestProgram>,
  appLocale: AppLocale,
  publicPath?: string
) {
  const translation = programTranslation(program, appLocale);
  return CurriculumRouteSchema.make({
    appLocale,
    iconKey: program.iconKey,
    kind: "curriculum-context",
    level: "track",
    nodeKey: `${program.key}:root`,
    order: program.displayOrder,
    programKey: program.key,
    publicPath: PublicPathSchema.make(
      publicPath ??
        `${curriculumNamespace(appLocale)}/${translation.publicSlug}`
    ),
    sitemap: true,
    sourcePath: CorpusSourcePathSchema.make(
      `packages/corpus/curriculum/${program.key}`
    ),
    title: translation.title,
  });
}

/** Builds every technical child route required by snapshot tests. */
function makeTestCurriculumChildren(
  program: ReturnType<typeof makeTestProgram>,
  appLocale: AppLocale
) {
  const translation = programTranslation(program, appLocale);
  const root = `${curriculumNamespace(appLocale)}/${translation.publicSlug}`;
  const childCount = appLocale === english ? 32 : 31;
  const sitemapCount = appLocale === english ? 4 : 3;
  return Array.from({ length: childCount }, (_, index) => {
    const position = index + 1;
    const nodeKey = `node-${String(position).padStart(2, "0")}`;
    return CurriculumRouteSchema.make({
      appLocale,
      iconKey: program.iconKey,
      kind: "curriculum-context",
      level: "subject",
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

/** Hashes one complete current program and curriculum fixture. */
export const makeProgramTestRecords = Effect.fn(
  "AksaraContracts.makeProgramTestRecords"
)(function* () {
  const programs = [1, 2, 3, 4, 5, 6].map(makeTestProgram);
  const programRecords = yield* Effect.forEach(
    programs,
    makeProgramSnapshotRow
  );
  const curriculumRecords = yield* Effect.forEach(
    programs.flatMap((program) =>
      activeAppLocales.flatMap((appLocale) => [
        makeTestCurriculumRoot(program, appLocale),
        ...makeTestCurriculumChildren(program, appLocale),
      ])
    ),
    makeCurriculumSnapshotRow
  );
  return [...programRecords, ...curriculumRecords];
});

/** Selects current program catalog records from one complete fixture. */
export function programCatalogRows(records: readonly ProgramSnapshotRow[]) {
  return records.filter(
    (record): record is Extract<ProgramSnapshotRow, { kind: "program" }> =>
      record.kind === "program"
  );
}

/** Selects current curriculum records from one complete fixture. */
export function curriculumRows(records: readonly ProgramSnapshotRow[]) {
  return records.filter(
    (record): record is Extract<ProgramSnapshotRow, { kind: "curriculum" }> =>
      record.kind === "curriculum"
  );
}
