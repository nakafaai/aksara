import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-4",
    topic: "mole-concept",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "$$1.7\\text{ g}$$ of ammonia, $$\\text{NH}_3$$" },
        { correct: true, label: "$$0.85\\text{ g}$$ of ammonia, $$\\text{NH}_3$$" },
        { correct: false, label: "$$2.4\\text{ g}$$ of magnesium" },
        { correct: false, label: "$$3.2\\text{ g}$$ of sulfur" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$1.7\\text{ g}$$ ammonia, $$\\text{NH}_3$$" },
        { correct: true, label: "$$0.85\\text{ g}$$ ammonia, $$\\text{NH}_3$$" },
        { correct: false, label: "$$2.4\\text{ g}$$ magnesium" },
        { correct: false, label: "$$3.2\\text{ g}$$ sulfur" },
      ],
    },
  },
};

export default item;
