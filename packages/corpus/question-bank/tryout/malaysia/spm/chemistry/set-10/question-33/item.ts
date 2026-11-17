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
            "$$-57.1\\text{ kJ mol}^{-1}$$, $$13.6^\\circ\\text{C}$$, $$5.10^\\circ\\text{C}$$",
        },
        {
          correct: true,
          label:
            "$$-57.1\\text{ kJ mol}^{-1}$$, $$6.8^\\circ\\text{C}$$, $$5.10^\\circ\\text{C}$$",
        },
        {
          correct: false,
          label:
            "$$-57.1\\text{ kJ mol}^{-1}$$, $$6.8^\\circ\\text{C}$$, $$8.50^\\circ\\text{C}$$",
        },
        {
          correct: false,
          label:
            "$$-28.6\\text{ kJ mol}^{-1}$$, $$6.8^\\circ\\text{C}$$, $$5.10^\\circ\\text{C}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$-57.1\\text{ kJ mol}^{-1}$$, $$13.6^\\circ\\text{C}$$, $$5.10^\\circ\\text{C}$$",
        },
        {
          correct: true,
          label:
            "$$-57.1\\text{ kJ mol}^{-1}$$, $$6.8^\\circ\\text{C}$$, $$5.10^\\circ\\text{C}$$",
        },
        {
          correct: false,
          label:
            "$$-57.1\\text{ kJ mol}^{-1}$$, $$6.8^\\circ\\text{C}$$, $$8.50^\\circ\\text{C}$$",
        },
        {
          correct: false,
          label:
            "$$-28.6\\text{ kJ mol}^{-1}$$, $$6.8^\\circ\\text{C}$$, $$5.10^\\circ\\text{C}$$",
        },
      ],
    },
  },
};

export default item;
