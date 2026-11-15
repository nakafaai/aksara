import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "matter-and-atomic-structure",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$1.13\\times10^{23}$$",
        },
        {
          correct: false,
          label: "$$3.39\\times10^{23}$$",
        },
        {
          correct: false,
          label: "$$1.51\\times10^{23}$$",
        },
        {
          correct: true,
          label: "$$2.26\\times10^{23}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$1.13\\times10^{23}$$",
        },
        {
          correct: false,
          label: "$$3.39\\times10^{23}$$",
        },
        {
          correct: false,
          label: "$$1.51\\times10^{23}$$",
        },
        {
          correct: true,
          label: "$$2.26\\times10^{23}$$",
        },
      ],
    },
  },
};

export default item;
