import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "carbon-compounds",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Butan-1-ol, $$2.04\\text{ g}$$, $$1.92\\text{ dm}^3$$",
        },
        {
          correct: false,
          label: "Propan-1-ol, $$1.22\\text{ g}$$, $$1.44\\text{ dm}^3$$",
        },
        {
          correct: true,
          label: "Butan-1-ol, $$1.22\\text{ g}$$, $$1.92\\text{ dm}^3$$",
        },
        {
          correct: false,
          label: "Butan-1-ol, $$1.06\\text{ g}$$, $$1.92\\text{ dm}^3$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Butan-1-ol, $$2.04\\text{ g}$$, $$1.92\\text{ dm}^3$$",
        },
        {
          correct: false,
          label: "Propan-1-ol, $$1.22\\text{ g}$$, $$1.44\\text{ dm}^3$$",
        },
        {
          correct: true,
          label: "Butan-1-ol, $$1.22\\text{ g}$$, $$1.92\\text{ dm}^3$$",
        },
        {
          correct: false,
          label: "Butan-1-ol, $$1.06\\text{ g}$$, $$1.92\\text{ dm}^3$$",
        },
      ],
    },
  },
};

export default item;
