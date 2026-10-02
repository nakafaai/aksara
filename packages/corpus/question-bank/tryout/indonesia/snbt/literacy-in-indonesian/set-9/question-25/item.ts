import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Lima Penanda yang Berhasil Difoto Laras",
        },
        {
          isCorrect: true,
          label: "Bingkai Kosong dalam Esai Laras",
        },
        {
          isCorrect: false,
          label: "Penyunting yang Menolak Karya Tidak Selesai",
        },
        {
          isCorrect: false,
          label: "Rekaman Suara sebagai Pengganti Semua Foto",
        },
        {
          isCorrect: false,
          label: "Cara Menghapus Batas Pengalaman dari Sebuah Esai",
        },
      ],
    },
  },
  stimulusKey: "passage-5",
};

export default item;
