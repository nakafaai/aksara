import { materialNode, unitNode } from "#corpus/curriculum/schema";
import { sachsenTechnicalMathematics } from "#corpus/curriculum/studienkolleg/documents";

/** Sachsen T-Kurs, Stoffgebiet Lineare Gleichungssysteme. */
export const sachsenTechnicalLinearSystemsUnit = unitNode({
  children: [
    materialNode({
      key: "sachsen-t-mathematics-linear-systems-linear-equation-inequality",
      level: "lesson",
      materialKeys: ["lesson.mathematics.linear-equation-inequality"],
      order: 10,
      outcomes: [
        {
          code: "Stoffgebiet Lineare Gleichungssysteme: homogene und inhomogene Gleichungssysteme",
          ...sachsenTechnicalMathematics,
        },
      ],
    }),
    materialNode({
      key: "sachsen-t-mathematics-linear-systems-matrix",
      level: "lesson",
      materialKeys: ["lesson.mathematics.matrix"],
      order: 20,
      outcomes: [
        {
          code: "Stoffgebiet Lineare Gleichungssysteme: Matrizen",
          ...sachsenTechnicalMathematics,
        },
      ],
    }),
  ],
  key: "sachsen-t-mathematics-linear-systems",
  materialCard: {
    de: {
      description: "Löse viele Gleichungen auf einmal, auch mit Matrizen.",
      title: "Lineare Gleichungssysteme",
    },
    en: {
      description: "Solve many equations at once, with matrices too.",
      title: "Systems of linear equations",
    },
    id: {
      description: "Selesaikan banyak persamaan sekaligus dengan matriks.",
      title: "Sistem persamaan linear",
    },
    ms: {
      description: "Selesaikan banyak persamaan serentak dengan matriks.",
      title: "Sistem persamaan linear",
    },
  },
  order: 50,
  translations: {
    de: {
      routeSlug: "lineare-gleichungssysteme",
      title: "Lineare Gleichungssysteme",
    },
    en: {
      routeSlug: "systems-of-linear-equations",
      title: "Systems of linear equations",
    },
    id: {
      routeSlug: "sistem-persamaan-linear",
      title: "Sistem persamaan linear",
    },
    ms: {
      routeSlug: "sistem-persamaan-linear",
      title: "Sistem persamaan linear",
    },
  },
});

/** Sachsen T-Kurs, Stoffgebiet Vektorrechnung. */
export const sachsenTechnicalVectorsUnit = unitNode({
  children: [
    materialNode({
      key: "sachsen-t-mathematics-vectors-vector-operations",
      level: "lesson",
      materialKeys: ["lesson.mathematics.vector-operations"],
      order: 10,
      outcomes: [
        {
          code: "Stoffgebiet Vektorrechnung: Vektorbegriff, Vektoraddition, skalare Multiplikation, Skalarprodukt, Vektorprodukt",
          ...sachsenTechnicalMathematics,
        },
      ],
    }),
  ],
  key: "sachsen-t-mathematics-vectors",
  materialCard: {
    de: {
      description: "Addiere Pfeile und bilde Skalar- und Vektorprodukt.",
      title: "Vektorrechnung",
    },
    en: {
      description: "Add arrows and form dot and cross products.",
      title: "Vector algebra",
    },
    id: {
      description: "Jumlahkan panah, lalu kalikan titik dan silang.",
      title: "Operasi vektor",
    },
    ms: {
      description: "Tambah anak panah, lalu darab titik dan silang.",
      title: "Operasi vektor",
    },
  },
  order: 60,
  translations: {
    de: { routeSlug: "vektorrechnung", title: "Vektorrechnung" },
    en: { routeSlug: "vector-algebra", title: "Vector algebra" },
    id: { routeSlug: "operasi-vektor", title: "Operasi vektor" },
    ms: { routeSlug: "operasi-vektor", title: "Operasi vektor" },
  },
});

/** Sachsen T-Kurs, Stoffgebiet Kegelschnitte. */
export const sachsenTechnicalConicSectionsUnit = unitNode({
  children: [
    materialNode({
      key: "sachsen-t-mathematics-conic-sections-analytic-geometry",
      level: "lesson",
      materialKeys: ["lesson.mathematics.analytic-geometry"],
      order: 10,
      outcomes: [
        {
          code: "Stoffgebiet Kegelschnitte: Kreis in allgemeiner Lage, Kreis und Geraden, Parabel, Ellipse, Hyperbel",
          ...sachsenTechnicalMathematics,
        },
      ],
    }),
  ],
  key: "sachsen-t-mathematics-conic-sections",
  materialCard: {
    de: {
      description: "Schneide einen Kegel und finde Kreis, Ellipse, Hyperbel.",
      title: "Kegelschnitte",
    },
    en: {
      description: "Slice a cone to find circles, ellipses and hyperbolas.",
      title: "Conic sections",
    },
    id: {
      description: "Iris kerucut dan temukan lingkaran, elips, hiperbola.",
      title: "Irisan kerucut",
    },
    ms: {
      description: "Potong kon dan temui bulatan, elips dan hiperbola.",
      title: "Keratan kon",
    },
  },
  order: 70,
  translations: {
    de: { routeSlug: "kegelschnitte", title: "Kegelschnitte" },
    en: { routeSlug: "conic-sections", title: "Conic sections" },
    id: { routeSlug: "irisan-kerucut", title: "Irisan kerucut" },
    ms: { routeSlug: "keratan-kon", title: "Keratan kon" },
  },
});
