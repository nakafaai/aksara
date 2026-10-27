import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$150\\text{ gram}$$",
        },
        {
          correct: false,
          label: "$$175\\text{ gram}$$",
        },
        {
          correct: false,
          label: "$$250\\text{ gram}$$",
        },
        {
          correct: false,
          label: "$$275\\text{ gram}$$",
        },
        {
          correct: true,
          label: "$$225\\text{ gram}$$",
        },
      ],
    },
  },
};

export default item;
