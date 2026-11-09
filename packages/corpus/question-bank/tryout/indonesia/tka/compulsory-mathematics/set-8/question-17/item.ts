import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "geometry-measurement",
    topic: "measurement",
  },
  stimulus: "gift-box",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$140\\text{ cm}$$",
        },
        {
          correct: true,
          label: "$$180\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$200\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$220\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$280\\text{ cm}$$",
        },
      ],
    },
  },
};

export default item;
