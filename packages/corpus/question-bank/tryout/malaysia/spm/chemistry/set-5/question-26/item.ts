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
        { correct: true, label: "$$3$$, gold" },
        { correct: false, label: "$$2$$, gold" },
        { correct: false, label: "$$3$$, platinum" },
        { correct: false, label: "$$4$$, platinum" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: true, label: "$$3$$, emas" },
        { correct: false, label: "$$2$$, emas" },
        { correct: false, label: "$$3$$, platinum" },
        { correct: false, label: "$$4$$, platinum" },
      ],
    },
  },
};

export default item;
