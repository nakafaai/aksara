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
          correct: true,
          label:
            "$$10\\text{ s}$$, $$15\\text{ s}$$ and $$10\\text{ m s}^{-1}$$",
        },
        {
          correct: false,
          label:
            "$$10\\text{ s}$$, $$13\\text{ s}$$ and $$13\\text{ m s}^{-1}$$",
        },
        {
          correct: false,
          label:
            "$$10\\text{ s}$$, $$14\\text{ s}$$ and $$14\\text{ m s}^{-1}$$",
        },
        {
          correct: false,
          label:
            "$$10\\text{ s}$$, $$14\\text{ s}$$ and $$10\\text{ m s}^{-1}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$10\\text{ s}$$, $$15\\text{ s}$$ dan $$10\\text{ m s}^{-1}$$",
        },
        {
          correct: false,
          label:
            "$$10\\text{ s}$$, $$13\\text{ s}$$ dan $$13\\text{ m s}^{-1}$$",
        },
        {
          correct: false,
          label:
            "$$10\\text{ s}$$, $$14\\text{ s}$$ dan $$14\\text{ m s}^{-1}$$",
        },
        {
          correct: false,
          label:
            "$$10\\text{ s}$$, $$14\\text{ s}$$ dan $$10\\text{ m s}^{-1}$$",
        },
      ],
    },
  },
};

export default item;
