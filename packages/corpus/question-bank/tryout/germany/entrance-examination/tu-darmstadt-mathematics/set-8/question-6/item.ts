import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$a>1$$",
        },
        {
          correct: false,
          label: "$$a\\ge2$$",
        },
        {
          correct: false,
          label: "$$1<a<2$$",
        },
        {
          correct: false,
          label: "$$a=1$$ oder $$a>2$$",
        },
        {
          correct: false,
          label: "$$a<2$$",
        },
        {
          correct: true,
          label: "$$a>2$$",
        },
      ],
    },
  },
};

export default item;
