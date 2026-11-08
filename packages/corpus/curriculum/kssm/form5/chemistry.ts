import { unitNode } from "#corpus/curriculum/schema";

/** The KSSM Form 5 Chemistry chapters, in the order of their DSKP. */
export const kssmForm5ChemistryTopicNodes = [
  unitNode({
    key: "form-5-chemistry-redox-equilibrium",
    order: 10,
    translations: {
      de: { routeSlug: "redoxgleichgewicht", title: "Redoxgleichgewicht" },
      en: { routeSlug: "redox-equilibrium", title: "Redox Equilibrium" },
      id: { routeSlug: "kesetimbangan-redoks", title: "Kesetimbangan Redoks" },
      ms: { routeSlug: "keseimbangan-redoks", title: "Keseimbangan Redoks" },
    },
  }),
  unitNode({
    key: "form-5-chemistry-carbon-compound",
    order: 20,
    translations: {
      de: {
        routeSlug: "kohlenstoffverbindungen",
        title: "Kohlenstoffverbindungen",
      },
      en: { routeSlug: "carbon-compound", title: "Carbon Compound" },
      id: { routeSlug: "senyawa-karbon", title: "Senyawa Karbon" },
      ms: { routeSlug: "sebatian-karbon", title: "Sebatian Karbon" },
    },
  }),
  unitNode({
    key: "form-5-chemistry-thermochemistry",
    order: 30,
    translations: {
      de: { routeSlug: "thermochemie", title: "Thermochemie" },
      en: { routeSlug: "thermochemistry", title: "Thermochemistry" },
      id: { routeSlug: "termokimia", title: "Termokimia" },
      ms: { routeSlug: "termokimia", title: "Termokimia" },
    },
  }),
  unitNode({
    key: "form-5-chemistry-polymer",
    order: 40,
    translations: {
      de: { routeSlug: "polymere", title: "Polymere" },
      en: { routeSlug: "polymer", title: "Polymer" },
      id: { routeSlug: "polimer", title: "Polimer" },
      ms: { routeSlug: "polimer", title: "Polimer" },
    },
  }),
  unitNode({
    key: "form-5-chemistry-consumer-and-industrial-chemistry",
    order: 50,
    translations: {
      de: {
        routeSlug: "verbraucher-und-industriechemie",
        title: "Verbraucher- und Industriechemie",
      },
      en: {
        routeSlug: "consumer-and-industrial-chemistry",
        title: "Consumer and Industrial Chemistry",
      },
      id: {
        routeSlug: "kimia-konsumen-dan-industri",
        title: "Kimia Konsumen dan Industri",
      },
      ms: {
        routeSlug: "kimia-konsumer-dan-industri",
        title: "Kimia Konsumer dan Industri",
      },
    },
  }),
];
