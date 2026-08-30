import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Das Team änderte nur einen Faktor: ein Formular mit strukturierten Ortsangaben.",
        },
        {
          isCorrect: false,
          label:
            "Das Team veränderte alle Faktoren zugleich, nämlich ein Formular mit strukturierten Ortsangaben.",
        },
        {
          isCorrect: false,
          label:
            "Das Team wechselte einen Faktor-faktoren: ein Formular mit strukturierten Ortsangaben.",
        },
        {
          isCorrect: false,
          label:
            "Das Team tat nur einen Faktor anders: ein Formular mit strukturierten Ortsangaben.",
        },
        {
          isCorrect: false,
          label:
            "Das Team änderte einzig alle Faktoren: ein Formular mit strukturierten Ortsangaben.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "The team changed only one factor: a form with structured location choices.",
        },
        {
          isCorrect: false,
          label:
            "The team alterated only one factor: a form with structured location choices.",
        },
        {
          isCorrect: false,
          label:
            "The team changed every factors at once: a form with structured location choices.",
        },
        {
          isCorrect: false,
          label:
            "The team did one factor differently thing: a form with structured location choices.",
        },
        {
          isCorrect: false,
          label:
            "The team changed only all factors: a form with structured location choices.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Tim mengubah satu faktor saja, yaitu formulir dengan pilihan lokasi yang terstruktur.",
        },
        {
          isCorrect: false,
          label:
            "Tim merubah satu faktor saja, yaitu formulir dengan pilihan lokasi yang terstruktur.",
        },
        {
          isCorrect: false,
          label:
            "Tim mengubahkan satu faktor-faktor, yaitu formulir dengan pilihan lokasi yang terstruktur.",
        },
        {
          isCorrect: false,
          label:
            "Tim berubah satu faktor saja, yaitu formulir dengan pilihan lokasi yang terstruktur.",
        },
        {
          isCorrect: false,
          label:
            "Tim mengubah semua faktor saja, yaitu formulir dengan pilihan lokasi yang terstruktur.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
