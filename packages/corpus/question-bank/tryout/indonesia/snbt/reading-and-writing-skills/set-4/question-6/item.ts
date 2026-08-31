import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Im Kontext Sportgeräteausleihe verursachte die Änderung Fotobeschriftungen an den Rückgaberegalen den höheren Testwert.",
        },
        {
          isCorrect: false,
          label:
            "Im Kontext Sportgeräteausleihe verbesserten sich sämtliche Teilnehmenden um denselben Wert.",
        },
        {
          isCorrect: true,
          label:
            "Der Versuchswert lag im Kontext Ausleihe von Sportgeräten über den beiden anderen Werten.",
        },
        {
          isCorrect: false,
          label:
            "Im Kontext Sportgeräteausleihe waren die beiden Vergleichswerte identisch.",
        },
        {
          isCorrect: false,
          label:
            "Im Kontext Sportgeräteausleihe belegte der kurze Test das langfristige Ergebnis.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "In this setting (sports equipment lending), photo labels on the return shelves caused the higher trial value.",
        },
        {
          isCorrect: false,
          label:
            "In this setting (sports equipment lending), each participant improved by the same amount.",
        },
        {
          isCorrect: true,
          label:
            "In this setting (sports equipment lending), the trial value exceeded both other values.",
        },
        {
          isCorrect: false,
          label:
            "In this setting (sports equipment lending), the two comparison values were identical.",
        },
        {
          isCorrect: false,
          label:
            "In this setting (sports equipment lending), the short trial established the long-term result.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Dalam konteks peminjaman alat olahraga, label foto pada rak pengembalian menyebabkan nilai uji menjadi lebih tinggi.",
        },
        {
          isCorrect: false,
          label:
            "Dalam konteks peminjaman alat olahraga, setiap peserta mengalami peningkatan yang sama.",
        },
        {
          isCorrect: true,
          label:
            "Di peminjaman alat olahraga, nilai hari uji melampaui dua nilai lainnya.",
        },
        {
          isCorrect: false,
          label:
            "Dalam konteks peminjaman alat olahraga, kedua nilai pembanding sama.",
        },
        {
          isCorrect: false,
          label:
            "Dalam konteks peminjaman alat olahraga, uji singkat menetapkan hasil jangka panjang.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
