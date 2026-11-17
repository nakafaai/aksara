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
          label:
            "$$74.0\\text{ g}$$, $$40.4\\text{ g}$$, $$76.8\\text{ dm}^3$$",
        },
        {
          correct: false,
          label: "$$130\\text{ g}$$, $$202\\text{ g}$$, $$76.8\\text{ dm}^3$$",
        },
        {
          correct: false,
          label: "$$130\\text{ g}$$, $$40.4\\text{ g}$$, $$72.0\\text{ dm}^3$$",
        },
        {
          correct: true,
          label: "$$130\\text{ g}$$, $$40.4\\text{ g}$$, $$76.8\\text{ dm}^3$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$74.0\\text{ g}$$, $$40.4\\text{ g}$$, $$76.8\\text{ dm}^3$$",
        },
        {
          correct: false,
          label: "$$130\\text{ g}$$, $$202\\text{ g}$$, $$76.8\\text{ dm}^3$$",
        },
        {
          correct: false,
          label: "$$130\\text{ g}$$, $$40.4\\text{ g}$$, $$72.0\\text{ dm}^3$$",
        },
        {
          correct: true,
          label: "$$130\\text{ g}$$, $$40.4\\text{ g}$$, $$76.8\\text{ dm}^3$$",
        },
      ],
    },
  },
};

export default item;
