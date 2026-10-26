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
          correct: true,
          label: "Mesin C",
        },
        {
          correct: false,
          label: "Mesin A dan C sama tinggi",
        },
        {
          correct: false,
          label: "Mesin B dan C sama tinggi",
        },
      ],
    },
  },
};

export default item;
