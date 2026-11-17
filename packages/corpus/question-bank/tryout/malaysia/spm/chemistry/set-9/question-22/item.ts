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
            "decreases by $$0.020\\text{ g}$$, $$2.41\\times10^{22}$$ electrons",
        },
        {
          correct: false,
          label:
            "increases by $$1.28\\text{ g}$$, $$2.41\\times10^{22}$$ electrons",
        },
        {
          correct: false,
          label:
            "decreases by $$0.020\\text{ g}$$, $$1.20\\times10^{22}$$ electrons",
        },
        {
          correct: false,
          label:
            "decreases by $$1.30\\text{ g}$$, $$2.41\\times10^{22}$$ electrons",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "berkurang sebanyak $$0.020\\text{ g}$$, $$2.41\\times10^{22}$$ elektron",
        },
        {
          correct: false,
          label:
            "bertambah sebanyak $$1.28\\text{ g}$$, $$2.41\\times10^{22}$$ elektron",
        },
        {
          correct: false,
          label:
            "berkurang sebanyak $$0.020\\text{ g}$$, $$1.20\\times10^{22}$$ elektron",
        },
        {
          correct: false,
          label:
            "berkurang sebanyak $$1.30\\text{ g}$$, $$2.41\\times10^{22}$$ elektron",
        },
      ],
    },
  },
};

export default item;
