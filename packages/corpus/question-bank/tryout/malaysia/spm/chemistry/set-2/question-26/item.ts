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
            "$$1.20\\times10^{22}$$, $$0.600\\text{ mol dm}^{-3}$$, $$0.650\\text{ g}$$",
        },
        {
          correct: true,
          label:
            "$$1.20\\times10^{22}$$, $$0.300\\text{ mol dm}^{-3}$$, $$0.650\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$6.02\\times10^{21}$$, $$0.300\\text{ mol dm}^{-3}$$, $$0.650\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$1.20\\times10^{22}$$, $$0.300\\text{ mol dm}^{-3}$$, $$1.30\\text{ g}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$1.20\\times10^{22}$$, $$0.600\\text{ mol dm}^{-3}$$, $$0.650\\text{ g}$$",
        },
        {
          correct: true,
          label:
            "$$1.20\\times10^{22}$$, $$0.300\\text{ mol dm}^{-3}$$, $$0.650\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$6.02\\times10^{21}$$, $$0.300\\text{ mol dm}^{-3}$$, $$0.650\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$1.20\\times10^{22}$$, $$0.300\\text{ mol dm}^{-3}$$, $$1.30\\text{ g}$$",
        },
      ],
    },
  },
};

export default item;
