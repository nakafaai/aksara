import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "data-probability",
    topic: "probability",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$12$$ putaran",
        },
        {
          correct: false,
          label: "$$15$$ putaran",
        },
        {
          correct: false,
          label: "$$21$$ putaran",
        },
        {
          correct: false,
          label: "$$24$$ putaran",
        },
        {
          correct: false,
          label: "$$30$$ putaran",
        },
      ],
    },
  },
};

export default item;
