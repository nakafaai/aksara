import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "ketidakjelasan.",
        },
        {
          isCorrect: false,
          label: "kepastian.",
        },
        {
          isCorrect: false,
          label: "ketepatwaktuan.",
        },
        {
          isCorrect: false,
          label: "keanekaragaman.",
        },
        {
          isCorrect: false,
          label: "keseragaman.",
        },
      ],
    },
  },
};

export default item;
