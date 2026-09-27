import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Setelah jumlah dan jam loket disamakan, tingkat pengembalian tetap tinggi di seluruh area.",
        },
        {
          isCorrect: false,
          label:
            "Pengunjung di satu pintu menunggu lebih lama karena pengembalian deposit diperiksa satu per satu, sedangkan jumlah sampah dicatat dengan cara yang sama.",
        },
        {
          isCorrect: false,
          label:
            "Evaluasi akhir akan memasukkan biaya pencucian dan kehilangan wadah.",
        },
        {
          isCorrect: true,
          label:
            "Pengurangan sampah ternyata berasal dari larangan membawa wadah sekali pakai yang berlaku bersamaan.",
        },
        {
          isCorrect: false,
          label: "Satu loket dipindahkan dan jam layanannya diperpanjang.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
