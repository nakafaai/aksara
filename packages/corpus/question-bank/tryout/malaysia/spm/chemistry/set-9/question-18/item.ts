import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-4",
    topic: "rate-of-reaction",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$0.400\\text{ mol dm}^{-3}$$, $$3.0\\text{ cm}^3\\text{ s}^{-1}$$, $$240\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$4.00\\text{ mol dm}^{-3}$$, $$6.0\\text{ cm}^3\\text{ s}^{-1}$$, $$2400\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$4.00\\text{ mol dm}^{-3}$$, $$3.0\\text{ cm}^3\\text{ s}^{-1}$$, $$240\\text{ cm}^3$$",
        },
        {
          correct: true,
          label:
            "$$4.00\\text{ mol dm}^{-3}$$, $$3.0\\text{ cm}^3\\text{ s}^{-1}$$, $$2400\\text{ cm}^3$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$0.400\\text{ mol dm}^{-3}$$, $$3.0\\text{ cm}^3\\text{ s}^{-1}$$, $$240\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$4.00\\text{ mol dm}^{-3}$$, $$6.0\\text{ cm}^3\\text{ s}^{-1}$$, $$2400\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$4.00\\text{ mol dm}^{-3}$$, $$3.0\\text{ cm}^3\\text{ s}^{-1}$$, $$240\\text{ cm}^3$$",
        },
        {
          correct: true,
          label:
            "$$4.00\\text{ mol dm}^{-3}$$, $$3.0\\text{ cm}^3\\text{ s}^{-1}$$, $$2400\\text{ cm}^3$$",
        },
      ],
    },
  },
};

export default item;
