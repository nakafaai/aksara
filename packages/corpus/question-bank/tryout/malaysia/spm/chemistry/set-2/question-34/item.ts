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
          label:
            "$$15.8\\text{ kJ}$$, $$-1050\\text{ kJ mol}^{-1}$$, $$130\\%$$",
        },
        {
          correct: true,
          label:
            "$$15.8\\text{ kJ}$$, $$-1050\\text{ kJ mol}^{-1}$$, $$76.6\\%$$",
        },
        {
          correct: false,
          label:
            "$$15.8\\text{ kJ}$$, $$-22.8\\text{ kJ mol}^{-1}$$, $$76.6\\%$$",
        },
        {
          correct: false,
          label:
            "$$15.8\\text{ kJ}$$, $$-1050\\text{ kJ mol}^{-1}$$, $$23.4\\%$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$15.8\\text{ kJ}$$, $$-1050\\text{ kJ mol}^{-1}$$, $$130\\%$$",
        },
        {
          correct: true,
          label:
            "$$15.8\\text{ kJ}$$, $$-1050\\text{ kJ mol}^{-1}$$, $$76.6\\%$$",
        },
        {
          correct: false,
          label:
            "$$15.8\\text{ kJ}$$, $$-22.8\\text{ kJ mol}^{-1}$$, $$76.6\\%$$",
        },
        {
          correct: false,
          label:
            "$$15.8\\text{ kJ}$$, $$-1050\\text{ kJ mol}^{-1}$$, $$23.4\\%$$",
        },
      ],
    },
  },
};

export default item;
