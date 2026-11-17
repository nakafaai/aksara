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
        { correct: false, label: "$$45\\%$$ and $$1.3\\text{ °C h}^{-1}$$" },
        { correct: true, label: "$$75\\%$$ and $$1.3\\text{ °C h}^{-1}$$" },
        { correct: false, label: "$$75\\%$$ and $$1.7\\text{ °C h}^{-1}$$" },
        { correct: false, label: "$$75\\%$$ and $$0.021\\text{ °C h}^{-1}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$45\\%$$ dan $$1.3\\text{ °C j}^{-1}$$" },
        { correct: true, label: "$$75\\%$$ dan $$1.3\\text{ °C j}^{-1}$$" },
        { correct: false, label: "$$75\\%$$ dan $$1.7\\text{ °C j}^{-1}$$" },
        { correct: false, label: "$$75\\%$$ dan $$0.021\\text{ °C j}^{-1}$$" },
      ],
    },
  },
};

export default item;
