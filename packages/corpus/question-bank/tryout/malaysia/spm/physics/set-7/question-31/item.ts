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
        {
          correct: true,
          label: "$$0.40\\,\\Omega$$, $$4.2\\text{ A}$$ and $$3.3\\,\\Omega$$",
        },
        {
          correct: false,
          label: "$$0.40\\,\\Omega$$, $$3.5\\text{ A}$$ and $$3.3\\,\\Omega$$",
        },
        {
          correct: false,
          label: "$$0.20\\,\\Omega$$, $$7.7\\text{ A}$$ and $$7.5\\,\\Omega$$",
        },
        {
          correct: false,
          label: "$$0.40\\,\\Omega$$, $$3.0\\text{ A}$$ and $$3.3\\,\\Omega$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$0.40\\,\\Omega$$, $$4.2\\text{ A}$$ dan $$3.3\\,\\Omega$$",
        },
        {
          correct: false,
          label: "$$0.40\\,\\Omega$$, $$3.5\\text{ A}$$ dan $$3.3\\,\\Omega$$",
        },
        {
          correct: false,
          label: "$$0.20\\,\\Omega$$, $$7.7\\text{ A}$$ dan $$7.5\\,\\Omega$$",
        },
        {
          correct: false,
          label: "$$0.40\\,\\Omega$$, $$3.0\\text{ A}$$ dan $$3.3\\,\\Omega$$",
        },
      ],
    },
  },
};

export default item;
