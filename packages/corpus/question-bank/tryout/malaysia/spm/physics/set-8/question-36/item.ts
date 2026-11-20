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
        { correct: false, label: "$$2$$, $$0$$ and $$4$$" },
        { correct: false, label: "$$2$$, $$1$$ and $$0$$" },
        { correct: false, label: "$$3$$, $$1$$ and $$0$$" },
        { correct: true, label: "$$2$$, $$1$$ and $$1$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$2$$, $$0$$ dan $$4$$" },
        { correct: false, label: "$$2$$, $$1$$ dan $$0$$" },
        { correct: false, label: "$$3$$, $$1$$ dan $$0$$" },
        { correct: true, label: "$$2$$, $$1$$ dan $$1$$" },
      ],
    },
  },
};

export default item;
