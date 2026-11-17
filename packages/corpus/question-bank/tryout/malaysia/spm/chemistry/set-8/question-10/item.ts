import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "periodic-table",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: true, label: "$$0.40\\text{ g}$$, $$6.67\\text{ cm}^3$$" },
        { correct: false, label: "$$0.40\\text{ g}$$, $$3.33\\text{ cm}^3$$" },
        { correct: false, label: "$$0.60\\text{ g}$$, $$10.0\\text{ cm}^3$$" },
        { correct: false, label: "$$0\\text{ g}$$, $$0\\text{ cm}^3$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: true, label: "$$0.40\\text{ g}$$, $$6.67\\text{ cm}^3$$" },
        { correct: false, label: "$$0.40\\text{ g}$$, $$3.33\\text{ cm}^3$$" },
        { correct: false, label: "$$0.60\\text{ g}$$, $$10.0\\text{ cm}^3$$" },
        { correct: false, label: "$$0\\text{ g}$$, $$0\\text{ cm}^3$$" },
      ],
    },
  },
};

export default item;
