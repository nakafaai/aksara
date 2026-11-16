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
        { correct: false, label: "$$\\text{CH}_2\\text{O}$$" },
        { correct: true, label: "$$\\text{C}_2\\text{H}_4\\text{O}_2$$" },
        { correct: false, label: "$$\\text{C}_2\\text{H}_2\\text{O}_2$$" },
        { correct: false, label: "$$\\text{C}_3\\text{H}_6\\text{O}_3$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$\\text{CH}_2\\text{O}$$" },
        { correct: true, label: "$$\\text{C}_2\\text{H}_4\\text{O}_2$$" },
        { correct: false, label: "$$\\text{C}_2\\text{H}_2\\text{O}_2$$" },
        { correct: false, label: "$$\\text{C}_3\\text{H}_6\\text{O}_3$$" },
      ],
    },
  },
};

export default item;
