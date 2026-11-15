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
          label: "Ball A, $$0.27\\text{ s}$$ earlier",
        },
        {
          correct: false,
          label: "Ball B, $$1.27\\text{ s}$$ earlier",
        },
        {
          correct: false,
          label: "Both balls reach the sea at the same time",
        },
        {
          correct: true,
          label: "Ball B, $$0.27\\text{ s}$$ earlier",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Bola A, $$0.27\\text{ s}$$ lebih awal",
        },
        {
          correct: false,
          label: "Bola B, $$1.27\\text{ s}$$ lebih awal",
        },
        {
          correct: false,
          label: "Kedua-dua bola mencecah laut serentak",
        },
        {
          correct: true,
          label: "Bola B, $$0.27\\text{ s}$$ lebih awal",
        },
      ],
    },
  },
};

export default item;
