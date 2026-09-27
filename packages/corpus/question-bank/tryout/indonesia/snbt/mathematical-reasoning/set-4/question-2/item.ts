import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$1$$ buket camilan dan $$2$$ buket uang",
        },
        {
          isCorrect: false,
          label: "$$1$$ bunga besar dan $$2$$ buket uang",
        },
        {
          isCorrect: false,
          label: "$$1$$ bunga besar dan $$2$$ buket camilan",
        },
        {
          isCorrect: false,
          label: "$$1$$ bunga kecil dan $$2$$ buket camilan",
        },
        {
          isCorrect: true,
          label: "$$2$$ buket camilan dan $$2$$ buket uang",
        },
      ],
    },
  },
};

export default item;
