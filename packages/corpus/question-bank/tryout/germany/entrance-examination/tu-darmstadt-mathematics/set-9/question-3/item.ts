import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$(36+18\\pi)\\text{ cm}^2$$",
        },
        {
          correct: false,
          label: "$$(36+36\\pi)\\text{ cm}^2$$",
        },
        {
          correct: false,
          label: "$$(36+9\\pi)\\text{ cm}^2$$",
        },
        {
          correct: false,
          label: "$$(36+72\\pi)\\text{ cm}^2$$",
        },
        {
          correct: false,
          label: "$$18\\pi\\text{ cm}^2$$",
        },
        {
          correct: false,
          label: "$$(36+12\\pi)\\text{ cm}^2$$",
        },
      ],
    },
  },
};

export default item;
