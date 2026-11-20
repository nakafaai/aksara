import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-5",
    topic: "electromagnetism",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$10\\text{ N}$$, $$39\\text{ m s}^{-1}$$ and $$0.077\\text{ s}$$",
        },
        {
          correct: true,
          label:
            "$$10\\text{ N}$$, $$35\\text{ m s}^{-1}$$ and $$0.087\\text{ s}$$",
        },
        {
          correct: false,
          label:
            "$$150\\text{ N}$$, $$150\\text{ m s}^{-1}$$ and $$0.020\\text{ s}$$",
        },
        {
          correct: false,
          label:
            "$$10\\text{ N}$$, $$1.1\\text{ m s}^{-1}$$ and $$2.7\\text{ s}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$10\\text{ N}$$, $$39\\text{ m s}^{-1}$$ dan $$0.077\\text{ s}$$",
        },
        {
          correct: true,
          label:
            "$$10\\text{ N}$$, $$35\\text{ m s}^{-1}$$ dan $$0.087\\text{ s}$$",
        },
        {
          correct: false,
          label:
            "$$150\\text{ N}$$, $$150\\text{ m s}^{-1}$$ dan $$0.020\\text{ s}$$",
        },
        {
          correct: false,
          label:
            "$$10\\text{ N}$$, $$1.1\\text{ m s}^{-1}$$ dan $$2.7\\text{ s}$$",
        },
      ],
    },
  },
};

export default item;
