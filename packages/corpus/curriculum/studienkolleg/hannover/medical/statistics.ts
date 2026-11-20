import { materialNode, unitNode } from "#corpus/curriculum/schema";
import { hannoverMedicalMathematics } from "#corpus/curriculum/studienkolleg/documents";

/** Hannover M-Kurs, Statistik: Häufigkeiten, Klassierung, Diagramme, Lage- und Streumaße, Quantile. */
export const hannoverMedicalDistributionsUnit = unitNode({
  children: [
    materialNode({
      key: "hannover-m-mathematics-distributions-statistics-foundations",
      level: "lesson",
      materialKeys: ["lesson.mathematics.statistics-foundations"],
      order: 10,
      outcomes: [
        {
          code: "Statistik im M-Kurs: absolute und relative Häufigkeit",
          ...hannoverMedicalMathematics,
        },
        {
          code: "Statistik im M-Kurs: Klassierung von Daten, aufsummierte Häufigkeiten",
          ...hannoverMedicalMathematics,
        },
        {
          code: "Statistik im M-Kurs: graphische Darstellung von Daten",
          ...hannoverMedicalMathematics,
        },
        {
          code: "Statistik im M-Kurs: Lagemaße",
          ...hannoverMedicalMathematics,
        },
        {
          code: "Statistik im M-Kurs: Streumaße",
          ...hannoverMedicalMathematics,
        },
        {
          code: "Statistik im M-Kurs: Quantile, Quartile, Quartilsabstand",
          ...hannoverMedicalMathematics,
        },
      ],
    }),
  ],
  key: "hannover-m-mathematics-distributions",
  materialCard: {
    de: {
      description: "Fasse viele Messwerte in wenigen Zahlen zusammen.",
      title: "Häufigkeiten, Lage- und Streumaße",
    },
    en: {
      description: "Sum up many measurements in a few numbers.",
      title: "Frequencies, averages and spread",
    },
    id: {
      description: "Ringkas banyak data ukur dalam beberapa angka.",
      title: "Frekuensi, ukuran pemusatan, dan sebaran",
    },
    ms: {
      description: "Ringkaskan banyak data dalam beberapa nombor.",
      title: "Kekerapan, sukatan memusat dan serakan",
    },
  },
  order: 50,
  translations: {
    de: {
      routeSlug: "haeufigkeiten-lage-und-streumasse",
      title: "Häufigkeiten, Lage- und Streumaße",
    },
    en: {
      routeSlug: "frequencies-averages-and-spread",
      title: "Frequencies, averages and spread",
    },
    id: {
      routeSlug: "frekuensi-pemusatan-dan-sebaran",
      title: "Frekuensi, ukuran pemusatan, dan sebaran",
    },
    ms: {
      routeSlug: "kekerapan-memusat-dan-serakan",
      title: "Kekerapan, sukatan memusat dan serakan",
    },
  },
});

/** Hannover M-Kurs, Statistik: Zusammenhänge zwischen zwei quantitativen Merkmalen. */
export const hannoverMedicalCorrelationUnit = unitNode({
  children: [
    materialNode({
      key: "hannover-m-mathematics-correlation-statistics-regression",
      level: "lesson",
      materialKeys: ["lesson.mathematics.statistics-regression"],
      order: 10,
      outcomes: [
        {
          code: "Statistik im M-Kurs: Zusammenhänge zwischen zwei Merkmalen, quantitative Merkmale",
          ...hannoverMedicalMathematics,
        },
      ],
    }),
  ],
  key: "hannover-m-mathematics-correlation",
  materialCard: {
    de: {
      description: "Prüfe, ob zwei Messgrößen gemeinsam steigen.",
      title: "Zusammenhänge zwischen zwei Merkmalen",
    },
    en: {
      description: "Check whether two measurements rise together.",
      title: "Relationships between two variables",
    },
    id: {
      description: "Periksa apakah dua besaran naik bersama.",
      title: "Hubungan antara dua variabel",
    },
    ms: {
      description: "Semak sama ada dua kuantiti naik bersama.",
      title: "Hubungan antara dua pemboleh ubah",
    },
  },
  order: 60,
  translations: {
    de: {
      routeSlug: "zusammenhaenge-zwischen-zwei-merkmalen",
      title: "Zusammenhänge zwischen zwei Merkmalen",
    },
    en: {
      routeSlug: "relationships-between-two-variables",
      title: "Relationships between two variables",
    },
    id: {
      routeSlug: "hubungan-antara-dua-variabel",
      title: "Hubungan antara dua variabel",
    },
    ms: {
      routeSlug: "hubungan-antara-dua-pemboleh-ubah",
      title: "Hubungan antara dua pemboleh ubah",
    },
  },
});
