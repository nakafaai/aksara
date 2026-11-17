import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "heat",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$2.9 \\times 10^5\\text{ J kg}^{-1}$$, and $$69\\text{ W}$$",
        },
        {
          correct: true,
          label: "$$3.8 \\times 10^5\\text{ J kg}^{-1}$$, and $$53\\text{ W}$$",
        },
        {
          correct: false,
          label: "$$3.8 \\times 10^5\\text{ J kg}^{-1}$$, and $$60\\text{ W}$$",
        },
        {
          correct: false,
          label: "$$1.3 \\times 10^6\\text{ J kg}^{-1}$$, and $$16\\text{ W}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$2.9 \\times 10^5\\text{ J kg}^{-1}$$, dan $$69\\text{ W}$$",
        },
        {
          correct: true,
          label: "$$3.8 \\times 10^5\\text{ J kg}^{-1}$$, dan $$53\\text{ W}$$",
        },
        {
          correct: false,
          label: "$$3.8 \\times 10^5\\text{ J kg}^{-1}$$, dan $$60\\text{ W}$$",
        },
        {
          correct: false,
          label: "$$1.3 \\times 10^6\\text{ J kg}^{-1}$$, dan $$16\\text{ W}$$",
        },
      ],
    },
  },
};

export default item;
