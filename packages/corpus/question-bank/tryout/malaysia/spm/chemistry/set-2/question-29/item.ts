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
            "$$\\text{C}_4\\text{H}_8$$, $$10.8\\text{ g}$$, $$4.80\\text{ dm}^3$$",
        },
        {
          correct: false,
          label:
            "$$\\text{C}_2\\text{H}_4$$, $$18.8\\text{ g}$$, $$4.80\\text{ dm}^3$$",
        },
        {
          correct: false,
          label:
            "$$\\text{C}_4\\text{H}_8$$, $$6.80\\text{ g}$$, $$4.80\\text{ dm}^3$$",
        },
        {
          correct: false,
          label:
            "$$\\text{C}_4\\text{H}_8$$, $$10.8\\text{ g}$$, $$1.20\\text{ dm}^3$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$\\text{C}_4\\text{H}_8$$, $$10.8\\text{ g}$$, $$4.80\\text{ dm}^3$$",
        },
        {
          correct: false,
          label:
            "$$\\text{C}_2\\text{H}_4$$, $$18.8\\text{ g}$$, $$4.80\\text{ dm}^3$$",
        },
        {
          correct: false,
          label:
            "$$\\text{C}_4\\text{H}_8$$, $$6.80\\text{ g}$$, $$4.80\\text{ dm}^3$$",
        },
        {
          correct: false,
          label:
            "$$\\text{C}_4\\text{H}_8$$, $$10.8\\text{ g}$$, $$1.20\\text{ dm}^3$$",
        },
      ],
    },
  },
};

export default item;
