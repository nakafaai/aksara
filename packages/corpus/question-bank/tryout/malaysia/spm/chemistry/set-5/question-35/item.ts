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
            "$$-42.0\\text{ kJ mol}^{-1}$$, $$15.3\\text{ kJ mol}^{-1}$$, $$6.82^\\circ\\text{C}$$",
        },
        {
          correct: true,
          label:
            "$$-52.5\\text{ kJ mol}^{-1}$$, $$4.80\\text{ kJ mol}^{-1}$$, $$5.46^\\circ\\text{C}$$",
        },
        {
          correct: false,
          label:
            "$$-26.3\\text{ kJ mol}^{-1}$$, $$31.0\\text{ kJ mol}^{-1}$$, $$10.9^\\circ\\text{C}$$",
        },
        {
          correct: false,
          label:
            "$$-52.5\\text{ kJ mol}^{-1}$$, $$4.80\\text{ kJ mol}^{-1}$$, $$6.82^\\circ\\text{C}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$-42.0\\text{ kJ mol}^{-1}$$, $$15.3\\text{ kJ mol}^{-1}$$, $$6.82^\\circ\\text{C}$$",
        },
        {
          correct: true,
          label:
            "$$-52.5\\text{ kJ mol}^{-1}$$, $$4.80\\text{ kJ mol}^{-1}$$, $$5.46^\\circ\\text{C}$$",
        },
        {
          correct: false,
          label:
            "$$-26.3\\text{ kJ mol}^{-1}$$, $$31.0\\text{ kJ mol}^{-1}$$, $$10.9^\\circ\\text{C}$$",
        },
        {
          correct: false,
          label:
            "$$-52.5\\text{ kJ mol}^{-1}$$, $$4.80\\text{ kJ mol}^{-1}$$, $$6.82^\\circ\\text{C}$$",
        },
      ],
    },
  },
};

export default item;
