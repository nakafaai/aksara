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
            "$$1.29\\text{ g}$$, $$0.150\\text{ mol dm}^{-3}$$, $$1.81\\times10^{22}$$",
        },
        {
          correct: false,
          label:
            "$$1.28\\text{ g}$$, $$0.200\\text{ mol dm}^{-3}$$, $$2.41\\times10^{22}$$",
        },
        {
          correct: false,
          label:
            "$$0.960\\text{ g}$$, $$0.150\\text{ mol dm}^{-3}$$, $$1.81\\times10^{22}$$",
        },
        {
          correct: false,
          label:
            "$$1.29\\text{ g}$$, $$0.150\\text{ mol dm}^{-3}$$, $$9.03\\times10^{21}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$1.29\\text{ g}$$, $$0.150\\text{ mol dm}^{-3}$$, $$1.81\\times10^{22}$$",
        },
        {
          correct: false,
          label:
            "$$1.28\\text{ g}$$, $$0.200\\text{ mol dm}^{-3}$$, $$2.41\\times10^{22}$$",
        },
        {
          correct: false,
          label:
            "$$0.960\\text{ g}$$, $$0.150\\text{ mol dm}^{-3}$$, $$1.81\\times10^{22}$$",
        },
        {
          correct: false,
          label:
            "$$1.29\\text{ g}$$, $$0.150\\text{ mol dm}^{-3}$$, $$9.03\\times10^{21}$$",
        },
      ],
    },
  },
};

export default item;
