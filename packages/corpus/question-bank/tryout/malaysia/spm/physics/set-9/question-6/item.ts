import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-4",
    topic: "force-and-motion-1",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$20\\text{ m}$$, and $$1.0\\text{ s}$$ earlier",
        },
        { correct: false, label: "$$45\\text{ m}$$, and they land together" },
        {
          correct: true,
          label: "$$20\\text{ m}$$, and $$0.15\\text{ s}$$ earlier",
        },
        {
          correct: false,
          label: "$$5.0\\text{ m}$$, and $$0.15\\text{ s}$$ earlier",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$20\\text{ m}$$, dan $$1.0\\text{ s}$$ lebih awal",
        },
        {
          correct: false,
          label: "$$45\\text{ m}$$, dan kedua-duanya sampai serentak",
        },
        {
          correct: true,
          label: "$$20\\text{ m}$$, dan $$0.15\\text{ s}$$ lebih awal",
        },
        {
          correct: false,
          label: "$$5.0\\text{ m}$$, dan $$0.15\\text{ s}$$ lebih awal",
        },
      ],
    },
  },
};

export default item;
