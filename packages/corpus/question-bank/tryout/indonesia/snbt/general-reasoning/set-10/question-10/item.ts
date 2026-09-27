import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
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
          isCorrect: true,
          label: "$$3$$ saja",
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
