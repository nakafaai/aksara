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
          label: "$$2.0\\text{ A}$$, $$2.7\\text{ W}$$ and $$16\\text{ W}$$",
        },
        {
          correct: false,
          label: "$$1.2\\text{ A}$$, $$24\\text{ W}$$ and $$5.8\\text{ W}$$",
        },
        {
          correct: false,
          label: "$$1.2\\text{ A}$$, $$2.7\\text{ W}$$ and $$5.8\\text{ W}$$",
        },
        {
          correct: true,
          label: "$$1.2\\text{ A}$$, $$8.6\\text{ W}$$ and $$5.8\\text{ W}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$2.0\\text{ A}$$, $$2.7\\text{ W}$$ dan $$16\\text{ W}$$",
        },
        {
          correct: false,
          label: "$$1.2\\text{ A}$$, $$24\\text{ W}$$ dan $$5.8\\text{ W}$$",
        },
        {
          correct: false,
          label: "$$1.2\\text{ A}$$, $$2.7\\text{ W}$$ dan $$5.8\\text{ W}$$",
        },
        {
          correct: true,
          label: "$$1.2\\text{ A}$$, $$8.6\\text{ W}$$ dan $$5.8\\text{ W}$$",
        },
      ],
    },
  },
};

export default item;
