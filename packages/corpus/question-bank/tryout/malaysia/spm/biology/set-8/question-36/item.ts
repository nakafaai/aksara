import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-5",
    topic: "biodiversity",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "$$6$$ hours" },
        { correct: false, label: "$$1.5$$ hours" },
        { correct: false, label: "$$4$$ hours" },
        { correct: true, label: "$$3$$ hours" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$6$$ jam" },
        { correct: false, label: "$$1.5$$ jam" },
        { correct: false, label: "$$4$$ jam" },
        { correct: true, label: "$$3$$ jam" },
      ],
    },
  },
};

export default item;
