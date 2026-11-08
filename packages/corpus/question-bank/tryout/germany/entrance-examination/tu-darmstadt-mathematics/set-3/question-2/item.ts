import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$L=\\{-4\\}$$",
        },
        {
          correct: false,
          label: "$$L=\\{4\\}$$",
        },
        {
          correct: false,
          label: "$$L=\\{-\\tfrac52;\\,4\\}$$",
        },
        {
          correct: false,
          label: "$$L=\\{-4;\\,\\tfrac52\\}$$",
        },
        {
          correct: true,
          label: "$$L=\\{\\tfrac52\\}$$",
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
