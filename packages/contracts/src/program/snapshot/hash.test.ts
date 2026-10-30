import { describe, expect, it } from "@effect/vitest";
import { Effect, Schema } from "effect";

import { Sha256HashSchema } from "#contracts/ids";
import { ActiveAppLocaleListSchema, AppLocaleSchema } from "#contracts/locale";
import { CurriculumRouteSchema } from "#contracts/program/curriculum";
import {
  canonicalizeProgramSnapshot,
  makeCurriculumSnapshotRow,
  makeProgramSnapshot,
  makeProgramSnapshotRow,
  verifyProgramSnapshotHash,
  verifyProgramSnapshotRowHash,
} from "#contracts/program/snapshot/hash";
import { ProgramSnapshotFactsSchema } from "#contracts/program/snapshot/spec";
import { LearningProgramSchema } from "#contracts/program/spec";
import {
  makeTestCurriculumRoot,
  makeTestProgram,
} from "#contracts/test/program";

const facts = Schema.decodeSync(ProgramSnapshotFactsSchema)({
  activeAppLocales: ActiveAppLocaleListSchema.make([
    AppLocaleSchema.make("en"),
    AppLocaleSchema.make("id"),
  ]),
  curriculumRowCount: 390,
  programRowCount: 6,
  rowCount: 396,
  rowDigest: Sha256HashSchema.make(`sha256:${"a".repeat(64)}`),
  sitemapCount: 52,
  slugCount: 12,
});

const hashFacts = Schema.decodeSync(ProgramSnapshotFactsSchema)({
  activeAppLocales: ["en", "id", "de"],
  curriculumRowCount: 4,
  programRowCount: 1,
  rowCount: 5,
  rowDigest: `sha256:${"1".repeat(64)}`,
  sitemapCount: 3,
  slugCount: 3,
});
const hashProgram = Schema.decodeSync(LearningProgramSchema)({
  defaultCoverageStatus: "planned",
  displayOrder: 1,
  iconKey: "school",
  key: "minimal-program",
  kind: "custom-program",
  navigation: { levels: ["lesson"], model: "curriculum-tree" },
  provider: { kind: "learner", name: "Pembelajar" },
  sources: [
    {
      label: "Editorial",
      retrievedAt: "2026-01-02",
      type: "nakafa-editorial",
      url: "https://example.test/editorial",
    },
  ],
  translations: [
    {
      appLocale: "en",
      publicSlug: "minimal-program",
      title: "Minimal Program",
    },
  ],
  version: { label: "Current" },
});
const hashRoot = Schema.decodeSync(CurriculumRouteSchema)({
  appLocale: "en",
  iconKey: "school",
  kind: "curriculum-context",
  level: "track",
  nodeKey: "minimal-program:root",
  order: 1,
  programKey: "minimal-program",
  publicPath: "curriculum/minimal-program",
  sitemap: true,
  sourcePath: "packages/corpus/curriculum/minimal-program",
  title: "Minimal Program",
});

describe("program snapshot golden identities", () => {
  it.effect("pins the snapshot canonical bytes and content identity", () =>
    Effect.gen(function* () {
      const snapshot = yield* makeProgramSnapshot(hashFacts);

      expect(canonicalizeProgramSnapshot(hashFacts)).toBe(
        '{"activeAppLocales":["en","id","de"],"curriculumRowCount":4,"format":"localized-program-snapshot","programRowCount":1,"rowCount":5,"rowDigest":"sha256:1111111111111111111111111111111111111111111111111111111111111111","sitemapCount":3,"slugCount":3}'
      );
      expect(snapshot.snapshotId).toBe(
        "sha256:8588eaa955902dbb1deb140bee4665684de272ab19eb08c3dc34f30bca1625f8"
      );
      expect(yield* verifyProgramSnapshotHash(snapshot)).toBe(
        "sha256:8588eaa955902dbb1deb140bee4665684de272ab19eb08c3dc34f30bca1625f8"
      );
    })
  );

  it.effect("pins the row identities of a program and a curriculum route", () =>
    Effect.gen(function* () {
      const programRecord = yield* makeProgramSnapshotRow(hashProgram);
      const curriculumRecord = yield* makeCurriculumSnapshotRow(hashRoot);

      expect(programRecord.rowHash).toBe(
        "sha256:495c0814fcac7e8013d38b878ea8503057eaae80ca93814448666db79991d5b0"
      );
      expect(curriculumRecord.rowHash).toBe(
        "sha256:edd9708d4bee3f2d09ddd9f48753a609677cdcd5a45dd0b6b238c181d3f623fc"
      );
      expect(yield* verifyProgramSnapshotRowHash(programRecord)).toBe(
        "sha256:495c0814fcac7e8013d38b878ea8503057eaae80ca93814448666db79991d5b0"
      );
      expect(yield* verifyProgramSnapshotRowHash(curriculumRecord)).toBe(
        "sha256:edd9708d4bee3f2d09ddd9f48753a609677cdcd5a45dd0b6b238c181d3f623fc"
      );
    })
  );
});

describe("program snapshot hashing", () => {
  it.effect("creates and verifies one reproducible snapshot identity", () =>
    Effect.gen(function* () {
      const first = yield* makeProgramSnapshot(facts);
      const second = yield* makeProgramSnapshot(facts);
      expect(
        yield* Schema.decodeEffect(
          Schema.fromJsonString(ProgramSnapshotFactsSchema)
        )(canonicalizeProgramSnapshot(facts))
      ).toMatchObject(facts);
      expect(first.snapshotId).toBe(second.snapshotId);
      expect(yield* verifyProgramSnapshotHash(first)).toBe(first.snapshotId);
    })
  );
});

describe("program snapshot row hashing", () => {
  it.effect("creates and verifies both authenticated row kinds", () =>
    Effect.gen(function* () {
      const program = makeTestProgram(1);
      const route = makeTestCurriculumRoot(program, AppLocaleSchema.make("en"));
      const [programRecord, curriculumRecord] = yield* Effect.all([
        makeProgramSnapshotRow(program),
        makeCurriculumSnapshotRow(route),
      ]);

      expect(yield* verifyProgramSnapshotRowHash(programRecord)).toBe(
        programRecord.rowHash
      );
      expect(yield* verifyProgramSnapshotRowHash(curriculumRecord)).toBe(
        curriculumRecord.rowHash
      );
    })
  );
});
