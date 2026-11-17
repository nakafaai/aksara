import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "heat",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$88\\text{ g}$$ of ice, and $$12\\text{ g}$$ evaporated",
        },
        {
          correct: true,
          label: "$$85\\text{ g}$$ of ice, and $$15\\text{ g}$$ evaporated",
        },
        {
          correct: false,
          label: "$$83\\text{ g}$$ of ice, and $$17\\text{ g}$$ evaporated",
        },
        { correct: false, label: "No ice, and $$3.4\\text{ g}$$ evaporated" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$88\\text{ g}$$ ais, dan $$12\\text{ g}$$ tersejat",
        },
        {
          correct: true,
          label: "$$85\\text{ g}$$ ais, dan $$15\\text{ g}$$ tersejat",
        },
        {
          correct: false,
          label: "$$83\\text{ g}$$ ais, dan $$17\\text{ g}$$ tersejat",
        },
        { correct: false, label: "Tiada ais, dan $$3.4\\text{ g}$$ tersejat" },
      ],
    },
  },
};

export default item;
