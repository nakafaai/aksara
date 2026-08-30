import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$1$$ und $$3$$",
        },
        {
          isCorrect: false,
          label: "$$2$$ und $$4$$",
        },
        {
          isCorrect: false,
          label: "Nur $$4$$.",
        },
        {
          isCorrect: false,
          label: "$$1$$, $$2$$, $$3$$ und $$4$$",
        },
        {
          isCorrect: true,
          label: "$$1$$, $$2$$ und $$3$$",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$1$$ and $$3$$",
        },
        {
          isCorrect: false,
          label: "$$2$$ and $$4$$",
        },
        {
          isCorrect: false,
          label: "$$4$$ only",
        },
        {
          isCorrect: false,
          label: "$$1$$, $$2$$, $$3$$, and $$4$$",
        },
        {
          isCorrect: true,
          label: "$$1$$, $$2$$, and $$3$$",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "$$1$$ dan $$3$$",
        },
        {
          isCorrect: false,
          label: "$$2$$ dan $$4$$",
        },
        {
          isCorrect: false,
          label: "$$4$$ saja",
        },
        {
          isCorrect: false,
          label: "$$1$$, $$2$$, $$3$$, dan $$4$$",
        },
        {
          isCorrect: true,
          label: "$$1$$, $$2$$, dan $$3$$",
        },
      ],
    },
  },
};

export default item;
