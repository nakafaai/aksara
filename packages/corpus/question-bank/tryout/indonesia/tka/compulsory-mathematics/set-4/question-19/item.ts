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
          label: "$$15{.}625\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$16{.}000\\sqrt{2}\\text{ cm}^3$$",
        },
        {
          correct: true,
          label: "$$27{.}000\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$31{.}250\\sqrt{2}\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$64{.}000\\text{ cm}^3$$",
        },
      ],
    },
  },
};

export default item;
