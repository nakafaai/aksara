import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "geometry-measurement",
    topic: "measurement",
  },
  stimulus: "aquarium",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$8{.}000\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$80{.}000\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$112{.}000\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$120{.}000\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$160{.}000\\text{ cm}^3$$",
        },
      ],
    },
  },
};

export default item;
