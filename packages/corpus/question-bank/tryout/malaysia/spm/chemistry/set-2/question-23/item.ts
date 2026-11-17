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
            "$$1.62\\text{ g}$$, $$9.03\\times10^{21}$$, $$125\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$3.24\\text{ g}$$, $$9.03\\times10^{21}$$, $$50.0\\text{ cm}^3$$",
        },
        {
          correct: true,
          label:
            "$$3.24\\text{ g}$$, $$1.81\\times10^{22}$$, $$50.0\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$3.24\\text{ g}$$, $$1.81\\times10^{22}$$, $$200\\text{ cm}^3$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$1.62\\text{ g}$$, $$9.03\\times10^{21}$$, $$125\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$3.24\\text{ g}$$, $$9.03\\times10^{21}$$, $$50.0\\text{ cm}^3$$",
        },
        {
          correct: true,
          label:
            "$$3.24\\text{ g}$$, $$1.81\\times10^{22}$$, $$50.0\\text{ cm}^3$$",
        },
        {
          correct: false,
          label:
            "$$3.24\\text{ g}$$, $$1.81\\times10^{22}$$, $$200\\text{ cm}^3$$",
        },
      ],
    },
  },
};

export default item;
