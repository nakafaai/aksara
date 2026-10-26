import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Berdasarkan data, sebuah simpulan terbatas tentang ruang latihan musik.",
        },
        {
          correct: true,
          label:
            "Berdasarkan data, tim menarik simpulan terbatas tentang ruang latihan musik.",
        },
        {
          correct: false,
          label:
            "Tim yang berdasarkan data menarik simpulan terbatas tentang ruang latihan musik.",
        },
        {
          correct: false,
          label:
            "Karena tim menarik simpulan terbatas tentang ruang latihan musik.",
        },
        {
          correct: false,
          label: "Berdasarkan data, menarik tentang ruang latihan musik.",
        },
      ],
    },
  },
  stimulus: "passage-2",
};

export default item;
