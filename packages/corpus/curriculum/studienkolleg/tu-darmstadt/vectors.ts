import { materialNode, unitNode } from "#corpus/curriculum/schema";
import { darmstadtMathematics } from "#corpus/curriculum/studienkolleg/documents";

/** Darmstadt T-Kurs, Schwerpunkt Vektoren und ihre Verknüpfungsmöglichkeiten. */
export const tuDarmstadtVectorsUnit = unitNode({
  children: [
    materialNode({
      key: "tu-darmstadt-t-mathematics-vectors-vector-operations",
      level: "lesson",
      materialKeys: ["lesson.mathematics.vector-operations"],
      order: 10,
      outcomes: [
        {
          code: "Schwerpunkt: Vektoren und ihre Verknüpfungsmöglichkeiten",
          ...darmstadtMathematics,
        },
      ],
    }),
  ],
  key: "tu-darmstadt-t-mathematics-vectors",
  materialCard: {
    de: {
      description: "Addiere Vektoren und multipliziere sie im Raum.",
      title: "Vektoren und ihre Verknüpfungen",
    },
    en: {
      description: "Add vectors and multiply them in space.",
      title: "Vectors and how they combine",
    },
    id: {
      description: "Jumlahkan vektor dan kalikan di ruang.",
      title: "Vektor dan operasinya",
    },
    ms: {
      description: "Tambah vektor dan darabkannya dalam ruang.",
      title: "Vektor dan operasinya",
    },
  },
  order: 30,
  translations: {
    de: {
      routeSlug: "vektoren-und-ihre-verknuepfungen",
      title: "Vektoren und ihre Verknüpfungen",
    },
    en: {
      routeSlug: "vectors-and-how-they-combine",
      title: "Vectors and how they combine",
    },
    id: { routeSlug: "vektor-dan-operasinya", title: "Vektor dan operasinya" },
    ms: { routeSlug: "vektor-dan-operasinya", title: "Vektor dan operasinya" },
  },
});
