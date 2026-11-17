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
            "increases by $$1.92\\text{ g}$$, $$1.20\\times10^{22}$$ electrons, $$0.100\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label:
            "increases by $$2.16\\text{ g}$$, $$1.20\\times10^{22}$$ electrons, $$0.100\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label:
            "increases by $$1.92\\text{ g}$$, $$2.41\\times10^{22}$$ electrons, $$0.200\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label:
            "increases by $$1.92\\text{ g}$$, $$1.20\\times10^{22}$$ electrons, $$0.200\\text{ mol dm}^{-3}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "bertambah sebanyak $$1.92\\text{ g}$$, $$1.20\\times10^{22}$$ elektron, $$0.100\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label:
            "bertambah sebanyak $$2.16\\text{ g}$$, $$1.20\\times10^{22}$$ elektron, $$0.100\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label:
            "bertambah sebanyak $$1.92\\text{ g}$$, $$2.41\\times10^{22}$$ elektron, $$0.200\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label:
            "bertambah sebanyak $$1.92\\text{ g}$$, $$1.20\\times10^{22}$$ elektron, $$0.200\\text{ mol dm}^{-3}$$",
        },
      ],
    },
  },
};

export default item;
