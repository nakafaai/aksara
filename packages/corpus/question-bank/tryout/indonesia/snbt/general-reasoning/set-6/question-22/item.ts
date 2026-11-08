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
          label: "$$61$$",
        },
        {
          correct: false,
          label: "$$72$$",
        },
        {
          correct: false,
          label: "$$85$$",
        },
        {
          correct: true,
          label: "$$91$$",
        },
        {
          correct: false,
          label: "$$109$$",
        },
      ],
    },
  },
};

export default item;
