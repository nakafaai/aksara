import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "calculation",
  },
  stimulus: "solar-heat",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$38$$ kWh",
        },
        {
          correct: true,
          label: "$$95$$ kWh",
        },
        {
          correct: false,
          label: "$$247$$ kWh",
        },
        {
          correct: false,
          label: "$$57$$ kWh",
        },
        {
          correct: false,
          label: "$$722$$ kWh",
        },
      ],
    },
  },
};

export default item;
