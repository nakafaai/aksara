import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-5",
    topic: "electricity",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "$$170\\text{ W}$$ and $$6.9\\text{ h}$$" },
        { correct: true, label: "$$170\\text{ W}$$ and $$8.7\\text{ h}$$" },
        { correct: false, label: "$$960\\text{ W}$$ and $$1.6\\text{ h}$$" },
        { correct: false, label: "$$170\\text{ W}$$ and $$5.6\\text{ h}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$170\\text{ W}$$ dan $$6.9\\text{ j}$$" },
        { correct: true, label: "$$170\\text{ W}$$ dan $$8.7\\text{ j}$$" },
        { correct: false, label: "$$960\\text{ W}$$ dan $$1.6\\text{ j}$$" },
        { correct: false, label: "$$170\\text{ W}$$ dan $$5.6\\text{ j}$$" },
      ],
    },
  },
};

export default item;
