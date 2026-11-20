import { materialNode, unitNode } from "#corpus/curriculum/schema";
import { hannoverTechnicalMathematics } from "#corpus/curriculum/studienkolleg/documents";

/** Hannover T-Kurs, Vektorrechnung: elementare Vektoralgebra, Linearkombination and Produkte von Vektoren. */
export const hannoverTechnicalVectorAlgebraUnit = unitNode({
  children: [
    materialNode({
      key: "hannover-t-mathematics-vector-algebra-vector-operations",
      level: "lesson",
      materialKeys: ["lesson.mathematics.vector-operations"],
      order: 10,
      outcomes: [
        {
          code: "Vektorrechnung im T-Kurs: elementare Vektoralgebra",
          ...hannoverTechnicalMathematics,
        },
        {
          code: "Vektorrechnung im T-Kurs: Linearkombination von Vektoren",
          ...hannoverTechnicalMathematics,
        },
        {
          code: "Vektorrechnung im T-Kurs: Produkte von Vektoren",
          ...hannoverTechnicalMathematics,
        },
      ],
    }),
  ],
  key: "hannover-t-mathematics-vector-algebra",
  materialCard: {
    de: {
      description: "Rechne mit Pfeilen im Raum, auch mit ihren Produkten.",
      title: "Elementare Vektoralgebra",
    },
    en: {
      description: "Work with arrows in space, products included.",
      title: "Elementary vector algebra",
    },
    id: {
      description: "Hitung dengan panah di ruang, juga hasil kalinya.",
      title: "Aljabar vektor dasar",
    },
    ms: {
      description: "Kira dengan anak panah di ruang, juga hasil darabnya.",
      title: "Algebra vektor asas",
    },
  },
  order: 60,
  translations: {
    de: {
      routeSlug: "elementare-vektoralgebra",
      title: "Elementare Vektoralgebra",
    },
    en: {
      routeSlug: "elementary-vector-algebra",
      title: "Elementary vector algebra",
    },
    id: { routeSlug: "aljabar-vektor-dasar", title: "Aljabar vektor dasar" },
    ms: { routeSlug: "algebra-vektor-asas", title: "Algebra vektor asas" },
  },
});

/** Hannover T-Kurs, Vektorrechnung: homogene und inhomogene lineare Gleichungssysteme. */
export const hannoverTechnicalLinearSystemsUnit = unitNode({
  children: [
    materialNode({
      key: "hannover-t-mathematics-linear-systems-linear-equation-inequality",
      level: "lesson",
      materialKeys: ["lesson.mathematics.linear-equation-inequality"],
      order: 10,
      outcomes: [
        {
          code: "Vektorrechnung im T-Kurs: homogene und inhomogene lineare Gleichungssysteme",
          ...hannoverTechnicalMathematics,
        },
      ],
    }),
  ],
  key: "hannover-t-mathematics-linear-systems",
  materialCard: {
    de: {
      description: "Finde den Punkt, an dem sich alle Gleichungen treffen.",
      title: "Lineare Gleichungssysteme",
    },
    en: {
      description: "Find the point where every equation meets.",
      title: "Systems of linear equations",
    },
    id: {
      description: "Temukan titik tempat semua persamaan bertemu.",
      title: "Sistem persamaan linear",
    },
    ms: {
      description: "Cari titik tempat semua persamaan bertemu.",
      title: "Sistem persamaan linear",
    },
  },
  order: 70,
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

/** Hannover T-Kurs, Vektorrechnung: Matrizen und Determinanten. */
export const hannoverTechnicalMatricesUnit = unitNode({
  children: [
    materialNode({
      key: "hannover-t-mathematics-matrices-matrix",
      level: "lesson",
      materialKeys: ["lesson.mathematics.matrix"],
      order: 10,
      outcomes: [
        {
          code: "Vektorrechnung im T-Kurs: Matrizen und Determinanten",
          ...hannoverTechnicalMathematics,
        },
      ],
    }),
    materialNode({
      key: "hannover-t-mathematics-matrices-geometric-transformation",
      level: "lesson",
      materialKeys: ["lesson.mathematics.geometric-transformation"],
      order: 20,
      outcomes: [
        {
          code: "Vektorrechnung im T-Kurs: Matrizen und Determinanten (lineare Abbildungen)",
          ...hannoverTechnicalMathematics,
        },
      ],
    }),
  ],
  key: "hannover-t-mathematics-matrices",
  materialCard: {
    de: {
      description: "Pack Zahlen in Tabellen und bewege damit Figuren.",
      title: "Matrizen und Determinanten",
    },
    en: {
      description: "Pack numbers into grids and use them to move shapes.",
      title: "Matrices and determinants",
    },
    id: {
      description: "Susun bilangan dalam tabel untuk memindah bangun.",
      title: "Matriks dan determinan",
    },
    ms: {
      description: "Susun nombor dalam jadual untuk menggerakkan bentuk.",
      title: "Matriks dan penentu",
    },
  },
  order: 80,
  translations: {
    de: {
      routeSlug: "matrizen-und-determinanten",
      title: "Matrizen und Determinanten",
    },
    en: {
      routeSlug: "matrices-and-determinants",
      title: "Matrices and determinants",
    },
    id: {
      routeSlug: "matriks-dan-determinan",
      title: "Matriks dan determinan",
    },
    ms: { routeSlug: "matriks-dan-penentu", title: "Matriks dan penentu" },
  },
});
