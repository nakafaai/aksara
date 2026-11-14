import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "quantitative-reasoning",
    topic: "percent-change",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$360$$ bibit",
        },
        {
          correct: false,
          label: "$$378$$ bibit",
        },
        {
          correct: false,
          label: "$$400$$ bibit",
        },
        {
          correct: false,
          label: "$$420$$ bibit",
        },
        {
          correct: false,
          label: "$$525$$ bibit",
        },
      ],
    },
  },
};

export default item;
