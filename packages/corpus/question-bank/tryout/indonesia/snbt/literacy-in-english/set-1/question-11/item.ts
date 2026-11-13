import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "calculation",
  },
  stimulus: "wind-curtailment",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$120$$ GWh",
        },
        {
          correct: true,
          label: "$$160$$ GWh",
        },
        {
          correct: false,
          label: "$$130$$ GWh",
        },
        {
          correct: false,
          label: "$$210$$ GWh",
        },
        {
          correct: false,
          label: "$$60$$ GWh",
        },
      ],
    },
  },
};

export default item;
