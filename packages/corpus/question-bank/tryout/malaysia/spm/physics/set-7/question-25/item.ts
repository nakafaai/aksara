import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "pressure",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$60\\text{ cm}^3$$, stays the same and $$150\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$40\\text{ cm}^3$$, falls by $$6.0\\text{ mm}$$ and $$100\\text{ g}$$",
        },
        {
          correct: true,
          label:
            "$$60\\text{ cm}^3$$, falls by $$4.0\\text{ mm}$$ and $$150\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$60\\text{ cm}^3$$, falls by $$4.0\\text{ mm}$$ and $$100\\text{ g}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$60\\text{ cm}^3$$, tidak berubah dan $$150\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$40\\text{ cm}^3$$, turun sebanyak $$6.0\\text{ mm}$$ dan $$100\\text{ g}$$",
        },
        {
          correct: true,
          label:
            "$$60\\text{ cm}^3$$, turun sebanyak $$4.0\\text{ mm}$$ dan $$150\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$60\\text{ cm}^3$$, turun sebanyak $$4.0\\text{ mm}$$ dan $$100\\text{ g}$$",
        },
      ],
    },
  },
};

export default item;
