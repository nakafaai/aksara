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
        { correct: false, label: "$$60$$ and $$60$$" },
        { correct: false, label: "$$80$$ and $$80$$" },
        { correct: true, label: "$$120$$ and $$40$$" },
        { correct: false, label: "$$40$$ and $$120$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$60$$ dan $$60$$" },
        { correct: false, label: "$$80$$ dan $$80$$" },
        { correct: true, label: "$$120$$ dan $$40$$" },
        { correct: false, label: "$$40$$ dan $$120$$" },
      ],
    },
  },
};

export default item;
