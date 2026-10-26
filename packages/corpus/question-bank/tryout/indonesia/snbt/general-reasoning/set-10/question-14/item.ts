import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$A,F,B,E,D,C$$",
        },
        {
          correct: false,
          label: "$$E,B,F,A,C,D$$",
        },
        {
          correct: false,
          label: "$$F,E,B,D,C,A$$",
        },
        {
          correct: false,
          label: "$$A,C,D,F,E,B$$",
        },
        {
          correct: true,
          label: "$$F,A,D,E,B,C$$",
        },
      ],
    },
  },
};

export default item;
