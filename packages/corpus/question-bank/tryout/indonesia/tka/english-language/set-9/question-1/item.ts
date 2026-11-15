import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "descriptive",
    topic: "explicit-information",
  },
  stimulus: "data-plan",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$7$$ GB of daytime data and $$5$$ GB of night data",
        },
        {
          correct: false,
          label: "$$7$$ GB of daytime data and $$8$$ GB of night data",
        },
        {
          correct: false,
          label: "$$5$$ GB of daytime data and $$5$$ GB of night data",
        },
        {
          correct: false,
          label: "$$10$$ GB of daytime data and $$5$$ GB of night data",
        },
        {
          correct: false,
          label: "$$10$$ GB of daytime data and $$10$$ GB of night data",
        },
      ],
    },
  },
};

export default item;
