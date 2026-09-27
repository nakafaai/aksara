import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "$$1$$ apel besar dan $$1$$ jeruk kecil",
        },
        {
          isCorrect: false,
          label: "$$2$$ apel besar",
        },
        {
          isCorrect: false,
          label: "$$2$$ apel kecil",
        },
        {
          isCorrect: false,
          label: "$$2$$ jeruk besar",
        },
        {
          isCorrect: false,
          label: "$$2$$ jeruk kecil",
        },
      ],
    },
  },
};

export default item;
