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
            "$$\\text{C}_4\\text{H}_9\\text{OH}$$, $$1.80\\text{ g}$$, $$3.12\\text{ dm}^3$$",
        },
        {
          correct: false,
          label:
            "$$\\text{C}_4\\text{H}_9\\text{OH}$$, $$1.44\\text{ g}$$, $$2.88\\text{ dm}^3$$",
        },
        {
          correct: true,
          label:
            "$$\\text{C}_4\\text{H}_9\\text{OH}$$, $$1.80\\text{ g}$$, $$2.88\\text{ dm}^3$$",
        },
        {
          correct: false,
          label:
            "$$\\text{C}_4\\text{H}_9\\text{OH}$$, $$3.60\\text{ g}$$, $$2.88\\text{ dm}^3$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$\\text{C}_4\\text{H}_9\\text{OH}$$, $$1.80\\text{ g}$$, $$3.12\\text{ dm}^3$$",
        },
        {
          correct: false,
          label:
            "$$\\text{C}_4\\text{H}_9\\text{OH}$$, $$1.44\\text{ g}$$, $$2.88\\text{ dm}^3$$",
        },
        {
          correct: true,
          label:
            "$$\\text{C}_4\\text{H}_9\\text{OH}$$, $$1.80\\text{ g}$$, $$2.88\\text{ dm}^3$$",
        },
        {
          correct: false,
          label:
            "$$\\text{C}_4\\text{H}_9\\text{OH}$$, $$3.60\\text{ g}$$, $$2.88\\text{ dm}^3$$",
        },
      ],
    },
  },
};

export default item;
