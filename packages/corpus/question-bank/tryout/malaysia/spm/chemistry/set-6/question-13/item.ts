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
            "$$10.2\\text{ g}$$, $$1.20\\times10^{23}$$ ions, $$3.61\\times10^{23}$$ electrons",
        },
        {
          correct: true,
          label:
            "$$10.2\\text{ g}$$, $$3.01\\times10^{23}$$ ions, $$3.61\\times10^{23}$$ electrons",
        },
        {
          correct: false,
          label:
            "$$10.2\\text{ g}$$, $$3.01\\times10^{23}$$ ions, $$7.22\\times10^{23}$$ electrons",
        },
        {
          correct: false,
          label:
            "$$20.4\\text{ g}$$, $$6.02\\times10^{23}$$ ions, $$7.22\\times10^{23}$$ electrons",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$10.2\\text{ g}$$, $$1.20\\times10^{23}$$ ion, $$3.61\\times10^{23}$$ elektron",
        },
        {
          correct: true,
          label:
            "$$10.2\\text{ g}$$, $$3.01\\times10^{23}$$ ion, $$3.61\\times10^{23}$$ elektron",
        },
        {
          correct: false,
          label:
            "$$10.2\\text{ g}$$, $$3.01\\times10^{23}$$ ion, $$7.22\\times10^{23}$$ elektron",
        },
        {
          correct: false,
          label:
            "$$20.4\\text{ g}$$, $$6.02\\times10^{23}$$ ion, $$7.22\\times10^{23}$$ elektron",
        },
      ],
    },
  },
};

export default item;
