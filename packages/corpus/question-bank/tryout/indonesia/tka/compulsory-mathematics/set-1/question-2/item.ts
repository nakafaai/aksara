import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "numbers",
    topic: "real-numbers",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$35{,}40$$",
        },
        {
          correct: false,
          label: "$$38{,}40$$",
        },
        {
          correct: false,
          label: "$$39{,}60$$",
        },
        {
          correct: false,
          label: "$$42{,}24$$",
        },
        {
          correct: true,
          label: "$$38{,}94$$",
        },
      ],
    },
  },
};

export default item;
