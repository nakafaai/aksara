import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Das Team änderte nur ein Faktor: die Verwendung kleiner Karten mit Gehzeiten.",
        },
        {
          isCorrect: false,
          label:
            "Das Team änderte nur einem Faktor: die Verwendung kleiner Karten mit Gehzeiten.",
        },
        {
          isCorrect: false,
          label:
            "Das Team änderte lediglich nur einen Faktor: die Verwendung kleiner Karten mit Gehzeiten.",
        },
        {
          isCorrect: true,
          label:
            "Das Team änderte nur einen Faktor: die Verwendung kleiner Karten mit Gehzeiten.",
        },
        {
          isCorrect: false,
          label:
            "Das Team änderte nur einen Faktoren: die Verwendung kleiner Karten mit Gehzeiten.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The team changed only one factors: using small maps showing walking times.",
        },
        {
          isCorrect: false,
          label:
            "The team changed merely only one factor: using small maps showing walking times.",
        },
        {
          isCorrect: false,
          label:
            "The team changed only one factor, namely: using small maps showing walking times.",
        },
        {
          isCorrect: true,
          label:
            "The team changed only one factor: using small maps showing walking times.",
        },
        {
          isCorrect: false,
          label:
            "The team changed only one factor; namely using small maps showing walking times.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Tim merubah satu faktor saja, yaitu pemakaian peta kecil dengan waktu tempuh.",
        },
        {
          isCorrect: false,
          label:
            "Tim mengrubah satu faktor saja, yaitu pemakaian peta kecil dengan waktu tempuh.",
        },
        {
          isCorrect: false,
          label:
            "Tim hanya mengubah satu faktor saja, yaitu pemakaian peta kecil dengan waktu tempuh.",
        },
        {
          isCorrect: true,
          label:
            "Tim mengubah satu faktor saja, yaitu pemakaian peta kecil dengan waktu tempuh.",
        },
        {
          isCorrect: false,
          label:
            "Tim mengubah terhadap satu faktor saja, yaitu pemakaian peta kecil dengan waktu tempuh.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
