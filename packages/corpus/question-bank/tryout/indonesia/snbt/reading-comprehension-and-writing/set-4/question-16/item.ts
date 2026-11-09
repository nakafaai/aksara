import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "reading",
    topic: "data-interpretation",
  },
  stimulus: "water-tank",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$6$$ meter kubik",
        },
        {
          correct: false,
          label: "$$8$$ meter kubik",
        },
        {
          correct: false,
          label: "$$14$$ meter kubik",
        },
        {
          correct: false,
          label: "$$20$$ meter kubik",
        },
        {
          correct: false,
          label: "$$34$$ meter kubik",
        },
      ],
    },
  },
};

export default item;
