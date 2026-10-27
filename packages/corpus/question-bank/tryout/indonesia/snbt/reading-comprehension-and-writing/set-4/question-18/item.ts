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
            "Berdasarkan data, sebuah simpulan terbatas tentang pasar tukar buku.",
        },
        {
          correct: true,
          label:
            "Berdasarkan data, tim menarik simpulan terbatas tentang pasar tukar buku.",
        },
        {
          correct: false,
          label:
            "Tim yang berdasarkan data menarik simpulan terbatas tentang pasar tukar buku.",
        },
        {
          correct: false,
          label:
            "Karena tim menarik simpulan terbatas tentang pasar tukar buku.",
        },
        {
          correct: false,
          label: "Berdasarkan data, menarik tentang pasar tukar buku.",
        },
      ],
    },
  },
};

export default item;
