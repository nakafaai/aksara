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
            "$$10.2^\\circ\\text{C}$$, $$4.29\\text{ kJ}$$, $$25.0\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$6.81^\\circ\\text{C}$$, $$2.86\\text{ kJ}$$, $$0\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$10.2^\\circ\\text{C}$$, $$4.29\\text{ kJ}$$, $$12.5\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$20.4^\\circ\\text{C}$$, $$4.29\\text{ kJ}$$, $$25.0\\text{ cm}^3$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$10.2^\\circ\\text{C}$$, $$4.29\\text{ kJ}$$, $$25.0\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$6.81^\\circ\\text{C}$$, $$2.86\\text{ kJ}$$, $$0\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$10.2^\\circ\\text{C}$$, $$4.29\\text{ kJ}$$, $$12.5\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$20.4^\\circ\\text{C}$$, $$4.29\\text{ kJ}$$, $$25.0\\text{ cm}^3$$",
        },
      ],
    },
  },
};

export default item;
