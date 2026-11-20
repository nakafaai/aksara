import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "electronics",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$0.166\\text{ A}$$, $$0\\text{ A}$$ and $$0.150\\text{ A}$$",
        },
        {
          correct: false,
          label:
            "$$0.188\\text{ A}$$, $$0.108\\text{ A}$$ and $$0.0800\\text{ A}$$",
        },
        {
          correct: false,
          label:
            "$$0.170\\text{ A}$$, $$0.0200\\text{ A}$$ and $$0.220\\text{ A}$$",
        },
        {
          correct: true,
          label:
            "$$0.170\\text{ A}$$, $$0.0200\\text{ A}$$ and $$0.150\\text{ A}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$0.166\\text{ A}$$, $$0\\text{ A}$$ dan $$0.150\\text{ A}$$",
        },
        {
          correct: false,
          label:
            "$$0.188\\text{ A}$$, $$0.108\\text{ A}$$ dan $$0.0800\\text{ A}$$",
        },
        {
          correct: false,
          label:
            "$$0.170\\text{ A}$$, $$0.0200\\text{ A}$$ dan $$0.220\\text{ A}$$",
        },
        {
          correct: true,
          label:
            "$$0.170\\text{ A}$$, $$0.0200\\text{ A}$$ dan $$0.150\\text{ A}$$",
        },
      ],
    },
  },
};

export default item;
