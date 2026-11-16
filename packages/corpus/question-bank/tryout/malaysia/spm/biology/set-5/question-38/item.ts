import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "inheritance",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: true, label: "$$\\frac{27}{64}$$" },
        { correct: false, label: "$$\\frac{9}{64}$$" },
        { correct: false, label: "$$\\frac{37}{64}$$" },
        { correct: false, label: "$$\\frac{1}{4}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: true, label: "$$\\frac{27}{64}$$" },
        { correct: false, label: "$$\\frac{9}{64}$$" },
        { correct: false, label: "$$\\frac{37}{64}$$" },
        { correct: false, label: "$$\\frac{1}{4}$$" },
      ],
    },
  },
};

export default item;
