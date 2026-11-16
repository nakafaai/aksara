import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "mole-concept",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\text{C}_5\\text{H}_{12}$$, $$1920\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$\\text{C}_4\\text{H}_6\\text{O}$$, $$1080\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$\\text{C}_5\\text{H}_{10}$$, $$1200\\text{ cm}^3$$",
        },
        {
          correct: true,
          label: "$$\\text{C}_5\\text{H}_{10}$$, $$1800\\text{ cm}^3$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\text{C}_5\\text{H}_{12}$$, $$1920\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$\\text{C}_4\\text{H}_6\\text{O}$$, $$1080\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$\\text{C}_5\\text{H}_{10}$$, $$1200\\text{ cm}^3$$",
        },
        {
          correct: true,
          label: "$$\\text{C}_5\\text{H}_{10}$$, $$1800\\text{ cm}^3$$",
        },
      ],
    },
  },
};

export default item;
