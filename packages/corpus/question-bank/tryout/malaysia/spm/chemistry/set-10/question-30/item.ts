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
            "$$18.4\\text{ g}$$, $$9.60\\text{ dm}^3$$, $$548\\text{ kJ}$$",
        },
        {
          correct: true,
          label:
            "$$13.8\\text{ g}$$, $$7.20\\text{ dm}^3$$, $$411\\text{ kJ}$$",
        },
        {
          correct: false,
          label:
            "$$6.90\\text{ g}$$, $$3.60\\text{ dm}^3$$, $$206\\text{ kJ}$$",
        },
        {
          correct: false,
          label:
            "$$13.8\\text{ g}$$, $$7.20\\text{ dm}^3$$, $$1370\\text{ kJ}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$18.4\\text{ g}$$, $$9.60\\text{ dm}^3$$, $$548\\text{ kJ}$$",
        },
        {
          correct: true,
          label:
            "$$13.8\\text{ g}$$, $$7.20\\text{ dm}^3$$, $$411\\text{ kJ}$$",
        },
        {
          correct: false,
          label:
            "$$6.90\\text{ g}$$, $$3.60\\text{ dm}^3$$, $$206\\text{ kJ}$$",
        },
        {
          correct: false,
          label:
            "$$13.8\\text{ g}$$, $$7.20\\text{ dm}^3$$, $$1370\\text{ kJ}$$",
        },
      ],
    },
  },
};

export default item;
