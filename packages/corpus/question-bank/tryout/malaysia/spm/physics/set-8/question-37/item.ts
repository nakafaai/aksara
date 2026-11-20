import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "electronics",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$1.45\\times10^{7}\\text{ m s}^{-1}$$, $$729$$ and $$5.83\\times10^{-10}\\text{ A}$$",
        },
        {
          correct: false,
          label:
            "$$5.93\\times10^{6}\\text{ m s}^{-1}$$, $$18$$ and $$1.44\\times10^{-11}\\text{ A}$$",
        },
        {
          correct: true,
          label:
            "$$5.93\\times10^{6}\\text{ m s}^{-1}$$, $$729$$ and $$5.83\\times10^{-10}\\text{ A}$$",
        },
        {
          correct: false,
          label:
            "$$5.93\\times10^{6}\\text{ m s}^{-1}$$, $$2187$$ and $$1.75\\times10^{-9}\\text{ A}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$1.45\\times10^{7}\\text{ m s}^{-1}$$, $$729$$ dan $$5.83\\times10^{-10}\\text{ A}$$",
        },
        {
          correct: false,
          label:
            "$$5.93\\times10^{6}\\text{ m s}^{-1}$$, $$18$$ dan $$1.44\\times10^{-11}\\text{ A}$$",
        },
        {
          correct: true,
          label:
            "$$5.93\\times10^{6}\\text{ m s}^{-1}$$, $$729$$ dan $$5.83\\times10^{-10}\\text{ A}$$",
        },
        {
          correct: false,
          label:
            "$$5.93\\times10^{6}\\text{ m s}^{-1}$$, $$2187$$ dan $$1.75\\times10^{-9}\\text{ A}$$",
        },
      ],
    },
  },
};

export default item;
