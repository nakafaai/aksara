import type { QuranSourceAttribution } from "#contracts/quran/source";

/** Serializes one source attribution without trusting object insertion order. */
export function canonicalizeQuranAttribution(
  attribution: QuranSourceAttribution
) {
  const common = {
    copy: attribution.copy.map((entry) => ({
      appLocale: entry.appLocale,
      notice: entry.notice,
      title: entry.title,
    })),
    id: attribution.id,
    kind: attribution.kind,
    publisher: attribution.publisher,
    retrievedAt: attribution.retrievedAt,
    sourceUrl: attribution.sourceUrl,
  };
  if (attribution.kind === "external") {
    return {
      ...common,
      terms: {
        access: attribution.terms.access,
        url: attribution.terms.url,
      },
      updateUrl: attribution.updateUrl,
      version: attribution.version,
    };
  }
  return {
    artifact: {
      byteCount: attribution.artifact.byteCount,
      digest: attribution.artifact.digest,
      fileCount: attribution.artifact.fileCount,
    },
    ...common,
    terms: {
      artifact: {
        byteCount: attribution.terms.artifact.byteCount,
        digest: attribution.terms.artifact.digest,
        fileCount: attribution.terms.artifact.fileCount,
      },
      url: attribution.terms.url,
    },
    updateUrl: attribution.updateUrl,
    version: attribution.version,
  };
}
