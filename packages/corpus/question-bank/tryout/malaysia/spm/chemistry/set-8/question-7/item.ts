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
        { correct: false, label: "$$11.5\\text{ kg}$$, $$21.0\\text{ kg}$$" },
        { correct: false, label: "$$22.9\\text{ kg}$$, $$21.0\\text{ kg}$$" },
        { correct: false, label: "$$45.8\\text{ kg}$$, $$12.4\\text{ kg}$$" },
        { correct: true, label: "$$22.9\\text{ kg}$$, $$12.4\\text{ kg}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$11.5\\text{ kg}$$, $$21.0\\text{ kg}$$" },
        { correct: false, label: "$$22.9\\text{ kg}$$, $$21.0\\text{ kg}$$" },
        { correct: false, label: "$$45.8\\text{ kg}$$, $$12.4\\text{ kg}$$" },
        { correct: true, label: "$$22.9\\text{ kg}$$, $$12.4\\text{ kg}$$" },
      ],
    },
  },
};

export default item;
