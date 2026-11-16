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
        { correct: false, label: "$$9.8\\text{ g}$$ of sulfuric acid, $$\\text{H}_2\\text{SO}_4$$" },
        { correct: true, label: "$$4.9\\text{ g}$$ of sulfuric acid, $$\\text{H}_2\\text{SO}_4$$" },
        { correct: false, label: "$$1.8\\text{ g}$$ of water, $$\\text{H}_2\\text{O}$$" },
        { correct: false, label: "$$3.2\\text{ g}$$ of sulfur dioxide, $$\\text{SO}_2$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$9.8\\text{ g}$$ asid sulfurik, $$\\text{H}_2\\text{SO}_4$$" },
        { correct: true, label: "$$4.9\\text{ g}$$ asid sulfurik, $$\\text{H}_2\\text{SO}_4$$" },
        { correct: false, label: "$$1.8\\text{ g}$$ air, $$\\text{H}_2\\text{O}$$" },
        { correct: false, label: "$$3.2\\text{ g}$$ sulfur dioksida, $$\\text{SO}_2$$" },
      ],
    },
  },
};

export default item;
