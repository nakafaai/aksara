import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "algebra",
    topic: "functions",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$4$$ detik",
        },
        {
          correct: false,
          label: "$$2$$ detik",
        },
        {
          correct: false,
          label: "$$6$$ detik",
        },
        {
          correct: false,
          label: "$$8$$ detik",
        },
        {
          correct: false,
          label: "$$5$$ detik",
        },
      ],
    },
  },
};

export default item;
