import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Mesin A",
        },
        {
          correct: false,
          label: "Mesin B",
        },
        {
          correct: false,
          label: "Mesin A dan B",
        },
        {
          correct: false,
          label: "Mesin B dan C",
        },
        {
          correct: true,
          label: "Mesin C",
        },
      ],
    },
  },
};

export default item;
