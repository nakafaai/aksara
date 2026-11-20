import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "light-and-optics",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$0.37\\text{ m}$$, $$15°$$, $$0.0208\\text{ s}$$ and $$61\\text{ m s}^{-1}$$",
        },
        {
          correct: true,
          label:
            "$$0.79\\text{ m}$$, $$7.5°$$, $$0.0104\\text{ s}$$ and $$122\\text{ m s}^{-1}$$",
        },
        {
          correct: false,
          label:
            "$$0.52\\text{ m}$$, $$7.5°$$, $$0.0104\\text{ s}$$ and $$122\\text{ m s}^{-1}$$",
        },
        {
          correct: false,
          label:
            "$$0.79\\text{ m}$$, $$7.5°$$, $$0.0104\\text{ s}$$ and $$75\\text{ m s}^{-1}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$0.37\\text{ m}$$, $$15°$$, $$0.0208\\text{ s}$$ dan $$61\\text{ m s}^{-1}$$",
        },
        {
          correct: true,
          label:
            "$$0.79\\text{ m}$$, $$7.5°$$, $$0.0104\\text{ s}$$ dan $$122\\text{ m s}^{-1}$$",
        },
        {
          correct: false,
          label:
            "$$0.52\\text{ m}$$, $$7.5°$$, $$0.0104\\text{ s}$$ dan $$122\\text{ m s}^{-1}$$",
        },
        {
          correct: false,
          label:
            "$$0.79\\text{ m}$$, $$7.5°$$, $$0.0104\\text{ s}$$ dan $$75\\text{ m s}^{-1}$$",
        },
      ],
    },
  },
};

export default item;
