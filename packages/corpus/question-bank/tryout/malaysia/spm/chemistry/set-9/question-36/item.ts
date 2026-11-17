import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "thermochemistry",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$-26.5\\text{ kJ mol}^{-1}$$, $$31.7\\text{ g}$$",
        },
        {
          correct: true,
          label: "$$+26.5\\text{ kJ mol}^{-1}$$, $$31.7\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$+26.5\\text{ kJ mol}^{-1}$$, $$12.7\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$+2.65\\text{ kJ mol}^{-1}$$, $$317\\text{ g}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$-26.5\\text{ kJ mol}^{-1}$$, $$31.7\\text{ g}$$",
        },
        {
          correct: true,
          label: "$$+26.5\\text{ kJ mol}^{-1}$$, $$31.7\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$+26.5\\text{ kJ mol}^{-1}$$, $$12.7\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$+2.65\\text{ kJ mol}^{-1}$$, $$317\\text{ g}$$",
        },
      ],
    },
  },
};

export default item;
