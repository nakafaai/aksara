import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "mole-concept",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "$$0.80\\text{ g}$$, $$240\\text{ cm}^3$$" },
        { correct: false, label: "$$1.60\\text{ g}$$, $$480\\text{ cm}^3$$" },
        { correct: false, label: "$$0.80\\text{ g}$$, $$480\\text{ cm}^3$$" },
        { correct: true, label: "$$1.60\\text{ g}$$, $$240\\text{ cm}^3$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$0.80\\text{ g}$$, $$240\\text{ cm}^3$$" },
        { correct: false, label: "$$1.60\\text{ g}$$, $$480\\text{ cm}^3$$" },
        { correct: false, label: "$$0.80\\text{ g}$$, $$480\\text{ cm}^3$$" },
        { correct: true, label: "$$1.60\\text{ g}$$, $$240\\text{ cm}^3$$" },
      ],
    },
  },
};

export default item;
