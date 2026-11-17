import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-4",
    topic: "light-and-optics",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "$$76\\text{ cm}$$ and $$10°$$" },
        { correct: false, label: "$$84\\text{ cm}$$ and $$0.025°$$" },
        { correct: true, label: "$$84\\text{ cm}$$ and $$10°$$" },
        { correct: false, label: "$$84\\text{ cm}$$ and $$0.50°$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$76\\text{ cm}$$ dan $$10°$$" },
        { correct: false, label: "$$84\\text{ cm}$$ dan $$0.025°$$" },
        { correct: true, label: "$$84\\text{ cm}$$ dan $$10°$$" },
        { correct: false, label: "$$84\\text{ cm}$$ dan $$0.50°$$" },
      ],
    },
  },
};

export default item;
