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
          correct: true,
          label:
            "$$\\text{C}_5\\text{H}_{10}$$, $$4.60\\text{ g}$$, $$1.76\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$\\text{C}_5\\text{H}_{10}$$, $$3.00\\text{ g}$$, $$1.76\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$\\text{C}_5\\text{H}_{10}$$, $$4.60\\text{ g}$$, $$1.40\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$\\text{C}_{10}\\text{H}_{20}$$, $$4.60\\text{ g}$$, $$1.58\\text{ g}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$\\text{C}_5\\text{H}_{10}$$, $$4.60\\text{ g}$$, $$1.76\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$\\text{C}_5\\text{H}_{10}$$, $$3.00\\text{ g}$$, $$1.76\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$\\text{C}_5\\text{H}_{10}$$, $$4.60\\text{ g}$$, $$1.40\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$\\text{C}_{10}\\text{H}_{20}$$, $$4.60\\text{ g}$$, $$1.58\\text{ g}$$",
        },
      ],
    },
  },
};

export default item;
