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
            "$$\\text{C}_4\\text{H}_9\\text{OH}$$, $$3.12\\text{ dm}^3$$, $$1.76\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$\\text{C}_4\\text{H}_9\\text{OH}$$, $$2.88\\text{ dm}^3$$, $$1.48\\text{ g}$$",
        },
        {
          correct: true,
          label:
            "$$\\text{C}_4\\text{H}_9\\text{OH}$$, $$2.88\\text{ dm}^3$$, $$1.76\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$\\text{C}_4\\text{H}_9\\text{OH}$$, $$2.88\\text{ dm}^3$$, $$2.12\\text{ g}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$\\text{C}_4\\text{H}_9\\text{OH}$$, $$3.12\\text{ dm}^3$$, $$1.76\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$\\text{C}_4\\text{H}_9\\text{OH}$$, $$2.88\\text{ dm}^3$$, $$1.48\\text{ g}$$",
        },
        {
          correct: true,
          label:
            "$$\\text{C}_4\\text{H}_9\\text{OH}$$, $$2.88\\text{ dm}^3$$, $$1.76\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$\\text{C}_4\\text{H}_9\\text{OH}$$, $$2.88\\text{ dm}^3$$, $$2.12\\text{ g}$$",
        },
      ],
    },
  },
};

export default item;
