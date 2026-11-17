import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-4",
    topic: "waves",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$45\\text{ m}$$, hitting the water at $$30\\text{ m s}^{-1}$$",
        },
        {
          correct: false,
          label:
            "$$41\\text{ m}$$, hitting the water at $$30\\text{ m s}^{-1}$$",
        },
        {
          correct: false,
          label:
            "$$41\\text{ m}$$, hitting the water at $$14\\text{ m s}^{-1}$$",
        },
        {
          correct: true,
          label:
            "$$41\\text{ m}$$, hitting the water at $$29\\text{ m s}^{-1}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$45\\text{ m}$$, menghentam air pada $$30\\text{ m s}^{-1}$$",
        },
        {
          correct: false,
          label:
            "$$41\\text{ m}$$, menghentam air pada $$30\\text{ m s}^{-1}$$",
        },
        {
          correct: false,
          label:
            "$$41\\text{ m}$$, menghentam air pada $$14\\text{ m s}^{-1}$$",
        },
        {
          correct: true,
          label:
            "$$41\\text{ m}$$, menghentam air pada $$29\\text{ m s}^{-1}$$",
        },
      ],
    },
  },
};

export default item;
