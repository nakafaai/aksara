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
          correct: true,
          label: "$$26\\text{ N kg}^{-1}$$, and $$8.9 \\times 10^7\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$26\\text{ N kg}^{-1}$$, and $$1.6 \\times 10^8\\text{ m}$$",
        },
        {
          correct: false,
          label:
            "$$6.4\\text{ N kg}^{-1}$$, and $$3.0 \\times 10^7\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$26\\text{ N kg}^{-1}$$, and $$2.2 \\times 10^8\\text{ m}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$26\\text{ N kg}^{-1}$$, dan $$8.9 \\times 10^7\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$26\\text{ N kg}^{-1}$$, dan $$1.6 \\times 10^8\\text{ m}$$",
        },
        {
          correct: false,
          label:
            "$$6.4\\text{ N kg}^{-1}$$, dan $$3.0 \\times 10^7\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$26\\text{ N kg}^{-1}$$, dan $$2.2 \\times 10^8\\text{ m}$$",
        },
      ],
    },
  },
};

export default item;
