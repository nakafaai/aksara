import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "gravitation",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$3.8\\times10^{8}\\text{ m}$$, $$2.8\\times10^{-3}\\text{ m s}^{-2}$$ and $$0.020\\text{ m s}^{-2}$$",
        },
        {
          correct: false,
          label:
            "$$3.5\\times10^{8}\\text{ m}$$, $$0.18\\text{ m s}^{-2}$$ and $$4.0\\text{ m s}^{-2}$$",
        },
        {
          correct: true,
          label:
            "$$3.5\\times10^{8}\\text{ m}$$, $$3.4\\times10^{-3}\\text{ m s}^{-2}$$ and $$1.6\\text{ m s}^{-2}$$",
        },
        {
          correct: false,
          label:
            "$$3.5\\times10^{8}\\text{ m}$$, $$3.4\\times10^{-3}\\text{ m s}^{-2}$$ and $$0.074\\text{ m s}^{-2}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$3.8\\times10^{8}\\text{ m}$$, $$2.8\\times10^{-3}\\text{ m s}^{-2}$$ dan $$0.020\\text{ m s}^{-2}$$",
        },
        {
          correct: false,
          label:
            "$$3.5\\times10^{8}\\text{ m}$$, $$0.18\\text{ m s}^{-2}$$ dan $$4.0\\text{ m s}^{-2}$$",
        },
        {
          correct: true,
          label:
            "$$3.5\\times10^{8}\\text{ m}$$, $$3.4\\times10^{-3}\\text{ m s}^{-2}$$ dan $$1.6\\text{ m s}^{-2}$$",
        },
        {
          correct: false,
          label:
            "$$3.5\\times10^{8}\\text{ m}$$, $$3.4\\times10^{-3}\\text{ m s}^{-2}$$ dan $$0.074\\text{ m s}^{-2}$$",
        },
      ],
    },
  },
};

export default item;
