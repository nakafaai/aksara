import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Das Team änderte nur einen Faktor: einen Rückgabecode an jedem Griff.",
        },
        {
          isCorrect: false,
          label:
            "Das Team veränderte alle Faktoren zugleich, nämlich einen Rückgabecode an jedem Griff.",
        },
        {
          isCorrect: false,
          label:
            "Das Team wechselte einen Faktor-faktoren: einen Rückgabecode an jedem Griff.",
        },
        {
          isCorrect: false,
          label:
            "Das Team tat nur einen Faktor anders: einen Rückgabecode an jedem Griff.",
        },
        {
          isCorrect: false,
          label:
            "Das Team änderte einzig alle Faktoren: einen Rückgabecode an jedem Griff.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "The team changed only one factor: a return code on each handle.",
        },
        {
          isCorrect: false,
          label:
            "The team alterated only one factor: a return code on each handle.",
        },
        {
          isCorrect: false,
          label:
            "The team changed every factors at once: a return code on each handle.",
        },
        {
          isCorrect: false,
          label:
            "The team did one factor differently thing: a return code on each handle.",
        },
        {
          isCorrect: false,
          label:
            "The team changed only all factors: a return code on each handle.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "Tim mengubah satu faktor saja, yaitu kode pengembalian.",
        },
        {
          isCorrect: false,
          label: "Tim merubah satu faktor saja, yaitu kode pengembalian.",
        },
        {
          isCorrect: false,
          label: "Tim mengubahkan satu faktor-faktor, yaitu kode pengembalian.",
        },
        {
          isCorrect: false,
          label: "Tim berubah satu faktor saja, yaitu kode pengembalian.",
        },
        {
          isCorrect: false,
          label: "Tim mengubah semua faktor saja, yaitu kode pengembalian.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
