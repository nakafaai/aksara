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
          label: "$$17\\text{ kJ mol}^{-1}$$, and $$19.6\\text{ kJ}$$",
        },
        {
          correct: false,
          label: "$$156\\text{ kJ mol}^{-1}$$, and $$9.8\\text{ kJ}$$",
        },
        {
          correct: true,
          label: "$$156\\text{ kJ mol}^{-1}$$, and $$19.6\\text{ kJ}$$",
        },
        {
          correct: false,
          label: "$$173\\text{ kJ mol}^{-1}$$, and $$19.6\\text{ kJ}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$17\\text{ kJ mol}^{-1}$$, dan $$19.6\\text{ kJ}$$",
        },
        {
          correct: false,
          label: "$$156\\text{ kJ mol}^{-1}$$, dan $$9.8\\text{ kJ}$$",
        },
        {
          correct: true,
          label: "$$156\\text{ kJ mol}^{-1}$$, dan $$19.6\\text{ kJ}$$",
        },
        {
          correct: false,
          label: "$$173\\text{ kJ mol}^{-1}$$, dan $$19.6\\text{ kJ}$$",
        },
      ],
    },
  },
};

export default item;
