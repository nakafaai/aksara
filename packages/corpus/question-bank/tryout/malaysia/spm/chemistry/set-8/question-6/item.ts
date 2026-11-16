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
        { correct: true, label: "$$\\text{C}_2\\text{H}_4\\text{O}_2$$" },
        { correct: false, label: "$$\\text{CH}_2\\text{O}$$" },
        { correct: false, label: "$$\\text{C}_3\\text{H}_8\\text{O}$$" },
        { correct: false, label: "$$\\text{C}_2\\text{H}_4$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: true, label: "$$\\text{C}_2\\text{H}_4\\text{O}_2$$" },
        { correct: false, label: "$$\\text{CH}_2\\text{O}$$" },
        { correct: false, label: "$$\\text{C}_3\\text{H}_8\\text{O}$$" },
        { correct: false, label: "$$\\text{C}_2\\text{H}_4$$" },
      ],
    },
  },
};

export default item;
