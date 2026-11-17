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
          label: "$$14\\text{ m s}^{-1}$$, and $$33\\text{ m s}^{-1}$$",
        },
        {
          correct: false,
          label: "$$16\\text{ m s}^{-1}$$, and $$18\\text{ m s}^{-1}$$",
        },
        {
          correct: true,
          label: "$$12\\text{ m s}^{-1}$$, and $$28\\text{ m s}^{-1}$$",
        },
        {
          correct: false,
          label: "$$12\\text{ m s}^{-1}$$, and $$17\\text{ m s}^{-1}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$14\\text{ m s}^{-1}$$, dan $$33\\text{ m s}^{-1}$$",
        },
        {
          correct: false,
          label: "$$16\\text{ m s}^{-1}$$, dan $$18\\text{ m s}^{-1}$$",
        },
        {
          correct: true,
          label: "$$12\\text{ m s}^{-1}$$, dan $$28\\text{ m s}^{-1}$$",
        },
        {
          correct: false,
          label: "$$12\\text{ m s}^{-1}$$, dan $$17\\text{ m s}^{-1}$$",
        },
      ],
    },
  },
};

export default item;
