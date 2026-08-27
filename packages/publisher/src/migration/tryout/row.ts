import { Effect } from "effect";

import type { ArtifactRequirement } from "#publisher/migration/tryout/artifact";
import {
  type ConvertedCatalogMapping,
  convertTryoutCatalog,
} from "#publisher/migration/tryout/catalog";
import type { HistoricalTryoutRows } from "#publisher/migration/tryout/inventory";
import {
  type ConvertedArtifactSpool,
  type ConvertedPlacementMapping,
  convertTryoutPlacements,
} from "#publisher/migration/tryout/placement";

/** Complete current rows and their exact retained source mappings. */
export interface ConvertedTryoutRows {
  readonly catalog: readonly ConvertedCatalogMapping[];
  readonly placements: readonly ConvertedPlacementMapping[];
}

/** Converts the complete retained snapshot into current immutable rows. */
export const convertTryoutRows = Effect.fn(
  "AksaraPublisher.convertTryoutHistoryRows"
)(function* (
  rows: HistoricalTryoutRows,
  requirements: readonly ArtifactRequirement[],
  artifacts: ConvertedArtifactSpool
) {
  const [catalog, placements] = yield* Effect.all([
    convertTryoutCatalog(rows.catalog),
    convertTryoutPlacements(rows.placements, requirements, artifacts),
  ]);
  return { catalog, placements } satisfies ConvertedTryoutRows;
});
