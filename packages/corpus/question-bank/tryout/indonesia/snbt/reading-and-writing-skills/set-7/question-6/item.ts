import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Im Kontext Schulfrühstücksprogramm verursachte die Änderung Menüvorbestellung am Vortag den höheren Testwert.",
        },
        {
          isCorrect: false,
          label:
            "Im Kontext Schulfrühstücksprogramm verbesserten sich sämtliche Teilnehmenden um denselben Wert.",
        },
        {
          isCorrect: false,
          label:
            "Im Kontext Schulfrühstücksprogramm waren die beiden Vergleichswerte identisch.",
        },
        {
          isCorrect: true,
          label:
            "Der Versuchswert lag im Kontext Schulfrühstücksprogramm über den beiden anderen Werten.",
        },
        {
          isCorrect: false,
          label:
            "Im Kontext Schulfrühstücksprogramm belegte der kurze Test das langfristige Ergebnis.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "In this setting (school breakfast programme), menu booking one day in advance caused the higher trial value.",
        },
        {
          isCorrect: false,
          label:
            "In this setting (school breakfast programme), each participant improved by the same amount.",
        },
        {
          isCorrect: false,
          label:
            "In this setting (school breakfast programme), the two comparison values were identical.",
        },
        {
          isCorrect: true,
          label:
            "In this setting (school breakfast programme), the trial value exceeded both other values.",
        },
        {
          isCorrect: false,
          label:
            "In this setting (school breakfast programme), the short trial established the long-term result.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Dalam konteks program sarapan sekolah, pemesanan menu sehari sebelumnya menyebabkan nilai uji menjadi lebih tinggi.",
        },
        {
          isCorrect: false,
          label:
            "Dalam konteks program sarapan sekolah, setiap peserta mengalami peningkatan yang sama.",
        },
        {
          isCorrect: false,
          label:
            "Dalam konteks program sarapan sekolah, kedua nilai pembanding sama.",
        },
        {
          isCorrect: true,
          label:
            "Di program sarapan sekolah, nilai hari uji melampaui dua nilai lainnya.",
        },
        {
          isCorrect: false,
          label:
            "Dalam konteks program sarapan sekolah, uji singkat menetapkan hasil jangka panjang.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
