import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "kerjasama tim dalam uji jadwal digital",
        },
        {
          correct: false,
          label: "kerja-sama tim dalam uji jadwal digital",
        },
        {
          correct: false,
          label: "kerja samah tim dalam uji jadwal digital",
        },
        {
          correct: false,
          label: "kerja sama-sama tim dalam uji jadwal digital",
        },
        {
          correct: true,
          label: "kerja sama tim dalam uji jadwal digital",
        },
      ],
    },
  },
  stimulus: "passage-2",
};

export default item;
