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
          label: "$$3.01\\times10^{23}$$ ions, $$5.79\\times10^4\\text{ C}$$",
        },
        {
          correct: true,
          label: "$$2.01\\times10^{23}$$ ions, $$3.86\\times10^4\\text{ C}$$",
        },
        {
          correct: false,
          label: "$$2.01\\times10^{23}$$ ions, $$1.29\\times10^4\\text{ C}$$",
        },
        {
          correct: false,
          label: "$$2.01\\times10^{23}$$ ions, $$7.72\\times10^4\\text{ C}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$3.01\\times10^{23}$$ ion, $$5.79\\times10^4\\text{ C}$$",
        },
        {
          correct: true,
          label: "$$2.01\\times10^{23}$$ ion, $$3.86\\times10^4\\text{ C}$$",
        },
        {
          correct: false,
          label: "$$2.01\\times10^{23}$$ ion, $$1.29\\times10^4\\text{ C}$$",
        },
        {
          correct: false,
          label: "$$2.01\\times10^{23}$$ ion, $$7.72\\times10^4\\text{ C}$$",
        },
      ],
    },
  },
};

export default item;
