import { unitNode } from "#corpus/curriculum/schema";

/** The Kurikulum Merdeka Kelas 12 Biologi units, in the chapter order of the Kemendikbudristek Buku Siswa Biologi SMA/MA Kelas XII. */
export const merdekaClass12BiologyTopicNodes = [
  unitNode({
    key: "class-12-biology-enzyme-metabolism",
    order: 10,
    translations: {
      de: {
        routeSlug: "enzyme-und-stoffwechsel",
        title: "Enzyme und Stoffwechsel",
      },
      en: {
        routeSlug: "enzymes-and-metabolism",
        title: "Enzymes and Metabolism",
      },
      id: {
        routeSlug: "enzim-dan-metabolisme",
        title: "Enzim dan Metabolisme",
      },
      ms: {
        routeSlug: "enzim-dan-metabolisme",
        title: "Enzim dan Metabolisme",
      },
    },
  }),
  unitNode({
    key: "class-12-biology-genetics-inheritance",
    order: 20,
    translations: {
      de: {
        routeSlug: "genetik-und-vererbung",
        title: "Genetik und Vererbung",
      },
      en: {
        routeSlug: "genetics-and-inheritance",
        title: "Genetics and Inheritance",
      },
      id: {
        routeSlug: "genetik-dan-pewarisan-sifat",
        title: "Genetik dan Pewarisan Sifat",
      },
      ms: {
        routeSlug: "genetik-dan-pewarisan",
        title: "Genetik dan Pewarisan",
      },
    },
  }),
  unitNode({
    key: "class-12-biology-evolution",
    order: 30,
    translations: {
      de: { routeSlug: "evolution", title: "Evolution" },
      en: { routeSlug: "evolution", title: "Evolution" },
      id: { routeSlug: "evolusi", title: "Evolusi" },
      ms: { routeSlug: "evolusi", title: "Evolusi" },
    },
  }),
  unitNode({
    key: "class-12-biology-biotechnology",
    order: 40,
    translations: {
      de: {
        routeSlug: "innovationen-der-biotechnologie",
        title: "Innovationen der Biotechnologie",
      },
      en: {
        routeSlug: "biotechnology-innovation",
        title: "Biotechnology Innovation",
      },
      id: { routeSlug: "inovasi-bioteknologi", title: "Inovasi Bioteknologi" },
      ms: { routeSlug: "inovasi-bioteknologi", title: "Inovasi Bioteknologi" },
    },
  }),
];
