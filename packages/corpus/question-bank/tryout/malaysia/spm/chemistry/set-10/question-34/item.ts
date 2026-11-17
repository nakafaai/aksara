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
          correct: true,
          label:
            "$$-210\\text{ kJ mol}^{-1}$$, $$5.0^\\circ\\text{C}$$, $$0.640\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$-210\\text{ kJ mol}^{-1}$$, $$10.0^\\circ\\text{C}$$, $$1.28\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$-210\\text{ kJ mol}^{-1}$$, $$5.0^\\circ\\text{C}$$, $$1.28\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$+210\\text{ kJ mol}^{-1}$$, $$5.0^\\circ\\text{C}$$, $$0.640\\text{ g}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$-210\\text{ kJ mol}^{-1}$$, $$5.0^\\circ\\text{C}$$, $$0.640\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$-210\\text{ kJ mol}^{-1}$$, $$10.0^\\circ\\text{C}$$, $$1.28\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$-210\\text{ kJ mol}^{-1}$$, $$5.0^\\circ\\text{C}$$, $$1.28\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$+210\\text{ kJ mol}^{-1}$$, $$5.0^\\circ\\text{C}$$, $$0.640\\text{ g}$$",
        },
      ],
    },
  },
};

export default item;
