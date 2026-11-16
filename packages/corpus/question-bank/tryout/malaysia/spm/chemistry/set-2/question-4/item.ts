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
        { correct: false, label: "$$\\text{MO}$$" },
        { correct: true, label: "$$\\text{M}_2\\text{O}_3$$" },
        { correct: false, label: "$$\\text{M}_3\\text{O}_4$$" },
        { correct: false, label: "$$\\text{MO}_2$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$\\text{MO}$$" },
        { correct: true, label: "$$\\text{M}_2\\text{O}_3$$" },
        { correct: false, label: "$$\\text{M}_3\\text{O}_4$$" },
        { correct: false, label: "$$\\text{MO}_2$$" },
      ],
    },
  },
};

export default item;
