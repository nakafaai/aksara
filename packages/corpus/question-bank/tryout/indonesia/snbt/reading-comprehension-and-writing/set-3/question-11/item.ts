import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "analisa efektivitas kartu urutan bahan di lokakarya kompos",
        },
        {
          correct: true,
          label: "analisis efektivitas kartu urutan bahan di lokakarya kompos",
        },
        {
          correct: false,
          label: "analisis efektifitas kartu urutan bahan di lokakarya kompos",
        },
        {
          correct: false,
          label: "analisa efektifitas kartu urutan bahan di lokakarya kompos",
        },
        {
          correct: false,
          label:
            "analisis efektivitas kartu urutan bahan dalam kontek lokakarya kompos",
        },
      ],
    },
  },
  stimulus: "passage-2",
};

export default item;
