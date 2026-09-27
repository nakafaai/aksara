import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$70$$",
        },
        {
          isCorrect: false,
          label: "$$36$$",
        },
        {
          isCorrect: true,
          label: "$$28$$",
        },
        {
          isCorrect: false,
          label: "$$34$$",
        },
        {
          isCorrect: false,
          label: "$$25$$",
        },
      ],
    },
  },
};

export default item;
