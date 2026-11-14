import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "geometry-measurement",
    topic: "measurement",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$40$$ cm",
        },
        {
          correct: false,
          label: "$$39{,}5$$ cm",
        },
        {
          correct: false,
          label: "$$32$$ cm",
        },
        {
          correct: false,
          label: "$$31{,}5$$ cm",
        },
        {
          correct: true,
          label: "$$30$$ cm",
        },
      ],
    },
  },
};

export default item;
