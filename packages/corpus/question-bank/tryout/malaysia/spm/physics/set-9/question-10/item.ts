import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "heat",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "$$94\\text{ K}$$, and $$7$$ stops" },
        { correct: false, label: "$$75\\text{ K}$$, and $$6$$ stops" },
        { correct: true, label: "$$75\\text{ K}$$, and $$9$$ stops" },
        { correct: false, label: "$$75\\text{ K}$$, and $$10$$ stops" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$94\\text{ K}$$, dan $$7$$ hentian" },
        { correct: false, label: "$$75\\text{ K}$$, dan $$6$$ hentian" },
        { correct: true, label: "$$75\\text{ K}$$, dan $$9$$ hentian" },
        { correct: false, label: "$$75\\text{ K}$$, dan $$10$$ hentian" },
      ],
    },
  },
};

export default item;
