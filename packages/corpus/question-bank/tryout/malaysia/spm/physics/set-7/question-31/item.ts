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
          label:
            "$$0.40\\,\\Omega$$, $$4.2\\text{ A}$$, $$3.3\\,\\Omega$$ and $$89\\%$$",
        },
        {
          correct: false,
          label:
            "$$0.40\\,\\Omega$$, $$3.5\\text{ A}$$, $$3.3\\,\\Omega$$ and $$89\\%$$",
        },
        {
          correct: false,
          label:
            "$$0.20\\,\\Omega$$, $$7.7\\text{ A}$$, $$7.5\\,\\Omega$$ and $$97\\%$$",
        },
        {
          correct: false,
          label:
            "$$0.40\\,\\Omega$$, $$3.0\\text{ A}$$, $$3.3\\,\\Omega$$ and $$89\\%$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$0.40\\,\\Omega$$, $$4.2\\text{ A}$$, $$3.3\\,\\Omega$$ dan $$89\\%$$",
        },
        {
          correct: false,
          label:
            "$$0.40\\,\\Omega$$, $$3.5\\text{ A}$$, $$3.3\\,\\Omega$$ dan $$89\\%$$",
        },
        {
          correct: false,
          label:
            "$$0.20\\,\\Omega$$, $$7.7\\text{ A}$$, $$7.5\\,\\Omega$$ dan $$97\\%$$",
        },
        {
          correct: false,
          label:
            "$$0.40\\,\\Omega$$, $$3.0\\text{ A}$$, $$3.3\\,\\Omega$$ dan $$89\\%$$",
        },
      ],
    },
  },
};

export default item;
