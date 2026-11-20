import {
  biologyCoreCurriculum,
  biologyEducationStandards,
} from "#corpus/curriculum/gymnasiale-oberstufe/documents";
import { materialNode, unitNode } from "#corpus/curriculum/schema";

/** Einführungsphase Biologie: Struktur und Funktion von Zellen. */
const introductoryPhaseBiologyUnit1 = unitNode({
  children: [
    materialNode({
      key: "introductory-phase-biology-cells-cell-organisation",
      level: "lesson",
      materialKeys: ["lesson.biology.cell-organisation"],
      order: 10,
      outcomes: [
        {
          code: "Biologie E.1 Struktur und Funktion von Zellen (Organisationsstufen, Zelltypen, Organellen)",
          ...biologyCoreCurriculum,
        },
      ],
    }),
    materialNode({
      key: "introductory-phase-biology-cells-membrane-transport",
      level: "lesson",
      materialKeys: ["lesson.biology.membrane-transport"],
      order: 20,
      outcomes: [
        {
          code: "Biologie E.1 Struktur und Funktion von Zellen (Biomembran, Diffusion, Osmose, Transport)",
          ...biologyCoreCurriculum,
        },
        {
          code: "Inhaltsbereich 2.6.1 Leben und Energie (Stofftransport zwischen Kompartimenten)",
          ...biologyEducationStandards,
        },
      ],
    }),
  ],
  key: "introductory-phase-biology-cells",
  materialCard: {
    de: {
      description: "Schau in eine Zelle und durch ihre Membran.",
      title: "Struktur und Funktion von Zellen",
    },
    en: {
      description: "Look inside a cell and through its membrane.",
      title: "Structure and function of cells",
    },
    id: {
      description: "Lihat isi sel dan apa yang melewati membrannya.",
      title: "Struktur dan fungsi sel",
    },
    ms: {
      description: "Lihat isi sel dan apa yang melalui membrannya.",
      title: "Struktur dan fungsi sel",
    },
  },
  order: 10,
  translations: {
    de: {
      routeSlug: "struktur-und-funktion-von-zellen",
      title: "Struktur und Funktion von Zellen",
    },
    en: {
      routeSlug: "structure-and-function-of-cells",
      title: "Structure and function of cells",
    },
    id: {
      routeSlug: "struktur-dan-fungsi-sel",
      title: "Struktur dan fungsi sel",
    },
    ms: {
      routeSlug: "struktur-dan-fungsi-sel",
      title: "Struktur dan fungsi sel",
    },
  },
});

/** Einführungsphase Biologie: the Themenfelder of the Hessen Kerncurriculum Biologie that a lesson teaches, in its order */
export const introductoryPhaseBiologyUnitNodes = [
  introductoryPhaseBiologyUnit1,
];
