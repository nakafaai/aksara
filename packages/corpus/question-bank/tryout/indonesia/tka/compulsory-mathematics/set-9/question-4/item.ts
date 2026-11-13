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
          label: "$$64$$",
        },
        {
          correct: false,
          label: "$$107$$",
        },
        {
          correct: false,
          label: "$$120$$",
        },
        {
          correct: true,
          label: "$$121$$",
        },
        {
          correct: false,
          label: "$$147$$",
        },
      ],
    },
  },
};

export default item;
