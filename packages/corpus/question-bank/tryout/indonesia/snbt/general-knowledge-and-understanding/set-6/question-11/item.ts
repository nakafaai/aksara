import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Tingkat pengembalian malam pertama membuktikan sistem harus diterapkan permanen tanpa perubahan.",
        },
        {
          correct: false,
          label:
            "Karena ada keluhan, uang jaminan tidak mungkin memengaruhi perilaku pengunjung.",
        },
        {
          correct: false,
          label: "Satu loket dipindahkan dan jam layanannya diperpanjang.",
        },
        {
          correct: false,
          label:
            "Evaluasi akhir akan memasukkan biaya pencucian dan kehilangan wadah.",
        },
        {
          correct: true,
          label:
            "Perubahan perilaku tidak cukup dinilai dari satu angka jika desain layanan membebani kelompok secara berbeda.",
        },
      ],
    },
  },
  stimulus: "passage-1",
};

export default item;
