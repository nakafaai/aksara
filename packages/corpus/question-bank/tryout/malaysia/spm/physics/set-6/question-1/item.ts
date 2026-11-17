import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "measurement",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Within $$0.1\\text{ m s}^{-2}$$, and still within $$0.1\\text{ m s}^{-2}$$",
        },
        {
          correct: true,
          label:
            "Within $$0.1\\text{ m s}^{-2}$$, but within $$0.5\\text{ m s}^{-2}$$",
        },
        {
          correct: false,
          label:
            "Within $$0.05\\text{ m s}^{-2}$$, but within $$0.25\\text{ m s}^{-2}$$",
        },
        {
          correct: false,
          label:
            "Within $$0.5\\text{ m s}^{-2}$$, but within $$0.1\\text{ m s}^{-2}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Dalam lingkungan $$0.1\\text{ m s}^{-2}$$, dan masih $$0.1\\text{ m s}^{-2}$$",
        },
        {
          correct: true,
          label:
            "Dalam lingkungan $$0.1\\text{ m s}^{-2}$$, tetapi $$0.5\\text{ m s}^{-2}$$",
        },
        {
          correct: false,
          label:
            "Dalam lingkungan $$0.05\\text{ m s}^{-2}$$, tetapi $$0.25\\text{ m s}^{-2}$$",
        },
        {
          correct: false,
          label:
            "Dalam lingkungan $$0.5\\text{ m s}^{-2}$$, tetapi $$0.1\\text{ m s}^{-2}$$",
        },
      ],
    },
  },
};

export default item;
