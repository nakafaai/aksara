import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-2",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "kerja sama tim dalam uji tanda genre",
        },
        {
          correct: false,
          label: "kerjasama tim dalam uji tanda genre",
        },
        {
          correct: false,
          label: "kerja-sama tim dalam uji tanda genre",
        },
        {
          correct: false,
          label: "kerja samah tim dalam uji tanda genre",
        },
        {
          correct: false,
          label: "kerja sama-sama tim dalam uji tanda genre",
        },
      ],
    },
  },
};

export default item;
