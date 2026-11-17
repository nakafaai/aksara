import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "quantum-physics",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$6.6 \\times 10^{-34}\\text{ J s}$$, and $$1.0 \\times 10^6\\text{ m s}^{-1}$$",
        },
        {
          correct: true,
          label:
            "$$6.6 \\times 10^{-34}\\text{ J s}$$, and $$6.8 \\times 10^5\\text{ m s}^{-1}$$",
        },
        {
          correct: false,
          label:
            "$$4.1 \\times 10^{-15}\\text{ J s}$$, and $$6.8 \\times 10^5\\text{ m s}^{-1}$$",
        },
        {
          correct: false,
          label:
            "$$6.6 \\times 10^{-34}\\text{ J s}$$, and $$5.4 \\times 10^5\\text{ m s}^{-1}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$6.6 \\times 10^{-34}\\text{ J s}$$, dan $$1.0 \\times 10^6\\text{ m s}^{-1}$$",
        },
        {
          correct: true,
          label:
            "$$6.6 \\times 10^{-34}\\text{ J s}$$, dan $$6.8 \\times 10^5\\text{ m s}^{-1}$$",
        },
        {
          correct: false,
          label:
            "$$4.1 \\times 10^{-15}\\text{ J s}$$, dan $$6.8 \\times 10^5\\text{ m s}^{-1}$$",
        },
        {
          correct: false,
          label:
            "$$6.6 \\times 10^{-34}\\text{ J s}$$, dan $$5.4 \\times 10^5\\text{ m s}^{-1}$$",
        },
      ],
    },
  },
};

export default item;
