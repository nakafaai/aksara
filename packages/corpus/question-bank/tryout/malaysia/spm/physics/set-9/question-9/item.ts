import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-4",
    topic: "gravitation",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$1.1 \\times 10^{23}\\text{ kg}$$, and $$0.81\\text{ N kg}^{-1}$$",
        },
        {
          correct: false,
          label:
            "$$4.4 \\times 10^{23}\\text{ kg}$$, and $$4.7\\text{ N kg}^{-1}$$",
        },
        {
          correct: false,
          label:
            "$$4.4 \\times 10^{23}\\text{ kg}$$, and $$3.9\\text{ N kg}^{-1}$$",
        },
        {
          correct: true,
          label:
            "$$4.4 \\times 10^{23}\\text{ kg}$$, and $$3.2\\text{ N kg}^{-1}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$1.1 \\times 10^{23}\\text{ kg}$$, dan $$0.81\\text{ N kg}^{-1}$$",
        },
        {
          correct: false,
          label:
            "$$4.4 \\times 10^{23}\\text{ kg}$$, dan $$4.7\\text{ N kg}^{-1}$$",
        },
        {
          correct: false,
          label:
            "$$4.4 \\times 10^{23}\\text{ kg}$$, dan $$3.9\\text{ N kg}^{-1}$$",
        },
        {
          correct: true,
          label:
            "$$4.4 \\times 10^{23}\\text{ kg}$$, dan $$3.2\\text{ N kg}^{-1}$$",
        },
      ],
    },
  },
};

export default item;
