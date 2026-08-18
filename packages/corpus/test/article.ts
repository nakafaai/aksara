/** Builds one reviewed article source so tests vary only one identity. */
export function articleSource() {
  return {
    category: {
      key: "politics",
      rendererDomain: "politics",
      routeSlugs: { en: "politics", id: "politik" },
      titles: { en: "Politics", id: "Politik" },
    },
    references: [
      {
        authors: "Reviewed Author",
        title: "Reviewed Reference",
        year: 2024,
      },
    ],
    routeSlugs: {
      en: "dynastic-politics-asian-values",
      id: "politik-dinasti-dan-nilai-asia",
    },
    slug: "dynastic-politics-asian-values",
    sourceRoot: "articles/politics/dynastic-politics/asian-values",
  };
}

/** Builds one locale-owned German metadata overlay for the representative article. */
export function germanArticleCatalog() {
  return {
    articles: [
      {
        appLocale: "de",
        articleSlug: "dynastic-politics-asian-values",
        category: "politics",
        routeSlug: "dynastische-politik-und-asiatische-werte",
      },
    ],
    categories: [
      {
        appLocale: "de",
        category: "politics",
        routeSlug: "politik",
        title: "Politik",
      },
    ],
  } as const;
}
