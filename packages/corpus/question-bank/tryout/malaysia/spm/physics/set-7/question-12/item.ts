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
          correct: false,
          label:
            "$$0.90\\text{ kg}$$, $$8.8\\text{ °C}$$ and $$2.8\\text{ min}$$",
        },
        {
          correct: false,
          label:
            "$$0.68\\text{ kg}$$, $$8.8\\text{ °C}$$ and $$2.1\\text{ min}$$",
        },
        {
          correct: false,
          label:
            "$$1.2\\text{ kg}$$, $$0.15\\text{ °C}$$ and $$3.8\\text{ min}$$",
        },
        {
          correct: true,
          label:
            "$$1.2\\text{ kg}$$, $$8.8\\text{ °C}$$ and $$3.8\\text{ min}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$0.90\\text{ kg}$$, $$8.8\\text{ °C}$$ dan $$2.8\\text{ minit}$$",
        },
        {
          correct: false,
          label:
            "$$0.68\\text{ kg}$$, $$8.8\\text{ °C}$$ dan $$2.1\\text{ minit}$$",
        },
        {
          correct: false,
          label:
            "$$1.2\\text{ kg}$$, $$0.15\\text{ °C}$$ dan $$3.8\\text{ minit}$$",
        },
        {
          correct: true,
          label:
            "$$1.2\\text{ kg}$$, $$8.8\\text{ °C}$$ dan $$3.8\\text{ minit}$$",
        },
      ],
    },
  },
};

export default item;
