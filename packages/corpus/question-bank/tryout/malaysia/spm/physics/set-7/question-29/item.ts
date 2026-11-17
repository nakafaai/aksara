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
          label:
            "$$576\\text{ W}$$, $$960\\text{ W}$$, $$27\\,\\Omega$$ and $$3.1\\text{ kW}$$",
        },
        {
          correct: false,
          label:
            "$$576\\text{ W}$$, $$576\\text{ W}$$, $$27\\,\\Omega$$ and $$3.1\\text{ kW}$$",
        },
        {
          correct: false,
          label:
            "$$576\\text{ W}$$, $$960\\text{ W}$$, $$18\\,\\Omega$$ and $$4.1\\text{ kW}$$",
        },
        {
          correct: false,
          label:
            "$$576\\text{ W}$$, $$1.4\\text{ kW}$$, $$27\\,\\Omega$$ and $$3.1\\text{ kW}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$576\\text{ W}$$, $$960\\text{ W}$$, $$27\\,\\Omega$$ dan $$3.1\\text{ kW}$$",
        },
        {
          correct: false,
          label:
            "$$576\\text{ W}$$, $$576\\text{ W}$$, $$27\\,\\Omega$$ dan $$3.1\\text{ kW}$$",
        },
        {
          correct: false,
          label:
            "$$576\\text{ W}$$, $$960\\text{ W}$$, $$18\\,\\Omega$$ dan $$4.1\\text{ kW}$$",
        },
        {
          correct: false,
          label:
            "$$576\\text{ W}$$, $$1.4\\text{ kW}$$, $$27\\,\\Omega$$ dan $$3.1\\text{ kW}$$",
        },
      ],
    },
  },
};

export default item;
