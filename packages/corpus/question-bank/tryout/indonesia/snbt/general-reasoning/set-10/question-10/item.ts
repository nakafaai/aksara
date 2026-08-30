import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
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
          label: "$$2$$, $$3$$ und $$4$$",
        },
        {
          isCorrect: false,
          label: "$$1$$, $$2$$, $$3$$ und $$4$$",
        },
        {
          isCorrect: true,
          label: "Nur $$3$$.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
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
          label: "$$2$$, $$3$$, and $$4$$",
        },
        {
          isCorrect: false,
          label: "$$1$$, $$2$$, $$3$$, and $$4$$",
        },
        {
          isCorrect: true,
          label: "$$3$$ only",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
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
          label: "$$2$$, $$3$$, dan $$4$$",
        },
        {
          isCorrect: false,
          label: "$$1$$, $$2$$, $$3$$, dan $$4$$",
        },
        {
          isCorrect: true,
          label: "$$3$$ saja",
        },
      ],
    },
  },
};

export default item;
