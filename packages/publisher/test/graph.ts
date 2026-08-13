import type { AppLocale } from "@nakafa/aksara-contracts/locale";

/** Builds exact graph identity for one test-owned material projection. */
export function materialGraph(
  appLocale: AppLocale,
  topic: string,
  section: string
) {
  const lens = "material:lesson:test";
  const object = `material-section:test:${topic}:${section}`;
  return {
    alignmentId: `alignment:${lens}:${object}`,
    assetId: `asset:${appLocale}:${lens}:${object}`,
    conceptId: `concept:${lens}:${topic}`,
    learningObjectId: `lo:${object}`,
    lensId: `lens:${lens}`,
  };
}
