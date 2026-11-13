import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$a>-4$$",
        },
        {
          correct: false,
          label: "$$-4<a<4$$",
        },
        {
          correct: false,
          label: "$$a>-5$$",
        },
        {
          correct: false,
          label: "$$a\\ge-4$$",
        },
        {
          correct: false,
          label: "$$a\\ge-2$$",
        },
        {
          correct: false,
          label: "$$a<4$$",
        },
      ],
    },
  },
};

export default item;
