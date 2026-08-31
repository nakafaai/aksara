import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Das Team änderte nur ein Faktor: kleine Karten mit Gehzeiten.",
        },
        {
          isCorrect: false,
          label:
            "Das Team änderte nur einem Faktor: kleine Karten mit Gehzeiten.",
        },
        {
          isCorrect: false,
          label:
            "Das Team änderte lediglich nur einen Faktor: kleine Karten mit Gehzeiten.",
        },
        {
          isCorrect: true,
          label:
            "Das Team änderte nur einen Faktor: kleine Karten mit Gehzeiten.",
        },
        {
          isCorrect: false,
          label:
            "Das Team änderte nur einen Faktor, und zwar: kleine Karten mit Gehzeiten.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The team changed only one factors: small maps showing walking times.",
        },
        {
          isCorrect: false,
          label:
            "The team changed merely only one factor: small maps showing walking times.",
        },
        {
          isCorrect: false,
          label:
            "The team changed only one factor, namely: small maps showing walking times.",
        },
        {
          isCorrect: true,
          label:
            "The team changed only one factor: small maps showing walking times.",
        },
        {
          isCorrect: false,
          label:
            "The team changed only one factor; namely small maps showing walking times.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Tim merubah satu faktor saja, yaitu peta kecil yang menampilkan waktu tempuh.",
        },
        {
          isCorrect: false,
          label:
            "Tim mengubahkan satu faktor saja, yaitu peta kecil yang menampilkan waktu tempuh.",
        },
        {
          isCorrect: false,
          label:
            "Tim hanya mengubah satu faktor saja, yaitu peta kecil yang menampilkan waktu tempuh.",
        },
        {
          isCorrect: true,
          label:
            "Tim mengubah satu faktor saja, yaitu peta kecil yang menampilkan waktu tempuh.",
        },
        {
          isCorrect: false,
          label:
            "Tim mengubah terhadap satu faktor saja, yaitu peta kecil yang menampilkan waktu tempuh.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
