/** Compact family counts used by catalog orchestration tests. */
export interface TestCatalogCounts {
  readonly article: number;
  readonly material: number;
  readonly question: number;
}

/** Stable source identity used without inventing educational fixture bodies. */
export interface TestCatalogIdentity {
  readonly contentKey: string;
  readonly family: "article" | "material" | "question";
  readonly locale: "en" | "id";
  readonly publicPath?: string;
}

/** Returns one deterministic locale for compact source identities. */
function localeFor(index: number): TestCatalogIdentity["locale"] {
  return index % 2 === 0 ? "en" : "id";
}

/** Builds registry-owned identities for one content family. */
export function catalogIdentities(
  family: TestCatalogIdentity["family"],
  count: number
): readonly TestCatalogIdentity[] {
  return Array.from({ length: count }, (_, index) => {
    const locale = localeFor(index);
    if (family === "article") {
      const contentKey = `articles/politics/test-article-${index}`;
      return {
        contentKey,
        family,
        locale,
        publicPath: contentKey,
      };
    }
    if (family === "material") {
      return {
        contentKey: `material/lesson/mathematics/test-lesson-${index}`,
        family,
        locale,
        publicPath: `subjects/mathematics/test-lesson-${index}`,
      };
    }
    return {
      contentKey: `question-bank/tryout/indonesia/snbt/general-reasoning/set-1/question-${index + 1}/question`,
      family,
      locale,
    };
  });
}

/** Builds all family identities in canonical catalog order. */
export function catalogHeads(counts: TestCatalogCounts) {
  return [
    ...catalogIdentities("article", counts.article),
    ...catalogIdentities("material", counts.material),
    ...catalogIdentities("question", counts.question),
  ];
}

/** Returns the complete body count for one compact family inventory. */
export function catalogTotal(counts: TestCatalogCounts) {
  return counts.article + counts.material + counts.question;
}

/** Builds prepared identities in canonical result-catalog order. */
export function catalogResult(counts: TestCatalogCounts) {
  return catalogHeads(counts);
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
    current: { contentKey: row.contentKey, locale: row.locale },
    next: {
      contentKey: row.contentKey,
      locale: row.locale,
      publicPath:
        replaceLast && index === publicRows.length - 1
          ? "subjects/mathematics/test-replaced-route"
          : row.publicPath,
    },
  }));
}
