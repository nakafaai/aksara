import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "electronics",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "$$5$$ combinations, and $$5$$ NAND gates" },
        { correct: false, label: "$$4$$ combinations, and $$3$$ NAND gates" },
        { correct: false, label: "$$5$$ combinations, and $$2$$ NAND gates" },
        { correct: true, label: "$$5$$ combinations, and $$3$$ NAND gates" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$5$$ gabungan, dan $$5$$ get TAKDAN" },
        { correct: false, label: "$$4$$ gabungan, dan $$3$$ get TAKDAN" },
        { correct: false, label: "$$5$$ gabungan, dan $$2$$ get TAKDAN" },
        { correct: true, label: "$$5$$ gabungan, dan $$3$$ get TAKDAN" },
      ],
    },
  },
};

export default item;
