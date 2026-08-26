import {
  ActiveAppLocaleListSchema,
  AppLocaleSchema,
} from "@nakafa/aksara-contracts/locale";
import { PublicationScopeSchema } from "@nakafa/aksara-contracts/release/snapshot/scope";
import { inheritContentSnapshots } from "@nakafa/aksara-contracts/release/snapshot/spec";
import { Stream } from "effect";

/** Inherited structured sources for retained-base preparation assertions. */
export const inheritedSnapshots = {
  previousSnapshots: inheritContentSnapshots(null),
  snapshotManifests: Stream.empty,
  snapshotRows: Stream.empty,
  tryoutRuntimeSnapshot: null,
} as const;

/** Empty genesis snapshot sources for preparation failure assertions. */
export const emptySnapshots = {
  previousSnapshots: null,
  snapshotManifests: Stream.empty,
  snapshotRows: Stream.empty,
  tryoutRuntimeSnapshot: null,
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
