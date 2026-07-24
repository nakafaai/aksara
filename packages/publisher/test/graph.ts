import type { ContentLocale } from "@nakafa/aksara-contracts/content";

/** Builds exact graph identity for one test-owned material projection. */
export function materialGraph(
  locale: ContentLocale,
  topic: string,
  section: string
) {
  const lens = "material:lesson:test";
  const object = `material-section:test:${topic}:${section}`;
  return {
    alignmentId: `alignment:${lens}:${object}`,
    assetId: `asset:${locale}:${lens}:${object}`,
    conceptId: `concept:${lens}:${topic}`,
    learningObjectId: `lo:${object}`,
    lensId: `lens:${lens}`,
  };
}
