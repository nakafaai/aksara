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
            "$$1.61\\text{ g}$$, $$1.81\\times10^{22}$$, $$7.22\\times10^{22}$$",
        },
        {
          correct: false,
          label:
            "$$1.07\\text{ g}$$, $$1.20\\times10^{22}$$, $$3.61\\times10^{22}$$",
        },
        {
          correct: false,
          label:
            "$$1.07\\text{ g}$$, $$4.82\\times10^{22}$$, $$4.82\\times10^{22}$$",
        },
        {
          correct: true,
          label:
            "$$1.07\\text{ g}$$, $$1.20\\times10^{22}$$, $$4.82\\times10^{22}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$1.61\\text{ g}$$, $$1.81\\times10^{22}$$, $$7.22\\times10^{22}$$",
        },
        {
          correct: false,
          label:
            "$$1.07\\text{ g}$$, $$1.20\\times10^{22}$$, $$3.61\\times10^{22}$$",
        },
        {
          correct: false,
          label:
            "$$1.07\\text{ g}$$, $$4.82\\times10^{22}$$, $$4.82\\times10^{22}$$",
        },
        {
          correct: true,
          label:
            "$$1.07\\text{ g}$$, $$1.20\\times10^{22}$$, $$4.82\\times10^{22}$$",
        },
      ],
    },
  },
};

export default item;
