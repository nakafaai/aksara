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
        { correct: false, label: "$$\\tfrac{1}{4}$$" },
        { correct: true, label: "$$\\tfrac{1}{8}$$" },
        { correct: false, label: "$$\\tfrac{1}{2}$$" },
        { correct: false, label: "$$\\tfrac{1}{16}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$\\tfrac{1}{4}$$" },
        { correct: true, label: "$$\\tfrac{1}{8}$$" },
        { correct: false, label: "$$\\tfrac{1}{2}$$" },
        { correct: false, label: "$$\\tfrac{1}{16}$$" },
      ],
    },
  },
};

export default item;
