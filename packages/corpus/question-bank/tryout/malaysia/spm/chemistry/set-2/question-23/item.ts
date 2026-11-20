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
            "$$0.240\\text{ g}$$, $$2.41\\times10^{22}$$, $$1.44\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$0.650\\text{ g}$$, $$1.20\\times10^{22}$$, $$1.44\\text{ g}$$",
        },
        {
          correct: true,
          label:
            "$$0.650\\text{ g}$$, $$2.41\\times10^{22}$$, $$1.44\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$0.650\\text{ g}$$, $$2.41\\times10^{22}$$, $$7.18\\text{ g}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$0.240\\text{ g}$$, $$2.41\\times10^{22}$$, $$1.44\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$0.650\\text{ g}$$, $$1.20\\times10^{22}$$, $$1.44\\text{ g}$$",
        },
        {
          correct: true,
          label:
            "$$0.650\\text{ g}$$, $$2.41\\times10^{22}$$, $$1.44\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$0.650\\text{ g}$$, $$2.41\\times10^{22}$$, $$7.18\\text{ g}$$",
        },
      ],
    },
  },
};

export default item;
