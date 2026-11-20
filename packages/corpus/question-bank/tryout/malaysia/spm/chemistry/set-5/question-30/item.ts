import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "carbon-compounds",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$\\text{C}_5\\text{H}_{12}$$, $$1.92\\text{ dm}^3$$, pentane",
        },
        {
          correct: false,
          label:
            "$$\\text{C}_5\\text{H}_{12}\\text{O}$$, $$1.92\\text{ dm}^3$$, pentan-1-ol",
        },
        {
          correct: true,
          label:
            "$$\\text{C}_5\\text{H}_{12}\\text{O}$$, $$1.80\\text{ dm}^3$$, pentan-1-ol",
        },
        {
          correct: false,
          label:
            "$$\\text{C}_5\\text{H}_{12}\\text{O}$$, $$3.60\\text{ dm}^3$$, pentan-1-ol",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$\\text{C}_5\\text{H}_{12}$$, $$1.92\\text{ dm}^3$$, pentana",
        },
        {
          correct: false,
          label:
            "$$\\text{C}_5\\text{H}_{12}\\text{O}$$, $$1.92\\text{ dm}^3$$, pentan-1-ol",
        },
        {
          correct: true,
          label:
            "$$\\text{C}_5\\text{H}_{12}\\text{O}$$, $$1.80\\text{ dm}^3$$, pentan-1-ol",
        },
        {
          correct: false,
          label:
            "$$\\text{C}_5\\text{H}_{12}\\text{O}$$, $$3.60\\text{ dm}^3$$, pentan-1-ol",
        },
      ],
    },
  },
};

export default item;
