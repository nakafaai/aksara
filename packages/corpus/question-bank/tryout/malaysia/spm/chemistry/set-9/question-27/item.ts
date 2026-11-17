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
            "$$\\text{C}_5\\text{H}_{12}$$, $$2.32\\text{ g}$$, $$1.20\\text{ dm}^3$$",
        },
        {
          correct: false,
          label:
            "$$\\text{C}_{10}\\text{H}_{20}$$, $$1.50\\text{ g}$$, $$1.20\\text{ dm}^3$$",
        },
        {
          correct: false,
          label:
            "$$\\text{C}_5\\text{H}_{10}$$, $$2.30\\text{ g}$$, $$0.240\\text{ dm}^3$$",
        },
        {
          correct: true,
          label:
            "$$\\text{C}_5\\text{H}_{10}$$, $$2.30\\text{ g}$$, $$1.20\\text{ dm}^3$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$\\text{C}_5\\text{H}_{12}$$, $$2.32\\text{ g}$$, $$1.20\\text{ dm}^3$$",
        },
        {
          correct: false,
          label:
            "$$\\text{C}_{10}\\text{H}_{20}$$, $$1.50\\text{ g}$$, $$1.20\\text{ dm}^3$$",
        },
        {
          correct: false,
          label:
            "$$\\text{C}_5\\text{H}_{10}$$, $$2.30\\text{ g}$$, $$0.240\\text{ dm}^3$$",
        },
        {
          correct: true,
          label:
            "$$\\text{C}_5\\text{H}_{10}$$, $$2.30\\text{ g}$$, $$1.20\\text{ dm}^3$$",
        },
      ],
    },
  },
};

export default item;
