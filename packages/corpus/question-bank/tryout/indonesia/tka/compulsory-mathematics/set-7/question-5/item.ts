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
          label: "$$z=1$$",
        },
        {
          correct: false,
          label: "$$x-y=1$$",
        },
        {
          correct: false,
          label: "$$x+y=7$$",
        },
        {
          correct: true,
          label: "$$2x+y+3z=13$$",
        },
        {
          correct: false,
          label: "$$x+y+z=8$$",
        },
      ],
    },
  },
};

export default item;
