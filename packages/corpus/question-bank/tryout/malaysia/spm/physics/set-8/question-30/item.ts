import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "electricity",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$0.43\\,\\Omega$$, $$1.94\\text{ kW}$$ and $$0.74\\text{ mm}^2$$",
        },
        {
          correct: true,
          label:
            "$$0.85\\,\\Omega$$, $$1.89\\text{ kW}$$ and $$1.5\\text{ mm}^2$$",
        },
        {
          correct: false,
          label:
            "$$0.85\\,\\Omega$$, $$2.00\\text{ kW}$$ and $$1.5\\text{ mm}^2$$",
        },
        {
          correct: false,
          label:
            "$$0.085\\,\\Omega$$, $$1.99\\text{ kW}$$ and $$0.15\\text{ mm}^2$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$0.43\\,\\Omega$$, $$1.94\\text{ kW}$$ dan $$0.74\\text{ mm}^2$$",
        },
        {
          correct: true,
          label:
            "$$0.85\\,\\Omega$$, $$1.89\\text{ kW}$$ dan $$1.5\\text{ mm}^2$$",
        },
        {
          correct: false,
          label:
            "$$0.85\\,\\Omega$$, $$2.00\\text{ kW}$$ dan $$1.5\\text{ mm}^2$$",
        },
        {
          correct: false,
          label:
            "$$0.085\\,\\Omega$$, $$1.99\\text{ kW}$$ dan $$0.15\\text{ mm}^2$$",
        },
      ],
    },
  },
};

export default item;
