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
        { correct: false, label: "$$120.5^\\circ\\text{C}$$, none" },
        { correct: false, label: "$$100^\\circ\\text{C}$$, none" },
        {
          correct: false,
          label: "$$100^\\circ\\text{C}$$, $$101\\text{ kJ}$$",
        },
        {
          correct: true,
          label: "$$100^\\circ\\text{C}$$, $$34.4\\text{ kJ}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$120.5^\\circ\\text{C}$$, tiada" },
        { correct: false, label: "$$100^\\circ\\text{C}$$, tiada" },
        {
          correct: false,
          label: "$$100^\\circ\\text{C}$$, $$101\\text{ kJ}$$",
        },
        {
          correct: true,
          label: "$$100^\\circ\\text{C}$$, $$34.4\\text{ kJ}$$",
        },
      ],
    },
  },
};

export default item;
