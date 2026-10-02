import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "kalimat $$6$$.",
        },
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
      ],
    },
  },
};

export default item;
