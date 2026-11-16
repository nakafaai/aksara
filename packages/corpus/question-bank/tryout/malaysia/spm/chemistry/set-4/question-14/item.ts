import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "acids-bases-and-salts",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$14.8\\text{ g}$$ of crystals, and $$1.6\\text{ g}$$ of magnesium oxide on the filter paper",
        },
        {
          correct: false,
          label:
            "$$11.8\\text{ g}$$ of crystals, and $$2.4\\text{ g}$$ of magnesium oxide on the filter paper",
        },
        {
          correct: true,
          label:
            "$$11.8\\text{ g}$$ of crystals, and $$1.6\\text{ g}$$ of magnesium oxide on the filter paper",
        },
        {
          correct: false,
          label:
            "$$5.76\\text{ g}$$ of crystals, and $$1.6\\text{ g}$$ of magnesium oxide on the filter paper",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$14.8\\text{ g}$$ hablur, dan $$1.6\\text{ g}$$ magnesium oksida pada kertas turas",
        },
        {
          correct: false,
          label:
            "$$11.8\\text{ g}$$ hablur, dan $$2.4\\text{ g}$$ magnesium oksida pada kertas turas",
        },
        {
          correct: true,
          label:
            "$$11.8\\text{ g}$$ hablur, dan $$1.6\\text{ g}$$ magnesium oksida pada kertas turas",
        },
        {
          correct: false,
          label:
            "$$5.76\\text{ g}$$ hablur, dan $$1.6\\text{ g}$$ magnesium oksida pada kertas turas",
        },
      ],
    },
  },
};

export default item;
