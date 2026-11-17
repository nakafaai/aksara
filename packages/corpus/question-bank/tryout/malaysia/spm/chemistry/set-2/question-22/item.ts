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
          correct: true,
          label:
            "$$120\\text{ cm}^3$$, $$50.0\\text{ cm}^3$$, $$0.0500\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label:
            "$$240\\text{ cm}^3$$, $$50.0\\text{ cm}^3$$, $$0.0500\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label:
            "$$120\\text{ cm}^3$$, $$25.0\\text{ cm}^3$$, $$0.0500\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label:
            "$$120\\text{ cm}^3$$, $$75.0\\text{ cm}^3$$, $$0.100\\text{ mol dm}^{-3}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$120\\text{ cm}^3$$, $$50.0\\text{ cm}^3$$, $$0.0500\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label:
            "$$240\\text{ cm}^3$$, $$50.0\\text{ cm}^3$$, $$0.0500\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label:
            "$$120\\text{ cm}^3$$, $$25.0\\text{ cm}^3$$, $$0.0500\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label:
            "$$120\\text{ cm}^3$$, $$75.0\\text{ cm}^3$$, $$0.100\\text{ mol dm}^{-3}$$",
        },
      ],
    },
  },
};

export default item;
