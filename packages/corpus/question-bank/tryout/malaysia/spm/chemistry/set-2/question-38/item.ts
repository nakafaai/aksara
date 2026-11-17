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
          label:
            "$$2.40\\text{ dm}^3$$, $$100\\text{ cm}^3$$, $$1.80\\text{ g}$$",
        },
        {
          correct: true,
          label:
            "$$4.80\\text{ dm}^3$$, $$100\\text{ cm}^3$$, $$1.80\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$4.80\\text{ dm}^3$$, $$300\\text{ cm}^3$$, $$1.80\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$4.80\\text{ dm}^3$$, $$100\\text{ cm}^3$$, $$2.70\\text{ g}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$2.40\\text{ dm}^3$$, $$100\\text{ cm}^3$$, $$1.80\\text{ g}$$",
        },
        {
          correct: true,
          label:
            "$$4.80\\text{ dm}^3$$, $$100\\text{ cm}^3$$, $$1.80\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$4.80\\text{ dm}^3$$, $$300\\text{ cm}^3$$, $$1.80\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$4.80\\text{ dm}^3$$, $$100\\text{ cm}^3$$, $$2.70\\text{ g}$$",
        },
      ],
    },
  },
};

export default item;
