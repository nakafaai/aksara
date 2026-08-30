import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$180$$ und $$10$$",
        },
        {
          isCorrect: false,
          label: "$$170$$ und $$15$$",
        },
        {
          isCorrect: false,
          label: "$$170$$ und $$20$$",
        },
        {
          isCorrect: false,
          label: "$$160$$ und $$25$$",
        },
        {
          isCorrect: true,
          label: "$$180$$ und $$20$$",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$180$$ and $$10$$",
        },
        {
          isCorrect: false,
          label: "$$170$$ and $$15$$",
        },
        {
          isCorrect: false,
          label: "$$170$$ and $$20$$",
        },
        {
          isCorrect: false,
          label: "$$160$$ and $$25$$",
        },
        {
          isCorrect: true,
          label: "$$180$$ and $$20$$",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$180$$ dan $$10$$",
        },
        {
          isCorrect: false,
          label: "$$170$$ dan $$15$$",
        },
        {
          isCorrect: false,
          label: "$$170$$ dan $$20$$",
        },
        {
          isCorrect: false,
          label: "$$160$$ dan $$25$$",
        },
        {
          isCorrect: true,
          label: "$$180$$ dan $$20$$",
        },
      ],
    },
  },
};

export default item;
