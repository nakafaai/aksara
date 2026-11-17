import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-5",
    topic: "electricity",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$20\\text{ m s}^{-1}$$, and $$14\\text{ m s}^{-1}$$",
        },
        {
          correct: false,
          label: "$$17\\text{ m s}^{-1}$$, and $$16\\text{ m s}^{-1}$$",
        },
        {
          correct: true,
          label: "$$17\\text{ m s}^{-1}$$, and $$12\\text{ m s}^{-1}$$",
        },
        {
          correct: false,
          label: "$$17\\text{ m s}^{-1}$$, and $$0.83\\text{ m s}^{-1}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$20\\text{ m s}^{-1}$$, dan $$14\\text{ m s}^{-1}$$",
        },
        {
          correct: false,
          label: "$$17\\text{ m s}^{-1}$$, dan $$16\\text{ m s}^{-1}$$",
        },
        {
          correct: true,
          label: "$$17\\text{ m s}^{-1}$$, dan $$12\\text{ m s}^{-1}$$",
        },
        {
          correct: false,
          label: "$$17\\text{ m s}^{-1}$$, dan $$0.83\\text{ m s}^{-1}$$",
        },
      ],
    },
  },
};

export default item;
