import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "cell-biology-and-organisation",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: true, label: "$$\\times3000$$" },
        { correct: false, label: "$$\\times750$$" },
        { correct: false, label: "$$\\times400$$" },
        { correct: false, label: "$$\\times187.5$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: true, label: "$$\\times3000$$" },
        { correct: false, label: "$$\\times750$$" },
        { correct: false, label: "$$\\times400$$" },
        { correct: false, label: "$$\\times187.5$$" },
      ],
    },
  },
};

export default item;
