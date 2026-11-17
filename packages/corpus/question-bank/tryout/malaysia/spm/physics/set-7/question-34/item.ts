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
        { correct: true, label: "$$46\\text{ W}$$ and $$0.24\\text{ A}$$" },
        { correct: false, label: "$$72\\text{ W}$$ and $$0.30\\text{ A}$$" },
        { correct: false, label: "$$46\\text{ W}$$ and $$0.19\\text{ A}$$" },
        { correct: false, label: "$$58\\text{ W}$$ and $$0.24\\text{ A}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: true, label: "$$46\\text{ W}$$ dan $$0.24\\text{ A}$$" },
        { correct: false, label: "$$72\\text{ W}$$ dan $$0.30\\text{ A}$$" },
        { correct: false, label: "$$46\\text{ W}$$ dan $$0.19\\text{ A}$$" },
        { correct: false, label: "$$58\\text{ W}$$ dan $$0.24\\text{ A}$$" },
      ],
    },
  },
};

export default item;
