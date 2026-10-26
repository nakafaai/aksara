import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Satu loket dipindahkan dan jam layanannya diperpanjang.",
        },
        {
          correct: false,
          label:
            "Tingkat pengembalian malam pertama membuktikan sistem harus diterapkan permanen tanpa perubahan.",
        },
        {
          correct: true,
          label:
            "Uang jaminan dapat mengurangi sampah, tetapi keberhasilannya harus dinilai bersama akses layanan dan biaya bagi berbagai pihak.",
        },
        {
          correct: false,
          label:
            "Karena ada keluhan, uang jaminan tidak mungkin memengaruhi perilaku pengunjung.",
        },
        {
          correct: false,
          label:
            "Evaluasi akhir akan memasukkan biaya pencucian dan kehilangan wadah.",
        },
      ],
    },
  },
  stimulus: "passage-1",
};

export default item;
