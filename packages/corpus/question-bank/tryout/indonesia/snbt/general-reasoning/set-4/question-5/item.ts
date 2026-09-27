import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$57\\text{ kkal}$$",
        },
        {
          isCorrect: true,
          label: "$$75\\text{ kkal}$$",
        },
        {
          isCorrect: false,
          label: "$$70\\text{ kkal}$$",
        },
        {
          isCorrect: false,
          label: "$$72\\text{ kkal}$$",
        },
        {
          isCorrect: false,
          label: "$$87{,}72\\text{ kkal}$$",
        },
      ],
    },
  },
};

export default item;
