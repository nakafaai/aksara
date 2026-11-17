import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "polymers",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$1000$$, $$448\\text{ g}$$, $$384\\text{ dm}^3$$",
        },
        {
          correct: false,
          label: "$$1000$$, $$560\\text{ g}$$, $$192\\text{ dm}^3$$",
        },
        {
          correct: true,
          label: "$$1000$$, $$560\\text{ g}$$, $$384\\text{ dm}^3$$",
        },
        {
          correct: false,
          label: "$$2230$$, $$560\\text{ g}$$, $$384\\text{ dm}^3$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$1000$$, $$448\\text{ g}$$, $$384\\text{ dm}^3$$",
        },
        {
          correct: false,
          label: "$$1000$$, $$560\\text{ g}$$, $$192\\text{ dm}^3$$",
        },
        {
          correct: true,
          label: "$$1000$$, $$560\\text{ g}$$, $$384\\text{ dm}^3$$",
        },
        {
          correct: false,
          label: "$$2230$$, $$560\\text{ g}$$, $$384\\text{ dm}^3$$",
        },
      ],
    },
  },
};

export default item;
