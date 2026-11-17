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
          label: "$$576\\text{ W}$$, $$2.4\\text{ kW}$$ and $$960\\text{ W}$$",
        },
        {
          correct: false,
          label: "$$576\\text{ W}$$, $$2.4\\text{ kW}$$ and $$576\\text{ W}$$",
        },
        {
          correct: false,
          label: "$$576\\text{ W}$$, $$2.4\\text{ kW}$$ and $$1.4\\text{ kW}$$",
        },
        {
          correct: false,
          label: "$$960\\text{ W}$$, $$2.4\\text{ kW}$$ and $$960\\text{ W}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$576\\text{ W}$$, $$2.4\\text{ kW}$$ dan $$960\\text{ W}$$",
        },
        {
          correct: false,
          label: "$$576\\text{ W}$$, $$2.4\\text{ kW}$$ dan $$576\\text{ W}$$",
        },
        {
          correct: false,
          label: "$$576\\text{ W}$$, $$2.4\\text{ kW}$$ dan $$1.4\\text{ kW}$$",
        },
        {
          correct: false,
          label: "$$960\\text{ W}$$, $$2.4\\text{ kW}$$ dan $$960\\text{ W}$$",
        },
      ],
    },
  },
};

export default item;
