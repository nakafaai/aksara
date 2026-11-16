import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "thermochemistry",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$12.9\\text{ kJ}$$ absorbed, $$2.40\\text{ dm}^3$$",
        },
        {
          correct: false,
          label: "$$6.45\\text{ kJ}$$ released, $$1.20\\text{ dm}^3$$",
        },
        {
          correct: false,
          label: "$$6.45\\text{ kJ}$$ absorbed, $$2.40\\text{ dm}^3$$",
        },
        {
          correct: true,
          label: "$$6.45\\text{ kJ}$$ absorbed, $$1.20\\text{ dm}^3$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$12.9\\text{ kJ}$$ diserap, $$2.40\\text{ dm}^3$$",
        },
        {
          correct: false,
          label: "$$6.45\\text{ kJ}$$ dibebaskan, $$1.20\\text{ dm}^3$$",
        },
        {
          correct: false,
          label: "$$6.45\\text{ kJ}$$ diserap, $$2.40\\text{ dm}^3$$",
        },
        {
          correct: true,
          label: "$$6.45\\text{ kJ}$$ diserap, $$1.20\\text{ dm}^3$$",
        },
      ],
    },
  },
};

export default item;
