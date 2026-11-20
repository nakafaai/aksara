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
            "$$0.240\\text{ g}$$, $$2.41\\times10^{22}$$, $$50.0\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$0.650\\text{ g}$$, $$1.20\\times10^{22}$$, $$50.0\\text{ cm}^3$$",
        },
        {
          correct: true,
          label:
            "$$0.650\\text{ g}$$, $$2.41\\times10^{22}$$, $$50.0\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$0.650\\text{ g}$$, $$2.41\\times10^{22}$$, $$250\\text{ cm}^3$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$0.240\\text{ g}$$, $$2.41\\times10^{22}$$, $$50.0\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$0.650\\text{ g}$$, $$1.20\\times10^{22}$$, $$50.0\\text{ cm}^3$$",
        },
        {
          correct: true,
          label:
            "$$0.650\\text{ g}$$, $$2.41\\times10^{22}$$, $$50.0\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$0.650\\text{ g}$$, $$2.41\\times10^{22}$$, $$250\\text{ cm}^3$$",
        },
      ],
    },
  },
};

export default item;
