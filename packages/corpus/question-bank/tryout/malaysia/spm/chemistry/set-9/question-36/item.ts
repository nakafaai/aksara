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
            "$$-25.2\\text{ kJ mol}^{-1}$$, $$42.0^\\circ\\text{C}$$, $$66.7\\text{ g}$$",
        },
        {
          correct: true,
          label:
            "$$+25.2\\text{ kJ mol}^{-1}$$, $$18.0^\\circ\\text{C}$$, $$66.7\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$+25.2\\text{ kJ mol}^{-1}$$, $$18.0^\\circ\\text{C}$$, $$33.3\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$+25.2\\text{ kJ mol}^{-1}$$, $$12.0^\\circ\\text{C}$$, $$66.7\\text{ g}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$-25.2\\text{ kJ mol}^{-1}$$, $$42.0^\\circ\\text{C}$$, $$66.7\\text{ g}$$",
        },
        {
          correct: true,
          label:
            "$$+25.2\\text{ kJ mol}^{-1}$$, $$18.0^\\circ\\text{C}$$, $$66.7\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$+25.2\\text{ kJ mol}^{-1}$$, $$18.0^\\circ\\text{C}$$, $$33.3\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$+25.2\\text{ kJ mol}^{-1}$$, $$12.0^\\circ\\text{C}$$, $$66.7\\text{ g}$$",
        },
      ],
    },
  },
};

export default item;
