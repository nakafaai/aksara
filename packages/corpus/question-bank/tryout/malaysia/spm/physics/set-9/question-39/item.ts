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
          label:
            "$$4.2 \\times 10^9\\text{ kg}$$, and $$2.9 \\times 10^7\\text{ kg}$$",
        },
        {
          correct: false,
          label:
            "$$1.3 \\times 10^{18}\\text{ kg}$$, and $$1.8 \\times 10^{20}\\text{ kg}$$",
        },
        {
          correct: false,
          label:
            "$$4.2 \\times 10^9\\text{ kg}$$, and $$4.2 \\times 10^9\\text{ kg}$$",
        },
        {
          correct: true,
          label:
            "$$4.2 \\times 10^9\\text{ kg}$$, and $$6.0 \\times 10^{11}\\text{ kg}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$4.2 \\times 10^9\\text{ kg}$$, dan $$2.9 \\times 10^7\\text{ kg}$$",
        },
        {
          correct: false,
          label:
            "$$1.3 \\times 10^{18}\\text{ kg}$$, dan $$1.8 \\times 10^{20}\\text{ kg}$$",
        },
        {
          correct: false,
          label:
            "$$4.2 \\times 10^9\\text{ kg}$$, dan $$4.2 \\times 10^9\\text{ kg}$$",
        },
        {
          correct: true,
          label:
            "$$4.2 \\times 10^9\\text{ kg}$$, dan $$6.0 \\times 10^{11}\\text{ kg}$$",
        },
      ],
    },
  },
};

export default item;
