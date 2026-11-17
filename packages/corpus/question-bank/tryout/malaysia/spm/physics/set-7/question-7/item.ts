import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "force-and-motion-1",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$180\\text{ m}$$, $$12\\text{ s}$$ and $$60\\text{ m s}^{-1}$$",
        },
        {
          correct: false,
          label:
            "$$270\\text{ m}$$, $$15\\text{ s}$$ and $$73\\text{ m s}^{-1}$$",
        },
        {
          correct: true,
          label:
            "$$270\\text{ m}$$, $$16\\text{ s}$$ and $$73\\text{ m s}^{-1}$$",
        },
        {
          correct: false,
          label:
            "$$270\\text{ m}$$, $$9.0\\text{ s}$$ and $$73\\text{ m s}^{-1}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$180\\text{ m}$$, $$12\\text{ s}$$ dan $$60\\text{ m s}^{-1}$$",
        },
        {
          correct: false,
          label:
            "$$270\\text{ m}$$, $$15\\text{ s}$$ dan $$73\\text{ m s}^{-1}$$",
        },
        {
          correct: true,
          label:
            "$$270\\text{ m}$$, $$16\\text{ s}$$ dan $$73\\text{ m s}^{-1}$$",
        },
        {
          correct: false,
          label:
            "$$270\\text{ m}$$, $$9.0\\text{ s}$$ dan $$73\\text{ m s}^{-1}$$",
        },
      ],
    },
  },
};

export default item;
