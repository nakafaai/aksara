import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "quantitative-reasoning",
    topic: "figure-pattern",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$35$$",
        },
        {
          correct: false,
          label: "$$50$$",
        },
        {
          correct: true,
          label: "$$56$$",
        },
        {
          correct: false,
          label: "$$63$$",
        },
        {
          correct: false,
          label: "$$84$$",
        },
      ],
    },
  },
};

export default item;
