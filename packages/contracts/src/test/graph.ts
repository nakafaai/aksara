/** Builds exact graph identity for one test-owned article source. */
export function articleGraph(
  locale: "en" | "id",
  category: string,
  slug: string
) {
  const lens = `article:${category}`;
  const object = `article:${category}:${slug}`;
  return {
    alignmentId: `alignment:${lens}:${object}`,
    assetId: `asset:${locale}:${lens}:${object}`,
    conceptId: `concept:${lens}`,
    learningObjectId: `lo:${object}`,
    lensId: `lens:${lens}`,
  };
}

/** Builds exact graph identity for one test-owned material lesson source. */
export function materialGraph(
  locale: "en" | "id",
  domain: string,
  topic: string,
  section: string
) {
  const lens = `material:lesson:${domain}`;
  const object = `material-section:${domain}:${topic}:${section}`;
  return {
    alignmentId: `alignment:${lens}:${object}`,
    assetId: `asset:${locale}:${lens}:${object}`,
    conceptId: `concept:${lens}:${topic}`,
    learningObjectId: `lo:${object}`,
    lensId: `lens:${lens}`,
  };
}
