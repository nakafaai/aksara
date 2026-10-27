import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-1",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "(1)-(3)-(4)-(2)",
        },
        {
          correct: true,
          label: "(4)-(3)-(1)-(2)",
        },
        {
          correct: false,
          label: "(3)-(4)-(1)-(2)",
        },
        {
          correct: false,
          label: "(3)-(1)-(2)-(4)",
        },
        {
          correct: false,
          label: "(2)-(3)-(1)-(4)",
        },
      ],
    },
  },
};

export default item;
