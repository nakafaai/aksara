import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "force-and-motion-2",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$1.6 \\times 10^4\\text{ N m}^{-1}$$, and $$8.1\\text{ cm}$$",
        },
        {
          correct: false,
          label:
            "$$1.9 \\times 10^4\\text{ N m}^{-1}$$, and $$4.6\\text{ cm}$$",
        },
        {
          correct: true,
          label:
            "$$1.9 \\times 10^4\\text{ N m}^{-1}$$, and $$5.9\\text{ cm}$$",
        },
        {
          correct: false,
          label:
            "$$1.9 \\times 10^4\\text{ N m}^{-1}$$, and $$2.6\\text{ cm}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$1.6 \\times 10^4\\text{ N m}^{-1}$$, dan $$8.1\\text{ cm}$$",
        },
        {
          correct: false,
          label:
            "$$1.9 \\times 10^4\\text{ N m}^{-1}$$, dan $$4.6\\text{ cm}$$",
        },
        {
          correct: true,
          label:
            "$$1.9 \\times 10^4\\text{ N m}^{-1}$$, dan $$5.9\\text{ cm}$$",
        },
        {
          correct: false,
          label:
            "$$1.9 \\times 10^4\\text{ N m}^{-1}$$, dan $$2.6\\text{ cm}$$",
        },
      ],
    },
  },
};

export default item;
