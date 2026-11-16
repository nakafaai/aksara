import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "mole-concept",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$10.0\\text{ g}$$ of magnesium oxide, no magnesium left",
        },
        {
          correct: false,
          label:
            "$$4.0\\text{ g}$$ of magnesium oxide, $$3.6\\text{ g}$$ of magnesium left",
        },
        {
          correct: true,
          label:
            "$$8.0\\text{ g}$$ of magnesium oxide, $$1.2\\text{ g}$$ of magnesium left",
        },
        {
          correct: false,
          label:
            "$$8.0\\text{ g}$$ of magnesium oxide, $$2.4\\text{ g}$$ of magnesium left",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$10.0\\text{ g}$$ magnesium oksida, tiada magnesium berbaki",
        },
        {
          correct: false,
          label:
            "$$4.0\\text{ g}$$ magnesium oksida, $$3.6\\text{ g}$$ magnesium berbaki",
        },
        {
          correct: true,
          label:
            "$$8.0\\text{ g}$$ magnesium oksida, $$1.2\\text{ g}$$ magnesium berbaki",
        },
        {
          correct: false,
          label:
            "$$8.0\\text{ g}$$ magnesium oksida, $$2.4\\text{ g}$$ magnesium berbaki",
        },
      ],
    },
  },
};

export default item;
