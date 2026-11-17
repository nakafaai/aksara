import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "force-and-motion-1",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$0.49\\text{ m s}^{-1}$$, then $$0.73\\text{ m s}^{-1}$$",
        },
        {
          correct: false,
          label:
            "$$0.49\\text{ m s}^{-1}$$, then still $$0.49\\text{ m s}^{-1}$$",
        },
        {
          correct: false,
          label: "$$0.25\\text{ m s}^{-1}$$, then $$0.49\\text{ m s}^{-1}$$",
        },
        {
          correct: true,
          label: "$$0.49\\text{ m s}^{-1}$$, then $$0.98\\text{ m s}^{-1}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$0.49\\text{ m s}^{-1}$$, kemudian $$0.73\\text{ m s}^{-1}$$",
        },
        {
          correct: false,
          label:
            "$$0.49\\text{ m s}^{-1}$$, kemudian masih $$0.49\\text{ m s}^{-1}$$",
        },
        {
          correct: false,
          label:
            "$$0.25\\text{ m s}^{-1}$$, kemudian $$0.49\\text{ m s}^{-1}$$",
        },
        {
          correct: true,
          label:
            "$$0.49\\text{ m s}^{-1}$$, kemudian $$0.98\\text{ m s}^{-1}$$",
        },
      ],
    },
  },
};

export default item;
