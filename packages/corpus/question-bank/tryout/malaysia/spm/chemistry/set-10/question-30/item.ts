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
          label: "$$18.4\\text{ g}$$, $$800\\text{ cm}^3$$, $$548\\text{ kJ}$$",
        },
        {
          correct: true,
          label: "$$13.8\\text{ g}$$, $$600\\text{ cm}^3$$, $$411\\text{ kJ}$$",
        },
        {
          correct: false,
          label: "$$6.90\\text{ g}$$, $$300\\text{ cm}^3$$, $$206\\text{ kJ}$$",
        },
        {
          correct: false,
          label: "$$13.8\\text{ g}$$, $$300\\text{ cm}^3$$, $$411\\text{ kJ}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$18.4\\text{ g}$$, $$800\\text{ cm}^3$$, $$548\\text{ kJ}$$",
        },
        {
          correct: true,
          label: "$$13.8\\text{ g}$$, $$600\\text{ cm}^3$$, $$411\\text{ kJ}$$",
        },
        {
          correct: false,
          label: "$$6.90\\text{ g}$$, $$300\\text{ cm}^3$$, $$206\\text{ kJ}$$",
        },
        {
          correct: false,
          label: "$$13.8\\text{ g}$$, $$300\\text{ cm}^3$$, $$411\\text{ kJ}$$",
        },
      ],
    },
  },
};

export default item;
