import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Im Kontext Straßenbaumerhebung verursachte die Änderung Beispielfotos für jede Zustandskategorie den höheren Testwert.",
        },
        {
          isCorrect: false,
          label:
            "Im Kontext Straßenbaumerhebung verbesserten sich sämtliche Teilnehmenden um denselben Wert.",
        },
        {
          isCorrect: false,
          label:
            "Im Kontext Straßenbaumerhebung waren die beiden Vergleichswerte identisch.",
        },
        {
          isCorrect: false,
          label:
            "Im Kontext Straßenbaumerhebung belegte der kurze Test das langfristige Ergebnis.",
        },
        {
          isCorrect: true,
          label:
            "Der Versuchswert lag im Kontext Erfassung von Straßenbäumen über den beiden anderen Werten.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "In this setting (street-tree survey), sample photos for each condition category caused the higher trial value.",
        },
        {
          isCorrect: false,
          label:
            "In this setting (street-tree survey), each participant improved by the same amount.",
        },
        {
          isCorrect: false,
          label:
            "In this setting (street-tree survey), the two comparison values were identical.",
        },
        {
          isCorrect: false,
          label:
            "In this setting (street-tree survey), the short trial established the long-term result.",
        },
        {
          isCorrect: true,
          label:
            "In this setting (street-tree survey), the trial value exceeded both other values.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Dalam konteks survei pohon jalan, foto contoh untuk setiap kategori kondisi menyebabkan nilai uji menjadi lebih tinggi.",
        },
        {
          isCorrect: false,
          label:
            "Dalam konteks survei pohon jalan, setiap peserta mengalami peningkatan yang sama.",
        },
        {
          isCorrect: false,
          label:
            "Dalam konteks survei pohon jalan, kedua nilai pembanding sama.",
        },
        {
          isCorrect: false,
          label:
            "Dalam konteks survei pohon jalan, uji singkat menetapkan hasil jangka panjang.",
        },
        {
          isCorrect: true,
          label:
            "Di pendataan pohon jalan, nilai hari uji melampaui dua nilai lainnya.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
