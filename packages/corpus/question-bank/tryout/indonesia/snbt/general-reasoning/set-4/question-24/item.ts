import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$8$$",
        },
        {
          correct: false,
          label: "$$\\frac{15}{2}$$",
        },
        {
          correct: false,
          label: "$$\\frac{17}{2}$$",
        },
        {
          correct: false,
          label: "$$9$$",
        },
        {
          correct: false,
          label: "$$\\frac{19}{2}$$",
        },
      ],
    },
  },
};

export default item;
