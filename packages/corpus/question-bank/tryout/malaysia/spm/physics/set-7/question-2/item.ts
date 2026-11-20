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
          correct: true,
          label:
            "$$n=-2.5$$, $$32\\text{ s}$$, $$5.3\\text{ mm}$$ and $$14\\text{ g s}^{-1}$$",
        },
        {
          correct: false,
          label:
            "$$n=-2.5$$, $$32\\text{ s}$$, $$5.7\\text{ mm}$$ and $$14\\text{ g s}^{-1}$$",
        },
        {
          correct: false,
          label:
            "$$n=-2.5$$, $$32\\text{ s}$$, $$5.3\\text{ mm}$$ and $$7.1\\text{ g s}^{-1}$$",
        },
        {
          correct: false,
          label:
            "$$n=-0.40$$, $$220\\text{ s}$$, $$23\\text{ mm}$$ and $$3.3\\text{ g s}^{-1}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$n=-2.5$$, $$32\\text{ s}$$, $$5.3\\text{ mm}$$ dan $$14\\text{ g s}^{-1}$$",
        },
        {
          correct: false,
          label:
            "$$n=-2.5$$, $$32\\text{ s}$$, $$5.7\\text{ mm}$$ dan $$14\\text{ g s}^{-1}$$",
        },
        {
          correct: false,
          label:
            "$$n=-2.5$$, $$32\\text{ s}$$, $$5.3\\text{ mm}$$ dan $$7.1\\text{ g s}^{-1}$$",
        },
        {
          correct: false,
          label:
            "$$n=-0.40$$, $$220\\text{ s}$$, $$23\\text{ mm}$$ dan $$3.3\\text{ g s}^{-1}$$",
        },
      ],
    },
  },
};

export default item;
