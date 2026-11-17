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
        { correct: true, label: "$$3$$ and $$1$$" },
        { correct: false, label: "$$3$$ and $$0$$" },
        { correct: false, label: "$$6$$ and $$1$$" },
        { correct: false, label: "$$2$$ and $$1$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: true, label: "$$3$$ dan $$1$$" },
        { correct: false, label: "$$3$$ dan $$0$$" },
        { correct: false, label: "$$6$$ dan $$1$$" },
        { correct: false, label: "$$2$$ dan $$1$$" },
      ],
    },
  },
};

export default item;
