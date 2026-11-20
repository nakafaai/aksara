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
            "$$100\\text{ cm}^3$$, $$18.8\\text{ g}$$, $$3.76\\text{ kg}$$",
        },
        {
          correct: false,
          label:
            "$$75.0\\text{ cm}^3$$, $$20.4\\text{ g}$$, $$4.08\\text{ kg}$$",
        },
        {
          correct: true,
          label:
            "$$75.0\\text{ cm}^3$$, $$17.7\\text{ g}$$, $$3.54\\text{ kg}$$",
        },
        {
          correct: false,
          label:
            "$$75.0\\text{ cm}^3$$, $$17.7\\text{ g}$$, $$2.88\\text{ kg}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$100\\text{ cm}^3$$, $$18.8\\text{ g}$$, $$3.76\\text{ kg}$$",
        },
        {
          correct: false,
          label:
            "$$75.0\\text{ cm}^3$$, $$20.4\\text{ g}$$, $$4.08\\text{ kg}$$",
        },
        {
          correct: true,
          label:
            "$$75.0\\text{ cm}^3$$, $$17.7\\text{ g}$$, $$3.54\\text{ kg}$$",
        },
        {
          correct: false,
          label:
            "$$75.0\\text{ cm}^3$$, $$17.7\\text{ g}$$, $$2.88\\text{ kg}$$",
        },
      ],
    },
  },
};

export default item;
