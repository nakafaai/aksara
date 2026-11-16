import { materialNode, unitNode } from "#corpus/curriculum/schema";

/** The KSSM Form 4 Chemistry chapters of the theme Interaction between Matter, Bab 6 and Bab 7. */
export const kssmForm4ChemistryInteractionNodes = [
  unitNode({
    children: [
      materialNode({
        key: "form-4-chemistry-acid-base-and-salt-acid-base-salt",
        level: "lesson",
        materialKeys: ["lesson.chemistry.acid-base-salt"],
        order: 10,
      }),
    ],
    key: "form-4-chemistry-acid-base-and-salt",
    materialCard: {
      de: {
        description: "Miss den pH-Wert, titriere und stelle Salze her.",
        title: "Säuren, Basen und Salze",
      },
      en: {
        description: "Measure pH, run titrations and prepare salts.",
        title: "Acid, Base and Salt",
      },
      id: {
        description: "Ukur pH, lakukan titrasi, dan buat garam.",
        title: "Asam, Basa, dan Garam",
      },
      ms: {
        description: "Ukur pH, jalankan pentitratan dan sediakan garam.",
        title: "Asid, Bes dan Garam",
      },
    },
    order: 60,
    translations: {
      de: {
        routeSlug: "saeuren-basen-und-salze",
        title: "Säuren, Basen und Salze",
      },
      en: { routeSlug: "acid-base-and-salt", title: "Acid, Base and Salt" },
      id: { routeSlug: "asam-basa-dan-garam", title: "Asam, Basa, dan Garam" },
      ms: { routeSlug: "asid-bes-dan-garam", title: "Asid, Bes dan Garam" },
    },
  }),
  unitNode({
    children: [
      materialNode({
        key: "form-4-chemistry-rate-of-reaction-reaction-rate",
        level: "lesson",
        materialKeys: ["lesson.chemistry.reaction-rate"],
        order: 10,
      }),
    ],
    key: "form-4-chemistry-rate-of-reaction",
    materialCard: {
      de: {
        description: "Miss, wie schnell Stoffe reagieren, und warum.",
        title: "Reaktionsgeschwindigkeit",
      },
      en: {
        description: "Measure how fast reactions go, and explain why.",
        title: "Rate of Reaction",
      },
      id: {
        description: "Ukur seberapa cepat reaksi berjalan dan alasannya.",
        title: "Laju Reaksi",
      },
      ms: {
        description: "Ukur kelajuan tindak balas dan terangkan sebabnya.",
        title: "Kadar Tindak Balas",
      },
    },
    order: 70,
    translations: {
      de: {
        routeSlug: "reaktionsgeschwindigkeit",
        title: "Reaktionsgeschwindigkeit",
      },
      en: { routeSlug: "rate-of-reaction", title: "Rate of Reaction" },
      id: { routeSlug: "laju-reaksi", title: "Laju Reaksi" },
      ms: { routeSlug: "kadar-tindak-balas", title: "Kadar Tindak Balas" },
    },
  }),
];
