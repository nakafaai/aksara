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
          label: "$$11{,}25$$ kg",
        },
        {
          correct: true,
          label: "$$12$$ kg",
        },
        {
          correct: false,
          label: "$$15$$ kg",
        },
        {
          correct: false,
          label: "$$18$$ kg",
        },
        {
          correct: false,
          label: "$$22{,}8$$ kg",
        },
      ],
    },
  },
};

export default item;
