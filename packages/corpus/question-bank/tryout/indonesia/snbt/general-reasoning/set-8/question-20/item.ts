import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$1{.}268$$ dan $$293$$ orang",
        },
        {
          isCorrect: true,
          label: "$$1{.}268$$ dan $$266$$ orang",
        },
        {
          isCorrect: false,
          label: "$$1{.}270$$ dan $$281$$ orang",
        },
        {
          isCorrect: false,
          label: "$$1{.}270$$ dan $$264$$ orang",
        },
        {
          isCorrect: false,
          label: "$$1{.}272$$ dan $$281$$ orang",
        },
      ],
    },
  },
};

export default item;
