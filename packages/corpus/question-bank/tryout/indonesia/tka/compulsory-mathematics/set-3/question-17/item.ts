import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
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
          label: "$$12$$",
        },
        {
          correct: true,
          label: "$$36$$",
        },
        {
          correct: false,
          label: "$$108$$",
        },
        {
          correct: false,
          label: "$$144$$",
        },
        {
          correct: false,
          label: "$$216$$",
        },
      ],
    },
  },
};

export default item;
