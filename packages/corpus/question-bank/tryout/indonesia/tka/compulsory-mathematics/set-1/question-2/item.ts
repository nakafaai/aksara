import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "numbers",
    topic: "real-numbers",
  },
  stimulus: "water-tariff",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$28\\text{ m}^3$$",
        },
        {
          correct: false,
          label: "$$26\\text{ m}^3$$",
        },
        {
          correct: false,
          label: "$$27\\text{ m}^3$$",
        },
        {
          correct: false,
          label: "$$30\\text{ m}^3$$",
        },
        {
          correct: false,
          label: "$$32\\text{ m}^3$$",
        },
      ],
    },
  },
};

export default item;
