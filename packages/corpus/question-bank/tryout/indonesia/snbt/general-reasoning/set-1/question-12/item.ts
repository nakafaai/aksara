import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$72\\text{ jam}$$",
        },
        {
          isCorrect: false,
          label: "$$132\\text{ jam}$$",
        },
        {
          isCorrect: false,
          label: "$$240\\text{ jam}$$",
        },
        {
          isCorrect: false,
          label: "$$360\\text{ jam}$$",
        },
        {
          isCorrect: true,
          label: "$$144\\text{ jam}$$",
        },
      ],
    },
  },
};

export default item;
