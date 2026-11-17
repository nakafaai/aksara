import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "light-and-optics",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$7.2 \\times 10^5\\text{ W m}^{-2}$$, and about $$0.05\\text{ s}$$",
        },
        {
          correct: false,
          label:
            "$$2.7 \\times 10^4\\text{ W m}^{-2}$$, and about $$1.3\\text{ s}$$",
        },
        {
          correct: false,
          label:
            "$$1.8 \\times 10^5\\text{ W m}^{-2}$$, and about $$0.19\\text{ s}$$",
        },
        {
          correct: false,
          label:
            "$$2.9 \\times 10^6\\text{ W m}^{-2}$$, and about $$0.012\\text{ s}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$7.2 \\times 10^5\\text{ W m}^{-2}$$, dan kira-kira $$0.05\\text{ s}$$",
        },
        {
          correct: false,
          label:
            "$$2.7 \\times 10^4\\text{ W m}^{-2}$$, dan kira-kira $$1.3\\text{ s}$$",
        },
        {
          correct: false,
          label:
            "$$1.8 \\times 10^5\\text{ W m}^{-2}$$, dan kira-kira $$0.19\\text{ s}$$",
        },
        {
          correct: false,
          label:
            "$$2.9 \\times 10^6\\text{ W m}^{-2}$$, dan kira-kira $$0.012\\text{ s}$$",
        },
      ],
    },
  },
};

export default item;
