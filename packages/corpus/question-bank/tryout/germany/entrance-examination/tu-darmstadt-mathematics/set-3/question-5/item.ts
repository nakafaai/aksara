import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$b=-2$$",
        },
        {
          correct: false,
          label: "$$b=6$$",
        },
        {
          correct: false,
          label: "$$b=-2$$ oder $$b=6$$",
        },
        {
          correct: false,
          label: "$$b=-6$$",
        },
        {
          correct: false,
          label: "$$b=0$$",
        },
        {
          correct: false,
          label: "$$b=4$$",
        },
      ],
    },
  },
};

export default item;
