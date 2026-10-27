import {
  type ContentFamily,
  ContentFamilySchema,
} from "@nakafa/aksara-contracts/content";
import {
  ContentKeySchema,
  CorpusSourcePathSchema,
  PublicPathSchema,
  ReleaseIdSchema,
  Sha256HashSchema,
} from "@nakafa/aksara-contracts/ids";
import {
  AppLocaleSchema,
  ArtifactLocaleSchema,
} from "@nakafa/aksara-contracts/locale";
import {
  ArticleHeadSchema,
  type ContentHead,
  MaterialHeadSchema,
  PageHeadSchema,
} from "@nakafa/aksara-contracts/release/head";
import { Array as Arr, Schema } from "effect";

const CATALOG_HASH = Sha256HashSchema.make(`sha256:${"a".repeat(64)}`);

/** Stable structured evidence for full-catalog validation tests. */
export const catalogSnapshotEvidence = {
  assessment: {
    counts: {
      catalog: 327,
      explanation: 5625,
      family: 1875,
      item: 1875,
      key: 1875,
      paper: 21,
      profile: 4,
      stimulus: 159,
    },
    rowDigest: CATALOG_HASH,
    snapshotId: CATALOG_HASH,
  },
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
  stagedRows: 3534,
};

const TestCatalogCountsSchema = Schema.Struct({
  article: Schema.Finite,
  material: Schema.Finite,
  page: Schema.Finite,
});

/** Compact family counts used by catalog orchestration tests. */
type TestCatalogCounts = typeof TestCatalogCountsSchema.Type;

const TestCatalogIdentitySchema = Schema.Struct({
  artifactLocale: ArtifactLocaleSchema,
  contentKey: Schema.String,
  family: ContentFamilySchema,
  publicPath: Schema.String,
});

/** Stable source identity used without inventing educational fixture bodies. */
type TestCatalogIdentity = typeof TestCatalogIdentitySchema.Type;

/** Returns one deterministic artifactLocale for compact source identities. */
function localeFor(index: number): TestCatalogIdentity["artifactLocale"] {
  return ArtifactLocaleSchema.make(index % 2 === 0 ? "en" : "id");
}

/** Returns the renderer domain owned by one compact catalog fixture family. */
function rendererDomainFor(family: ContentFamily) {
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
    return {
      artifactLocale,
      contentKey: `pages/test-page-${index}`,
      family,
      publicPath: `test-page-${index}`,
    };
  });
}

/** Builds all family identities in canonical catalog order. */
export function catalogHeads(counts: TestCatalogCounts) {
  return [
    ...catalogIdentities("article", counts.article),
    ...catalogIdentities("material", counts.material),
    ...catalogIdentities("page", counts.page),
  ];
}

/** Returns the complete body count for one compact family inventory. */
export function catalogTotal(counts: TestCatalogCounts) {
  return counts.article + counts.material + counts.page;
}

/** Builds prepared identities in canonical result-catalog order. */
export function catalogResult(counts: TestCatalogCounts) {
  return Arr.map(catalogHeads(counts), (identity): ContentHead => {
    const sourcePath = (() => {
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
      delivery: "public",
      family: identity.family,
      projectionHash: CATALOG_HASH,
      rendererDomain: rendererDomainFor(identity.family),
      sourceHash: CATALOG_HASH,
      sourcePath: CorpusSourcePathSchema.make(sourcePath),
    } as const;
    return {
      ...common,
      publicPath: PublicPathSchema.make(identity.publicPath),
    };
  });
}

/** Projects identities into genesis route transitions. */
export function catalogRoutes(
  rows: readonly TestCatalogIdentity[],
  replaceLast: boolean
) {
  return Arr.map(rows, (row, index) => ({
    current: {
      appLocale: AppLocaleSchema.make(row.artifactLocale),
      contentKey: row.contentKey,
    },
    next: {
      appLocale: AppLocaleSchema.make(row.artifactLocale),
      contentKey: row.contentKey,
      publicPath:
        replaceLast && index === rows.length - 1
          ? "subjects/mathematics/test-replaced-route"
          : row.publicPath,
    },
  }));
}

const CatalogTestInputSchema = Schema.Struct({
  article: Schema.optionalKey(Schema.Array(ArticleHeadSchema)),
  base: Schema.optionalKey(
    Schema.NullOr(
      Schema.Struct({
        count: Schema.Finite,
        digest: Sha256HashSchema,
        releaseId: ReleaseIdSchema,
      })
    )
  ),
  material: Schema.optionalKey(Schema.Array(MaterialHeadSchema)),
  page: Schema.optionalKey(Schema.Array(PageHeadSchema)),
});

export type CatalogTestInput = typeof CatalogTestInputSchema.Type;
