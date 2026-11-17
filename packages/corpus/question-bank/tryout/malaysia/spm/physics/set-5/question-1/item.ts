import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "measurement",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$0.657\\text{ g cm}^{-3}$$, and $$410$$ sheets",
        },
        {
          correct: false,
          label: "$$0.0647\\text{ g cm}^{-3}$$, and $$40$$ sheets",
        },
        {
          correct: true,
          label: "$$0.647\\text{ g cm}^{-3}$$, and $$403$$ sheets",
        },
        {
          correct: false,
          label: "$$0.652\\text{ g cm}^{-3}$$, and $$407$$ sheets",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$0.657\\text{ g cm}^{-3}$$, dan $$410$$ helai",
        },
        {
          correct: false,
          label: "$$0.0647\\text{ g cm}^{-3}$$, dan $$40$$ helai",
        },
        {
          correct: true,
          label: "$$0.647\\text{ g cm}^{-3}$$, dan $$403$$ helai",
        },
        {
          correct: false,
          label: "$$0.652\\text{ g cm}^{-3}$$, dan $$407$$ helai",
        },
      ],
    },
  },
};

export default item;
