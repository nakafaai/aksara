import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "consumer-and-industrial-chemistry",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$230\\text{ g}$$, $$1.00\\times10^{21}$$ molecules",
        },
        {
          correct: true,
          label: "$$271\\text{ g}$$, $$1.00\\times10^{21}$$ molecules",
        },
        {
          correct: false,
          label: "$$196\\text{ g}$$, $$1.00\\times10^{21}$$ molecules",
        },
        {
          correct: false,
          label: "$$271\\text{ g}$$, $$1.00\\times10^{24}$$ molecules",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$230\\text{ g}$$, $$1.00\\times10^{21}$$ molekul",
        },
        {
          correct: true,
          label: "$$271\\text{ g}$$, $$1.00\\times10^{21}$$ molekul",
        },
        {
          correct: false,
          label: "$$196\\text{ g}$$, $$1.00\\times10^{21}$$ molekul",
        },
        {
          correct: false,
          label: "$$271\\text{ g}$$, $$1.00\\times10^{24}$$ molekul",
        },
      ],
    },
  },
};

export default item;
