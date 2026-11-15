import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-5",
    topic: "transport-in-plants",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$7.1\\times10^{-3}\\text{ cm}^3\\text{ min}^{-1}$$",
        },
        {
          correct: false,
          label: "$$0.71\\text{ cm}^3\\text{ min}^{-1}$$",
        },
        {
          correct: false,
          label: "$$2.8\\times10^{-2}\\text{ cm}^3\\text{ min}^{-1}$$",
        },
        {
          correct: false,
          label: "$$3.5\\times10^{-2}\\text{ cm}^3\\text{ min}^{-1}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$7.1\\times10^{-3}\\text{ cm}^3\\text{ min}^{-1}$$",
        },
        {
          correct: false,
          label: "$$0.71\\text{ cm}^3\\text{ min}^{-1}$$",
        },
        {
          correct: false,
          label: "$$2.8\\times10^{-2}\\text{ cm}^3\\text{ min}^{-1}$$",
        },
        {
          correct: false,
          label: "$$3.5\\times10^{-2}\\text{ cm}^3\\text{ min}^{-1}$$",
        },
      ],
    },
  },
};

export default item;
