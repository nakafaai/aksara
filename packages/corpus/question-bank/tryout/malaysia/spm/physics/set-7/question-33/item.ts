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
            "$$0.010\\text{ N}$$, $$1.0\\text{ m s}^{-2}$$ and $$0.0020\\text{ mm}$$",
        },
        {
          correct: false,
          label:
            "$$1.0\\text{ N}$$, $$100\\text{ m s}^{-2}$$ and $$0.20\\text{ mm}$$",
        },
        {
          correct: false,
          label:
            "$$0.50\\text{ N}$$, $$0.050\\text{ m s}^{-2}$$ and $$1.0\\times10^{-4}\\text{ mm}$$",
        },
        {
          correct: true,
          label:
            "$$0.50\\text{ N}$$, $$50\\text{ m s}^{-2}$$ and $$0.10\\text{ mm}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$0.010\\text{ N}$$, $$1.0\\text{ m s}^{-2}$$ dan $$0.0020\\text{ mm}$$",
        },
        {
          correct: false,
          label:
            "$$1.0\\text{ N}$$, $$100\\text{ m s}^{-2}$$ dan $$0.20\\text{ mm}$$",
        },
        {
          correct: false,
          label:
            "$$0.50\\text{ N}$$, $$0.050\\text{ m s}^{-2}$$ dan $$1.0\\times10^{-4}\\text{ mm}$$",
        },
        {
          correct: true,
          label:
            "$$0.50\\text{ N}$$, $$50\\text{ m s}^{-2}$$ dan $$0.10\\text{ mm}$$",
        },
      ],
    },
  },
};

export default item;
