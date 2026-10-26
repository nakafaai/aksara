import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "kerja sama tim dalam pengujian kartu urutan bahan",
        },
        {
          correct: false,
          label: "kerjasama tim dalam pengujian kartu urutan bahan",
        },
        {
          correct: false,
          label: "kerja-sama tim dalam pengujian kartu urutan bahan",
        },
        {
          correct: false,
          label: "kerja samah tim dalam pengujian kartu urutan bahan",
        },
        {
          correct: false,
          label: "kerja sama-sama tim dalam pengujian kartu urutan bahan",
        },
      ],
    },
  },
  stimulus: "passage-2",
};

export default item;
