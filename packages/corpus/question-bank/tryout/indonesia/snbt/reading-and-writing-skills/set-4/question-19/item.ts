import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Das Team änderte nur ein Faktor: Genre-Schilder auf jedem Tisch.",
        },
        {
          isCorrect: true,
          label:
            "Das Team änderte nur einen Faktor: Genre-Schilder auf jedem Tisch.",
        },
        {
          isCorrect: false,
          label:
            "Das Team änderte nur einem Faktor: Genre-Schilder auf jedem Tisch.",
        },
        {
          isCorrect: false,
          label:
            "Das Team änderte lediglich nur einen Faktor: Genre-Schilder auf jedem Tisch.",
        },
        {
          isCorrect: false,
          label:
            "Das Team änderte nur einen Faktor, und zwar: Genre-Schilder auf jedem Tisch.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The team changed only one factors: genre signs on each table.",
        },
        {
          isCorrect: true,
          label: "The team changed only one factor: genre signs on each table.",
        },
        {
          isCorrect: false,
          label:
            "The team changed merely only one factor: genre signs on each table.",
        },
        {
          isCorrect: false,
          label:
            "The team changed only one factor, namely: genre signs on each table.",
        },
        {
          isCorrect: false,
          label:
            "The team changed only one factor; namely genre signs on each table.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Tim merubah satu faktor saja, yaitu tanda genre di setiap meja.",
        },
        {
          isCorrect: true,
          label:
            "Tim mengubah satu faktor saja, yaitu tanda genre di setiap meja.",
        },
        {
          isCorrect: false,
          label:
            "Tim mengubahkan satu faktor saja, yaitu tanda genre di setiap meja.",
        },
        {
          isCorrect: false,
          label:
            "Tim hanya mengubah satu faktor saja, yaitu tanda genre di setiap meja.",
        },
        {
          isCorrect: false,
          label:
            "Tim mengubah terhadap satu faktor saja, yaitu tanda genre di setiap meja.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
