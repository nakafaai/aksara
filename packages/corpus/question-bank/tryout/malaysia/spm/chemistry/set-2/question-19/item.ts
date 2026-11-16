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
        {
          correct: false,
          label: "$$11.1\\text{ g}$$ of calcium chloride, $$\\text{CaCl}_2$$",
        },
        {
          correct: true,
          label: "$$7.4\\text{ g}$$ of calcium chloride, $$\\text{CaCl}_2$$",
        },
        {
          correct: false,
          label: "$$2.8\\text{ g}$$ of potassium hydroxide, $$\\text{KOH}$$",
        },
        {
          correct: false,
          label: "$$2.0\\text{ g}$$ of magnesium oxide, $$\\text{MgO}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$11.1\\text{ g}$$ kalsium klorida, $$\\text{CaCl}_2$$",
        },
        {
          correct: true,
          label: "$$7.4\\text{ g}$$ kalsium klorida, $$\\text{CaCl}_2$$",
        },
        {
          correct: false,
          label: "$$2.8\\text{ g}$$ kalium hidroksida, $$\\text{KOH}$$",
        },
        {
          correct: false,
          label: "$$2.0\\text{ g}$$ magnesium oksida, $$\\text{MgO}$$",
        },
      ],
    },
  },
};

export default item;
