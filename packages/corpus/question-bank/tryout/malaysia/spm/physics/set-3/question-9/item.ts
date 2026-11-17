import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "gravitation",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$6.0 \\times 10^{24}\\text{ kg}$$, and $$5.5 \\times 10^{3}\\text{ kg m}^{-3}$$",
        },
        {
          correct: false,
          label:
            "$$4.5 \\times 10^{34}\\text{ kg}$$, and $$4.1 \\times 10^{13}\\text{ kg m}^{-3}$$",
        },
        {
          correct: false,
          label:
            "$$9.6 \\times 10^{23}\\text{ kg}$$, and $$8.7 \\times 10^{2}\\text{ kg m}^{-3}$$",
        },
        {
          correct: false,
          label:
            "$$6.0 \\times 10^{24}\\text{ kg}$$, and $$7.3 \\times 10^{3}\\text{ kg m}^{-3}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$6.0 \\times 10^{24}\\text{ kg}$$, and $$5.5 \\times 10^{3}\\text{ kg m}^{-3}$$",
        },
        {
          correct: false,
          label:
            "$$4.5 \\times 10^{34}\\text{ kg}$$, and $$4.1 \\times 10^{13}\\text{ kg m}^{-3}$$",
        },
        {
          correct: false,
          label:
            "$$9.6 \\times 10^{23}\\text{ kg}$$, and $$8.7 \\times 10^{2}\\text{ kg m}^{-3}$$",
        },
        {
          correct: false,
          label:
            "$$6.0 \\times 10^{24}\\text{ kg}$$, and $$7.3 \\times 10^{3}\\text{ kg m}^{-3}$$",
        },
      ],
    },
  },
};

export default item;
