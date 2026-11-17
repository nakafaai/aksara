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
          correct: false,
          label: "$$1.2\\text{ A}$$, $$8.6\\text{ W}$$ and $$3.1\\,\\Omega$$",
        },
        {
          correct: false,
          label: "$$1.7\\text{ A}$$, $$2.0\\text{ W}$$ and $$0\\,\\Omega$$",
        },
        {
          correct: false,
          label: "$$1.1\\text{ A}$$, $$7.1\\text{ W}$$ and $$3.1\\,\\Omega$$",
        },
        {
          correct: true,
          label: "$$1.1\\text{ A}$$, $$7.1\\text{ W}$$ and $$2.1\\,\\Omega$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$1.2\\text{ A}$$, $$8.6\\text{ W}$$ dan $$3.1\\,\\Omega$$",
        },
        {
          correct: false,
          label: "$$1.7\\text{ A}$$, $$2.0\\text{ W}$$ dan $$0\\,\\Omega$$",
        },
        {
          correct: false,
          label: "$$1.1\\text{ A}$$, $$7.1\\text{ W}$$ dan $$3.1\\,\\Omega$$",
        },
        {
          correct: true,
          label: "$$1.1\\text{ A}$$, $$7.1\\text{ W}$$ dan $$2.1\\,\\Omega$$",
        },
      ],
    },
  },
};

export default item;
