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
        {
          correct: false,
          label: "$$2000$$ units, $$571\\text{ dm}^3$$, $$2.05\\text{ kg}$$",
        },
        {
          correct: false,
          label: "$$1000$$ units, $$621\\text{ dm}^3$$, $$2.23\\text{ kg}$$",
        },
        {
          correct: true,
          label: "$$2000$$ units, $$621\\text{ dm}^3$$, $$2.23\\text{ kg}$$",
        },
        {
          correct: false,
          label: "$$2000$$ units, $$621\\text{ dm}^3$$, $$1.11\\text{ kg}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$2000$$ unit, $$571\\text{ dm}^3$$, $$2.05\\text{ kg}$$",
        },
        {
          correct: false,
          label: "$$1000$$ unit, $$621\\text{ dm}^3$$, $$2.23\\text{ kg}$$",
        },
        {
          correct: true,
          label: "$$2000$$ unit, $$621\\text{ dm}^3$$, $$2.23\\text{ kg}$$",
        },
        {
          correct: false,
          label: "$$2000$$ unit, $$621\\text{ dm}^3$$, $$1.11\\text{ kg}$$",
        },
      ],
    },
  },
};

export default item;
