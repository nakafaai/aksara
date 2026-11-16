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
        { correct: false, label: "$$\\tfrac{1}{2}$$" },
        { correct: false, label: "$$\\tfrac{3}{4}$$" },
        { correct: false, label: "$$\\tfrac{1}{3}$$" },
        { correct: true, label: "$$\\tfrac{2}{3}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$\\tfrac{1}{2}$$" },
        { correct: false, label: "$$\\tfrac{3}{4}$$" },
        { correct: false, label: "$$\\tfrac{1}{3}$$" },
        { correct: true, label: "$$\\tfrac{2}{3}$$" },
      ],
    },
  },
};

export default item;
