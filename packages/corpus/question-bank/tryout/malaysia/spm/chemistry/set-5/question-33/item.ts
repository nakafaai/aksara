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
            "$$+184\\text{ kJ mol}^{-1}$$, and $$18.4\\text{ kJ}$$ is absorbed",
        },
        {
          correct: false,
          label:
            "$$-92\\text{ kJ mol}^{-1}$$, and $$9.2\\text{ kJ}$$ is released",
        },
        {
          correct: false,
          label:
            "$$-184\\text{ kJ mol}^{-1}$$, and $$18.4\\text{ kJ}$$ is released",
        },
        {
          correct: true,
          label:
            "$$-92\\text{ kJ mol}^{-1}$$, and $$18.4\\text{ kJ}$$ is released",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$+184\\text{ kJ mol}^{-1}$$, dan $$18.4\\text{ kJ}$$ diserap",
        },
        {
          correct: false,
          label:
            "$$-92\\text{ kJ mol}^{-1}$$, dan $$9.2\\text{ kJ}$$ dibebaskan",
        },
        {
          correct: false,
          label:
            "$$-184\\text{ kJ mol}^{-1}$$, dan $$18.4\\text{ kJ}$$ dibebaskan",
        },
        {
          correct: true,
          label:
            "$$-92\\text{ kJ mol}^{-1}$$, dan $$18.4\\text{ kJ}$$ dibebaskan",
        },
      ],
    },
  },
};

export default item;
