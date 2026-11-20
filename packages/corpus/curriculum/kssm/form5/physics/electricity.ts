import { physicsStandards } from "#corpus/curriculum/kssm/documents";
import { materialNode, unitNode } from "#corpus/curriculum/schema";

/** KSSM Form 5 Fizik chapter 3, electricity. */
export const kssmForm5ElectricityUnit = unitNode({
  children: [
    materialNode({
      key: "form-5-physics-electricity-electricity",
      level: "lesson",
      materialKeys: ["lesson.physics.electricity"],
      order: 10,
      outcomes: [
        {
          code: "Tingkatan 5, Standard Kandungan 3.1 hingga 3.4",
          ...physicsStandards,
        },
      ],
    }),
  ],
  key: "form-5-physics-electricity",
  materialCard: {
    de: {
      description: "Berechne Widerstände, Quellenspannung und Leistung.",
      title: "Elektrizität",
    },
    en: {
      description: "Work out resistance, e.m.f. and electrical power.",
      title: "Electricity",
    },
    id: {
      description: "Hitung hambatan, GGL, dan daya listrik.",
      title: "Listrik",
    },
    ms: {
      description: "Kira rintangan, d.g.e. dan kuasa elektrik.",
      title: "Elektrik",
    },
  },
  order: 30,
  translations: {
    de: { routeSlug: "elektrizitaet", title: "Elektrizität" },
    en: { routeSlug: "electricity", title: "Electricity" },
    id: { routeSlug: "listrik", title: "Listrik" },
    ms: { routeSlug: "elektrik", title: "Elektrik" },
  },
});

/** KSSM Form 5 Fizik chapter 4, electromagnetism. */
export const kssmForm5ElectromagnetismUnit = unitNode({
  children: [
    materialNode({
      key: "form-5-physics-electromagnetism-electromagnetism",
      level: "lesson",
      materialKeys: ["lesson.physics.electromagnetism"],
      order: 10,
      outcomes: [
        {
          code: "Tingkatan 5, Standard Kandungan 4.1 hingga 4.3",
          ...physicsStandards,
        },
      ],
    }),
  ],
  key: "form-5-physics-electromagnetism",
  materialCard: {
    de: {
      description: "Erklär Motor, Generator und Transformator.",
      title: "Elektromagnetismus",
    },
    en: {
      description: "Explain motors, generators and transformers.",
      title: "Electromagnetism",
    },
    id: {
      description: "Jelaskan motor, generator, dan transformator.",
      title: "Elektromagnetisme",
    },
    ms: {
      description: "Terangkan motor, penjana dan transformer.",
      title: "Keelektromagnetan",
    },
  },
  order: 40,
  translations: {
    de: { routeSlug: "elektromagnetismus", title: "Elektromagnetismus" },
    en: { routeSlug: "electromagnetism", title: "Electromagnetism" },
    id: { routeSlug: "elektromagnetisme", title: "Elektromagnetisme" },
    ms: { routeSlug: "keelektromagnetan", title: "Keelektromagnetan" },
  },
});

/** KSSM Form 5 Fizik chapter 5, electronics. */
export const kssmForm5ElectronicsUnit = unitNode({
  children: [
    materialNode({
      key: "form-5-physics-electronics-electronics",
      level: "lesson",
      materialKeys: ["lesson.physics.electronics"],
      order: 10,
      outcomes: [
        {
          code: "Tingkatan 5, Standard Kandungan 5.1 hingga 5.3",
          ...physicsStandards,
        },
      ],
    }),
  ],
  key: "form-5-physics-electronics",
  materialCard: {
    de: {
      description: "Nutze Dioden und Transistoren in Schaltungen.",
      title: "Elektronik",
    },
    en: {
      description: "Use diodes and transistors in circuits.",
      title: "Electronics",
    },
    id: {
      description: "Pakai dioda dan transistor dalam rangkaian.",
      title: "Elektronika",
    },
    ms: {
      description: "Guna diod dan transistor dalam litar.",
      title: "Elektronik",
    },
  },
  order: 50,
  translations: {
    de: { routeSlug: "elektronik", title: "Elektronik" },
    en: { routeSlug: "electronics", title: "Electronics" },
    id: { routeSlug: "elektronika", title: "Elektronika" },
    ms: { routeSlug: "elektronik", title: "Elektronik" },
  },
});
