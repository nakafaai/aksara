import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "procedure",
    topic: "explicit-information",
  },
  stimulus: "fish-tank",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$40$$ millilitres",
        },
        {
          correct: false,
          label: "$$60$$ millilitres",
        },
        {
          correct: true,
          label: "$$45$$ millilitres",
        },
        {
          correct: false,
          label: "$$65$$ millilitres",
        },
        {
          correct: false,
          label: "$$15$$ millilitres",
        },
      ],
    },
  },
};

export default item;
