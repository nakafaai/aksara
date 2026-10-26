import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-1",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "(4)-(1)-(3)-(2)",
        },
        {
          correct: false,
          label: "(1)-(4)-(3)-(2)",
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
          label: "(2)-(4)-(1)-(3)",
        },
      ],
    },
  },
};

export default item;
