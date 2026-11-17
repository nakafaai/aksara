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
            "$$354\\text{ m s}^{-1}$$, $$39\\text{ °C}$$ and $$0.68\\text{ s}$$",
        },
        {
          correct: false,
          label:
            "$$343\\text{ m s}^{-1}$$, $$20\\text{ °C}$$ and $$0.34\\text{ s}$$",
        },
        {
          correct: true,
          label:
            "$$343\\text{ m s}^{-1}$$, $$20\\text{ °C}$$ and $$0.68\\text{ s}$$",
        },
        {
          correct: false,
          label:
            "$$343\\text{ m s}^{-1}$$, $$20\\text{ °C}$$ and $$0.70\\text{ s}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$354\\text{ m s}^{-1}$$, $$39\\text{ °C}$$ dan $$0.68\\text{ s}$$",
        },
        {
          correct: false,
          label:
            "$$343\\text{ m s}^{-1}$$, $$20\\text{ °C}$$ dan $$0.34\\text{ s}$$",
        },
        {
          correct: true,
          label:
            "$$343\\text{ m s}^{-1}$$, $$20\\text{ °C}$$ dan $$0.68\\text{ s}$$",
        },
        {
          correct: false,
          label:
            "$$343\\text{ m s}^{-1}$$, $$20\\text{ °C}$$ dan $$0.70\\text{ s}$$",
        },
      ],
    },
  },
};

export default item;
