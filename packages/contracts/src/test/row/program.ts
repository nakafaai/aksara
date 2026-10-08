import { Schema } from "effect";

import { ContentSnapshotRowSchema } from "#contracts/release/snapshot/data";

/** Test program row with the required fields only. */
export const programRow = Schema.decodeSync(ContentSnapshotRowSchema)({
  family: "program",
  record: {
    kind: "program",
    row: {
      defaultCoverageStatus: "planned",
      displayOrder: 10,
      iconKey: "school",
      key: "test-program-1",
      kind: "school-curriculum",
      navigation: { levels: ["stage", "subject"], model: "curriculum-tree" },
      provider: { kind: "nakafa", name: "Nakafa test suite" },
      sources: [
        {
          label: "Sumber uji 1 é",
          retrievedAt: "2026-01-01",
          type: "nakafa-editorial",
          url: "https://example.test/program-1",
        },
      ],
      translations: [
        {
          appLocale: "en",
          publicSlug: "test-program-1",
          title: "Test Program 1",
        },
        {
          appLocale: "id",
          publicSlug: "program-uji-1",
          title: "Program Uji 1 é",
        },
        {
          appLocale: "de",
          publicSlug: "testprogramm-1",
          title: "Testprogramm 1",
        },
      ],
      version: { label: "Test version" },
    },
    rowHash:
      "sha256:8f55b9138a912c8eef38428cafa4735edd6d0eba2e9805d3f5e83731a786ee70",
  },
});

/** Test program row with every optional field present. */
export const optionalProgramRow = Schema.decodeSync(ContentSnapshotRowSchema)({
  family: "program",
  record: {
    kind: "program",
    row: {
      defaultCoverageStatus: "available",
      displayOrder: 20,
      iconKey: "mathematics",
      key: "test-program-2",
      kind: "admission-exam",
      navigation: { levels: ["section", "set"], model: "exam-domain-set" },
      provider: { homeCountry: "ID", kind: "official", name: "Lembaga uji é" },
      recommendedCountry: "ID",
      sources: [
        {
          label: "Sumber uji é 2",
          retrievedAt: "2026-01-02",
          reviewAfter: "2026-06-30",
          type: "official-portal",
          url: "https://example.test/program-2",
        },
      ],
      translations: [
        {
          appLocale: "en",
          publicSlug: "test-program-2",
          title: "Test Program 2",
        },
        {
          appLocale: "id",
          publicSlug: "program-uji-2",
          title: "Program Uji 2 é",
        },
      ],
      version: {
        endsAt: "2026-12-31",
        label: "Versi uji 2026",
        startsAt: "2026-01-01",
      },
    },
    rowHash:
      "sha256:1111111111111111111111111111111111111111111111111111111111111111",
  },
});

/** Test curriculum root route row of a learning program. */
export const curriculumRootRow = Schema.decodeSync(ContentSnapshotRowSchema)({
  family: "program",
  record: {
    kind: "curriculum",
    row: {
      appLocale: "id",
      iconKey: "school",
      kind: "curriculum-context",
      level: "track",
      nodeKey: "test-program-1:root",
      order: 10,
      programKey: "test-program-1",
      publicPath: "kurikulum/program-uji-1",
      sitemap: true,
      sourcePath: "packages/corpus/curriculum/test-program-1",
      title: "Program Uji 1 é",
    },
    rowHash:
      "sha256:2222222222222222222222222222222222222222222222222222222222222222",
  },
});

/** Test curriculum child route row that owns a material. */
export const curriculumChildRow = Schema.decodeSync(ContentSnapshotRowSchema)({
  family: "program",
  record: {
    kind: "curriculum",
    row: {
      appLocale: "id",
      canonicalPath: "mathematics/algebra/linear-equations",
      displayGroupIconKey: "mathematics",
      displayGroupTitle: "Matematika é",
      iconKey: "mathematics",
      kind: "curriculum-context",
      level: "subject",
      materialCardDescription: "Deskripsi kartu é",
      materialCardTitle: "Judul kartu é",
      materialContextNodeKey: "algebra",
      materialContextParentPath: "kurikulum/program-uji-1",
      materialContextPublicPath: "kurikulum/program-uji-1/algebra",
      materialDomain: "mathematics",
      materialKey: "lesson.mathematics.linear-equations",
      nodeKey: "algebra",
      order: 2,
      parentPath: "kurikulum/program-uji-1",
      programKey: "test-program-1",
      publicPath: "kurikulum/program-uji-1/algebra",
      sitemap: true,
      sourcePath: "packages/corpus/curriculum/test-program-1",
      title: "Aljabar é",
    },
    rowHash:
      "sha256:3333333333333333333333333333333333333333333333333333333333333333",
  },
});
