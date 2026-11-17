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
          label: "$$2.9 \\times 10^7\\text{ kg}$$, and $$0.00066\\%$$",
        },
        {
          correct: false,
          label: "$$4.2 \\times 10^9\\text{ kg}$$, and $$0.095\\%$$",
        },
        {
          correct: false,
          label: "$$6.0 \\times 10^{11}\\text{ kg}$$, and $$9.5\\%$$",
        },
        {
          correct: true,
          label: "$$6.0 \\times 10^{11}\\text{ kg}$$, and $$14\\%$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$2.9 \\times 10^7\\text{ kg}$$, dan $$0.00066\\%$$",
        },
        {
          correct: false,
          label: "$$4.2 \\times 10^9\\text{ kg}$$, dan $$0.095\\%$$",
        },
        {
          correct: false,
          label: "$$6.0 \\times 10^{11}\\text{ kg}$$, dan $$9.5\\%$$",
        },
        {
          correct: true,
          label: "$$6.0 \\times 10^{11}\\text{ kg}$$, dan $$14\\%$$",
        },
      ],
    },
  },
};

export default item;
