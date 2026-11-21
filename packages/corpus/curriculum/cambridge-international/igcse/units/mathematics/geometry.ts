import { mathematicsSyllabus } from "#corpus/curriculum/cambridge-international/documents";
import { materialNode, unitNode } from "#corpus/curriculum/schema";

/** Cambridge IGCSE Mathematics 0580, topic 3 Coordinate geometry. */
export const igcseCoordinateGeometryUnit = unitNode({
  children: [
    materialNode({
      key: "mathematics-0580-coordinate-geometry-lines",
      level: "lesson",
      materialKeys: ["lesson.mathematics.coordinate-geometry"],
      order: 10,
      outcomes: [
        { code: "E3.3 Gradient of linear graphs", ...mathematicsSyllabus },
        { code: "E3.4 Length and midpoint", ...mathematicsSyllabus },
        { code: "E3.5 Equations of linear graphs", ...mathematicsSyllabus },
        { code: "E3.6 Parallel lines", ...mathematicsSyllabus },
        { code: "E3.7 Perpendicular lines", ...mathematicsSyllabus },
      ],
    }),
    materialNode({
      key: "mathematics-0580-coordinate-geometry-linear-law",
      level: "lesson",
      materialKeys: ["lesson.mathematics.linear-law"],
      order: 20,
      outcomes: [
        { code: "E3.5 Equations of linear graphs", ...mathematicsSyllabus },
      ],
    }),
  ],
  key: "mathematics-0580-coordinate-geometry",
  materialCard: {
    de: {
      description: "Bestimme Steigungen, Mittelpunkte und Geraden.",
      title: "Koordinatengeometrie",
    },
    en: {
      description: "Find gradients, midpoints, and equations of lines.",
      title: "Coordinate geometry",
    },
    id: {
      description: "Cari gradien, titik tengah, dan persamaan garis.",
      title: "Geometri koordinat",
    },
    ms: {
      description: "Cari kecerunan, titik tengah dan persamaan garis lurus.",
      title: "Geometri koordinat",
    },
  },
  order: 30,
  translations: {
    de: { routeSlug: "koordinatengeometrie", title: "Koordinatengeometrie" },
    en: { routeSlug: "coordinate-geometry", title: "Coordinate geometry" },
    id: { routeSlug: "geometri-koordinat", title: "Geometri koordinat" },
    ms: { routeSlug: "geometri-koordinat", title: "Geometri koordinat" },
  },
});

/** Cambridge IGCSE Mathematics 0580, topic 4 Geometry. */
export const igcseGeometryUnit = unitNode({
  children: [
    materialNode({
      key: "mathematics-0580-geometry-circles",
      level: "lesson",
      materialKeys: ["lesson.mathematics.circle"],
      order: 10,
      outcomes: [
        { code: "E4.7 Circle theorems I", ...mathematicsSyllabus },
        { code: "E4.8 Circle theorems II", ...mathematicsSyllabus },
      ],
    }),
  ],
  key: "mathematics-0580-geometry",
  materialCard: {
    de: {
      description: "Begründe Winkel mit den Kreissätzen.",
      title: "Geometrie",
    },
    en: {
      description: "Prove angle facts with circle theorems.",
      title: "Geometry",
    },
    id: {
      description: "Buktikan sifat sudut dengan teorema lingkaran.",
      title: "Geometri",
    },
    ms: {
      description: "Buktikan sifat sudut dengan teorem bulatan.",
      title: "Geometri",
    },
  },
  order: 40,
  translations: {
    de: { routeSlug: "geometrie", title: "Geometrie" },
    en: { routeSlug: "geometry", title: "Geometry" },
    id: { routeSlug: "geometri", title: "Geometri" },
    ms: { routeSlug: "geometri", title: "Geometri" },
  },
});

/** Cambridge IGCSE Mathematics 0580, topic 5 Mensuration. */
export const igcseMensurationUnit = unitNode({
  children: [
    materialNode({
      key: "mathematics-0580-mensuration-arcs-sectors",
      level: "lesson",
      materialKeys: ["lesson.mathematics.circle-arc-sector"],
      order: 10,
      outcomes: [
        { code: "E5.3 Circles, arcs and sectors", ...mathematicsSyllabus },
        {
          code: "E5.5 Compound shapes and parts of shapes",
          ...mathematicsSyllabus,
        },
      ],
    }),
  ],
  key: "mathematics-0580-mensuration",
  materialCard: {
    de: {
      description: "Berechne Bogenlängen und Sektorflächen.",
      title: "Messen",
    },
    en: {
      description: "Measure arc lengths and sector areas.",
      title: "Mensuration",
    },
    id: {
      description: "Ukur panjang busur dan luas juring.",
      title: "Pengukuran",
    },
    ms: {
      description: "Ukur panjang lengkok dan luas sektor.",
      title: "Pengukuran",
    },
  },
  order: 50,
  translations: {
    de: { routeSlug: "messen", title: "Messen" },
    en: { routeSlug: "mensuration", title: "Mensuration" },
    id: { routeSlug: "pengukuran", title: "Pengukuran" },
    ms: { routeSlug: "pengukuran", title: "Pengukuran" },
  },
});
