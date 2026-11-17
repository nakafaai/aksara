import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-5",
    topic: "nuclear-physics",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$4.2 \\times 10^9\\text{ kg}$$, and $$6.7\\%$$",
        },
        {
          correct: false,
          label:
            "$$1.3 \\times 10^{18}\\text{ kg}$$, and more than its whole mass",
        },
        {
          correct: false,
          label:
            "$$4.2 \\times 10^9\\text{ kg}$$, and $$2.1 \\times 10^{-11}$$",
        },
        {
          correct: true,
          label: "$$4.2 \\times 10^9\\text{ kg}$$, and $$0.067\\%$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$4.2 \\times 10^9\\text{ kg}$$, dan $$6.7\\%$$",
        },
        {
          correct: false,
          label:
            "$$1.3 \\times 10^{18}\\text{ kg}$$, dan lebih daripada seluruh jisimnya",
        },
        {
          correct: false,
          label:
            "$$4.2 \\times 10^9\\text{ kg}$$, dan $$2.1 \\times 10^{-11}$$",
        },
        {
          correct: true,
          label: "$$4.2 \\times 10^9\\text{ kg}$$, dan $$0.067\\%$$",
        },
      ],
    },
  },
};

export default item;
