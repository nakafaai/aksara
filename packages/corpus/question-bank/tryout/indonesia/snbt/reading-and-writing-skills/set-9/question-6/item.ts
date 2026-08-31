import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Im Kontext Verteilung von Mangrovensetzlingen verursachte die Änderung Pflanzortetiketten auf jedem Tablett den höheren Testwert.",
        },
        {
          isCorrect: false,
          label:
            "Im Kontext Verteilung von Mangrovensetzlingen verbesserten sich sämtliche Teilnehmenden um denselben Wert.",
        },
        {
          isCorrect: false,
          label:
            "Im Kontext Verteilung von Mangrovensetzlingen waren die beiden Vergleichswerte identisch.",
        },
        {
          isCorrect: false,
          label:
            "Im Kontext Verteilung von Mangrovensetzlingen belegte der kurze Test das langfristige Ergebnis.",
        },
        {
          isCorrect: true,
          label:
            "Der Versuchswert lag im Kontext Verteilung von Mangrovensetzlingen über den beiden anderen Werten.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "In this setting (mangrove seedling distribution), planting-site labels on every tray caused the higher trial value.",
        },
        {
          isCorrect: false,
          label:
            "In this setting (mangrove seedling distribution), each participant improved by the same amount.",
        },
        {
          isCorrect: false,
          label:
            "In this setting (mangrove seedling distribution), the two comparison values were identical.",
        },
        {
          isCorrect: false,
          label:
            "In this setting (mangrove seedling distribution), the short trial established the long-term result.",
        },
        {
          isCorrect: true,
          label:
            "In this setting (mangrove seedling distribution), the trial value exceeded both other values.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Dalam konteks distribusi bibit mangrove, label lokasi tanam pada setiap baki menyebabkan nilai uji menjadi lebih tinggi.",
        },
        {
          isCorrect: false,
          label:
            "Dalam konteks distribusi bibit mangrove, setiap peserta mengalami peningkatan yang sama.",
        },
        {
          isCorrect: false,
          label:
            "Dalam konteks distribusi bibit mangrove, kedua nilai pembanding sama.",
        },
        {
          isCorrect: false,
          label:
            "Dalam konteks distribusi bibit mangrove, uji singkat menetapkan hasil jangka panjang.",
        },
        {
          isCorrect: true,
          label:
            "Di pembagian bibit mangrove, nilai hari uji melampaui dua nilai lainnya.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
