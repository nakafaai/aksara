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
        { correct: false, label: "$$\\text{CH}_2$$, $$360\\text{ cm}^3$$" },
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
        { correct: false, label: "$$\\text{CH}_2$$, $$360\\text{ cm}^3$$" },
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
