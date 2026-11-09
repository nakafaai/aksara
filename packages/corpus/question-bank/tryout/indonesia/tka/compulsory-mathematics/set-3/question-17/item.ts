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
          label: "$$264\\text{ cm}^2$$",
        },
        {
          correct: true,
          label: "$$276\\text{ cm}^2$$",
        },
        {
          correct: false,
          label: "$$288\\text{ cm}^2$$",
        },
        {
          correct: false,
          label: "$$302{,}5\\text{ cm}^2$$",
        },
        {
          correct: false,
          label: "$$540\\text{ cm}^2$$",
        },
      ],
    },
  },
};

export default item;
