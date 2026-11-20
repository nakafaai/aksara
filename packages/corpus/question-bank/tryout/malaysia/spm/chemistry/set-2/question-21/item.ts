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
            "$$1.29\\text{ g}$$, $$480\\text{ cm}^3$$, $$0.640\\text{ g}$$",
        },
        {
          correct: true,
          label:
            "$$1.29\\text{ g}$$, $$240\\text{ cm}^3$$, $$0.640\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$1.28\\text{ g}$$, $$0\\text{ cm}^3$$, $$1.28\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$0.640\\text{ g}$$, $$240\\text{ cm}^3$$, $$0\\text{ g}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$1.29\\text{ g}$$, $$480\\text{ cm}^3$$, $$0.640\\text{ g}$$",
        },
        {
          correct: true,
          label:
            "$$1.29\\text{ g}$$, $$240\\text{ cm}^3$$, $$0.640\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$1.28\\text{ g}$$, $$0\\text{ cm}^3$$, $$1.28\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$0.640\\text{ g}$$, $$240\\text{ cm}^3$$, $$0\\text{ g}$$",
        },
      ],
    },
  },
};

export default item;
