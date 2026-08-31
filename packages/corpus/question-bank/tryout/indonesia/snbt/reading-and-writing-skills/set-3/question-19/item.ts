import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Das Team änderte nur ein Faktor: Karten zur Reihenfolge brauner und grüner Materialien.",
        },
        {
          isCorrect: false,
          label:
            "Das Team änderte nur einem Faktor: Karten zur Reihenfolge brauner und grüner Materialien.",
        },
        {
          isCorrect: false,
          label:
            "Das Team änderte lediglich nur einen Faktor: Karten zur Reihenfolge brauner und grüner Materialien.",
        },
        {
          isCorrect: false,
          label:
            "Das Team änderte nur einen Faktor, und zwar: Karten zur Reihenfolge brauner und grüner Materialien.",
        },
        {
          isCorrect: true,
          label:
            "Das Team änderte nur einen Faktor: Karten zur Reihenfolge brauner und grüner Materialien.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The team changed only one factors: cards showing the order of brown and green materials.",
        },
        {
          isCorrect: false,
          label:
            "The team changed merely only one factor: cards showing the order of brown and green materials.",
        },
        {
          isCorrect: false,
          label:
            "The team changed only one factor, namely: cards showing the order of brown and green materials.",
        },
        {
          isCorrect: false,
          label:
            "The team changed only one factor; namely cards showing the order of brown and green materials.",
        },
        {
          isCorrect: true,
          label:
            "The team changed only one factor: cards showing the order of brown and green materials.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Tim merubah satu faktor saja, yaitu kartu urutan bahan cokelat dan hijau.",
        },
        {
          isCorrect: false,
          label:
            "Tim mengubahkan satu faktor saja, yaitu kartu urutan bahan cokelat dan hijau.",
        },
        {
          isCorrect: false,
          label:
            "Tim hanya mengubah satu faktor saja, yaitu kartu urutan bahan cokelat dan hijau.",
        },
        {
          isCorrect: false,
          label:
            "Tim mengubah terhadap satu faktor saja, yaitu kartu urutan bahan cokelat dan hijau.",
        },
        {
          isCorrect: true,
          label:
            "Tim mengubah satu faktor saja, yaitu kartu urutan bahan cokelat dan hijau.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
