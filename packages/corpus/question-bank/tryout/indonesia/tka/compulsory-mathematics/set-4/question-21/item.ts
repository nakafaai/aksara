import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "data-probability",
    topic: "data",
  },
  stimulus: "harian",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$4$$ hari",
        },
        {
          correct: false,
          label: "$$5$$ hari",
        },
        {
          correct: false,
          label: "$$6$$ hari",
        },
        {
          correct: false,
          label: "$$7$$ hari",
        },
        {
          correct: false,
          label: "$$10$$ hari",
        },
      ],
    },
  },
};

export default item;
