import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "$$3$$ und $$4$$",
        },
        {
          isCorrect: false,
          label: "Nur $$4$$.",
        },
        {
          isCorrect: false,
          label: "$$1$$ und $$4$$",
        },
        {
          isCorrect: false,
          label: "$$2$$, $$3$$ und $$4$$",
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
          label: "$$3$$ and $$4$$",
        },
        {
          isCorrect: false,
          label: "$$4$$ only",
        },
        {
          isCorrect: false,
          label: "$$1$$ and $$4$$",
        },
        {
          isCorrect: false,
          label: "$$2$$, $$3$$, and $$4$$",
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
          label: "$$3$$ dan $$4$$",
        },
        {
          isCorrect: false,
          label: "$$4$$ saja",
        },
        {
          isCorrect: false,
          label: "$$1$$ dan $$4$$",
        },
        {
          isCorrect: false,
          label: "$$2$$, $$3$$, dan $$4$$",
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
