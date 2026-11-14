import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "geometry-measurement",
    topic: "measurement",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$6$$ kaleng",
        },
        {
          correct: true,
          label: "$$7$$ kaleng",
        },
        {
          correct: false,
          label: "$$8$$ kaleng",
        },
        {
          correct: false,
          label: "$$10$$ kaleng",
        },
        {
          correct: false,
          label: "$$14$$ kaleng",
        },
      ],
    },
  },
};

export default item;
