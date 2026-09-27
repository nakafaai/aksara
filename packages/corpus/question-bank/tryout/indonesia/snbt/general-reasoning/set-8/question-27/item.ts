import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "$$66$$",
        },
        {
          isCorrect: false,
          label: "$$54$$",
        },
        {
          isCorrect: false,
          label: "$$60$$",
        },
        {
          isCorrect: false,
          label: "$$72$$",
        },
        {
          isCorrect: false,
          label: "$$78$$",
        },
      ],
    },
  },
};

export default item;
