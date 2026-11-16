import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "measurement",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$7.82\\times10^3\\text{ kg m}^{-3}$$",
        },
        {
          correct: false,
          label: "$$8.04\\times10^3\\text{ kg m}^{-3}$$",
        },
        {
          correct: false,
          label: "$$7.93\\times10^3\\text{ kg m}^{-3}$$",
        },
        {
          correct: false,
          label: "$$0.98\\times10^3\\text{ kg m}^{-3}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$7.82\\times10^3\\text{ kg m}^{-3}$$",
        },
        {
          correct: false,
          label: "$$8.04\\times10^3\\text{ kg m}^{-3}$$",
        },
        {
          correct: false,
          label: "$$7.93\\times10^3\\text{ kg m}^{-3}$$",
        },
        {
          correct: false,
          label: "$$0.98\\times10^3\\text{ kg m}^{-3}$$",
        },
      ],
    },
  },
};

export default item;
