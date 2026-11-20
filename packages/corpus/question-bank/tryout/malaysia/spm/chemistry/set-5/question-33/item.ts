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
            "$$-462\\text{ kJ mol}^{-1}$$, $$-315\\text{ kJ mol}^{-1}$$, $$78.8\\text{ kJ}$$",
        },
        {
          correct: false,
          label:
            "$$-462\\text{ kJ mol}^{-1}$$, $$-895\\text{ kJ mol}^{-1}$$, $$224\\text{ kJ}$$",
        },
        {
          correct: false,
          label:
            "$$-462\\text{ kJ mol}^{-1}$$, $$-601\\text{ kJ mol}^{-1}$$, $$90.2\\text{ kJ}$$",
        },
        {
          correct: true,
          label:
            "$$-462\\text{ kJ mol}^{-1}$$, $$-601\\text{ kJ mol}^{-1}$$, $$150\\text{ kJ}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$-462\\text{ kJ mol}^{-1}$$, $$-315\\text{ kJ mol}^{-1}$$, $$78.8\\text{ kJ}$$",
        },
        {
          correct: false,
          label:
            "$$-462\\text{ kJ mol}^{-1}$$, $$-895\\text{ kJ mol}^{-1}$$, $$224\\text{ kJ}$$",
        },
        {
          correct: false,
          label:
            "$$-462\\text{ kJ mol}^{-1}$$, $$-601\\text{ kJ mol}^{-1}$$, $$90.2\\text{ kJ}$$",
        },
        {
          correct: true,
          label:
            "$$-462\\text{ kJ mol}^{-1}$$, $$-601\\text{ kJ mol}^{-1}$$, $$150\\text{ kJ}$$",
        },
      ],
    },
  },
};

export default item;
