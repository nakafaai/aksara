import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "recount",
    topic: "explicit-information",
  },
  stimulus: "mangrove-planting",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$35$$ percentage points",
        },
        {
          correct: false,
          label: "about $$38$$ percentage points",
        },
        {
          correct: false,
          label: "about $$43$$ percentage points",
        },
        {
          correct: true,
          label: "about $$40$$ percentage points",
        },
        {
          correct: false,
          label: "about $$6$$ percentage points",
        },
      ],
    },
  },
};

export default item;
