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
          correct: true,
          label:
            "$$0.60\\text{ m s}^{-2}$$, $$14.7\\text{ cm}$$ and $$60\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$0.60\\text{ m s}^{-2}$$, $$18.9\\text{ cm}$$ and $$60\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$2.4\\text{ m s}^{-2}$$, $$14.7\\text{ cm}$$ and $$0.30\\text{ kg}$$",
        },
        {
          correct: false,
          label:
            "$$0.60\\text{ m s}^{-2}$$, $$14.7\\text{ cm}$$ and $$56\\text{ g}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$0.60\\text{ m s}^{-2}$$, $$14.7\\text{ cm}$$ dan $$60\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$0.60\\text{ m s}^{-2}$$, $$18.9\\text{ cm}$$ dan $$60\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$2.4\\text{ m s}^{-2}$$, $$14.7\\text{ cm}$$ dan $$0.30\\text{ kg}$$",
        },
        {
          correct: false,
          label:
            "$$0.60\\text{ m s}^{-2}$$, $$14.7\\text{ cm}$$ dan $$56\\text{ g}$$",
        },
      ],
    },
  },
};

export default item;
