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
        { correct: false, label: "$$29.9\\text{ cm}^3$$, $$0.172\\text{ g}$$" },
        { correct: false, label: "$$61.6\\text{ cm}^3$$, $$0.354\\text{ g}$$" },
        { correct: true, label: "$$30.8\\text{ cm}^3$$, $$0.177\\text{ g}$$" },
        { correct: false, label: "$$385\\text{ cm}^3$$, $$2.21\\text{ g}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$29.9\\text{ cm}^3$$, $$0.172\\text{ g}$$" },
        { correct: false, label: "$$61.6\\text{ cm}^3$$, $$0.354\\text{ g}$$" },
        { correct: true, label: "$$30.8\\text{ cm}^3$$, $$0.177\\text{ g}$$" },
        { correct: false, label: "$$385\\text{ cm}^3$$, $$2.21\\text{ g}$$" },
      ],
    },
  },
};

export default item;
