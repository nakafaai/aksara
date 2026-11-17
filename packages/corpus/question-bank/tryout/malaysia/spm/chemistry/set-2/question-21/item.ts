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
            "$$1.29\\text{ g}$$, $$480\\text{ cm}^3$$, $$10.0\\text{ cm}^3$$",
        },
        {
          correct: true,
          label:
            "$$1.29\\text{ g}$$, $$240\\text{ cm}^3$$, $$30.0\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$1.28\\text{ g}$$, $$0\\text{ cm}^3$$, $$50.0\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$0.640\\text{ g}$$, $$240\\text{ cm}^3$$, $$30.0\\text{ cm}^3$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$1.29\\text{ g}$$, $$480\\text{ cm}^3$$, $$10.0\\text{ cm}^3$$",
        },
        {
          correct: true,
          label:
            "$$1.29\\text{ g}$$, $$240\\text{ cm}^3$$, $$30.0\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$1.28\\text{ g}$$, $$0\\text{ cm}^3$$, $$50.0\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$0.640\\text{ g}$$, $$240\\text{ cm}^3$$, $$30.0\\text{ cm}^3$$",
        },
      ],
    },
  },
};

export default item;
