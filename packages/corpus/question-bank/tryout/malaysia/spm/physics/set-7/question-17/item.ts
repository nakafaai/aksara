import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "light-and-optics",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$0.26\\text{ m}$$, $$38\\text{ m s}^{-1}$$ and $$45°$$",
        },
        {
          correct: true,
          label: "$$0.53\\text{ m}$$, $$75\\text{ m s}^{-1}$$ and $$22.5°$$",
        },
        {
          correct: false,
          label: "$$0.53\\text{ m}$$, $$38\\text{ m s}^{-1}$$ and $$22.5°$$",
        },
        {
          correct: false,
          label: "$$0.53\\text{ m}$$, $$12\\text{ m s}^{-1}$$ and $$22.5°$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$0.26\\text{ m}$$, $$38\\text{ m s}^{-1}$$ dan $$45°$$",
        },
        {
          correct: true,
          label: "$$0.53\\text{ m}$$, $$75\\text{ m s}^{-1}$$ dan $$22.5°$$",
        },
        {
          correct: false,
          label: "$$0.53\\text{ m}$$, $$38\\text{ m s}^{-1}$$ dan $$22.5°$$",
        },
        {
          correct: false,
          label: "$$0.53\\text{ m}$$, $$12\\text{ m s}^{-1}$$ dan $$22.5°$$",
        },
      ],
    },
  },
};

export default item;
