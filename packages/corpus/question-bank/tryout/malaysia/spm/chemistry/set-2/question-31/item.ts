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
            "$$\\text{C}_4\\text{H}_9\\text{OH}$$, $$3.12\\text{ dm}^3$$, $$100\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$\\text{C}_4\\text{H}_9\\text{OH}$$, $$2.88\\text{ dm}^3$$, $$1000\\text{ cm}^3$$",
        },
        {
          correct: true,
          label:
            "$$\\text{C}_4\\text{H}_9\\text{OH}$$, $$2.88\\text{ dm}^3$$, $$100\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$\\text{C}_4\\text{H}_9\\text{OH}$$, $$2.88\\text{ dm}^3$$, $$200\\text{ cm}^3$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$\\text{C}_4\\text{H}_9\\text{OH}$$, $$3.12\\text{ dm}^3$$, $$100\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$\\text{C}_4\\text{H}_9\\text{OH}$$, $$2.88\\text{ dm}^3$$, $$1000\\text{ cm}^3$$",
        },
        {
          correct: true,
          label:
            "$$\\text{C}_4\\text{H}_9\\text{OH}$$, $$2.88\\text{ dm}^3$$, $$100\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$\\text{C}_4\\text{H}_9\\text{OH}$$, $$2.88\\text{ dm}^3$$, $$200\\text{ cm}^3$$",
        },
      ],
    },
  },
};

export default item;
