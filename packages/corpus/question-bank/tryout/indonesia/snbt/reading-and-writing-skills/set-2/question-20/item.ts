import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Satz $$2$$.",
        },
        {
          isCorrect: false,
          label: "Satz $$4$$.",
        },
        {
          isCorrect: false,
          label: "Satz $$8$$.",
        },
        {
          isCorrect: false,
          label: "Satz $$10$$.",
        },
        {
          isCorrect: true,
          label: "Satz $$6$$.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "sentence $$2$$.",
        },
        {
          isCorrect: false,
          label: "sentence $$4$$.",
        },
        {
          isCorrect: false,
          label: "sentence $$8$$.",
        },
        {
          isCorrect: false,
          label: "sentence $$10$$.",
        },
        {
          isCorrect: true,
          label: "sentence $$6$$.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "kalimat $$2$$.",
        },
        {
          isCorrect: false,
          label: "kalimat $$4$$.",
        },
        {
          isCorrect: false,
          label: "kalimat $$8$$.",
        },
        {
          isCorrect: false,
          label: "kalimat $$10$$.",
        },
        {
          isCorrect: true,
          label: "kalimat $$6$$.",
        },
      ],
    },
  },
};

export default item;
