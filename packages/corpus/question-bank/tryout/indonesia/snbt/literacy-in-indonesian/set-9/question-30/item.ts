import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Menghapus Label Lama demi Katalog Baru",
        },
        {
          correct: false,
          label: "Kostum $$1998$$ yang Tidak Boleh Diubah",
        },
        {
          correct: true,
          label: "Benang Putih di Balik Mantel",
        },
        {
          correct: false,
          label: "Raka dan Riwayat Kostum yang Sudah Lengkap",
        },
        {
          correct: false,
          label: "Pindah Gedung tanpa Menyimpan Jejak Lama",
        },
      ],
    },
  },
  stimulus: "passage-6",
};

export default item;
