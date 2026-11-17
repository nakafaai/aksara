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
        { correct: false, label: "$$10.6\\text{ g}$$, $$40.0\\text{ cm}^3$$" },
        { correct: true, label: "$$12.4\\text{ g}$$, $$40.0\\text{ cm}^3$$" },
        { correct: false, label: "$$12.4\\text{ g}$$, $$20.0\\text{ cm}^3$$" },
        { correct: false, label: "$$12.4\\text{ g}$$, $$400\\text{ cm}^3$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$10.6\\text{ g}$$, $$40.0\\text{ cm}^3$$" },
        { correct: true, label: "$$12.4\\text{ g}$$, $$40.0\\text{ cm}^3$$" },
        { correct: false, label: "$$12.4\\text{ g}$$, $$20.0\\text{ cm}^3$$" },
        { correct: false, label: "$$12.4\\text{ g}$$, $$400\\text{ cm}^3$$" },
      ],
    },
  },
};

export default item;
