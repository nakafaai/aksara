import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
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
            "$$-210\\text{ kJ mol}^{-1}$$, $$20.0^\\circ\\text{C}$$, $$0.35\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$+210\\text{ kJ mol}^{-1}$$, $$10.0^\\circ\\text{C}$$, $$0.35\\text{ g}$$",
        },
        {
          correct: true,
          label:
            "$$-210\\text{ kJ mol}^{-1}$$, $$10.0^\\circ\\text{C}$$, $$0.35\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$-105\\text{ kJ mol}^{-1}$$, $$10.0^\\circ\\text{C}$$, $$0.675\\text{ g}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$-210\\text{ kJ mol}^{-1}$$, $$20.0^\\circ\\text{C}$$, $$0.35\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$+210\\text{ kJ mol}^{-1}$$, $$10.0^\\circ\\text{C}$$, $$0.35\\text{ g}$$",
        },
        {
          correct: true,
          label:
            "$$-210\\text{ kJ mol}^{-1}$$, $$10.0^\\circ\\text{C}$$, $$0.35\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$-105\\text{ kJ mol}^{-1}$$, $$10.0^\\circ\\text{C}$$, $$0.675\\text{ g}$$",
        },
      ],
    },
  },
};

export default item;
