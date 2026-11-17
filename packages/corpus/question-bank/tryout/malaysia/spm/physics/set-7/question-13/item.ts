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
            "$$39\\text{ °C}$$, $$0.68\\text{ s}$$, no change and $$50\\text{ m}$$",
        },
        {
          correct: false,
          label:
            "$$20\\text{ °C}$$, $$0.70\\text{ s}$$, no change and $$50\\text{ m}$$",
        },
        {
          correct: true,
          label:
            "$$20\\text{ °C}$$, $$0.68\\text{ s}$$, no change and $$51\\text{ m}$$",
        },
        {
          correct: false,
          label:
            "$$20\\text{ °C}$$, $$0.68\\text{ s}$$, $$6\\text{ m s}^{-1}$$ higher and $$51\\text{ m}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$39\\text{ °C}$$, $$0.68\\text{ s}$$, tiada perubahan dan $$50\\text{ m}$$",
        },
        {
          correct: false,
          label:
            "$$20\\text{ °C}$$, $$0.70\\text{ s}$$, tiada perubahan dan $$50\\text{ m}$$",
        },
        {
          correct: true,
          label:
            "$$20\\text{ °C}$$, $$0.68\\text{ s}$$, tiada perubahan dan $$51\\text{ m}$$",
        },
        {
          correct: false,
          label:
            "$$20\\text{ °C}$$, $$0.68\\text{ s}$$, $$6\\text{ m s}^{-1}$$ lebih tinggi dan $$51\\text{ m}$$",
        },
      ],
    },
  },
};

export default item;
