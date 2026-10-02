import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "setelah kalimat $$4$$.",
        },
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
      ],
    },
  },
};

export default item;
