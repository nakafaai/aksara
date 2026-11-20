import {
  coreCurriculum,
  educationStandards,
} from "#corpus/curriculum/gymnasiale-oberstufe/documents";
import { materialNode, unitNode } from "#corpus/curriculum/schema";

/**
 * Themenfeld Q2.4, optional: transition processes with state vectors and
 * transition matrices, matrix arithmetic, and inverse matrices in simple cases.
 */
export const qualificationPhase2TransitionUnit = unitNode({
  children: [
    materialNode({
      key: "qualification-phase-2-mathematics-transition-matrices-matrix",
      level: "lesson",
      materialKeys: ["lesson.mathematics.matrix"],
      order: 10,
      outcomes: [
        {
          code: "Q2.4 Matrizen zur Beschreibung von Übergangsprozessen",
          ...coreCurriculum,
        },
        {
          code: "Leitidee L1 Algorithmus und Zahl: L1.4, L1.5",
          ...educationStandards,
        },
      ],
    }),
  ],
  key: "qualification-phase-2-mathematics-transition-matrices",
  materialCard: {
    de: {
      description: "Multipliziere und invertiere Matrizen für Prozesse.",
      title: "Matrizen zur Beschreibung von Übergangsprozessen",
    },
    en: {
      description: "Multiply and invert matrices that track a process.",
      title: "Matrices for Describing Transition Processes",
    },
    id: {
      description: "Kalikan dan balikkan matriks yang melacak suatu proses.",
      title: "Matriks untuk Mendeskripsikan Proses Transisi",
    },
    ms: {
      description: "Darab dan songsangkan matriks bagi satu proses.",
      title: "Matriks untuk Memerihalkan Proses Peralihan",
    },
  },
  order: 40,
  translations: {
    de: {
      routeSlug: "matrizen-zur-beschreibung-von-uebergangsprozessen",
      title: "Matrizen zur Beschreibung von Übergangsprozessen",
    },
    en: {
      routeSlug: "matrices-for-describing-transition-processes",
      title: "Matrices for Describing Transition Processes",
    },
    id: {
      routeSlug: "matriks-untuk-mendeskripsikan-proses-transisi",
      title: "Matriks untuk Mendeskripsikan Proses Transisi",
    },
    ms: {
      routeSlug: "matriks-untuk-memerihalkan-proses-peralihan",
      title: "Matriks untuk Memerihalkan Proses Peralihan",
    },
  },
});

/**
 * Themenfeld Q2.5, optional: linear geometric mappings written as matrices,
 * such as reflections, central dilations and their compositions.
 */
export const qualificationPhase2MappingUnit = unitNode({
  children: [
    materialNode({
      key: "qualification-phase-2-mathematics-mapping-matrices-geometric-transformation",
      level: "lesson",
      materialKeys: ["lesson.mathematics.geometric-transformation"],
      order: 10,
      outcomes: [
        {
          code: "Q2.5 Matrizen zur Darstellung linearer geometrischer Abbildungen",
          ...coreCurriculum,
        },
      ],
    }),
  ],
  key: "qualification-phase-2-mathematics-mapping-matrices",
  materialCard: {
    de: {
      description: "Spiegle, drehe und strecke Figuren mit einer Matrix.",
      title: "Matrizen zur Darstellung linearer geometrischer Abbildungen",
    },
    en: {
      description: "Reflect, rotate and scale a figure with one matrix.",
      title: "Matrices for Representing Linear Geometric Mappings",
    },
    id: {
      description: "Cerminkan, putar, dan skalakan bangun dengan matriks.",
      title: "Matriks untuk Menyatakan Pemetaan Geometri Linear",
    },
    ms: {
      description: "Pantul, putar dan skalakan rajah dengan satu matriks.",
      title: "Matriks untuk Mewakili Pemetaan Geometri Linear",
    },
  },
  order: 50,
  translations: {
    de: {
      routeSlug: "matrizen-zur-darstellung-linearer-geometrischer-abbildungen",
      title: "Matrizen zur Darstellung linearer geometrischer Abbildungen",
    },
    en: {
      routeSlug: "matrices-for-representing-linear-geometric-mappings",
      title: "Matrices for Representing Linear Geometric Mappings",
    },
    id: {
      routeSlug: "matriks-untuk-menyatakan-pemetaan-geometri-linear",
      title: "Matriks untuk Menyatakan Pemetaan Geometri Linear",
    },
    ms: {
      routeSlug: "matriks-untuk-mewakili-pemetaan-geometri-linear",
      title: "Matriks untuk Mewakili Pemetaan Geometri Linear",
    },
  },
});
