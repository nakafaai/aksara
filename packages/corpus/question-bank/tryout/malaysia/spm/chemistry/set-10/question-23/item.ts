import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "redox-equilibrium",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$240\\text{ cm}^3$$, pH $$1$$, $$3860\\text{ s}$$",
        },
        {
          correct: false,
          label: "$$120\\text{ cm}^3$$, pH $$1.3$$, $$3860\\text{ s}$$",
        },
        {
          correct: true,
          label: "$$120\\text{ cm}^3$$, pH $$1$$, $$3860\\text{ s}$$",
        },
        {
          correct: false,
          label: "$$120\\text{ cm}^3$$, pH $$1$$, $$1930\\text{ s}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$240\\text{ cm}^3$$, pH $$1$$, $$3860\\text{ s}$$",
        },
        {
          correct: false,
          label: "$$120\\text{ cm}^3$$, pH $$1.3$$, $$3860\\text{ s}$$",
        },
        {
          correct: true,
          label: "$$120\\text{ cm}^3$$, pH $$1$$, $$3860\\text{ s}$$",
        },
        {
          correct: false,
          label: "$$120\\text{ cm}^3$$, pH $$1$$, $$1930\\text{ s}$$",
        },
      ],
    },
  },
};

export default item;
