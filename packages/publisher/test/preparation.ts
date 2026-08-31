import {
  GitCommitShaSchema,
  ReleaseIdSchema,
  Sha256HashSchema,
} from "@nakafa/aksara-contracts/ids";
import {
  ACTIVE_APP_LOCALES,
  ActiveAppLocaleListSchema,
  AppLocaleSchema,
} from "@nakafa/aksara-contracts/locale";
import { EMPTY_RESULT_CATALOG_DIGEST } from "@nakafa/aksara-contracts/release/result/spec";
import { PublicationScopeSchema } from "@nakafa/aksara-contracts/release/snapshot/scope";
import { inheritContentSnapshots } from "@nakafa/aksara-contracts/release/snapshot/spec";
import { Effect, Stream } from "effect";

import { prepareContentRelease } from "#publisher/preparation";
import type { PrepareContentReleaseInput } from "#publisher/preparation/spec";
import { head, record, rendererManifest } from "#test/publication";

type TestPreparationInput = PrepareContentReleaseInput<never, never>;
type PrepareTestRelease = (
  overrides?: Partial<TestPreparationInput>
) => ReturnType<typeof prepareContentRelease<never, never>>;

/** Inherited structured sources for retained-base preparation assertions. */
export const inheritedSnapshots = {
  previousSnapshots: inheritContentSnapshots(null),
  snapshotManifests: Stream.empty,
  snapshotRows: Stream.empty,
  tryoutRuntime: null,
} as const;

/** Empty genesis snapshot sources for preparation failure assertions. */
export const emptySnapshots = {
  previousSnapshots: null,
  snapshotManifests: Stream.empty,
  snapshotRows: Stream.empty,
  tryoutRuntime: null,
} as const;

/** Prior locale policy used to exercise complete replacement requirements. */
export const priorAppLocales = ActiveAppLocaleListSchema.make([
  AppLocaleSchema.make("en"),
]);

/** Canonical material-only scope used by preparation assertions. */
export const preparationScope = PublicationScopeSchema.make({
  families: ["material"],
  snapshots: [],
});

/** Runs preparation with direct overrides around one valid retained base. */
export const prepareTestRelease: PrepareTestRelease = Effect.fn(
  "AksaraPublisherTest.prepareTestRelease"
)((overrides: Partial<TestPreparationInput> = {}) =>
  prepareContentRelease({
    aksaraSha: GitCommitShaSchema.make("a".repeat(40)),
    baseActiveAppLocales: ACTIVE_APP_LOCALES,
    baseManifestHash: Sha256HashSchema.make(`sha256:${"7".repeat(64)}`),
    baseReleaseId: ReleaseIdSchema.make("test-prepare-base"),
    baseRendererManifestHash: rendererManifest.hash,
    baseResultCount: 0,
    baseResultDigest: EMPTY_RESULT_CATALOG_DIGEST,
    ...inheritedSnapshots,
    records: Stream.make(record),
    releaseId: ReleaseIdSchema.make("test-prepare-release"),
    rendererManifest,
    result: Stream.make(head),
    routes: Stream.empty,
    scope: preparationScope,
    ...overrides,
  })
);
