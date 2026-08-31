import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Das Team änderte nur ein Faktor: einen Rückgabecode an jedem Griff.",
        },
        {
          isCorrect: false,
          label:
            "Das Team änderte nur einem Faktor: einen Rückgabecode an jedem Griff.",
        },
        {
          isCorrect: false,
          label:
            "Das Team änderte lediglich nur einen Faktor: einen Rückgabecode an jedem Griff.",
        },
        {
          isCorrect: false,
          label:
            "Das Team änderte nur einen Faktor, und zwar: einen Rückgabecode an jedem Griff.",
        },
        {
          isCorrect: true,
          label:
            "Das Team änderte nur einen Faktor: einen Rückgabecode an jedem Griff.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The team changed only one factors: a return code on each handle.",
        },
        {
          isCorrect: false,
          label:
            "The team changed merely only one factor: a return code on each handle.",
        },
        {
          isCorrect: false,
          label:
            "The team changed only one factor, namely: a return code on each handle.",
        },
        {
          isCorrect: false,
          label:
            "The team changed only one factor; namely a return code on each handle.",
        },
        {
          isCorrect: true,
          label:
            "The team changed only one factor: a return code on each handle.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Tim merubah satu faktor saja, yaitu kode pengembalian.",
        },
        {
          isCorrect: false,
          label: "Tim mengubahkan satu faktor saja, yaitu kode pengembalian.",
        },
        {
          isCorrect: false,
          label:
            "Tim hanya mengubah satu faktor saja, yaitu kode pengembalian.",
        },
        {
          isCorrect: false,
          label:
            "Tim mengubah terhadap satu faktor saja, yaitu kode pengembalian.",
        },
        {
          isCorrect: true,
          label: "Tim mengubah satu faktor saja, yaitu kode pengembalian.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
