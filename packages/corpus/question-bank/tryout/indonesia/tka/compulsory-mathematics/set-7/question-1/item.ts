import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "numbers",
    topic: "real-numbers",
  },
  stimulus: "liquid-fertilizer",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$25$$ liter",
        },
        {
          correct: false,
          label: "$$62{,}5$$ liter",
        },
        {
          correct: true,
          label: "$$100$$ liter",
        },
        {
          correct: false,
          label: "$$400$$ liter",
        },
        {
          correct: false,
          label: "$$1{.}000$$ liter",
        },
      ],
    },
  },
};

export default item;
