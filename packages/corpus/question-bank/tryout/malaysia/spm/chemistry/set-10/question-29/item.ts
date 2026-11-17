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
            "$$\\text{C}_5\\text{H}_{10}$$, $$1.08\\text{ g}$$, $$0.350\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$\\text{C}_5\\text{H}_{10}$$, $$1.44\\text{ g}$$, $$0\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$\\text{C}_5\\text{H}_{10}$$, $$1.05\\text{ g}$$, $$0.350\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$\\text{C}_{10}\\text{H}_{20}$$, $$1.42\\text{ g}$$, $$0\\text{ g}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$\\text{C}_5\\text{H}_{10}$$, $$1.08\\text{ g}$$, $$0.350\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$\\text{C}_5\\text{H}_{10}$$, $$1.44\\text{ g}$$, $$0\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$\\text{C}_5\\text{H}_{10}$$, $$1.05\\text{ g}$$, $$0.350\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$\\text{C}_{10}\\text{H}_{20}$$, $$1.42\\text{ g}$$, $$0\\text{ g}$$",
        },
      ],
    },
  },
};

export default item;
