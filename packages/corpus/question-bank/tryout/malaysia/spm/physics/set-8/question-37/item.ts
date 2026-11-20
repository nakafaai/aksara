import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-5",
    topic: "electronics",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$160$$, $$0\\text{ mA}$$ and $$1.0\\text{ k}\\Omega$$",
        },
        {
          correct: false,
          label: "$$175$$, $$0\\text{ mA}$$ and $$1.1\\text{ k}\\Omega$$",
        },
        {
          correct: true,
          label: "$$150$$, $$0.50\\text{ mA}$$ and $$1.0\\text{ k}\\Omega$$",
        },
        {
          correct: false,
          label: "$$150$$, $$0.50\\text{ mA}$$ and $$1.1\\text{ k}\\Omega$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$160$$, $$0\\text{ mA}$$ dan $$1.0\\text{ k}\\Omega$$",
        },
        {
          correct: false,
          label: "$$175$$, $$0\\text{ mA}$$ dan $$1.1\\text{ k}\\Omega$$",
        },
        {
          correct: true,
          label: "$$150$$, $$0.50\\text{ mA}$$ dan $$1.0\\text{ k}\\Omega$$",
        },
        {
          correct: false,
          label: "$$150$$, $$0.50\\text{ mA}$$ dan $$1.1\\text{ k}\\Omega$$",
        },
      ],
    },
  },
};

export default item;
