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
        { correct: false, label: "$$29.9\\text{ cm}^3$$, $$2.15\\text{ g}$$" },
        { correct: false, label: "$$61.6\\text{ cm}^3$$, $$4.42\\text{ g}$$" },
        { correct: true, label: "$$30.8\\text{ cm}^3$$, $$2.21\\text{ g}$$" },
        { correct: false, label: "$$30.8\\text{ cm}^3$$, $$0.901\\text{ g}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$29.9\\text{ cm}^3$$, $$2.15\\text{ g}$$" },
        { correct: false, label: "$$61.6\\text{ cm}^3$$, $$4.42\\text{ g}$$" },
        { correct: true, label: "$$30.8\\text{ cm}^3$$, $$2.21\\text{ g}$$" },
        { correct: false, label: "$$30.8\\text{ cm}^3$$, $$0.901\\text{ g}$$" },
      ],
    },
  },
};

export default item;
