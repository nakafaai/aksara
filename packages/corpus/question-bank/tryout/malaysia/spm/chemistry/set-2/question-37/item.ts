import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-5",
    topic: "polymers",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$4.80\\text{ dm}^3$$, $$1000$$, $$1.20\\times10^{20}$$",
        },
        {
          correct: false,
          label: "$$4.80\\text{ dm}^3$$, $$1000$$, $$1.20\\times10^{23}$$",
        },
        {
          correct: false,
          label: "$$4.80\\text{ dm}^3$$, $$2000$$, $$1.20\\times10^{20}$$",
        },
        {
          correct: false,
          label: "$$9.60\\text{ dm}^3$$, $$1000$$, $$1.20\\times10^{20}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$4.80\\text{ dm}^3$$, $$1000$$, $$1.20\\times10^{20}$$",
        },
        {
          correct: false,
          label: "$$4.80\\text{ dm}^3$$, $$1000$$, $$1.20\\times10^{23}$$",
        },
        {
          correct: false,
          label: "$$4.80\\text{ dm}^3$$, $$2000$$, $$1.20\\times10^{20}$$",
        },
        {
          correct: false,
          label: "$$9.60\\text{ dm}^3$$, $$1000$$, $$1.20\\times10^{20}$$",
        },
      ],
    },
  },
};

export default item;
