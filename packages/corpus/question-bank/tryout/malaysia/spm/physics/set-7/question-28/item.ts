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
          label: "$$1.2\\text{ A}$$, $$8.6\\text{ W}$$ and $$12.0\\text{ V}$$",
        },
        {
          correct: false,
          label: "$$1.7\\text{ A}$$, $$2.0\\text{ W}$$ and $$10.3\\text{ V}$$",
        },
        {
          correct: false,
          label: "$$1.1\\text{ A}$$, $$20\\text{ W}$$ and $$10.9\\text{ V}$$",
        },
        {
          correct: true,
          label: "$$1.1\\text{ A}$$, $$7.1\\text{ W}$$ and $$10.9\\text{ V}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$1.2\\text{ A}$$, $$8.6\\text{ W}$$ dan $$12.0\\text{ V}$$",
        },
        {
          correct: false,
          label: "$$1.7\\text{ A}$$, $$2.0\\text{ W}$$ dan $$10.3\\text{ V}$$",
        },
        {
          correct: false,
          label: "$$1.1\\text{ A}$$, $$20\\text{ W}$$ dan $$10.9\\text{ V}$$",
        },
        {
          correct: true,
          label: "$$1.1\\text{ A}$$, $$7.1\\text{ W}$$ dan $$10.9\\text{ V}$$",
        },
      ],
    },
  },
};

export default item;
