import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Vorbestellungen waren nachweislich die einzige Ursache des höheren Mittelwerts.",
        },
        {
          isCorrect: false,
          label:
            "Alle Schülerinnen und Schüler verbesserten sich im selben Umfang.",
        },
        {
          isCorrect: false,
          label: "Ausgangs- und Vergleichswert waren gleich.",
        },
        {
          isCorrect: true,
          label:
            "Der Mittelwert passend zur Bestellung abgeholter Portionen lag im Versuch über dem Ausgangs- und dem Vergleichswert.",
        },
        {
          isCorrect: false,
          label:
            "Der Versuch belegte das langfristige Ergebnis für alle Frühstücksprogramme.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Advance ordering was proved to be the sole cause of the higher mean.",
        },
        {
          isCorrect: false,
          label: "Every student improved by the same amount.",
        },
        {
          isCorrect: false,
          label: "The baseline and comparison means were identical.",
        },
        {
          isCorrect: true,
          label:
            "The trial mean for servings collected as ordered exceeded the baseline and comparison means.",
        },
        {
          isCorrect: false,
          label:
            "The trial established the long-term result for all breakfast programmes.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Pemesanan awal terbukti menjadi satu-satunya penyebab rata-rata yang lebih tinggi.",
        },
        {
          isCorrect: false,
          label: "Setiap siswa mengalami peningkatan yang sama.",
        },
        {
          isCorrect: false,
          label: "Rata-rata awal dan pembanding sama.",
        },
        {
          isCorrect: true,
          label:
            "Rata-rata porsi yang diambil sesuai pesanan pada sesi uji melebihi rata-rata awal dan pembanding.",
        },
        {
          isCorrect: false,
          label:
            "Uji tersebut menetapkan hasil jangka panjang bagi semua program sarapan.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
