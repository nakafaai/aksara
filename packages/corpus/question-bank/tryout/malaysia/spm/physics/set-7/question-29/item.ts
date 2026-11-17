import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-5",
    topic: "electricity",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$576\\text{ W}$$, $$960\\text{ W}$$ and $$27\\,\\Omega$$",
        },
        {
          correct: false,
          label: "$$576\\text{ W}$$, $$576\\text{ W}$$ and $$27\\,\\Omega$$",
        },
        {
          correct: false,
          label: "$$576\\text{ W}$$, $$960\\text{ W}$$ and $$18\\,\\Omega$$",
        },
        {
          correct: false,
          label: "$$576\\text{ W}$$, $$1.4\\text{ kW}$$ and $$27\\,\\Omega$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$576\\text{ W}$$, $$960\\text{ W}$$ dan $$27\\,\\Omega$$",
        },
        {
          correct: false,
          label: "$$576\\text{ W}$$, $$576\\text{ W}$$ dan $$27\\,\\Omega$$",
        },
        {
          correct: false,
          label: "$$576\\text{ W}$$, $$960\\text{ W}$$ dan $$18\\,\\Omega$$",
        },
        {
          correct: false,
          label: "$$576\\text{ W}$$, $$1.4\\text{ kW}$$ dan $$27\\,\\Omega$$",
        },
      ],
    },
  },
};

export default item;
