import { materialNode, unitNode } from "#corpus/curriculum/schema";

/** The KSSM Form 5 Chemistry chapters, in the order of their DSKP. */
export const kssmForm5ChemistryTopicNodes = [
  unitNode({
    children: [
      materialNode({
        key: "form-5-chemistry-redox-equilibrium-redox-equilibrium",
        level: "lesson",
        materialKeys: ["lesson.chemistry.redox-equilibrium"],
        order: 10,
      }),
    ],
    key: "form-5-chemistry-redox-equilibrium",
    materialCard: {
      de: {
        description: "Bestimme Oxidationszahlen, baue Zellen, elektrolysiere.",
        title: "Redoxgleichgewicht",
      },
      en: {
        description: "Find oxidation numbers, build cells and electrolyse.",
        title: "Redox Equilibrium",
      },
      id: {
        description: "Hitung bilangan oksidasi dan rakit sel elektrokimia.",
        title: "Kesetimbangan Redoks",
      },
      ms: {
        description: "Kira nombor pengoksidaan dan bina sel elektrokimia.",
        title: "Keseimbangan Redoks",
      },
    },
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
    children: [
      materialNode({
        key: "form-5-chemistry-thermochemistry-thermochemistry",
        level: "lesson",
        materialKeys: ["lesson.chemistry.thermochemistry"],
        order: 10,
      }),
    ],
    key: "form-5-chemistry-thermochemistry",
    materialCard: {
      de: {
        description: "Berechne Reaktionswärmen und vergleiche Brennstoffe.",
        title: "Thermochemie",
      },
      en: {
        description: "Calculate heats of reaction and compare fuels.",
        title: "Thermochemistry",
      },
      id: {
        description: "Hitung kalor reaksi dan bandingkan bahan bakar.",
        title: "Termokimia",
      },
      ms: {
        description: "Kira haba tindak balas dan bandingkan bahan api.",
        title: "Termokimia",
      },
    },
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
