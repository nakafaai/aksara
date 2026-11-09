import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$(200+120\\pi)\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$(200+30\\pi)\\text{ m}$$",
        },
        {
          correct: true,
          label: "$$(200+60\\pi)\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$(320+60\\pi)\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$(100+60\\pi)\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$(200+900\\pi)\\text{ m}$$",
        },
      ],
    },
  },
};

export default item;
