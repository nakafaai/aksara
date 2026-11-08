import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$L=\\{2\\}$$",
        },
        {
          correct: false,
          label: "$$L=\\{6\\}$$",
        },
        {
          correct: false,
          label: "$$L=\\{-2;\\,6\\}$$",
        },
        {
          correct: false,
          label: "$$L=\\{-6;\\,2\\}$$",
        },
        {
          correct: true,
          label: "$$L=\\{-6\\}$$",
        },
        {
          correct: false,
          label: "$$L=\\emptyset$$",
        },
      ],
    },
  },
};

export default item;
