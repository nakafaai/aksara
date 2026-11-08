import { materialNode, unitNode } from "#corpus/curriculum/schema";

/** The KSSM Form 5 Biology chapters, in the order of their DSKP. */
export const kssmForm5BiologyTopicNodes = [
  unitNode({
    key: "form-5-biology-organisation-of-plant-tissues-and-growth",
    order: 10,
    translations: {
      de: {
        routeSlug: "gewebeaufbau-und-wachstum-der-pflanzen",
        title: "Gewebeaufbau und Wachstum der Pflanzen",
      },
      en: {
        routeSlug: "organisation-of-plant-tissues-and-growth",
        title: "Organisation of Plant Tissues and Growth",
      },
      id: {
        routeSlug: "organisasi-jaringan-tumbuhan-dan-pertumbuhan",
        title: "Organisasi Jaringan Tumbuhan dan Pertumbuhan",
      },
      ms: {
        routeSlug: "organisasi-tisu-tumbuhan-dan-pertumbuhan",
        title: "Organisasi Tisu Tumbuhan dan Pertumbuhan",
      },
    },
  }),
  unitNode({
    key: "form-5-biology-leaf-structure-and-function",
    order: 20,
    translations: {
      de: {
        routeSlug: "bau-und-funktion-des-blattes",
        title: "Bau und Funktion des Blattes",
      },
      en: {
        routeSlug: "leaf-structure-and-function",
        title: "Leaf Structure and Function",
      },
      id: {
        routeSlug: "struktur-dan-fungsi-daun",
        title: "Struktur dan Fungsi Daun",
      },
      ms: {
        routeSlug: "struktur-dan-fungsi-daun",
        title: "Struktur dan Fungsi Daun",
      },
    },
  }),
  unitNode({
    key: "form-5-biology-nutrition-in-plants",
    order: 30,
    translations: {
      de: {
        routeSlug: "ernaehrung-der-pflanzen",
        title: "Ernährung der Pflanzen",
      },
      en: { routeSlug: "nutrition-in-plants", title: "Nutrition in Plants" },
      id: {
        routeSlug: "nutrisi-pada-tumbuhan",
        title: "Nutrisi pada Tumbuhan",
      },
      ms: {
        routeSlug: "nutrisi-dalam-tumbuhan",
        title: "Nutrisi dalam Tumbuhan",
      },
    },
  }),
  unitNode({
    key: "form-5-biology-transport-in-plants",
    order: 40,
    translations: {
      de: {
        routeSlug: "transport-in-pflanzen",
        title: "Transport in Pflanzen",
      },
      en: { routeSlug: "transport-in-plants", title: "Transport in Plants" },
      id: {
        routeSlug: "transportasi-pada-tumbuhan",
        title: "Transportasi pada Tumbuhan",
      },
      ms: {
        routeSlug: "pengangkutan-dalam-tumbuhan",
        title: "Pengangkutan dalam Tumbuhan",
      },
    },
  }),
  unitNode({
    key: "form-5-biology-response-in-plants",
    order: 50,
    translations: {
      de: {
        routeSlug: "reaktionen-der-pflanzen",
        title: "Reaktionen der Pflanzen",
      },
      en: { routeSlug: "response-in-plants", title: "Response in Plants" },
      id: {
        routeSlug: "respons-pada-tumbuhan",
        title: "Respons pada Tumbuhan",
      },
      ms: {
        routeSlug: "gerak-balas-dalam-tumbuhan",
        title: "Gerak Balas dalam Tumbuhan",
      },
    },
  }),
  unitNode({
    key: "form-5-biology-sexual-reproduction-in-flowering-plants",
    order: 60,
    translations: {
      de: {
        routeSlug: "geschlechtliche-fortpflanzung-der-bluetenpflanzen",
        title: "Geschlechtliche Fortpflanzung der Blütenpflanzen",
      },
      en: {
        routeSlug: "sexual-reproduction-in-flowering-plants",
        title: "Sexual Reproduction in Flowering Plants",
      },
      id: {
        routeSlug: "reproduksi-seksual-pada-tumbuhan-berbunga",
        title: "Reproduksi Seksual pada Tumbuhan Berbunga",
      },
      ms: {
        routeSlug: "pembiakan-seks-dalam-tumbuhan-berbunga",
        title: "Pembiakan Seks dalam Tumbuhan Berbunga",
      },
    },
  }),
  unitNode({
    key: "form-5-biology-adaptations-of-plants-in-different-habitats",
    order: 70,
    translations: {
      de: {
        routeSlug: "angepasstheit-der-pflanzen-an-verschiedene-lebensraeume",
        title: "Angepasstheit der Pflanzen an verschiedene Lebensräume",
      },
      en: {
        routeSlug: "adaptations-of-plants-in-different-habitats",
        title: "Adaptations of Plants in Different Habitats",
      },
      id: {
        routeSlug: "adaptasi-tumbuhan-di-habitat-yang-berbeda",
        title: "Adaptasi Tumbuhan di Habitat yang Berbeda",
      },
      ms: {
        routeSlug: "penyesuaian-tumbuhan-pada-habitat-berlainan",
        title: "Penyesuaian Tumbuhan pada Habitat Berlainan",
      },
    },
  }),
  unitNode({
    children: [
      materialNode({
        key: "form-5-biology-biodiversity-biodiversity",
        level: "lesson",
        materialKeys: ["lesson.biology.biodiversity"],
        order: 10,
      }),
    ],
    key: "form-5-biology-biodiversity",
    order: 80,
    translations: {
      de: { routeSlug: "biodiversitaet", title: "Biodiversität" },
      en: { routeSlug: "biodiversity", title: "Biodiversity" },
      id: {
        routeSlug: "keanekaragaman-hayati",
        title: "Keanekaragaman Hayati",
      },
      ms: { routeSlug: "biodiversiti", title: "Biodiversiti" },
    },
  }),
  unitNode({
    key: "form-5-biology-ecosystem",
    order: 90,
    translations: {
      de: { routeSlug: "oekosystem", title: "Ökosystem" },
      en: { routeSlug: "ecosystem", title: "Ecosystem" },
      id: { routeSlug: "ekosistem", title: "Ekosistem" },
      ms: { routeSlug: "ekosistem", title: "Ekosistem" },
    },
  }),
  unitNode({
    children: [
      materialNode({
        key: "form-5-biology-environmental-sustainability-climate-change",
        level: "lesson",
        materialKeys: ["lesson.biology.climate-change"],
        order: 10,
      }),
    ],
    key: "form-5-biology-environmental-sustainability",
    order: 100,
    translations: {
      de: {
        routeSlug: "oekologische-nachhaltigkeit",
        title: "Ökologische Nachhaltigkeit",
      },
      en: {
        routeSlug: "environmental-sustainability",
        title: "Environmental Sustainability",
      },
      id: {
        routeSlug: "kelestarian-lingkungan",
        title: "Kelestarian Lingkungan",
      },
      ms: {
        routeSlug: "kelestarian-alam-sekitar",
        title: "Kelestarian Alam Sekitar",
      },
    },
  }),
  unitNode({
    key: "form-5-biology-inheritance",
    order: 110,
    translations: {
      de: { routeSlug: "vererbung", title: "Vererbung" },
      en: { routeSlug: "inheritance", title: "Inheritance" },
      id: { routeSlug: "pewarisan-sifat", title: "Pewarisan Sifat" },
      ms: { routeSlug: "pewarisan", title: "Pewarisan" },
    },
  }),
  unitNode({
    key: "form-5-biology-variation",
    order: 120,
    translations: {
      de: { routeSlug: "variation", title: "Variation" },
      en: { routeSlug: "variation", title: "Variation" },
      id: { routeSlug: "variasi", title: "Variasi" },
      ms: { routeSlug: "variasi", title: "Variasi" },
    },
  }),
  unitNode({
    key: "form-5-biology-genetic-technology",
    order: 130,
    translations: {
      de: { routeSlug: "gentechnik", title: "Gentechnik" },
      en: { routeSlug: "genetic-technology", title: "Genetic Technology" },
      id: { routeSlug: "teknologi-genetika", title: "Teknologi Genetika" },
      ms: { routeSlug: "teknologi-genetik", title: "Teknologi Genetik" },
    },
  }),
];
