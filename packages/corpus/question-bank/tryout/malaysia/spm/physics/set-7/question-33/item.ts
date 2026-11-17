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
          label: "$$0.010\\text{ N}$$ and $$1.0\\text{ m s}^{-2}$$",
        },
        {
          correct: false,
          label: "$$1.0\\text{ N}$$ and $$100\\text{ m s}^{-2}$$",
        },
        {
          correct: false,
          label: "$$0.50\\text{ N}$$ and $$0.050\\text{ m s}^{-2}$$",
        },
        {
          correct: true,
          label: "$$0.50\\text{ N}$$ and $$50\\text{ m s}^{-2}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$0.010\\text{ N}$$ dan $$1.0\\text{ m s}^{-2}$$",
        },
        {
          correct: false,
          label: "$$1.0\\text{ N}$$ dan $$100\\text{ m s}^{-2}$$",
        },
        {
          correct: false,
          label: "$$0.50\\text{ N}$$ dan $$0.050\\text{ m s}^{-2}$$",
        },
        {
          correct: true,
          label: "$$0.50\\text{ N}$$ dan $$50\\text{ m s}^{-2}$$",
        },
      ],
    },
  },
};

export default item;
