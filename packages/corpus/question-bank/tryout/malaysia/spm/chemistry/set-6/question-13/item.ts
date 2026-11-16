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
          label: "$$1.20\\times10^{23}$$ ions, $$5.79\\times10^4\\text{ C}$$",
        },
        {
          correct: true,
          label: "$$3.01\\times10^{23}$$ ions, $$5.79\\times10^4\\text{ C}$$",
        },
        {
          correct: false,
          label: "$$3.01\\times10^{23}$$ ions, $$1.93\\times10^4\\text{ C}$$",
        },
        {
          correct: false,
          label: "$$3.01\\times10^{23}$$ ions, $$1.16\\times10^5\\text{ C}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$1.20\\times10^{23}$$ ion, $$5.79\\times10^4\\text{ C}$$",
        },
        {
          correct: true,
          label: "$$3.01\\times10^{23}$$ ion, $$5.79\\times10^4\\text{ C}$$",
        },
        {
          correct: false,
          label: "$$3.01\\times10^{23}$$ ion, $$1.93\\times10^4\\text{ C}$$",
        },
        {
          correct: false,
          label: "$$3.01\\times10^{23}$$ ion, $$1.16\\times10^5\\text{ C}$$",
        },
      ],
    },
  },
};

export default item;
