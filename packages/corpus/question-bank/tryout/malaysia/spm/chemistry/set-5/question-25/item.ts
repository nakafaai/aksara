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
            "$$0.400\\text{ mol dm}^{-3}$$, $$50.0\\text{ cm}^3$$, $$0.100\\text{ mol dm}^{-3}$$",
        },
        {
          correct: true,
          label:
            "$$0.300\\text{ mol dm}^{-3}$$, $$100\\text{ cm}^3$$, $$0.200\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label:
            "$$0.300\\text{ mol dm}^{-3}$$, $$200\\text{ cm}^3$$, $$0.200\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label:
            "$$0.300\\text{ mol dm}^{-3}$$, $$100\\text{ cm}^3$$, $$0.400\\text{ mol dm}^{-3}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$0.400\\text{ mol dm}^{-3}$$, $$50.0\\text{ cm}^3$$, $$0.100\\text{ mol dm}^{-3}$$",
        },
        {
          correct: true,
          label:
            "$$0.300\\text{ mol dm}^{-3}$$, $$100\\text{ cm}^3$$, $$0.200\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label:
            "$$0.300\\text{ mol dm}^{-3}$$, $$200\\text{ cm}^3$$, $$0.200\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label:
            "$$0.300\\text{ mol dm}^{-3}$$, $$100\\text{ cm}^3$$, $$0.400\\text{ mol dm}^{-3}$$",
        },
      ],
    },
  },
};

export default item;
