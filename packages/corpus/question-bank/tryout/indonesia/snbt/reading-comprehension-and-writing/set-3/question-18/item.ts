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
            "Berdasarkan data, sebuah simpulan terbatas tentang lokakarya kompos.",
        },
        {
          correct: true,
          label:
            "Berdasarkan data, tim menarik simpulan terbatas tentang lokakarya kompos.",
        },
        {
          correct: false,
          label:
            "Berdasarkan data, tim yang menarik simpulan terbatas tentang lokakarya kompos.",
        },
        {
          correct: false,
          label:
            "Data menghasilkan simpulan terbatas tentang lokakarya kompos karena.",
        },
        {
          correct: false,
          label:
            "Berdasarkan data, menarik simpulan terbatas tentang lokakarya kompos.",
        },
      ],
    },
  },
};

export default item;
