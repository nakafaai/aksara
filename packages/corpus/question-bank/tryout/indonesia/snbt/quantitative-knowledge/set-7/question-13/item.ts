import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$(729-16\\pi)\\text{ cm}^3$$" },
        { correct: false, label: "$$(729-36\\pi)\\text{ cm}^3$$" },
        { correct: false, label: "$$(729-72\\pi)\\text{ cm}^3$$" },
        { correct: true, label: "$$(729-144\\pi)\\text{ cm}^3$$" },
        { correct: false, label: "$$(729-225\\pi)\\text{ cm}^3$$" },
      ],
    },
  },
};

export default item;
