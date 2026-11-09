import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "numbers",
    topic: "real-numbers",
  },
  stimulus: "overtime-pay",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$10$$ jam",
        },
        {
          correct: false,
          label: "$$49$$ jam",
        },
        {
          correct: true,
          label: "$$50$$ jam",
        },
        {
          correct: false,
          label: "$$54$$ jam",
        },
        {
          correct: false,
          label: "$$55$$ jam",
        },
      ],
    },
  },
};

export default item;
