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
          label: "$$\\text{C}_4\\text{H}_8$$, $$1.80\\text{ dm}^3$$",
        },
        {
          correct: false,
          label: "$$\\text{C}_4\\text{H}_{10}$$, $$1.95\\text{ dm}^3$$",
        },
        {
          correct: false,
          label: "$$\\text{C}_2\\text{H}_4$$, $$1.80\\text{ dm}^3$$",
        },
        {
          correct: false,
          label: "$$\\text{C}_4\\text{H}_8$$, $$1.20\\text{ dm}^3$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$\\text{C}_4\\text{H}_8$$, $$1.80\\text{ dm}^3$$",
        },
        {
          correct: false,
          label: "$$\\text{C}_4\\text{H}_{10}$$, $$1.95\\text{ dm}^3$$",
        },
        {
          correct: false,
          label: "$$\\text{C}_2\\text{H}_4$$, $$1.80\\text{ dm}^3$$",
        },
        {
          correct: false,
          label: "$$\\text{C}_4\\text{H}_8$$, $$1.20\\text{ dm}^3$$",
        },
      ],
    },
  },
};

export default item;
