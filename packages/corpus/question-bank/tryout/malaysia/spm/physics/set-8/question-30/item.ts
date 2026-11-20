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
            "$$0.425\\,\\Omega$$, $$1.94\\text{ kW}$$ and $$0.723\\text{ mm}^2$$",
        },
        {
          correct: true,
          label:
            "$$0.850\\,\\Omega$$, $$1.89\\text{ kW}$$ and $$1.45\\text{ mm}^2$$",
        },
        {
          correct: false,
          label:
            "$$0.850\\,\\Omega$$, $$1.94\\text{ kW}$$ and $$1.45\\text{ mm}^2$$",
        },
        {
          correct: false,
          label:
            "$$0.850\\,\\Omega$$, $$1.89\\text{ kW}$$ and $$1.48\\text{ mm}^2$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$0.425\\,\\Omega$$, $$1.94\\text{ kW}$$ dan $$0.723\\text{ mm}^2$$",
        },
        {
          correct: true,
          label:
            "$$0.850\\,\\Omega$$, $$1.89\\text{ kW}$$ dan $$1.45\\text{ mm}^2$$",
        },
        {
          correct: false,
          label:
            "$$0.850\\,\\Omega$$, $$1.94\\text{ kW}$$ dan $$1.45\\text{ mm}^2$$",
        },
        {
          correct: false,
          label:
            "$$0.850\\,\\Omega$$, $$1.89\\text{ kW}$$ dan $$1.48\\text{ mm}^2$$",
        },
      ],
    },
  },
};

export default item;
