import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "(2)-(4)-(1)-(3)",
        },
        {
          correct: true,
          label: "(4)-(3)-(1)-(2)",
        },
        {
          correct: false,
          label: "(4)-(1)-(2)-(3)",
        },
        {
          correct: false,
          label: "(4)-(2)-(3)-(1)",
        },
        {
          correct: false,
          label: "(3)-(4)-(2)-(1)",
        },
      ],
    },
  },
  stimulus: "passage-1",
};

export default item;
