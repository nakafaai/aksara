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
        {
          correct: false,
          label: "$$0.50°$$, $$+0.25\\text{ D}$$ and $$8.0°$$",
        },
        { correct: false, label: "$$0.50°$$, $$+25\\text{ D}$$ and $$12.5°$$" },
        { correct: true, label: "$$0.50°$$, $$+25\\text{ D}$$ and $$8.0°$$" },
        { correct: false, label: "$$0.50°$$, $$+5.0\\text{ D}$$ and $$8.0°$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$0.50°$$, $$+0.25\\text{ D}$$ dan $$8.0°$$",
        },
        { correct: false, label: "$$0.50°$$, $$+25\\text{ D}$$ dan $$12.5°$$" },
        { correct: true, label: "$$0.50°$$, $$+25\\text{ D}$$ dan $$8.0°$$" },
        { correct: false, label: "$$0.50°$$, $$+5.0\\text{ D}$$ dan $$8.0°$$" },
      ],
    },
  },
};

export default item;
