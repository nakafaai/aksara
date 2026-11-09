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
          label: "$$29$$",
        },
        {
          correct: false,
          label: "$$38$$",
        },
        {
          correct: true,
          label: "$$47$$",
        },
        {
          correct: false,
          label: "$$56$$",
        },
        {
          correct: false,
          label: "$$74$$",
        },
      ],
    },
  },
};

export default item;
