import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "vor Satz $$1$$.",
        },
        {
          isCorrect: false,
          label: "nach Satz $$1$$.",
        },
        {
          isCorrect: false,
          label: "nach Satz $$2$$.",
        },
        {
          isCorrect: false,
          label: "nach Satz $$3$$.",
        },
        {
          isCorrect: true,
          label: "nach Satz $$4$$.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "before sentence $$1$$.",
        },
        {
          isCorrect: false,
          label: "after sentence $$1$$.",
        },
        {
          isCorrect: false,
          label: "after sentence $$2$$.",
        },
        {
          isCorrect: false,
          label: "after sentence $$3$$.",
        },
        {
          isCorrect: true,
          label: "after sentence $$4$$.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "sebelum kalimat $$1$$.",
        },
        {
          isCorrect: false,
          label: "setelah kalimat $$1$$.",
        },
        {
          isCorrect: false,
          label: "setelah kalimat $$2$$.",
        },
        {
          isCorrect: false,
          label: "setelah kalimat $$3$$.",
        },
        {
          isCorrect: true,
          label: "setelah kalimat $$4$$.",
        },
      ],
    },
  },
};

export default item;
