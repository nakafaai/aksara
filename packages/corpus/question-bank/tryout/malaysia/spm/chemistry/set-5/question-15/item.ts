import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-4",
    topic: "acids-bases-and-salts",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "$$12.4$$ then $$10.4$$" },
        { correct: true, label: "$$12.7$$ then $$10.7$$" },
        { correct: false, label: "$$12.7$$ then $$11.7$$" },
        { correct: false, label: "$$1.3$$ then $$3.3$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$12.4$$ kemudian $$10.4$$" },
        { correct: true, label: "$$12.7$$ kemudian $$10.7$$" },
        { correct: false, label: "$$12.7$$ kemudian $$11.7$$" },
        { correct: false, label: "$$1.3$$ kemudian $$3.3$$" },
      ],
    },
  },
};

export default item;
