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
          label: "$$50.0\\text{ cm}^3$$, $$80.0\\%$$, $$1.84\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$100\\text{ cm}^3$$, $$40.0\\%$$, $$1.20\\text{ g}$$",
        },
        {
          correct: true,
          label: "$$50.0\\text{ cm}^3$$, $$80.0\\%$$, $$2.40\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$50.0\\text{ cm}^3$$, $$80.0\\%$$, $$0.240\\text{ g}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$50.0\\text{ cm}^3$$, $$80.0\\%$$, $$1.84\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$100\\text{ cm}^3$$, $$40.0\\%$$, $$1.20\\text{ g}$$",
        },
        {
          correct: true,
          label: "$$50.0\\text{ cm}^3$$, $$80.0\\%$$, $$2.40\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$50.0\\text{ cm}^3$$, $$80.0\\%$$, $$0.240\\text{ g}$$",
        },
      ],
    },
  },
};

export default item;
