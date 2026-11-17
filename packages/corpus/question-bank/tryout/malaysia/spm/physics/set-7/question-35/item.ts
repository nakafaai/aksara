import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
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
            "$$1.3\\times10^{7}\\text{ m s}^{-1}$$, $$3.8\\text{ ns}$$ and $$19\\text{ ns}$$",
        },
        {
          correct: false,
          label:
            "$$9.4\\times10^{6}\\text{ m s}^{-1}$$, $$11\\text{ ns}$$ and $$32\\text{ ns}$$",
        },
        {
          correct: false,
          label:
            "$$1.3\\times10^{7}\\text{ m s}^{-1}$$, $$7.5\\text{ ns}$$ and $$15\\text{ ns}$$",
        },
        {
          correct: true,
          label:
            "$$1.3\\times10^{7}\\text{ m s}^{-1}$$, $$7.5\\text{ ns}$$ and $$23\\text{ ns}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$1.3\\times10^{7}\\text{ m s}^{-1}$$, $$3.8\\text{ ns}$$ dan $$19\\text{ ns}$$",
        },
        {
          correct: false,
          label:
            "$$9.4\\times10^{6}\\text{ m s}^{-1}$$, $$11\\text{ ns}$$ dan $$32\\text{ ns}$$",
        },
        {
          correct: false,
          label:
            "$$1.3\\times10^{7}\\text{ m s}^{-1}$$, $$7.5\\text{ ns}$$ dan $$15\\text{ ns}$$",
        },
        {
          correct: true,
          label:
            "$$1.3\\times10^{7}\\text{ m s}^{-1}$$, $$7.5\\text{ ns}$$ dan $$23\\text{ ns}$$",
        },
      ],
    },
  },
};

export default item;
