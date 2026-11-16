import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-5",
    topic: "inheritance",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "$$\\frac{1}{2}$$" },
        { correct: false, label: "$$0$$" },
        { correct: true, label: "$$\\frac{1}{4}$$" },
        { correct: false, label: "$$\\frac{1}{8}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$\\frac{1}{2}$$" },
        { correct: false, label: "$$0$$" },
        { correct: true, label: "$$\\frac{1}{4}$$" },
        { correct: false, label: "$$\\frac{1}{8}$$" },
      ],
    },
  },
};

export default item;
