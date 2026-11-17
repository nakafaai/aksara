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
          label: "$$0.26\\text{ m}$$ and $$38\\text{ m s}^{-1}$$",
        },
        {
          correct: true,
          label: "$$0.53\\text{ m}$$ and $$75\\text{ m s}^{-1}$$",
        },
        {
          correct: false,
          label: "$$0.53\\text{ m}$$ and $$38\\text{ m s}^{-1}$$",
        },
        {
          correct: false,
          label: "$$0.53\\text{ m}$$ and $$12\\text{ m s}^{-1}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$0.26\\text{ m}$$ dan $$38\\text{ m s}^{-1}$$",
        },
        {
          correct: true,
          label: "$$0.53\\text{ m}$$ dan $$75\\text{ m s}^{-1}$$",
        },
        {
          correct: false,
          label: "$$0.53\\text{ m}$$ dan $$38\\text{ m s}^{-1}$$",
        },
        {
          correct: false,
          label: "$$0.53\\text{ m}$$ dan $$12\\text{ m s}^{-1}$$",
        },
      ],
    },
  },
};

export default item;
