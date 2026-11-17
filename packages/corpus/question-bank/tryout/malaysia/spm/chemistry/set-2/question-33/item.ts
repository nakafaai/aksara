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
          correct: true,
          label:
            "$$6.79^\\circ\\text{C}$$, $$2.85\\text{ kJ}$$, $$50.0\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$13.6^\\circ\\text{C}$$, $$5.70\\text{ kJ}$$, $$0\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$6.79^\\circ\\text{C}$$, $$2.85\\text{ kJ}$$, $$100\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$13.6^\\circ\\text{C}$$, $$2.85\\text{ kJ}$$, $$50.0\\text{ cm}^3$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$6.79^\\circ\\text{C}$$, $$2.85\\text{ kJ}$$, $$50.0\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$13.6^\\circ\\text{C}$$, $$5.70\\text{ kJ}$$, $$0\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$6.79^\\circ\\text{C}$$, $$2.85\\text{ kJ}$$, $$100\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$13.6^\\circ\\text{C}$$, $$2.85\\text{ kJ}$$, $$50.0\\text{ cm}^3$$",
        },
      ],
    },
  },
};

export default item;
