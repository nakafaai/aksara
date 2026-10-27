import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "algebra",
    topic: "linear-equations-inequalities",
  },
  stimulus: "courier-prices",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$2:1$$",
        },
        {
          correct: false,
          label: "$$5:2$$",
        },
        {
          correct: false,
          label: "$$9:4$$",
        },
        {
          correct: false,
          label: "$$13:5$$",
        },
        {
          correct: true,
          label: "$$11:5$$",
        },
      ],
    },
  },
};

export default item;
