import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "geometry-measurement",
    topic: "geometry-objects",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$30\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$26\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$40\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$25\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$31{,}25\\text{ cm}$$",
        },
      ],
    },
  },
};

export default item;
