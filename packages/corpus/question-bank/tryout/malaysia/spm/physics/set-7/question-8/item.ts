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
            "$$3.8\\times10^{8}\\text{ m}$$ and $$2.8\\times10^{-3}\\text{ m s}^{-2}$$",
        },
        {
          correct: false,
          label:
            "$$1.9\\times10^{8}\\text{ m}$$ and $$1.1\\times10^{-2}\\text{ m s}^{-2}$$",
        },
        {
          correct: true,
          label:
            "$$3.5\\times10^{8}\\text{ m}$$ and $$3.4\\times10^{-3}\\text{ m s}^{-2}$$",
        },
        {
          correct: false,
          label: "$$3.5\\times10^{8}\\text{ m}$$ and $$0.18\\text{ m s}^{-2}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$3.8\\times10^{8}\\text{ m}$$ dan $$2.8\\times10^{-3}\\text{ m s}^{-2}$$",
        },
        {
          correct: false,
          label:
            "$$1.9\\times10^{8}\\text{ m}$$ dan $$1.1\\times10^{-2}\\text{ m s}^{-2}$$",
        },
        {
          correct: true,
          label:
            "$$3.5\\times10^{8}\\text{ m}$$ dan $$3.4\\times10^{-3}\\text{ m s}^{-2}$$",
        },
        {
          correct: false,
          label: "$$3.5\\times10^{8}\\text{ m}$$ dan $$0.18\\text{ m s}^{-2}$$",
        },
      ],
    },
  },
};

export default item;
