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
        { correct: false, label: "$$\\tfrac{1}{2}$$ and $$\\tfrac{7}{8}$$" },
        { correct: true, label: "$$\\tfrac{1}{4}$$ and $$\\tfrac{1}{2}$$" },
        { correct: false, label: "$$\\tfrac{1}{4}$$ and $$\\tfrac{5}{8}$$" },
        { correct: false, label: "$$\\tfrac{1}{4}$$ and $$\\tfrac{3}{8}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$\\tfrac{1}{2}$$ dan $$\\tfrac{7}{8}$$" },
        { correct: true, label: "$$\\tfrac{1}{4}$$ dan $$\\tfrac{1}{2}$$" },
        { correct: false, label: "$$\\tfrac{1}{4}$$ dan $$\\tfrac{5}{8}$$" },
        { correct: false, label: "$$\\tfrac{1}{4}$$ dan $$\\tfrac{3}{8}$$" },
      ],
    },
  },
};

export default item;
