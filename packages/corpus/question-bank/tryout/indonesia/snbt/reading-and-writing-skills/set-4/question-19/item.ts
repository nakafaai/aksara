import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Das Team veränderte alle Faktoren zugleich, nämlich Genre-Schilder auf jedem Tisch.",
        },
        {
          isCorrect: false,
          label:
            "Das Team wechselte einen Faktor-faktoren: Genre-Schilder auf jedem Tisch.",
        },
        {
          isCorrect: false,
          label:
            "Das Team tat nur einen Faktor anders: Genre-Schilder auf jedem Tisch.",
        },
        {
          isCorrect: false,
          label:
            "Das Team änderte einzig alle Faktoren: Genre-Schilder auf jedem Tisch.",
        },
        {
          isCorrect: true,
          label:
            "Das Team änderte nur einen Faktor: Genre-Schilder auf jedem Tisch.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The team alterated only one factor: genre signs on each table.",
        },
        {
          isCorrect: false,
          label:
            "The team changed every factors at once: genre signs on each table.",
        },
        {
          isCorrect: false,
          label:
            "The team did one factor differently thing: genre signs on each table.",
        },
        {
          isCorrect: false,
          label:
            "The team changed only all factors: genre signs on each table.",
        },
        {
          isCorrect: true,
          label: "The team changed only one factor: genre signs on each table.",
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
          isCorrect: false,
          label:
            "Tim mengubahkan satu faktor-faktor, yaitu tanda genre di setiap meja.",
        },
        {
          isCorrect: false,
          label:
            "Tim berubah satu faktor saja, yaitu tanda genre di setiap meja.",
        },
        {
          isCorrect: false,
          label:
            "Tim mengubah semua faktor saja, yaitu tanda genre di setiap meja.",
        },
        {
          isCorrect: true,
          label:
            "Tim mengubah satu faktor saja, yaitu tanda genre di setiap meja.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
