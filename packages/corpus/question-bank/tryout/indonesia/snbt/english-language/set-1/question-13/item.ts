import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "To advertise employment opportunities at UNESCO.",
        },
        {
          isCorrect: false,
          label: "To argue that culture is UNESCO's only field of work.",
        },
        {
          isCorrect: false,
          label: "To compare UNESCO with every other United Nations agency.",
        },
        {
          isCorrect: true,
          label:
            "To explain why UNESCO was created and how its mission guides its current work.",
        },
        {
          isCorrect: false,
          label: "To criticize Member States for refusing all cooperation.",
        },
      ],
    },
  },
};

export default item;
