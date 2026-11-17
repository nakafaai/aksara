import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-5",
    topic: "electricity",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$8.0\\text{ W}$$, $$0.40\\text{ s}$$ and $$12\\text{ A}$$",
        },
        {
          correct: false,
          label: "$$8.0\\text{ W}$$, $$0.24\\text{ s}$$ and $$12\\text{ A}$$",
        },
        {
          correct: false,
          label: "$$0.40\\text{ W}$$, $$8.0\\text{ s}$$ and $$150\\text{ A}$$",
        },
        {
          correct: false,
          label: "$$8.0\\text{ W}$$, $$0.16\\text{ s}$$ and $$12\\text{ A}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$8.0\\text{ W}$$, $$0.40\\text{ s}$$ dan $$12\\text{ A}$$",
        },
        {
          correct: false,
          label: "$$8.0\\text{ W}$$, $$0.24\\text{ s}$$ dan $$12\\text{ A}$$",
        },
        {
          correct: false,
          label: "$$0.40\\text{ W}$$, $$8.0\\text{ s}$$ dan $$150\\text{ A}$$",
        },
        {
          correct: false,
          label: "$$8.0\\text{ W}$$, $$0.16\\text{ s}$$ dan $$12\\text{ A}$$",
        },
      ],
    },
  },
};

export default item;
