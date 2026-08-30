import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "$$1$$ und $$3$$",
        },
        {
          isCorrect: false,
          label: "$$2$$ und $$4$$",
        },
        {
          isCorrect: false,
          label: "$$1$$ und $$4$$",
        },
        {
          isCorrect: false,
          label: "$$3$$ und $$4$$",
        },
        {
          isCorrect: false,
          label: "$$1$$",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "$$1$$ and $$3$$",
        },
        {
          isCorrect: false,
          label: "$$2$$ and $$4$$",
        },
        {
          isCorrect: false,
          label: "$$1$$ and $$4$$",
        },
        {
          isCorrect: false,
          label: "$$3$$ and $$4$$",
        },
        {
          isCorrect: false,
          label: "$$1$$",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "$$1$$ dan $$3$$",
        },
        {
          isCorrect: false,
          label: "$$2$$ dan $$4$$",
        },
        {
          isCorrect: false,
          label: "$$1$$ dan $$4$$",
        },
        {
          isCorrect: false,
          label: "$$3$$ dan $$4$$",
        },
        {
          isCorrect: false,
          label: "$$1$$",
        },
      ],
    },
  },
};

export default item;
