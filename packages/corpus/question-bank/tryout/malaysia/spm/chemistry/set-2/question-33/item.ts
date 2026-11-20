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
            "$$10.2^\\circ\\text{C}$$, $$4.29\\text{ kJ}$$, $$0.300\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$6.81^\\circ\\text{C}$$, $$2.86\\text{ kJ}$$, $$0\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$10.2^\\circ\\text{C}$$, $$4.29\\text{ kJ}$$, $$0.600\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$20.4^\\circ\\text{C}$$, $$4.29\\text{ kJ}$$, $$0.300\\text{ g}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$10.2^\\circ\\text{C}$$, $$4.29\\text{ kJ}$$, $$0.300\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$6.81^\\circ\\text{C}$$, $$2.86\\text{ kJ}$$, $$0\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$10.2^\\circ\\text{C}$$, $$4.29\\text{ kJ}$$, $$0.600\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$20.4^\\circ\\text{C}$$, $$4.29\\text{ kJ}$$, $$0.300\\text{ g}$$",
        },
      ],
    },
  },
};

export default item;
