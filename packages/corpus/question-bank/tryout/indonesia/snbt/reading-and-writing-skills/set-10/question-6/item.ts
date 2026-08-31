import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Im Kontext Kochkurs für Jugendliche verursachte die Änderung nach Rezeptschritten gruppierte Zutaten den höheren Testwert.",
        },
        {
          isCorrect: true,
          label:
            "Der Versuchswert lag im Kontext Kochkurs für Jugendliche über den beiden anderen Werten.",
        },
        {
          isCorrect: false,
          label:
            "Im Kontext Kochkurs für Jugendliche verbesserten sich sämtliche Teilnehmenden um denselben Wert.",
        },
        {
          isCorrect: false,
          label:
            "Im Kontext Kochkurs für Jugendliche waren die beiden Vergleichswerte identisch.",
        },
        {
          isCorrect: false,
          label:
            "Im Kontext Kochkurs für Jugendliche belegte der kurze Test das langfristige Ergebnis.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "In this setting (teen cooking class), ingredients grouped by recipe stage caused the higher trial value.",
        },
        {
          isCorrect: true,
          label:
            "In this setting (teen cooking class), the trial value exceeded both other values.",
        },
        {
          isCorrect: false,
          label:
            "In this setting (teen cooking class), each participant improved by the same amount.",
        },
        {
          isCorrect: false,
          label:
            "In this setting (teen cooking class), the two comparison values were identical.",
        },
        {
          isCorrect: false,
          label:
            "In this setting (teen cooking class), the short trial established the long-term result.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Dalam konteks kelas memasak remaja, bahan yang dikelompokkan menurut tahap resep menyebabkan nilai uji menjadi lebih tinggi.",
        },
        {
          isCorrect: true,
          label:
            "Di kelas memasak remaja, nilai hari uji melampaui dua nilai lainnya.",
        },
        {
          isCorrect: false,
          label:
            "Dalam konteks kelas memasak remaja, setiap peserta mengalami peningkatan yang sama.",
        },
        {
          isCorrect: false,
          label:
            "Dalam konteks kelas memasak remaja, kedua nilai pembanding sama.",
        },
        {
          isCorrect: false,
          label:
            "Dalam konteks kelas memasak remaja, uji singkat menetapkan hasil jangka panjang.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
