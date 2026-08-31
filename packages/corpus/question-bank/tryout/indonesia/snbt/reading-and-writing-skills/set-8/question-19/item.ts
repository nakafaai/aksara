import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Das Team änderte nur ein Faktor: ein Formular mit strukturierten Ortsangaben.",
        },
        {
          isCorrect: false,
          label:
            "Das Team änderte nur einem Faktor: ein Formular mit strukturierten Ortsangaben.",
        },
        {
          isCorrect: true,
          label:
            "Das Team änderte nur einen Faktor: ein Formular mit strukturierten Ortsangaben.",
        },
        {
          isCorrect: false,
          label:
            "Das Team änderte lediglich nur einen Faktor: ein Formular mit strukturierten Ortsangaben.",
        },
        {
          isCorrect: false,
          label:
            "Das Team änderte nur einen Faktor, und zwar: ein Formular mit strukturierten Ortsangaben.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The team changed only one factors: a form with structured location choices.",
        },
        {
          isCorrect: false,
          label:
            "The team changed merely only one factor: a form with structured location choices.",
        },
        {
          isCorrect: true,
          label:
            "The team changed only one factor: a form with structured location choices.",
        },
        {
          isCorrect: false,
          label:
            "The team changed only one factor, namely: a form with structured location choices.",
        },
        {
          isCorrect: false,
          label:
            "The team changed only one factor; namely a form with structured location choices.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Tim merubah satu faktor saja, yaitu formulir dengan pilihan lokasi yang terstruktur.",
        },
        {
          isCorrect: false,
          label:
            "Tim mengubahkan satu faktor saja, yaitu formulir dengan pilihan lokasi yang terstruktur.",
        },
        {
          isCorrect: true,
          label:
            "Tim mengubah satu faktor saja, yaitu formulir dengan pilihan lokasi yang terstruktur.",
        },
        {
          isCorrect: false,
          label:
            "Tim hanya mengubah satu faktor saja, yaitu formulir dengan pilihan lokasi yang terstruktur.",
        },
        {
          isCorrect: false,
          label:
            "Tim mengubah terhadap satu faktor saja, yaitu formulir dengan pilihan lokasi yang terstruktur.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
