import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
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
            "$$1.6 \\times 10^{-5}\\text{ m s}^{-1}$$, and about $$2.0$$ minutes",
        },
        {
          correct: false,
          label:
            "$$8.2 \\times 10^{-6}\\text{ m s}^{-1}$$, and about $$50\\text{ s}$$",
        },
        {
          correct: true,
          label:
            "$$1.6 \\times 10^{-5}\\text{ m s}^{-1}$$, and about $$50\\text{ s}$$",
        },
        {
          correct: false,
          label:
            "$$1.6 \\times 10^{-5}\\text{ m s}^{-1}$$, and about $$61\\text{ s}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$1.6 \\times 10^{-5}\\text{ m s}^{-1}$$, dan kira-kira $$2.0$$ minit",
        },
        {
          correct: false,
          label:
            "$$8.2 \\times 10^{-6}\\text{ m s}^{-1}$$, dan kira-kira $$50\\text{ s}$$",
        },
        {
          correct: true,
          label:
            "$$1.6 \\times 10^{-5}\\text{ m s}^{-1}$$, dan kira-kira $$50\\text{ s}$$",
        },
        {
          correct: false,
          label:
            "$$1.6 \\times 10^{-5}\\text{ m s}^{-1}$$, dan kira-kira $$61\\text{ s}$$",
        },
      ],
    },
  },
};

export default item;
