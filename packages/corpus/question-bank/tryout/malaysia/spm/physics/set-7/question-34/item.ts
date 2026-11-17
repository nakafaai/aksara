import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "electromagnetism",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$46\\text{ W}$$, $$0.24\\text{ A}$$ and $$61\\text{ W}$$",
        },
        {
          correct: false,
          label: "$$72\\text{ W}$$, $$0.30\\text{ A}$$ and $$72\\text{ W}$$",
        },
        {
          correct: false,
          label: "$$46\\text{ W}$$, $$0.19\\text{ A}$$ and $$61\\text{ W}$$",
        },
        {
          correct: false,
          label: "$$46\\text{ W}$$, $$0.24\\text{ A}$$ and $$76\\text{ W}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$46\\text{ W}$$, $$0.24\\text{ A}$$ dan $$61\\text{ W}$$",
        },
        {
          correct: false,
          label: "$$72\\text{ W}$$, $$0.30\\text{ A}$$ dan $$72\\text{ W}$$",
        },
        {
          correct: false,
          label: "$$46\\text{ W}$$, $$0.19\\text{ A}$$ dan $$61\\text{ W}$$",
        },
        {
          correct: false,
          label: "$$46\\text{ W}$$, $$0.24\\text{ A}$$ dan $$76\\text{ W}$$",
        },
      ],
    },
  },
};

export default item;
