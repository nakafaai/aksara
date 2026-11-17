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
          label: "$$340\\text{ m s}^{-1}$$ and $$0.46\\text{ s}$$",
        },
        {
          correct: false,
          label: "$$170\\text{ m s}^{-1}$$ and $$0.48\\text{ s}$$",
        },
        {
          correct: true,
          label: "$$330\\text{ m s}^{-1}$$ and $$0.48\\text{ s}$$",
        },
        {
          correct: false,
          label: "$$330\\text{ m s}^{-1}$$ and $$0.24\\text{ s}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$340\\text{ m s}^{-1}$$ dan $$0.46\\text{ s}$$",
        },
        {
          correct: false,
          label: "$$170\\text{ m s}^{-1}$$ dan $$0.48\\text{ s}$$",
        },
        {
          correct: true,
          label: "$$330\\text{ m s}^{-1}$$ dan $$0.48\\text{ s}$$",
        },
        {
          correct: false,
          label: "$$330\\text{ m s}^{-1}$$ dan $$0.24\\text{ s}$$",
        },
      ],
    },
  },
};

export default item;
