import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Menghapus Label Lama demi Katalog Baru",
        },
        {
          isCorrect: false,
          label: "Kostum 1998 yang Tidak Boleh Diubah",
        },
        {
          isCorrect: true,
          label: "Benang Putih di Balik Mantel",
        },
        {
          isCorrect: false,
          label: "Raka dan Riwayat Kostum yang Sudah Lengkap",
        },
        {
          isCorrect: false,
          label: "Pindah Gedung tanpa Menyimpan Jejak Lama",
        },
      ],
    },
  },
  stimulusKey: "passage-6",
};

export default item;
