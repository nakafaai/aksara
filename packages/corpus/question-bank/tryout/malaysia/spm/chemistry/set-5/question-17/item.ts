import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "acids-bases-and-salts",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$0.0120\\text{ mol dm}^{-3}$$, $$0.0760\\text{ mol dm}^{-3}$$, $$288\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$0.0120\\text{ mol dm}^{-3}$$, $$0.0880\\text{ mol dm}^{-3}$$, $$288\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$0.00600\\text{ mol dm}^{-3}$$, $$0.0820\\text{ mol dm}^{-3}$$, $$144\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$0.0120\\text{ mol dm}^{-3}$$, $$0.0640\\text{ mol dm}^{-3}$$, $$288\\text{ cm}^3$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$0.0120\\text{ mol dm}^{-3}$$, $$0.0760\\text{ mol dm}^{-3}$$, $$288\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$0.0120\\text{ mol dm}^{-3}$$, $$0.0880\\text{ mol dm}^{-3}$$, $$288\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$0.00600\\text{ mol dm}^{-3}$$, $$0.0820\\text{ mol dm}^{-3}$$, $$144\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$0.0120\\text{ mol dm}^{-3}$$, $$0.0640\\text{ mol dm}^{-3}$$, $$288\\text{ cm}^3$$",
        },
      ],
    },
  },
};

export default item;
