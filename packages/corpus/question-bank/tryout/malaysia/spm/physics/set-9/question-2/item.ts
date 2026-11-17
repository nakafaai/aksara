import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-4",
    topic: "measurement",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$34.7\\text{ K}$$, and $$4.3 \\times 10^3\\text{ J kg}^{-1}\\text{ K}^{-1}$$",
        },
        {
          correct: false,
          label:
            "$$33.0\\text{ K}$$, and $$4.5 \\times 10^3\\text{ J kg}^{-1}\\text{ K}^{-1}$$",
        },
        {
          correct: false,
          label:
            "$$31.4\\text{ K}$$, and $$4.8 \\times 10^3\\text{ J kg}^{-1}\\text{ K}^{-1}$$",
        },
        {
          correct: false,
          label:
            "$$30.0\\text{ K}$$, and $$5.0 \\times 10^3\\text{ J kg}^{-1}\\text{ K}^{-1}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$34.7\\text{ K}$$, dan $$4.3 \\times 10^3\\text{ J kg}^{-1}\\text{ K}^{-1}$$",
        },
        {
          correct: false,
          label:
            "$$33.0\\text{ K}$$, dan $$4.5 \\times 10^3\\text{ J kg}^{-1}\\text{ K}^{-1}$$",
        },
        {
          correct: false,
          label:
            "$$31.4\\text{ K}$$, dan $$4.8 \\times 10^3\\text{ J kg}^{-1}\\text{ K}^{-1}$$",
        },
        {
          correct: false,
          label:
            "$$30.0\\text{ K}$$, dan $$5.0 \\times 10^3\\text{ J kg}^{-1}\\text{ K}^{-1}$$",
        },
      ],
    },
  },
};

export default item;
