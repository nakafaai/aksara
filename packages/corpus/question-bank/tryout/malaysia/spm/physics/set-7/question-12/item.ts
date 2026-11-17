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
        { correct: false, label: "$$0.90\\text{ kg}$$ and $$8.8\\text{ °C}$$" },
        { correct: false, label: "$$0.68\\text{ kg}$$ and $$8.8\\text{ °C}$$" },
        { correct: false, label: "$$1.2\\text{ kg}$$ and $$0.15\\text{ °C}$$" },
        { correct: true, label: "$$1.2\\text{ kg}$$ and $$8.8\\text{ °C}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$0.90\\text{ kg}$$ dan $$8.8\\text{ °C}$$" },
        { correct: false, label: "$$0.68\\text{ kg}$$ dan $$8.8\\text{ °C}$$" },
        { correct: false, label: "$$1.2\\text{ kg}$$ dan $$0.15\\text{ °C}$$" },
        { correct: true, label: "$$1.2\\text{ kg}$$ dan $$8.8\\text{ °C}$$" },
      ],
    },
  },
};

export default item;
