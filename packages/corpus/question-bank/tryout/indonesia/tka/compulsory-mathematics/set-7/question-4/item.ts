import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "algebra",
    topic: "linear-equations-inequalities",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$4$$ jam $$15$$ menit",
        },
        {
          correct: false,
          label: "$$4$$ jam $$30$$ menit",
        },
        {
          correct: false,
          label: "$$5$$ jam",
        },
        {
          correct: true,
          label: "$$5$$ jam $$15$$ menit",
        },
        {
          correct: false,
          label: "$$5$$ jam $$30$$ menit",
        },
      ],
    },
  },
};

export default item;
