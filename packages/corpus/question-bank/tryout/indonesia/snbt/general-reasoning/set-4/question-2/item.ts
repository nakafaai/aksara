import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$2$$ boneka beruang",
        },
        {
          isCorrect: true,
          label: "$$1$$ boneka beruang dan $$1$$ bola",
        },
        {
          isCorrect: false,
          label: "$$2$$ kelereng",
        },
        {
          isCorrect: false,
          label: "$$1$$ bola dan $$1$$ boneka Barbie",
        },
        {
          isCorrect: false,
          label: "$$1$$ boneka Barbie dan $$1$$ kelereng",
        },
      ],
    },
  },
};

export default item;
