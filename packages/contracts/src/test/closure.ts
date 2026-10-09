import { Array as Arr, Effect, Schema, Stream } from "effect";

import {
  ACTIVE_APP_LOCALES,
  ActiveAppLocaleListSchema,
} from "#contracts/locale";
import { CurriculumRouteSchema } from "#contracts/program/curriculum";
import { digestProgramRows } from "#contracts/program/snapshot/digest";
import {
  makeCurriculumSnapshotRow,
  makeProgramSnapshotRow,
} from "#contracts/program/snapshot/hash";
import {
  type ProgramSnapshotRow,
  ProgramSnapshotRowSchema,
} from "#contracts/program/snapshot/row";
import { LearningProgramSchema } from "#contracts/program/spec";
import { curriculumRows, programCatalogRows } from "#contracts/test/program";

/** Decodes one exact app-locale fixture through the production contract. */
export function decodeAppLocales(input: unknown) {
  return Schema.decodeUnknownEffect(ActiveAppLocaleListSchema)(input);
}

/** Returns one typed current program digest failure. */
export function reject(
  rows: readonly ProgramSnapshotRow[],
  locales = ACTIVE_APP_LOCALES,
  expected?: {
    readonly curriculumRowCount: number;
    readonly programRowCount: number;
    readonly rowCount: number;
    readonly sitemapCount: number;
    readonly slugCount: number;
  }
) {
  const input = {
    activeAppLocales: locales,
    rows: Stream.fromIterable(rows),
  };
  return digestProgramRows(
    expected === undefined ? input : { ...input, expected }
  ).pipe(Effect.flip);
}

export const digestProgram = Schema.decodeSync(LearningProgramSchema)({
  defaultCoverageStatus: "planned",
  displayOrder: 10,
  iconKey: "school",
  key: "digest-program",
  kind: "school-curriculum",
  navigation: { levels: ["stage", "subject"], model: "curriculum-tree" },
  provider: { kind: "nakafa", name: "Nakafa test suite" },
  sources: [
    {
      label: "Editorial",
      retrievedAt: "2026-01-02",
      type: "nakafa-editorial",
      url: "https://example.test/editorial",
    },
  ],
  translations: [
    { appLocale: "en", publicSlug: "digest-program", title: "Digest Program" },
    { appLocale: "id", publicSlug: "program-digest", title: "Program Digest" },
    {
      appLocale: "de",
      publicSlug: "digest-programm",
      title: "Digest Programm",
    },
  ],
  version: { label: "Test version" },
});
export const digestRootEn = Schema.decodeSync(CurriculumRouteSchema)({
  appLocale: "en",
  iconKey: "school",
  kind: "curriculum-context",
  level: "track",
  nodeKey: "digest-program:root",
  order: 10,
  programKey: "digest-program",
  publicPath: "curriculum/digest-program",
  sitemap: true,
  sourcePath: "packages/corpus/curriculum/digest-program",
  title: "Digest Program",
});
export const digestRows = [
  Schema.decodeSync(ProgramSnapshotRowSchema)({
    kind: "program",
    row: digestProgram,
    rowHash:
      "sha256:f531f354d4324c3afe43b70c06665ed2a267827964f0489fd4328f987431b7f0",
  }),
  Schema.decodeSync(ProgramSnapshotRowSchema)({
    kind: "curriculum",
    row: Schema.decodeSync(CurriculumRouteSchema)({
      ...digestRootEn,
      appLocale: "de",
      publicPath: "lehrplaene/digest-programm",
      title: "Digest Programm",
    }),
    rowHash:
      "sha256:5a9b67531680b9190d21f236a7d39c579d91ef312463daec745e964e97b6b14c",
  }),
  Schema.decodeSync(ProgramSnapshotRowSchema)({
    kind: "curriculum",
    row: digestRootEn,
    rowHash:
      "sha256:5a2657c1c34e6d638ddd52b4fa44d7f499abd6bec99c4f3c7d53ec9c545f33ba",
  }),
  Schema.decodeSync(ProgramSnapshotRowSchema)({
    kind: "curriculum",
    row: Schema.decodeSync(CurriculumRouteSchema)({
      ...digestRootEn,
      level: "subject",
      nodeKey: "node-01",
      order: 1,
      parentPath: "curriculum/digest-program",
      publicPath: "curriculum/digest-program/node-01",
      sitemap: false,
      title: "Node 1",
    }),
    rowHash:
      "sha256:800d63ba82cfc09e48c0f61553d4d0f35fc30facca3b29f6bf82485e29ca0d24",
  }),
  Schema.decodeSync(ProgramSnapshotRowSchema)({
    kind: "curriculum",
    row: Schema.decodeSync(CurriculumRouteSchema)({
      ...digestRootEn,
      appLocale: "id",
      publicPath: "kurikulum/program-digest",
      title: "Program Digest",
    }),
    rowHash:
      "sha256:6e7558d0b24bbaddb86d6d1c6574a77a78b9d5c7fb91810c5583eebdaa86c99b",
  }),
];

/** Builds the route inputs whose ownership, ancestry, and root rejections are pinned. */
export const routeRejectionInputs = Effect.fn(
  "AksaraContracts.test.routeRejectionInputs"
)(function* (records: readonly ProgramSnapshotRow[]) {
  const programs = programCatalogRows(records);
  const curricula = curriculumRows(records);
  const firstRoot = yield* Effect.fromOption(
    Arr.findFirst(curricula, (record) => record.row.parentPath === undefined)
  );
  const firstRootIndex = curricula.indexOf(firstRoot);
  const firstChild = yield* Effect.fromNullishOr(curricula[firstRootIndex + 1]);
  const secondChild = yield* Effect.fromNullishOr(
    curricula[firstRootIndex + 2]
  );
  const firstProgram = yield* Effect.fromNullishOr(programs[0]);
  const wrongRoot = yield* makeCurriculumSnapshotRow({
    ...firstRoot.row,
    title: `${firstRoot.row.title} wrong`,
  });
  const duplicateNode = yield* makeCurriculumSnapshotRow({
    ...secondChild.row,
    nodeKey: firstChild.row.nodeKey,
  });
  const priorAppLocales = yield* decodeAppLocales(["en", "id"]);
  const priorProgramRow = yield* Schema.decodeUnknownEffect(
    LearningProgramSchema
  )({
    ...firstProgram.row,
    translations: Arr.filter(
      firstProgram.row.translations,
      ({ appLocale }) => appLocale !== "de"
    ),
  });
  const priorProgram = yield* makeProgramSnapshotRow(priorProgramRow);
  const firstTranslation = yield* Effect.fromNullishOr(
    firstProgram.row.translations[0]
  );
  const inactiveRoute = yield* Schema.decodeEffect(CurriculumRouteSchema)({
    ...firstRoot.row,
    appLocale: "de",
    publicPath: `lehrplaene/${firstTranslation.publicSlug}`,
    title: firstTranslation.title,
  });
  const inactiveLocale = yield* makeCurriculumSnapshotRow(inactiveRoute);
  const nonCurriculum = yield* makeProgramSnapshotRow({
    ...firstProgram.row,
    navigation: { levels: ["domain", "set"], model: "exam-domain-set" },
  });
  return {
    duplicateNode,
    firstChild,
    firstRoot,
    inactiveLocale,
    nonCurriculum,
    priorAppLocales,
    priorProgram,
    wrongRoot,
  };
});
