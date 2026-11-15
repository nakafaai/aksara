import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "heat",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$1.0\\times10^{5}\\text{ J kg}^{-1}$$",
        },
        {
          correct: false,
          label: "$$2.0\\times10^{4}\\text{ J kg}^{-1}$$",
        },
        {
          correct: false,
          label: "$$1.6\\times10^{4}\\text{ J kg}^{-1}$$",
        },
        {
          correct: false,
          label: "$$5.0\\times10^{5}\\text{ J kg}^{-1}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$1.0\\times10^{5}\\text{ J kg}^{-1}$$",
        },
        {
          correct: false,
          label: "$$2.0\\times10^{4}\\text{ J kg}^{-1}$$",
        },
        {
          correct: false,
          label: "$$1.6\\times10^{4}\\text{ J kg}^{-1}$$",
        },
        {
          correct: false,
          label: "$$5.0\\times10^{5}\\text{ J kg}^{-1}$$",
        },
      ],
    },
  },
};

export default item;
