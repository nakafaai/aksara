import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "algebra",
    topic: "linear-equations-inequalities",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$6$$ km per jam",
        },
        {
          correct: false,
          label: "$$7{,}2$$ km per jam",
        },
        {
          correct: true,
          label: "$$14{,}4$$ km per jam",
        },
        {
          correct: false,
          label: "$$15$$ km per jam",
        },
        {
          correct: false,
          label: "$$30$$ km per jam",
        },
      ],
    },
  },
};

export default item;
