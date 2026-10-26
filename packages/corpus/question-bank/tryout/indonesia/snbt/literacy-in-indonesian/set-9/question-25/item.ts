import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Lima Penanda yang Berhasil Difoto Laras",
        },
        {
          correct: true,
          label: "Bingkai Kosong dalam Esai Laras",
        },
        {
          correct: false,
          label: "Penyunting yang Menolak Karya Tidak Selesai",
        },
        {
          correct: false,
          label: "Rekaman Suara sebagai Pengganti Semua Foto",
        },
        {
          correct: false,
          label: "Cara Menghapus Batas Pengalaman dari Sebuah Esai",
        },
      ],
    },
  },
  stimulus: "passage-5",
};

export default item;
