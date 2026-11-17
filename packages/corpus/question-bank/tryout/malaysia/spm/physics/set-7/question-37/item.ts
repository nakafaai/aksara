import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-5",
    topic: "electronics",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: true, label: "$$3$$, $$6$$ and $$1$$" },
        { correct: false, label: "$$3$$, $$3$$ and $$1$$" },
        { correct: false, label: "$$6$$, $$6$$ and $$2$$" },
        { correct: false, label: "$$3$$, $$6$$ and $$2$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: true, label: "$$3$$, $$6$$ dan $$1$$" },
        { correct: false, label: "$$3$$, $$3$$ dan $$1$$" },
        { correct: false, label: "$$6$$, $$6$$ dan $$2$$" },
        { correct: false, label: "$$3$$, $$6$$ dan $$2$$" },
      ],
    },
  },
};

export default item;
