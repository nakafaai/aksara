import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$\\sqrt{86}$$",
        },
        {
          isCorrect: false,
          label: "$$\\sqrt{106}$$",
        },
        {
          isCorrect: false,
          label: "$$\\sqrt{116}$$",
        },
        {
          isCorrect: true,
          label: "$$10$$",
        },
        {
          isCorrect: false,
          label: "$$12$$",
        },
      ],
    },
  },
};

export default item;
