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
            "$$0.90\\text{ kg}$$, $$8.8\\text{ °C}$$, $$2.8\\text{ min}$$ and $$4.4\\text{ °C}$$",
        },
        {
          correct: false,
          label:
            "$$0.68\\text{ kg}$$, $$8.8\\text{ °C}$$, $$2.1\\text{ min}$$ and $$4.4\\text{ °C}$$",
        },
        {
          correct: false,
          label:
            "$$1.2\\text{ kg}$$, $$0.15\\text{ °C}$$, $$3.8\\text{ min}$$ and $$0.074\\text{ °C}$$",
        },
        {
          correct: true,
          label:
            "$$1.2\\text{ kg}$$, $$8.8\\text{ °C}$$, $$3.8\\text{ min}$$ and $$4.4\\text{ °C}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$0.90\\text{ kg}$$, $$8.8\\text{ °C}$$, $$2.8\\text{ minit}$$ dan $$4.4\\text{ °C}$$",
        },
        {
          correct: false,
          label:
            "$$0.68\\text{ kg}$$, $$8.8\\text{ °C}$$, $$2.1\\text{ minit}$$ dan $$4.4\\text{ °C}$$",
        },
        {
          correct: false,
          label:
            "$$1.2\\text{ kg}$$, $$0.15\\text{ °C}$$, $$3.8\\text{ minit}$$ dan $$0.074\\text{ °C}$$",
        },
        {
          correct: true,
          label:
            "$$1.2\\text{ kg}$$, $$8.8\\text{ °C}$$, $$3.8\\text{ minit}$$ dan $$4.4\\text{ °C}$$",
        },
      ],
    },
  },
};

export default item;
