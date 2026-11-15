import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "recount",
    topic: "explicit-information",
  },
  stimulus: "chili-harvest",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$0.6$$ kg",
        },
        {
          correct: false,
          label: "$$1$$ kg",
        },
        {
          correct: false,
          label: "$$0.2$$ kg",
        },
        {
          correct: false,
          label: "$$3.7$$ kg",
        },
        {
          correct: false,
          label: "$$0.4$$ kg",
        },
      ],
    },
  },
};

export default item;
