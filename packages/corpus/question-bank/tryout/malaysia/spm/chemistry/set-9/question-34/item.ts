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
          label: "$$-210\\text{ kJ mol}^{-1}$$, $$20.0^\\circ\\text{C}$$",
        },
        {
          correct: false,
          label: "$$+210\\text{ kJ mol}^{-1}$$, $$10.0^\\circ\\text{C}$$",
        },
        {
          correct: true,
          label: "$$-210\\text{ kJ mol}^{-1}$$, $$10.0^\\circ\\text{C}$$",
        },
        {
          correct: false,
          label: "$$-105\\text{ kJ mol}^{-1}$$, $$10.0^\\circ\\text{C}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$-210\\text{ kJ mol}^{-1}$$, $$20.0^\\circ\\text{C}$$",
        },
        {
          correct: false,
          label: "$$+210\\text{ kJ mol}^{-1}$$, $$10.0^\\circ\\text{C}$$",
        },
        {
          correct: true,
          label: "$$-210\\text{ kJ mol}^{-1}$$, $$10.0^\\circ\\text{C}$$",
        },
        {
          correct: false,
          label: "$$-105\\text{ kJ mol}^{-1}$$, $$10.0^\\circ\\text{C}$$",
        },
      ],
    },
  },
};

export default item;
