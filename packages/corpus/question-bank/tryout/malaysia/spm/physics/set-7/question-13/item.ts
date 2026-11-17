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
            "$$340\\text{ m s}^{-1}$$, $$0.46\\text{ s}$$ and $$17\\text{ m}$$",
        },
        {
          correct: false,
          label:
            "$$170\\text{ m s}^{-1}$$, $$0.48\\text{ s}$$ and $$8.5\\text{ m}$$",
        },
        {
          correct: true,
          label:
            "$$330\\text{ m s}^{-1}$$, $$0.48\\text{ s}$$ and $$17\\text{ m}$$",
        },
        {
          correct: false,
          label:
            "$$330\\text{ m s}^{-1}$$, $$0.24\\text{ s}$$ and $$33\\text{ m}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$340\\text{ m s}^{-1}$$, $$0.46\\text{ s}$$ dan $$17\\text{ m}$$",
        },
        {
          correct: false,
          label:
            "$$170\\text{ m s}^{-1}$$, $$0.48\\text{ s}$$ dan $$8.5\\text{ m}$$",
        },
        {
          correct: true,
          label:
            "$$330\\text{ m s}^{-1}$$, $$0.48\\text{ s}$$ dan $$17\\text{ m}$$",
        },
        {
          correct: false,
          label:
            "$$330\\text{ m s}^{-1}$$, $$0.24\\text{ s}$$ dan $$33\\text{ m}$$",
        },
      ],
    },
  },
};

export default item;
