import {
  ContentSnapshotManifestSchema,
  ContentSnapshotRowSchema,
} from "@nakafa/aksara-contracts/release/snapshot/data";
import { Schema } from "effect";

const snapshotId = `sha256:${"e".repeat(64)}`;
const snapshotRowDigest = `sha256:${"1".repeat(64)}`;
const snapshotRowHash = `sha256:${"2".repeat(64)}`;

/** Test-only structured manifest used to prove exact HTTP staging. */
export const transportSnapshot = Schema.decodeSync(
  ContentSnapshotManifestSchema
)({
  family: "program",
  manifest: {
    activeAppLocales: ["en", "id", "de"],
    curriculumRowCount: 585,
    format: "localized-program-snapshot",
    programRowCount: 6,
    rowCount: 591,
    rowDigest: snapshotRowDigest,
    sitemapCount: 78,
    slugCount: 18,
    snapshotId,
  },
});

/** Test-only structured row carried by one bounded HTTP batch. */
export const transportSnapshotRow = Schema.decodeSync(ContentSnapshotRowSchema)(
  {
    family: "program",
    record: {
      kind: "program",
      row: {
        defaultCoverageStatus: "planned",
        displayOrder: 1,
        iconKey: "school",
        key: "test-http-program",
        kind: "school-curriculum",
        navigation: {
          levels: ["stage", "subject"],
          model: "curriculum-tree",
        },
        provider: { kind: "nakafa", name: "Nakafa test suite" },
        sources: [
          {
            label: "Test-only publisher transport source",
            retrievedAt: "2026-01-01",
            type: "nakafa-editorial",
            url: "https://example.test/publisher-transport",
          },
        ],
        translations: [
          {
            appLocale: "en",
            publicSlug: "test-http-program",
            title: "Test HTTP Program",
          },
          {
            appLocale: "id",
            publicSlug: "program-http-uji",
            title: "Program HTTP Uji",
          },
        ],
        version: { label: "Test-only version" },
      },
      rowHash: snapshotRowHash,
    },
  }
);
