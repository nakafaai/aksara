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
          label: "$$08.48$$",
        },
        {
          correct: true,
          label: "$$09.00$$",
        },
        {
          correct: false,
          label: "$$09.06$$",
        },
        {
          correct: false,
          label: "$$09.30$$",
        },
        {
          correct: false,
          label: "$$10.00$$",
        },
      ],
    },
  },
};

export default item;
