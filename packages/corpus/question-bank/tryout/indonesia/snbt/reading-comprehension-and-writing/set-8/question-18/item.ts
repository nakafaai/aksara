import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Berdasarkan data, tim menarik simpulan terbatas tentang layanan barang hilang.",
        },
        {
          correct: false,
          label:
            "Berdasarkan data, sebuah simpulan terbatas tentang layanan barang hilang.",
        },
        {
          correct: false,
          label:
            "Tim yang berdasarkan data menarik simpulan terbatas tentang layanan barang hilang.",
        },
        {
          correct: false,
          label:
            "Karena tim menarik simpulan terbatas tentang layanan barang hilang.",
        },
        {
          correct: false,
          label: "Berdasarkan data, menarik tentang layanan barang hilang.",
        },
      ],
    },
  },
  stimulus: "passage-2",
};

export default item;
