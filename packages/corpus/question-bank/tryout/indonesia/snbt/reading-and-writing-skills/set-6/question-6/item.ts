import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Der Versuchswert lag im Kontext Ausstellung von Schülerarbeiten über den beiden anderen Werten.",
        },
        {
          isCorrect: false,
          label:
            "Im Kontext Ausstellung von Schülerarbeiten verursachte die Änderung Richtungspfeile an jeder Kreuzung den höheren Testwert.",
        },
        {
          isCorrect: false,
          label:
            "Im Kontext Ausstellung von Schülerarbeiten verbesserten sich sämtliche Teilnehmenden um denselben Wert.",
        },
        {
          isCorrect: false,
          label:
            "Im Kontext Ausstellung von Schülerarbeiten waren die beiden Vergleichswerte identisch.",
        },
        {
          isCorrect: false,
          label:
            "Im Kontext Ausstellung von Schülerarbeiten belegte der kurze Test das langfristige Ergebnis.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "In this setting (student work exhibition), the trial value exceeded both other values.",
        },
        {
          isCorrect: false,
          label:
            "In this setting (student work exhibition), direction arrows placed at each junction caused the higher trial value.",
        },
        {
          isCorrect: false,
          label:
            "In this setting (student work exhibition), each participant improved by the same amount.",
        },
        {
          isCorrect: false,
          label:
            "In this setting (student work exhibition), the two comparison values were identical.",
        },
        {
          isCorrect: false,
          label:
            "In this setting (student work exhibition), the short trial established the long-term result.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Di pameran karya siswa, nilai hari uji melampaui dua nilai lainnya.",
        },
        {
          isCorrect: false,
          label:
            "Dalam konteks pameran karya siswa, panah arah di setiap persimpangan menyebabkan nilai uji menjadi lebih tinggi.",
        },
        {
          isCorrect: false,
          label:
            "Dalam konteks pameran karya siswa, setiap peserta mengalami peningkatan yang sama.",
        },
        {
          isCorrect: false,
          label:
            "Dalam konteks pameran karya siswa, kedua nilai pembanding sama.",
        },
        {
          isCorrect: false,
          label:
            "Dalam konteks pameran karya siswa, uji singkat menetapkan hasil jangka panjang.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
