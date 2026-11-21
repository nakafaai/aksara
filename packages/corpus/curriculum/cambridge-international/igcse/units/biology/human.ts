import { biologySyllabus } from "#corpus/curriculum/cambridge-international/documents";
import { materialNode, unitNode } from "#corpus/curriculum/schema";

/** Cambridge IGCSE Biology 0610, topic 7 Human nutrition. */
export const igcseNutritionUnit = unitNode({
  children: [
    materialNode({
      key: "biology-0610-human-nutrition-digestion",
      level: "lesson",
      materialKeys: ["lesson.biology.digestive-system"],
      order: 10,
      outcomes: [
        { code: "7.1 Diet", ...biologySyllabus },
        { code: "7.2 Digestive system", ...biologySyllabus },
        { code: "7.3 Physical digestion", ...biologySyllabus },
        { code: "7.4 Chemical digestion", ...biologySyllabus },
        { code: "7.5 Absorption", ...biologySyllabus },
        { code: "4.1 Biological molecules", ...biologySyllabus },
        { code: "5.1 Enzymes", ...biologySyllabus },
      ],
    }),
  ],
  key: "biology-0610-human-nutrition",
  materialCard: {
    de: {
      description: "Verfolge Nahrung bis zur Aufnahme ins Blut.",
      title: "Ernährung des Menschen",
    },
    en: {
      description: "Follow food from a balanced diet to absorption.",
      title: "Human nutrition",
    },
    id: {
      description: "Ikuti makanan dari gizi seimbang hingga penyerapan.",
      title: "Nutrisi manusia",
    },
    ms: {
      description: "Ikuti makanan dari diet seimbang hingga penyerapan.",
      title: "Pemakanan manusia",
    },
  },
  order: 70,
  translations: {
    de: {
      routeSlug: "ernaehrung-des-menschen",
      title: "Ernährung des Menschen",
    },
    en: { routeSlug: "human-nutrition", title: "Human nutrition" },
    id: { routeSlug: "nutrisi-manusia", title: "Nutrisi manusia" },
    ms: { routeSlug: "pemakanan-manusia", title: "Pemakanan manusia" },
  },
});

/** Cambridge IGCSE Biology 0610, topic 9 Transport in animals. */
export const igcseCirculationUnit = unitNode({
  children: [
    materialNode({
      key: "biology-0610-animal-transport-circulation",
      level: "lesson",
      materialKeys: ["lesson.biology.circulatory-system"],
      order: 10,
      outcomes: [
        { code: "9.1 Circulatory systems", ...biologySyllabus },
        { code: "9.2 Heart", ...biologySyllabus },
        { code: "9.3 Blood vessels", ...biologySyllabus },
        { code: "9.4 Blood", ...biologySyllabus },
      ],
    }),
  ],
  key: "biology-0610-animal-transport",
  materialCard: {
    de: {
      description: "Verfolge das Blut durch Herz und Gefäße.",
      title: "Stofftransport bei Tieren",
    },
    en: {
      description: "Trace blood through the heart and vessels.",
      title: "Transport in animals",
    },
    id: {
      description: "Telusuri aliran darah lewat jantung dan pembuluh.",
      title: "Transportasi pada hewan",
    },
    ms: {
      description: "Jejaki aliran darah melalui jantung dan salur.",
      title: "Pengangkutan dalam haiwan",
    },
  },
  order: 90,
  translations: {
    de: {
      routeSlug: "stofftransport-bei-tieren",
      title: "Stofftransport bei Tieren",
    },
    en: { routeSlug: "transport-in-animals", title: "Transport in animals" },
    id: {
      routeSlug: "transportasi-pada-hewan",
      title: "Transportasi pada hewan",
    },
    ms: {
      routeSlug: "pengangkutan-dalam-haiwan",
      title: "Pengangkutan dalam haiwan",
    },
  },
});

/** Cambridge IGCSE Biology 0610, topic 10 Diseases and immunity. */
export const igcseDiseaseUnit = unitNode({
  children: [
    materialNode({
      key: "biology-0610-disease-immunity-immunity",
      level: "lesson",
      materialKeys: ["lesson.biology.immunity"],
      order: 10,
      outcomes: [
        { code: "10.1 Diseases and immunity", ...biologySyllabus },
        { code: "9.4 Blood", ...biologySyllabus },
      ],
    }),
    materialNode({
      key: "biology-0610-disease-immunity-viruses",
      level: "lesson",
      materialKeys: ["lesson.biology.virus-role"],
      order: 20,
      outcomes: [
        { code: "10.1 Diseases and immunity", ...biologySyllabus },
        { code: "1.3 Features of organisms", ...biologySyllabus },
      ],
    }),
  ],
  key: "biology-0610-disease-immunity",
  materialCard: {
    de: {
      description: "Verstehe Erreger, Übertragung und Abwehr.",
      title: "Krankheiten und Immunität",
    },
    en: {
      description: "See how pathogens spread and how defences respond.",
      title: "Diseases and immunity",
    },
    id: {
      description: "Pahami penularan patogen dan respons pertahanan.",
      title: "Penyakit dan imunitas",
    },
    ms: {
      description: "Fahami penularan patogen dan gerak balas pertahanan.",
      title: "Penyakit dan keimunan",
    },
  },
  order: 100,
  translations: {
    de: {
      routeSlug: "krankheiten-und-immunitaet",
      title: "Krankheiten und Immunität",
    },
    en: { routeSlug: "diseases-and-immunity", title: "Diseases and immunity" },
    id: { routeSlug: "penyakit-dan-imunitas", title: "Penyakit dan imunitas" },
    ms: { routeSlug: "penyakit-dan-keimunan", title: "Penyakit dan keimunan" },
  },
});

/** Cambridge IGCSE Biology 0610, topic 11 Gas exchange in humans. */
export const igcseGasExchangeUnit = unitNode({
  children: [
    materialNode({
      key: "biology-0610-gas-exchange-breathing",
      level: "lesson",
      materialKeys: ["lesson.biology.respiratory-system"],
      order: 10,
      outcomes: [{ code: "11.1 Gas exchange in humans", ...biologySyllabus }],
    }),
  ],
  key: "biology-0610-gas-exchange",
  materialCard: {
    de: {
      description: "Verfolge die Luft durch die Lunge bis zu den Alveolen.",
      title: "Gasaustausch beim Menschen",
    },
    en: {
      description: "Follow air through the lungs to the alveoli.",
      title: "Gas exchange in humans",
    },
    id: {
      description: "Ikuti udara melalui paru-paru hingga alveolus.",
      title: "Pertukaran gas pada manusia",
    },
    ms: {
      description: "Ikuti udara melalui peparu hingga alveolus.",
      title: "Pertukaran gas dalam manusia",
    },
  },
  order: 110,
  translations: {
    de: {
      routeSlug: "gasaustausch-beim-menschen",
      title: "Gasaustausch beim Menschen",
    },
    en: {
      routeSlug: "gas-exchange-in-humans",
      title: "Gas exchange in humans",
    },
    id: {
      routeSlug: "pertukaran-gas-pada-manusia",
      title: "Pertukaran gas pada manusia",
    },
    ms: {
      routeSlug: "pertukaran-gas-dalam-manusia",
      title: "Pertukaran gas dalam manusia",
    },
  },
});

/** Cambridge IGCSE Biology 0610, topic 14 Coordination and response. */
export const igcseCoordinationUnit = unitNode({
  children: [
    materialNode({
      key: "biology-0610-coordination-nerves-hormones",
      level: "lesson",
      materialKeys: ["lesson.biology.coordination"],
      order: 10,
      outcomes: [
        { code: "14.1 Coordination and response", ...biologySyllabus },
        { code: "14.3 Hormones", ...biologySyllabus },
      ],
    }),
    materialNode({
      key: "biology-0610-coordination-homeostasis",
      level: "lesson",
      materialKeys: ["lesson.biology.homeostasis"],
      order: 20,
      outcomes: [
        { code: "14.4 Homeostasis", ...biologySyllabus },
        { code: "13.1 Excretion in humans", ...biologySyllabus },
      ],
    }),
  ],
  key: "biology-0610-coordination",
  materialCard: {
    de: {
      description: "Verbinde Nerven, Hormone und Regelkreise.",
      title: "Koordination und Reaktion",
    },
    en: {
      description: "Link nerves, hormones, and feedback control.",
      title: "Coordination and response",
    },
    id: {
      description: "Hubungkan saraf, hormon, dan umpan balik.",
      title: "Koordinasi dan respons",
    },
    ms: {
      description: "Kaitkan saraf, hormon dan kawalan suap balik.",
      title: "Koordinasi dan gerak balas",
    },
  },
  order: 140,
  translations: {
    de: {
      routeSlug: "koordination-und-reaktion",
      title: "Koordination und Reaktion",
    },
    en: {
      routeSlug: "coordination-and-response",
      title: "Coordination and response",
    },
    id: {
      routeSlug: "koordinasi-dan-respons",
      title: "Koordinasi dan respons",
    },
    ms: {
      routeSlug: "koordinasi-dan-gerak-balas",
      title: "Koordinasi dan gerak balas",
    },
  },
});
