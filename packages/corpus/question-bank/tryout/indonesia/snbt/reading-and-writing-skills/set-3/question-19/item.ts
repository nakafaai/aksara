import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Das Team veränderte alle Faktoren zugleich, nämlich Karten zur Reihenfolge brauner und grüner Materialien.",
        },
        {
          isCorrect: true,
          label:
            "Das Team änderte nur einen Faktor: Karten zur Reihenfolge brauner und grüner Materialien.",
        },
        {
          isCorrect: false,
          label:
            "Das Team wechselte einen Faktor-faktoren: Karten zur Reihenfolge brauner und grüner Materialien.",
        },
        {
          isCorrect: false,
          label:
            "Das Team tat nur einen Faktor anders: Karten zur Reihenfolge brauner und grüner Materialien.",
        },
        {
          isCorrect: false,
          label:
            "Das Team änderte einzig alle Faktoren: Karten zur Reihenfolge brauner und grüner Materialien.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The team alterated only one factor: cards showing the order of brown and green materials.",
        },
        {
          isCorrect: true,
          label:
            "The team changed only one factor: cards showing the order of brown and green materials.",
        },
        {
          isCorrect: false,
          label:
            "The team changed every factors at once: cards showing the order of brown and green materials.",
        },
        {
          isCorrect: false,
          label:
            "The team did one factor differently thing: cards showing the order of brown and green materials.",
        },
        {
          isCorrect: false,
          label:
            "The team changed only all factors: cards showing the order of brown and green materials.",
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
          isCorrect: true,
          label:
            "Tim mengubah satu faktor saja, yaitu kartu urutan bahan cokelat dan hijau.",
        },
        {
          isCorrect: false,
          label:
            "Tim mengubahkan satu faktor-faktor, yaitu kartu urutan bahan cokelat dan hijau.",
        },
        {
          isCorrect: false,
          label:
            "Tim berubah satu faktor saja, yaitu kartu urutan bahan cokelat dan hijau.",
        },
        {
          isCorrect: false,
          label:
            "Tim mengubah semua faktor saja, yaitu kartu urutan bahan cokelat dan hijau.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
