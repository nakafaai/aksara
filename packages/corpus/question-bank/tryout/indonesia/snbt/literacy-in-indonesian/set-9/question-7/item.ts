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
            "Dalam batas tumbuhan, serasah tidak mengurangi cadangan karena karbonnya masih berada di dalam kawasan mangrove.",
        },
        {
          correct: false,
          label:
            "Dalam batas gabungan tumbuhan dan tanah, serasah harus dihitung dua kali karena keluar dari tumbuhan sekaligus masuk ke tanah.",
        },
        {
          correct: false,
          label:
            "Perubahan batas sistem hanya mengubah istilah yang digunakan, sedangkan arus yang masuk dan keluar selalu menghasilkan jumlah bersih yang sama.",
        },
        {
          correct: true,
          label:
            "Serasah merupakan arus keluar jika hanya tumbuhan yang dihitung, tetapi menjadi perpindahan internal jika tumbuhan dan tanah ditempatkan dalam satu batas sistem.",
        },
        {
          correct: false,
          label:
            "Serasah dapat diabaikan pada kedua batas karena nilainya lebih kecil daripada fotosintesis dan tidak mengubah arah perhitungan.",
        },
      ],
    },
  },
};

export default item;
