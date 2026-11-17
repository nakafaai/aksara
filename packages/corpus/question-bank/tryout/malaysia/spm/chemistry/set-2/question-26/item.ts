import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "redox-equilibrium",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$1.20\\times10^{22}$$, $$0.400\\text{ mol dm}^{-3}$$, $$80.0\\text{ cm}^3$$",
        },
        {
          correct: true,
          label:
            "$$1.20\\times10^{22}$$, $$0.600\\text{ mol dm}^{-3}$$, $$80.0\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$6.02\\times10^{21}$$, $$0.600\\text{ mol dm}^{-3}$$, $$80.0\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$1.20\\times10^{22}$$, $$0.600\\text{ mol dm}^{-3}$$, $$40.0\\text{ cm}^3$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$1.20\\times10^{22}$$, $$0.400\\text{ mol dm}^{-3}$$, $$80.0\\text{ cm}^3$$",
        },
        {
          correct: true,
          label:
            "$$1.20\\times10^{22}$$, $$0.600\\text{ mol dm}^{-3}$$, $$80.0\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$6.02\\times10^{21}$$, $$0.600\\text{ mol dm}^{-3}$$, $$80.0\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$1.20\\times10^{22}$$, $$0.600\\text{ mol dm}^{-3}$$, $$40.0\\text{ cm}^3$$",
        },
      ],
    },
  },
};

export default item;
