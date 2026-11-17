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
          label:
            "$$0.26\\text{ m}$$, $$38\\text{ m s}^{-1}$$, $$45°$$ and $$0.063\\text{ s}$$",
        },
        {
          correct: true,
          label:
            "$$0.53\\text{ m}$$, $$75\\text{ m s}^{-1}$$, $$22.5°$$ and $$0.031\\text{ s}$$",
        },
        {
          correct: false,
          label:
            "$$0.53\\text{ m}$$, $$38\\text{ m s}^{-1}$$, $$22.5°$$ and $$0.063\\text{ s}$$",
        },
        {
          correct: false,
          label:
            "$$0.53\\text{ m}$$, $$12\\text{ m s}^{-1}$$, $$22.5°$$ and $$0.031\\text{ s}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$0.26\\text{ m}$$, $$38\\text{ m s}^{-1}$$, $$45°$$ dan $$0.063\\text{ s}$$",
        },
        {
          correct: true,
          label:
            "$$0.53\\text{ m}$$, $$75\\text{ m s}^{-1}$$, $$22.5°$$ dan $$0.031\\text{ s}$$",
        },
        {
          correct: false,
          label:
            "$$0.53\\text{ m}$$, $$38\\text{ m s}^{-1}$$, $$22.5°$$ dan $$0.063\\text{ s}$$",
        },
        {
          correct: false,
          label:
            "$$0.53\\text{ m}$$, $$12\\text{ m s}^{-1}$$, $$22.5°$$ dan $$0.031\\text{ s}$$",
        },
      ],
    },
  },
};

export default item;
