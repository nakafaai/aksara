import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$1$$ dan $$2$$",
        },
        {
          correct: true,
          label: "$$2$$ dan $$4$$",
        },
        {
          correct: false,
          label: "$$2$$, $$3$$, dan $$4$$",
        },
        {
          correct: false,
          label: "$$1$$, $$3$$, dan $$4$$",
        },
        {
          correct: false,
          label: "$$1$$, $$2$$, $$3$$, dan $$4$$",
        },
      ],
    },
  },
};

export default item;
