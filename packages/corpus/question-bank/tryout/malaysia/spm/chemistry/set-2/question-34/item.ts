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
            "$$15.8\\text{ kJ}$$, $$-1050\\text{ kJ mol}^{-1}$$, $$1.41\\text{ g}$$",
        },
        {
          correct: true,
          label:
            "$$15.8\\text{ kJ}$$, $$-1050\\text{ kJ mol}^{-1}$$, $$1.84\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$15.8\\text{ kJ}$$, $$-22.8\\text{ kJ mol}^{-1}$$, $$1.84\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$15.8\\text{ kJ}$$, $$-1050\\text{ kJ mol}^{-1}$$, $$0.920\\text{ g}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$15.8\\text{ kJ}$$, $$-1050\\text{ kJ mol}^{-1}$$, $$1.41\\text{ g}$$",
        },
        {
          correct: true,
          label:
            "$$15.8\\text{ kJ}$$, $$-1050\\text{ kJ mol}^{-1}$$, $$1.84\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$15.8\\text{ kJ}$$, $$-22.8\\text{ kJ mol}^{-1}$$, $$1.84\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$15.8\\text{ kJ}$$, $$-1050\\text{ kJ mol}^{-1}$$, $$0.920\\text{ g}$$",
        },
      ],
    },
  },
};

export default item;
