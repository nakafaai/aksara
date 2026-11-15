import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "descriptive",
    topic: "explicit-information",
  },
  stimulus: "solar-hall",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$10.25$$ kWh",
        },
        {
          correct: false,
          label: "$$7$$ kWh",
        },
        {
          correct: true,
          label: "$$6.25$$ kWh",
        },
        {
          correct: false,
          label: "$$3.4$$ kWh",
        },
        {
          correct: false,
          label: "$$7.4$$ kWh",
        },
      ],
    },
  },
};

export default item;
