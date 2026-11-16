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
        {
          correct: false,
          label: "$$4.80\\text{ g dm}^{-3}$$, phenolphthalein",
        },
        { correct: false, label: "$$48.0\\text{ g dm}^{-3}$$, methyl orange" },
        { correct: true, label: "$$48.0\\text{ g dm}^{-3}$$, phenolphthalein" },
        {
          correct: false,
          label: "$$96.0\\text{ g dm}^{-3}$$, phenolphthalein",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$4.80\\text{ g dm}^{-3}$$, fenolftalein" },
        { correct: false, label: "$$48.0\\text{ g dm}^{-3}$$, metil jingga" },
        { correct: true, label: "$$48.0\\text{ g dm}^{-3}$$, fenolftalein" },
        { correct: false, label: "$$96.0\\text{ g dm}^{-3}$$, fenolftalein" },
      ],
    },
  },
};

export default item;
