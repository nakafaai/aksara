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
            "$$-65.5\\text{ kJ mol}^{-1}$$, $$3.9^\\circ\\text{C}$$, $$3.59\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$-32.8\\text{ kJ mol}^{-1}$$, $$1.95^\\circ\\text{C}$$, $$1.79\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$-65.5\\text{ kJ mol}^{-1}$$, $$3.9^\\circ\\text{C}$$, $$1.79\\text{ g}$$",
        },
        {
          correct: true,
          label:
            "$$-65.5\\text{ kJ mol}^{-1}$$, $$1.95^\\circ\\text{C}$$, $$1.79\\text{ g}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$-65.5\\text{ kJ mol}^{-1}$$, $$3.9^\\circ\\text{C}$$, $$3.59\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$-32.8\\text{ kJ mol}^{-1}$$, $$1.95^\\circ\\text{C}$$, $$1.79\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$-65.5\\text{ kJ mol}^{-1}$$, $$3.9^\\circ\\text{C}$$, $$1.79\\text{ g}$$",
        },
        {
          correct: true,
          label:
            "$$-65.5\\text{ kJ mol}^{-1}$$, $$1.95^\\circ\\text{C}$$, $$1.79\\text{ g}$$",
        },
      ],
    },
  },
};

export default item;
