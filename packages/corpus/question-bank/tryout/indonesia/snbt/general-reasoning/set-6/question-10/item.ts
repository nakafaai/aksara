import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: true, label: "nit" },
        { correct: false, label: "it" },
        { correct: false, label: "pit" },
        { correct: false, label: "sit" },
        {
          correct: false,
          label: "tidak ada satu pun",
        },
      ],
    },
  },
};

export default item;
