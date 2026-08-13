import type { ContentKey } from "@nakafa/aksara-contracts/ids";
import type { ArtifactLocale } from "@nakafa/aksara-contracts/locale";
import type { TryoutCatalogRecord } from "@nakafa/aksara-contracts/tryout/catalog";
import { makeTryoutCatalogRecord } from "@nakafa/aksara-contracts/tryout/catalog-hash";
import type { TryoutPlacementSource } from "@nakafa/aksara-contracts/tryout/placement";

interface PromptIdentity {
  readonly artifactLocale: ArtifactLocale;
  readonly contentKey: ContentKey;
}

interface TryoutProjectionSliceSource {
  readonly catalog: readonly TryoutCatalogRecord[];
  readonly placements: readonly TryoutPlacementSource[];
}

/** Identifies one localized catalog row without depending on route slugs. */
function catalogIdentity(row: TryoutCatalogRecord["row"]) {
  if (row.kind === "country") {
    return `${row.appLocale}\0country\0${row.countryKey}`;
  }
  if (row.kind === "exam") {
    return `${row.appLocale}\0exam\0${row.countryKey}\0${row.examKey}`;
  }
  if (row.kind === "track") {
    return `${row.appLocale}\0track\0${row.countryKey}\0${row.examKey}\0${row.trackKey}`;
  }
  if (row.kind === "set") {
    return `${row.appLocale}\0set\0${row.countryKey}\0${row.examKey}\0${row.trackKey}\0${row.setKey}`;
  }
  return `${row.appLocale}\0section\0${row.countryKey}\0${row.examKey}\0${row.trackKey}\0${row.setKey}\0${row.sectionKey}`;
}

/** Selects one locale-closed hierarchy and placement slice for real prompts. */
export function selectTryoutSlice(
  projection: TryoutProjectionSliceSource,
  prompts: readonly PromptIdentity[]
) {
  const promptKeys = new Set(
    prompts.map(
      ({ contentKey, artifactLocale }) => `${contentKey}\0${artifactLocale}`
    )
  );
  const placements = projection.placements.filter(
    ({ questionArtifactLocale, questionContentKey }) =>
      promptKeys.has(`${questionContentKey}\0${questionArtifactLocale}`)
  );
  const catalogIdentities = new Set(
    placements.flatMap((placement) => [
      `${placement.appLocale}\0country\0${placement.countryKey}`,
      `${placement.appLocale}\0exam\0${placement.countryKey}\0${placement.examKey}`,
      `${placement.appLocale}\0track\0${placement.countryKey}\0${placement.examKey}\0${placement.trackKey}`,
      `${placement.appLocale}\0set\0${placement.countryKey}\0${placement.examKey}\0${placement.trackKey}\0${placement.setKey}`,
      `${placement.appLocale}\0section\0${placement.countryKey}\0${placement.examKey}\0${placement.trackKey}\0${placement.setKey}\0${placement.sectionKey}`,
    ])
  );
  const catalog = projection.catalog.flatMap(({ row }) => {
    if (!catalogIdentities.has(catalogIdentity(row))) {
      return [];
    }
    if (row.kind !== "section") {
      return [makeTryoutCatalogRecord(row)];
    }
    const questionCount = placements.filter(
      (placement) =>
        placement.appLocale === row.appLocale &&
        placement.countryKey === row.countryKey &&
        placement.examKey === row.examKey &&
        placement.trackKey === row.trackKey &&
        placement.setKey === row.setKey &&
        placement.sectionKey === row.sectionKey
    ).length;
    return [makeTryoutCatalogRecord({ ...row, questionCount })];
  });
  return { catalog, placements };
}
