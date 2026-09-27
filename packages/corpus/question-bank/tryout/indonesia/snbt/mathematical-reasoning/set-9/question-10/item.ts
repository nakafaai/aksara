import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "$$4$$",
        },
        {
          isCorrect: false,
          label: "$$3$$",
        },
        {
          isCorrect: false,
          label: "$$\\frac72$$",
        },
        {
          isCorrect: false,
          label: "$$\\sqrt{17}$$",
        },
        {
          isCorrect: false,
          label: "$$5$$",
        },
      ],
    },
  },
};

export default item;
