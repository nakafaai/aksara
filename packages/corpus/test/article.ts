/** Builds one reviewed article source so tests vary only one identity. */
export function articleSource() {
  return {
    category: {
      key: "politics",
      rendererDomain: "politics",
      routeSlugs: { de: "politik", en: "politics", id: "politik" },
      titles: { de: "Politik", en: "Politics", id: "Politik" },
    },
    references: [
      {
        authors: "Reviewed Author",
        title: "Reviewed Reference",
        year: 2024,
      },
    ],
    routeSlugs: {
      de: "dynastische-politik-und-asiatische-werte",
      en: "dynastic-politics-asian-values",
      id: "politik-dinasti-dan-nilai-asia",
    },
    slug: "dynastic-politics-asian-values",
    sourceRoot: "articles/politics/dynastic-politics/asian-values",
  };
}
