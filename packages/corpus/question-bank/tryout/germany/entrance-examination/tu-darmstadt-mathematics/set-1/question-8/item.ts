import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$a=0$$",
        },
        {
          correct: false,
          label: "$$0<a<4$$",
        },
        {
          correct: true,
          label: "$$a=4$$",
        },
        {
          correct: false,
          label: "$$a>4$$",
        },
        {
          correct: false,
          label: "$$a=2$$",
        },
        {
          correct: false,
          label: "$$a=-4$$",
        },
      ],
    },
  },
};

export default item;
