import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-2",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "pada Senin, tim menguji kartu urutan bahan di lokakarya kompos.",
        },
        {
          correct: false,
          label:
            "Pada senin, tim menguji kartu urutan bahan di lokakarya kompos.",
        },
        {
          correct: false,
          label:
            "Pada Senin, Tim menguji kartu urutan bahan di lokakarya kompos.",
        },
        {
          correct: false,
          label:
            "Pada Senin tim menguji kartu urutan bahan di lokakarya kompos",
        },
        {
          correct: true,
          label:
            "Pada Senin, tim menguji kartu urutan bahan di lokakarya kompos.",
        },
      ],
    },
  },
};

export default item;
