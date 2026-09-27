import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$11{.}760$$",
        },
        {
          isCorrect: true,
          label: "$$13{.}600$$",
        },
        {
          isCorrect: false,
          label: "$$12{.}000$$",
        },
        {
          isCorrect: false,
          label: "$$14{.}000$$",
        },
        {
          isCorrect: false,
          label: "$$15{.}600$$",
        },
      ],
    },
  },
};

export default item;
