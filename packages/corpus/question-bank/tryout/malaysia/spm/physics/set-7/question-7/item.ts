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
            "$$180\\text{ m}$$, $$12\\text{ s}$$, $$60\\text{ m s}^{-1}$$ and $$0\\text{ s}$$",
        },
        {
          correct: false,
          label:
            "$$270\\text{ m}$$, $$15\\text{ s}$$, $$73\\text{ m s}^{-1}$$ and $$8.5\\text{ s}$$",
        },
        {
          correct: true,
          label:
            "$$270\\text{ m}$$, $$16\\text{ s}$$, $$73\\text{ m s}^{-1}$$ and $$8.5\\text{ s}$$",
        },
        {
          correct: false,
          label:
            "$$270\\text{ m}$$, $$9.0\\text{ s}$$, $$73\\text{ m s}^{-1}$$ and $$8.5\\text{ s}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$180\\text{ m}$$, $$12\\text{ s}$$, $$60\\text{ m s}^{-1}$$ dan $$0\\text{ s}$$",
        },
        {
          correct: false,
          label:
            "$$270\\text{ m}$$, $$15\\text{ s}$$, $$73\\text{ m s}^{-1}$$ dan $$8.5\\text{ s}$$",
        },
        {
          correct: true,
          label:
            "$$270\\text{ m}$$, $$16\\text{ s}$$, $$73\\text{ m s}^{-1}$$ dan $$8.5\\text{ s}$$",
        },
        {
          correct: false,
          label:
            "$$270\\text{ m}$$, $$9.0\\text{ s}$$, $$73\\text{ m s}^{-1}$$ dan $$8.5\\text{ s}$$",
        },
      ],
    },
  },
};

export default item;
