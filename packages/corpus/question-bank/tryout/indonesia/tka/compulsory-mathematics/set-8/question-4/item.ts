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
          label: "$$9$$",
        },
        {
          correct: true,
          label: "$$10$$",
        },
        {
          correct: false,
          label: "$$21$$",
        },
        {
          correct: false,
          label: "$$30$$",
        },
        {
          correct: false,
          label: "$$36$$",
        },
      ],
    },
  },
};

export default item;
