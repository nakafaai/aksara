import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$10\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$25\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$30\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$40\\text{ g}$$",
        },
        {
          correct: true,
          label: "$$50\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$150\\text{ g}$$",
        },
      ],
    },
  },
};

export default item;
