import type { ContentFamily } from "@nakafa/aksara-contracts/content";
import {
  ContentKeySchema,
  CorpusSourcePathSchema,
  PublicPathSchema,
  Sha256HashSchema,
} from "@nakafa/aksara-contracts/ids";
import {
  AppLocaleSchema,
  type ArtifactLocale,
  ArtifactLocaleSchema,
} from "@nakafa/aksara-contracts/locale";
import type { ContentHead } from "@nakafa/aksara-contracts/release/head";

const CATALOG_HASH = Sha256HashSchema.make(`sha256:${"a".repeat(64)}`);

/** Stable structured evidence for full-catalog validation tests. */
export const catalogSnapshotEvidence = {
  program: {
    rowCount: 591,
    rowDigest: CATALOG_HASH,
    sitemapCount: 78,
    snapshotId: CATALOG_HASH,
  },
  quran: {
    projectionCount: 1542,
    projectionDigest: CATALOG_HASH,
    provenanceDigest: CATALOG_HASH,
    provenanceStatus: "blocked",
    runtimeCount: 1200,
    searchCount: 342,
    snapshotId: CATALOG_HASH,
    sourceDigest: CATALOG_HASH,
  },
  stagedRows: 3474,
  tryout: {
    catalogCount: 81,
    catalogDigest: CATALOG_HASH,
    placementCount: 1260,
    placementDigest: CATALOG_HASH,
    routeCount: 72,
    snapshotId: CATALOG_HASH,
  },
};

/** Empty candidate evidence for active full-catalog validation tests. */
export const emptyCandidateValidationEvidence = {
  articleCount: 0,
  compiledBodyCount: 0,
  glossaryCount: 0,
  materialCount: 0,
  pageCount: 0,
  programCurriculumLocaleCount: 0,
  programCurriculumRouteCount: 0,
  programLocaleCount: 0,
  programReadyLocaleCount: 0,
  questionCount: 0,
  quranProvenanceDigest: CATALOG_HASH,
  quranProvenanceStatus: "approved" as const,
  quranRowCount: 0,
  totalCount: 0,
  tryoutCatalogCount: 0,
};

/** Compact family counts used by catalog orchestration tests. */
export interface TestCatalogCounts {
  readonly article: number;
  readonly material: number;
  readonly page: number;
  readonly question: number;
}

/** Stable source identity used without inventing educational fixture bodies. */
export interface TestCatalogIdentity {
  readonly artifactLocale: ArtifactLocale;
  readonly contentKey: string;
  readonly family: ContentFamily;
  readonly publicPath?: string;
}

/** Returns one deterministic artifactLocale for compact source identities. */
function localeFor(index: number): TestCatalogIdentity["artifactLocale"] {
  return ArtifactLocaleSchema.make(index % 2 === 0 ? "en" : "id");
}

/** Returns the renderer domain owned by one compact catalog fixture family. */
function rendererDomainFor(family: ContentFamily) {
  if (family === "question") {
    return "snbt-general";
  }
  if (family === "page") {
    return "site";
  }
  return "mathematics";
}

/** Builds registry-owned identities for one content family. */
export function catalogIdentities(
  family: TestCatalogIdentity["family"],
  count: number
): readonly TestCatalogIdentity[] {
  return Array.from({ length: count }, (_, index) => {
    const artifactLocale = localeFor(index);
    if (family === "article") {
      const contentKey = `articles/politics/test-article-${index}`;
      return {
        artifactLocale,
        contentKey,
        family,
        publicPath: contentKey,
      };
    }
    if (family === "material") {
      return {
        artifactLocale,
        contentKey: `material/lesson/mathematics/test-lesson-${index}`,
        family,
        publicPath: `subjects/mathematics/test-lesson-${index}`,
      };
    }
    if (family === "page") {
      return {
        artifactLocale,
        contentKey: `pages/test-page-${index}`,
        family,
        publicPath: `test-page-${index}`,
      };
    }
    return {
      artifactLocale,
      contentKey: `question-bank/tryout/indonesia/snbt/general-reasoning/set-1/question-${index + 1}/question`,
      family,
    };
  });
}

/** Builds all family identities in canonical catalog order. */
export function catalogHeads(counts: TestCatalogCounts) {
  return [
    ...catalogIdentities("article", counts.article),
    ...catalogIdentities("material", counts.material),
    ...catalogIdentities("page", counts.page),
    ...catalogIdentities("question", counts.question),
  ];
}

/** Returns the complete body count for one compact family inventory. */
export function catalogTotal(counts: TestCatalogCounts) {
  return counts.article + counts.material + counts.page + counts.question;
}

/** Builds prepared identities in canonical result-catalog order. */
export function catalogResult(counts: TestCatalogCounts) {
  return catalogHeads(counts).map((identity): ContentHead => {
    const sourcePath = (() => {
      if (identity.family === "question") {
        return `packages/corpus/${identity.contentKey}.${identity.artifactLocale}.mdx`;
      }
      if (identity.family === "page") {
        return `packages/corpus/${identity.contentKey}/${identity.artifactLocale}.mdx`;
      }
      return `packages/corpus/test/catalog/${identity.contentKey}.${identity.artifactLocale}.mdx`;
    })();
    const common = {
      artifactHash: CATALOG_HASH,
      artifactLocale: identity.artifactLocale,
      compilerConfigHash: CATALOG_HASH,
      contentKey: ContentKeySchema.make(identity.contentKey),
      delivery: identity.family === "question" ? "authenticated" : "public",
      family: identity.family,
      projectionHash: CATALOG_HASH,
      rendererDomain: rendererDomainFor(identity.family),
      sourceHash: CATALOG_HASH,
      sourcePath: CorpusSourcePathSchema.make(sourcePath),
    } as const;
    if (identity.publicPath === undefined) {
      return common;
    }
    return {
      ...common,
      publicPath: PublicPathSchema.make(identity.publicPath),
    };
  });
}

/** Projects public identities into genesis route transitions. */
export function catalogRoutes(
  rows: readonly TestCatalogIdentity[],
  replaceLast: boolean
) {
  const publicRows = rows.filter(
    (
      row
    ): row is TestCatalogIdentity & {
      readonly publicPath: string;
    } => row.publicPath !== undefined
  );
  return publicRows.map((row, index) => ({
    current: {
      appLocale: AppLocaleSchema.make(row.artifactLocale),
      contentKey: row.contentKey,
    },
    next: {
      appLocale: AppLocaleSchema.make(row.artifactLocale),
      contentKey: row.contentKey,
      publicPath:
        replaceLast && index === publicRows.length - 1
          ? "subjects/mathematics/test-replaced-route"
          : row.publicPath,
    },
  }));
}
