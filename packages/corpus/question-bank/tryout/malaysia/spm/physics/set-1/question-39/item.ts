import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "nuclear-physics",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$3.29\\times10^{-10}\\text{ J}$$",
        },
        {
          correct: true,
          label: "$$2.78\\times10^{-11}\\text{ J}$$",
        },
        {
          correct: false,
          label: "$$2.78\\times10^{-8}\\text{ J}$$",
        },
        {
          correct: false,
          label: "$$9.26\\times10^{-20}\\text{ J}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$3.29\\times10^{-10}\\text{ J}$$",
        },
        {
          correct: true,
          label: "$$2.78\\times10^{-11}\\text{ J}$$",
        },
        {
          correct: false,
          label: "$$2.78\\times10^{-8}\\text{ J}$$",
        },
        {
          correct: false,
          label: "$$9.26\\times10^{-20}\\text{ J}$$",
        },
      ],
    },
  },
};

export default item;
