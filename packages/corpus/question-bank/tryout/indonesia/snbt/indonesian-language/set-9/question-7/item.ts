import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Dalam batas tumbuhan, serasah tidak mengurangi cadangan karena karbonnya masih berada di dalam kawasan mangrove.",
        },
        {
          isCorrect: false,
          label:
            "Dalam batas gabungan tumbuhan dan tanah, serasah harus dihitung dua kali karena keluar dari tumbuhan sekaligus masuk ke tanah.",
        },
        {
          isCorrect: false,
          label:
            "Perubahan batas sistem hanya mengubah istilah yang digunakan, sedangkan arus yang masuk dan keluar selalu menghasilkan jumlah bersih yang sama.",
        },
        {
          isCorrect: true,
          label:
            "Serasah merupakan arus keluar jika hanya tumbuhan yang dihitung, tetapi menjadi perpindahan internal jika tumbuhan dan tanah ditempatkan dalam satu batas sistem.",
        },
        {
          isCorrect: false,
          label:
            "Serasah dapat diabaikan pada kedua batas karena nilainya lebih kecil daripada fotosintesis dan tidak mengubah arah perhitungan.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
