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
          label:
            "$$1.2\\text{ A}$$, $$8.6\\text{ W}$$, $$3.1\\,\\Omega$$ and $$12.0\\text{ V}$$",
        },
        {
          correct: false,
          label:
            "$$1.7\\text{ A}$$, $$2.0\\text{ W}$$, $$0\\,\\Omega$$ and $$10.3\\text{ V}$$",
        },
        {
          correct: false,
          label:
            "$$1.1\\text{ A}$$, $$7.1\\text{ W}$$, $$3.1\\,\\Omega$$ and $$11.2\\text{ V}$$",
        },
        {
          correct: true,
          label:
            "$$1.1\\text{ A}$$, $$7.1\\text{ W}$$, $$2.1\\,\\Omega$$ and $$11.1\\text{ V}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$1.2\\text{ A}$$, $$8.6\\text{ W}$$, $$3.1\\,\\Omega$$ dan $$12.0\\text{ V}$$",
        },
        {
          correct: false,
          label:
            "$$1.7\\text{ A}$$, $$2.0\\text{ W}$$, $$0\\,\\Omega$$ dan $$10.3\\text{ V}$$",
        },
        {
          correct: false,
          label:
            "$$1.1\\text{ A}$$, $$7.1\\text{ W}$$, $$3.1\\,\\Omega$$ dan $$11.2\\text{ V}$$",
        },
        {
          correct: true,
          label:
            "$$1.1\\text{ A}$$, $$7.1\\text{ W}$$, $$2.1\\,\\Omega$$ dan $$11.1\\text{ V}$$",
        },
      ],
    },
  },
};

export default item;
