import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-1",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Setelah jumlah dan jam loket disamakan, tingkat pengembalian tetap tinggi di seluruh area.",
        },
        {
          correct: false,
          label:
            "Pengunjung di satu pintu menunggu lebih lama karena pengembalian deposit diperiksa satu per satu, sedangkan jumlah sampah dicatat dengan cara yang sama.",
        },
        {
          correct: false,
          label:
            "Evaluasi akhir akan memasukkan biaya pencucian dan kehilangan wadah.",
        },
        {
          correct: true,
          label:
            "Pengurangan sampah ternyata berasal dari larangan membawa wadah sekali pakai yang berlaku bersamaan.",
        },
        {
          correct: false,
          label: "Satu loket dipindahkan dan jam layanannya diperpanjang.",
        },
      ],
    },
  },
};

export default item;
