import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "redox-equilibrium",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "$$22.3$$ days, $$0.464\\text{ g}$$" },
        { correct: false, label: "$$44.7$$ days, $$0.232\\text{ g}$$" },
        { correct: false, label: "$$89.4$$ days, $$0.464\\text{ g}$$" },
        { correct: true, label: "$$44.7$$ days, $$0.464\\text{ g}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$22.3$$ hari, $$0.464\\text{ g}$$" },
        { correct: false, label: "$$44.7$$ hari, $$0.232\\text{ g}$$" },
        { correct: false, label: "$$89.4$$ hari, $$0.464\\text{ g}$$" },
        { correct: true, label: "$$44.7$$ hari, $$0.464\\text{ g}$$" },
      ],
    },
  },
};

export default item;
