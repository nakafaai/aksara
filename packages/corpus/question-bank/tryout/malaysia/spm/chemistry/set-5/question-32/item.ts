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
          correct: true,
          label: "$$0.850\\text{ g}$$, $$1.0$$, $$240\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$0.850\\text{ g}$$, $$0.70$$, $$240\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$0.850\\text{ g}$$, $$1.0$$, $$480\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$1.70\\text{ g}$$, $$1.0$$, $$240\\text{ cm}^3$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$0.850\\text{ g}$$, $$1.0$$, $$240\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$0.850\\text{ g}$$, $$0.70$$, $$240\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$0.850\\text{ g}$$, $$1.0$$, $$480\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$1.70\\text{ g}$$, $$1.0$$, $$240\\text{ cm}^3$$",
        },
      ],
    },
  },
};

export default item;
