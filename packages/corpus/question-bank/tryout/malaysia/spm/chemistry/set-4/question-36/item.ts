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
          correct: true,
          label:
            "Iron $$-147\\text{ kJ mol}^{-1}$$, magnesium $$-525\\text{ kJ mol}^{-1}$$",
        },
        {
          correct: false,
          label:
            "Iron $$-147\\text{ kJ mol}^{-1}$$, magnesium $$-263\\text{ kJ mol}^{-1}$$",
        },
        {
          correct: false,
          label:
            "Iron $$-73.5\\text{ kJ mol}^{-1}$$, magnesium $$-263\\text{ kJ mol}^{-1}$$",
        },
        {
          correct: false,
          label:
            "Iron $$+147\\text{ kJ mol}^{-1}$$, magnesium $$+525\\text{ kJ mol}^{-1}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Ferum $$-147\\text{ kJ mol}^{-1}$$, magnesium $$-525\\text{ kJ mol}^{-1}$$",
        },
        {
          correct: false,
          label:
            "Ferum $$-147\\text{ kJ mol}^{-1}$$, magnesium $$-263\\text{ kJ mol}^{-1}$$",
        },
        {
          correct: false,
          label:
            "Ferum $$-73.5\\text{ kJ mol}^{-1}$$, magnesium $$-263\\text{ kJ mol}^{-1}$$",
        },
        {
          correct: false,
          label:
            "Ferum $$+147\\text{ kJ mol}^{-1}$$, magnesium $$+525\\text{ kJ mol}^{-1}$$",
        },
      ],
    },
  },
};

export default item;
