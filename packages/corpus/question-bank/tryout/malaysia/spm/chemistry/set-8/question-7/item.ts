import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "mole-concept",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$7.53\\times10^{22}$$, $$3.00\\text{ dm}^3$$",
        },
        {
          correct: false,
          label: "$$1.51\\times10^{22}$$, $$300\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$1.00\\times10^{22}$$, $$400\\text{ cm}^3$$",
        },
        {
          correct: true,
          label: "$$1.51\\times10^{22}$$, $$600\\text{ cm}^3$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$7.53\\times10^{22}$$, $$3.00\\text{ dm}^3$$",
        },
        {
          correct: false,
          label: "$$1.51\\times10^{22}$$, $$300\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$1.00\\times10^{22}$$, $$400\\text{ cm}^3$$",
        },
        {
          correct: true,
          label: "$$1.51\\times10^{22}$$, $$600\\text{ cm}^3$$",
        },
      ],
    },
  },
};

export default item;
