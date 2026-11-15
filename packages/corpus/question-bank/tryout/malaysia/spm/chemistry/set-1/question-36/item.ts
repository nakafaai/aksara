import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "polymers",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$1.51\\times10^{23}$$",
        },
        {
          correct: false,
          label: "$$3.01\\times10^{20}$$",
        },
        {
          correct: false,
          label: "$$3.01\\times10^{23}$$",
        },
        {
          correct: false,
          label: "$$3.36\\times10^{23}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$1.51\\times10^{23}$$",
        },
        {
          correct: false,
          label: "$$3.01\\times10^{20}$$",
        },
        {
          correct: false,
          label: "$$3.01\\times10^{23}$$",
        },
        {
          correct: false,
          label: "$$3.36\\times10^{23}$$",
        },
      ],
    },
  },
};

export default item;
