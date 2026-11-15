import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "procedure",
    topic: "explicit-information",
  },
  stimulus: "bread-rolls",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$1$$ hour $$45$$ minutes",
        },
        {
          correct: false,
          label: "$$2$$ hours $$45$$ minutes",
        },
        {
          correct: false,
          label: "$$4$$ hours $$15$$ minutes",
        },
        {
          correct: false,
          label: "$$3$$ hours",
        },
        {
          correct: true,
          label: "$$3$$ hours $$15$$ minutes",
        },
      ],
    },
  },
};

export default item;
