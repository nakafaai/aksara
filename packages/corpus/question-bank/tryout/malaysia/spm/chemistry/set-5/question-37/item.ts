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
          correct: false,
          label: "$$1.51\\times10^{20}$$ chains, $$6.0\\text{ dm}^3$$",
        },
        {
          correct: true,
          label: "$$1.51\\times10^{20}$$ chains, $$12.0\\text{ dm}^3$$",
        },
        {
          correct: false,
          label: "$$1.51\\times10^{23}$$ chains, $$12.0\\text{ dm}^3$$",
        },
        {
          correct: false,
          label: "$$1.51\\times10^{20}$$ chains, $$24.0\\text{ dm}^3$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$1.51\\times10^{20}$$ rantai, $$6.0\\text{ dm}^3$$",
        },
        {
          correct: true,
          label: "$$1.51\\times10^{20}$$ rantai, $$12.0\\text{ dm}^3$$",
        },
        {
          correct: false,
          label: "$$1.51\\times10^{23}$$ rantai, $$12.0\\text{ dm}^3$$",
        },
        {
          correct: false,
          label: "$$1.51\\times10^{20}$$ rantai, $$24.0\\text{ dm}^3$$",
        },
      ],
    },
  },
};

export default item;
