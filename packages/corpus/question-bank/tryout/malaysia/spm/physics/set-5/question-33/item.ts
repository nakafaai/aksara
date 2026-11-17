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
        { correct: false, label: "$$24\\text{ W}$$, and $$60$$ turns" },
        { correct: false, label: "$$22\\text{ W}$$, and $$65$$ turns" },
        { correct: false, label: "$$20\\text{ W}$$, and $$71$$ turns" },
        { correct: true, label: "$$20\\text{ W}$$, and $$65$$ turns" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$24\\text{ W}$$, dan $$60$$ lilitan" },
        { correct: false, label: "$$22\\text{ W}$$, dan $$65$$ lilitan" },
        { correct: false, label: "$$20\\text{ W}$$, dan $$71$$ lilitan" },
        { correct: true, label: "$$20\\text{ W}$$, dan $$65$$ lilitan" },
      ],
    },
  },
};

export default item;
