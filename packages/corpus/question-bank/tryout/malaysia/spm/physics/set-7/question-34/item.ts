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
          label: "$$46\\text{ W}$$, $$0.24\\text{ A}$$ and $$15\\text{ V}$$",
        },
        {
          correct: false,
          label: "$$72\\text{ W}$$, $$0.30\\text{ A}$$ and $$12\\text{ V}$$",
        },
        {
          correct: false,
          label: "$$46\\text{ W}$$, $$0.19\\text{ A}$$ and $$15\\text{ V}$$",
        },
        {
          correct: false,
          label: "$$58\\text{ W}$$, $$0.24\\text{ A}$$ and $$13\\text{ V}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$46\\text{ W}$$, $$0.24\\text{ A}$$ dan $$15\\text{ V}$$",
        },
        {
          correct: false,
          label: "$$72\\text{ W}$$, $$0.30\\text{ A}$$ dan $$12\\text{ V}$$",
        },
        {
          correct: false,
          label: "$$46\\text{ W}$$, $$0.19\\text{ A}$$ dan $$15\\text{ V}$$",
        },
        {
          correct: false,
          label: "$$58\\text{ W}$$, $$0.24\\text{ A}$$ dan $$13\\text{ V}$$",
        },
      ],
    },
  },
};

export default item;
