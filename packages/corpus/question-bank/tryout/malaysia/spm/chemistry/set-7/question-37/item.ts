import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "polymers",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "$$2000$$ units, $$571\\text{ dm}^3$$" },
        { correct: false, label: "$$1000$$ units, $$621\\text{ dm}^3$$" },
        { correct: true, label: "$$2000$$ units, $$621\\text{ dm}^3$$" },
        { correct: false, label: "$$2000$$ units, $$526\\text{ dm}^3$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$2000$$ unit, $$571\\text{ dm}^3$$" },
        { correct: false, label: "$$1000$$ unit, $$621\\text{ dm}^3$$" },
        { correct: true, label: "$$2000$$ unit, $$621\\text{ dm}^3$$" },
        { correct: false, label: "$$2000$$ unit, $$526\\text{ dm}^3$$" },
      ],
    },
  },
};

export default item;
