import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "electricity",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: true, label: "$$0.40\\,\\Omega$$ and $$4.2\\text{ A}$$" },
        { correct: false, label: "$$0.40\\,\\Omega$$ and $$3.5\\text{ A}$$" },
        { correct: false, label: "$$0.20\\,\\Omega$$ and $$7.7\\text{ A}$$" },
        { correct: false, label: "$$0.40\\,\\Omega$$ and $$3.0\\text{ A}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: true, label: "$$0.40\\,\\Omega$$ dan $$4.2\\text{ A}$$" },
        { correct: false, label: "$$0.40\\,\\Omega$$ dan $$3.5\\text{ A}$$" },
        { correct: false, label: "$$0.20\\,\\Omega$$ dan $$7.7\\text{ A}$$" },
        { correct: false, label: "$$0.40\\,\\Omega$$ dan $$3.0\\text{ A}$$" },
      ],
    },
  },
};

export default item;
