import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "chemical-bonds",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$1.61\\text{ g}$$, $$1.81\\times10^{22}$$, $$0\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$1.07\\text{ g}$$, $$1.20\\times10^{22}$$, $$300\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$1.07\\text{ g}$$, $$4.82\\times10^{22}$$, $$100\\text{ cm}^3$$",
        },
        {
          correct: true,
          label:
            "$$1.07\\text{ g}$$, $$1.20\\times10^{22}$$, $$100\\text{ cm}^3$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$1.61\\text{ g}$$, $$1.81\\times10^{22}$$, $$0\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$1.07\\text{ g}$$, $$1.20\\times10^{22}$$, $$300\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$1.07\\text{ g}$$, $$4.82\\times10^{22}$$, $$100\\text{ cm}^3$$",
        },
        {
          correct: true,
          label:
            "$$1.07\\text{ g}$$, $$1.20\\times10^{22}$$, $$100\\text{ cm}^3$$",
        },
      ],
    },
  },
};

export default item;
