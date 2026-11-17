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
          label: "$$39\\text{ °C}$$, $$0.68\\text{ s}$$ and no change",
        },
        {
          correct: false,
          label: "$$20\\text{ °C}$$, $$0.70\\text{ s}$$ and no change",
        },
        {
          correct: true,
          label: "$$20\\text{ °C}$$, $$0.68\\text{ s}$$ and no change",
        },
        {
          correct: false,
          label:
            "$$20\\text{ °C}$$, $$0.68\\text{ s}$$ and $$6\\text{ m s}^{-1}$$ higher",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$39\\text{ °C}$$, $$0.68\\text{ s}$$ dan tiada perubahan",
        },
        {
          correct: false,
          label: "$$20\\text{ °C}$$, $$0.70\\text{ s}$$ dan tiada perubahan",
        },
        {
          correct: true,
          label: "$$20\\text{ °C}$$, $$0.68\\text{ s}$$ dan tiada perubahan",
        },
        {
          correct: false,
          label:
            "$$20\\text{ °C}$$, $$0.68\\text{ s}$$ dan $$6\\text{ m s}^{-1}$$ lebih tinggi",
        },
      ],
    },
  },
};

export default item;
