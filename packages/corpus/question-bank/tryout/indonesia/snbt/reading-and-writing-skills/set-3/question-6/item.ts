import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Im Kontext Evakuierungsplan verursachte die Änderung kontrastreichere Sammelplatzsymbole den höheren Testwert.",
        },
        {
          isCorrect: false,
          label:
            "Im Kontext Evakuierungsplan verbesserten sich sämtliche Teilnehmenden um denselben Wert.",
        },
        {
          isCorrect: false,
          label:
            "Im Kontext Evakuierungsplan belegte der kurze Test das langfristige Ergebnis.",
        },
        {
          isCorrect: false,
          label:
            "Im Kontext Evakuierungsplan waren die beiden Vergleichswerte identisch.",
        },
        {
          isCorrect: true,
          label:
            "Der Versuchswert lag im Kontext Karte der Evakuierungswege über den beiden anderen Werten.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "In this setting (evacuation route map), higher-contrast assembly-point symbols caused the higher trial value.",
        },
        {
          isCorrect: false,
          label:
            "In this setting (evacuation route map), each participant improved by the same amount.",
        },
        {
          isCorrect: false,
          label:
            "In this setting (evacuation route map), the short trial established the long-term result.",
        },
        {
          isCorrect: false,
          label:
            "In this setting (evacuation route map), the two comparison values were identical.",
        },
        {
          isCorrect: true,
          label:
            "In this setting (evacuation route map), the trial value exceeded both other values.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Dalam konteks peta jalur evakuasi, simbol titik kumpul dengan kontras lebih tinggi menyebabkan nilai uji menjadi lebih tinggi.",
        },
        {
          isCorrect: false,
          label:
            "Dalam konteks peta jalur evakuasi, setiap peserta mengalami peningkatan yang sama.",
        },
        {
          isCorrect: false,
          label:
            "Dalam konteks peta jalur evakuasi, uji singkat menetapkan hasil jangka panjang.",
        },
        {
          isCorrect: false,
          label:
            "Dalam konteks peta jalur evakuasi, kedua nilai pembanding sama.",
        },
        {
          isCorrect: true,
          label:
            "Di peta jalur evakuasi, nilai hari uji melampaui dua nilai lainnya.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
