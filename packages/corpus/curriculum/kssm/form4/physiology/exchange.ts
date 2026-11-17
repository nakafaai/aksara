import { materialNode, unitNode } from "#corpus/curriculum/schema";

/** The KSSM Form 4 Biology chapters on how the body takes in and moves materials: respiration, nutrition and transport, chapters 8 to 10 of the DSKP. */
export const kssmForm4PhysiologyExchangeNodes = [
  unitNode({
    key: "form-4-biology-respiratory-systems-in-humans-and-animals",
    order: 80,
    translations: {
      de: {
        routeSlug: "atmungssysteme-bei-mensch-und-tier",
        title: "Atmungssysteme bei Mensch und Tier",
      },
      en: {
        routeSlug: "respiratory-systems-in-humans-and-animals",
        title: "Respiratory Systems in Humans and Animals",
      },
      id: {
        routeSlug: "sistem-pernapasan-pada-manusia-dan-hewan",
        title: "Sistem Pernapasan pada Manusia dan Hewan",
      },
      ms: {
        routeSlug: "sistem-respirasi-dalam-manusia-dan-haiwan",
        title: "Sistem Respirasi dalam Manusia dan Haiwan",
      },
    },
  }),
  unitNode({
    key: "form-4-biology-nutrition-and-the-human-digestive-system",
    order: 90,
    translations: {
      de: {
        routeSlug: "ernaehrung-und-das-verdauungssystem-des-menschen",
        title: "Ernährung und das Verdauungssystem des Menschen",
      },
      en: {
        routeSlug: "nutrition-and-the-human-digestive-system",
        title: "Nutrition and the Human Digestive System",
      },
      id: {
        routeSlug: "nutrisi-dan-sistem-pencernaan-manusia",
        title: "Nutrisi dan Sistem Pencernaan Manusia",
      },
      ms: {
        routeSlug: "nutrisi-dan-sistem-pencernaan-manusia",
        title: "Nutrisi dan Sistem Pencernaan Manusia",
      },
    },
  }),
  unitNode({
    children: [
      materialNode({
        key: "form-4-biology-transport-in-humans-and-animals-circulatory-system",
        level: "lesson",
        materialKeys: ["lesson.biology.circulatory-system"],
        order: 10,
      }),
    ],
    key: "form-4-biology-transport-in-humans-and-animals",
    materialCard: {
      de: {
        description: "Erkläre Herzzyklus, Blut und Blutdruck.",
        title: "Stofftransport bei Mensch und Tier",
      },
      en: {
        description: "Explain the cardiac cycle, blood and blood pressure.",
        title: "Transport in Humans and Animals",
      },
      id: {
        description: "Jelaskan siklus jantung, darah, dan tekanan darah.",
        title: "Sistem Transportasi pada Manusia dan Hewan",
      },
      ms: {
        description: "Terangkan kitar jantung, darah dan tekanan darah.",
        title: "Pengangkutan dalam Manusia dan Haiwan",
      },
    },
    order: 100,
    translations: {
      de: {
        routeSlug: "transport-bei-mensch-und-tier",
        title: "Transport bei Mensch und Tier",
      },
      en: {
        routeSlug: "transport-in-humans-and-animals",
        title: "Transport in Humans and Animals",
      },
      id: {
        routeSlug: "transportasi-pada-manusia-dan-hewan",
        title: "Transportasi pada Manusia dan Hewan",
      },
      ms: {
        routeSlug: "pengangkutan-dalam-manusia-dan-haiwan",
        title: "Pengangkutan dalam Manusia dan Haiwan",
      },
    },
  }),
];
