import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "eine Wirksamkeitsanalise zu Karten mit Gehzeiten im Stadtpark",
        },
        {
          isCorrect: false,
          label:
            "eine Wirksamkaitsanalyse zu Karten mit Gehzeiten im Stadtpark",
        },
        {
          isCorrect: true,
          label:
            "eine Wirksamkeitsanalyse zu Karten mit Gehzeiten im Stadtpark",
        },
        {
          isCorrect: false,
          label:
            "eine Wirksamkeitsanalyse zu Karten mit Gehzeitem im Stadtpark",
        },
        {
          isCorrect: false,
          label:
            "eine Wirksamkeitsanalyse zu Karten mit Gehzeiten im Stadtparkk",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "an analysiss of the effectiveness of small maps showing walking times",
        },
        {
          isCorrect: false,
          label:
            "an analysis of the effectivness of small maps showing walking times",
        },
        {
          isCorrect: true,
          label:
            "an analysis of the effectiveness of small maps showing walking times",
        },
        {
          isCorrect: false,
          label:
            "an analisis of the effectiveness of small maps showing walking times",
        },
        {
          isCorrect: false,
          label:
            "an analysis of the effectivenes of small maps showing walking times",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "analisa efektivitas peta kecil dengan waktu tempuh di taman kota",
        },
        {
          isCorrect: false,
          label:
            "analisis efektifitas peta kecil dengan waktu tempuh di taman kota",
        },
        {
          isCorrect: true,
          label:
            "analisis efektivitas peta kecil dengan waktu tempuh di taman kota",
        },
        {
          isCorrect: false,
          label:
            "analisa efektifitas peta kecil dengan waktu tempuh di taman kota",
        },
        {
          isCorrect: false,
          label:
            "analisis efektivitas peta kecil dengan waktu tempuh dalam kontek taman kota",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
