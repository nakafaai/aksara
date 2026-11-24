import { mathematicsStandards } from "#corpus/curriculum/kssm/documents";
import { materialNode, unitNode } from "#corpus/curriculum/schema";

/** KSSM Form 5 Mathematics chapters 1 to 4, in the order of their DSKP. */
export const kssmForm5MathematicsAlgebraNodes = [
  unitNode({
    children: [
      materialNode({
        key: "form-5-mathematics-variation-variation",
        level: "lesson",
        materialKeys: ["lesson.mathematics.variation"],
        order: 10,
        outcomes: [
          {
            code: "Tingkatan 5, Standard Kandungan 1.1 hingga 1.3",
            ...mathematicsStandards,
          },
        ],
      }),
    ],
    key: "form-5-mathematics-variation",
    materialCard: {
      de: {
        description: "Bestimme den Faktor und löse Aufgaben.",
        title: "Proportionalität",
      },
      en: {
        description: "Find the constant of variation and solve problems.",
        title: "Variation",
      },
      id: {
        description: "Tentukan konstanta variasi dan selesaikan soal.",
        title: "Variasi",
      },
      ms: {
        description: "Cari pemalar ubahan dan selesaikan masalah.",
        title: "Ubahan",
      },
    },
    order: 10,
    translations: {
      de: { routeSlug: "proportionalitaet", title: "Proportionalität" },
      en: { routeSlug: "variation", title: "Variation" },
      id: { routeSlug: "variasi", title: "Variasi" },
      ms: { routeSlug: "ubahan", title: "Ubahan" },
    },
  }),
  unitNode({
    children: [
      materialNode({
        key: "form-5-mathematics-matrices-matrix",
        level: "lesson",
        materialKeys: ["lesson.mathematics.matrix"],
        order: 10,
        outcomes: [
          {
            code: "Tingkatan 5, Standard Kandungan 2.1 hingga 2.2, Standard Pembelajaran 2.1.1 hingga 2.2.7",
            ...mathematicsStandards,
          },
        ],
      }),
    ],
    key: "form-5-mathematics-matrices",
    materialCard: {
      de: {
        description: "Addiere, multipliziere und nutze Matrizen für Systeme.",
        title: "Matrizen",
      },
      en: {
        description: "Add, multiply and use matrices to solve systems.",
        title: "Matrices",
      },
      id: {
        description: "Jumlahkan, kalikan, dan pakai matriks untuk sistem.",
        title: "Matriks",
      },
      ms: {
        description: "Tambah, darab dan guna matriks untuk sistem persamaan.",
        title: "Matriks",
      },
    },
    order: 20,
    translations: {
      de: { routeSlug: "matrizen", title: "Matrizen" },
      en: { routeSlug: "matrices", title: "Matrices" },
      id: { routeSlug: "matriks", title: "Matriks" },
      ms: { routeSlug: "matriks", title: "Matriks" },
    },
  }),
  unitNode({
    children: [
      materialNode({
        key: "form-5-mathematics-consumer-mathematics-insurance-insurance",
        level: "lesson",
        materialKeys: ["lesson.mathematics.insurance"],
        order: 10,
        outcomes: [
          {
            code: "Tingkatan 5, Standard Kandungan 3.1",
            ...mathematicsStandards,
          },
        ],
      }),
    ],
    key: "form-5-mathematics-consumer-mathematics-insurance",
    materialCard: {
      de: {
        description: "Berechne Prämien, Selbstbehalt und Entschädigung.",
        title: "Versicherung",
      },
      en: {
        description: "Work out premiums, deductibles and compensation.",
        title: "Insurance",
      },
      id: {
        description: "Hitung premi, risiko sendiri, dan ganti rugi.",
        title: "Asuransi",
      },
      ms: {
        description: "Kira premium, deduktibel dan pampasan.",
        title: "Insurans",
      },
    },
    order: 30,
    translations: {
      de: {
        routeSlug: "verbrauchermathematik-versicherung",
        title: "Verbrauchermathematik: Versicherung",
      },
      en: {
        routeSlug: "consumer-mathematics-insurance",
        title: "Consumer Mathematics: Insurance",
      },
      id: {
        routeSlug: "matematika-konsumen-asuransi",
        title: "Matematika Konsumen: Asuransi",
      },
      ms: {
        routeSlug: "matematik-pengguna-insurans",
        title: "Matematik Pengguna: Insurans",
      },
    },
  }),
  unitNode({
    children: [
      materialNode({
        key: "form-5-mathematics-consumer-mathematics-taxation-taxation",
        level: "lesson",
        materialKeys: ["lesson.mathematics.taxation"],
        order: 10,
        outcomes: [
          {
            code: "Tingkatan 5, Standard Kandungan 4.1",
            ...mathematicsStandards,
          },
        ],
      }),
    ],
    key: "form-5-mathematics-consumer-mathematics-taxation",
    materialCard: {
      de: {
        description: "Berechne progressive Einkommensteuer.",
        title: "Steuern",
      },
      en: {
        description: "Work out progressive income tax.",
        title: "Taxation",
      },
      id: {
        description: "Hitung pajak penghasilan progresif.",
        title: "Perpajakan",
      },
      ms: {
        description: "Kira cukai pendapatan berperingkat.",
        title: "Percukaian",
      },
    },
    order: 40,
    translations: {
      de: {
        routeSlug: "verbrauchermathematik-steuern",
        title: "Verbrauchermathematik: Steuern",
      },
      en: {
        routeSlug: "consumer-mathematics-taxation",
        title: "Consumer Mathematics: Taxation",
      },
      id: {
        routeSlug: "matematika-konsumen-perpajakan",
        title: "Matematika Konsumen: Perpajakan",
      },
      ms: {
        routeSlug: "matematik-pengguna-percukaian",
        title: "Matematik Pengguna: Percukaian",
      },
    },
  }),
];
