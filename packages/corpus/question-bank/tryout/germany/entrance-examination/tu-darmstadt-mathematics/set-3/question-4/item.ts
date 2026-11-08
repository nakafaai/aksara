import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$33\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$36\\text{ cm}$$",
        },
        {
          correct: true,
          label: "$$38\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$40\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$45\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$90\\text{ cm}$$",
        },
      ],
    },
  },
};

export default item;
