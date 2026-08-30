import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "$$2$$ und $$4$$",
        },
        {
          isCorrect: false,
          label: "$$1$$ und $$2$$",
        },
        {
          isCorrect: false,
          label: "$$2$$, $$3$$ und $$4$$",
        },
        {
          isCorrect: false,
          label: "$$1$$, $$3$$ und $$4$$",
        },
        {
          isCorrect: false,
          label: "$$1$$, $$2$$, $$3$$ und $$4$$",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "$$2$$ and $$4$$",
        },
        {
          isCorrect: false,
          label: "$$1$$ and $$2$$",
        },
        {
          isCorrect: false,
          label: "$$2$$, $$3$$, and $$4$$",
        },
        {
          isCorrect: false,
          label: "$$1$$, $$3$$, and $$4$$",
        },
        {
          isCorrect: false,
          label: "$$1$$, $$2$$, $$3$$, and $$4$$",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "$$2$$ dan $$4$$",
        },
        {
          isCorrect: false,
          label: "$$1$$ dan $$2$$",
        },
        {
          isCorrect: false,
          label: "$$2$$, $$3$$, dan $$4$$",
        },
        {
          isCorrect: false,
          label: "$$1$$, $$3$$, dan $$4$$",
        },
        {
          isCorrect: false,
          label: "$$1$$, $$2$$, $$3$$, dan $$4$$",
        },
      ],
    },
  },
};

export default item;
