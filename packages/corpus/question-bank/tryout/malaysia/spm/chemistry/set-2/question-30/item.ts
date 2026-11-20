import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-5",
    topic: "carbon-compounds",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$2.80\\text{ g}$$, $$2.30\\text{ g}$$, $$100\\text{ cm}^3$$",
        },
        {
          correct: true,
          label: "$$11.4\\text{ g}$$, $$2.30\\text{ g}$$, $$100\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$11.4\\text{ g}$$, $$4.60\\text{ g}$$, $$0\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$11.4\\text{ g}$$, $$2.30\\text{ g}$$, $$200\\text{ cm}^3$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$2.80\\text{ g}$$, $$2.30\\text{ g}$$, $$100\\text{ cm}^3$$",
        },
        {
          correct: true,
          label: "$$11.4\\text{ g}$$, $$2.30\\text{ g}$$, $$100\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$11.4\\text{ g}$$, $$4.60\\text{ g}$$, $$0\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$11.4\\text{ g}$$, $$2.30\\text{ g}$$, $$200\\text{ cm}^3$$",
        },
      ],
    },
  },
};

export default item;
