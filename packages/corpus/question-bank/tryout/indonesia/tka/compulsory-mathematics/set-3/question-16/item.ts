import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "geometry-measurement",
    topic: "measurement",
  },
  stimulus: "aroma-candles",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$132\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$154\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$264\\text{ cm}^3$$",
        },
        {
          correct: true,
          label: "$$462\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$1{.}848\\text{ cm}^3$$",
        },
      ],
    },
  },
};

export default item;
