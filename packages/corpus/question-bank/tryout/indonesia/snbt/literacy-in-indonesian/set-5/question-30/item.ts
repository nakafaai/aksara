import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-6",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Benang Merah sebagai Hiasan yang Tidak Mengubah Cerita",
        },
        {
          correct: false,
          label: "Menghapus Seluruh Bekas pada Blus Warisan",
        },
        {
          correct: false,
          label: "Konflik sebagai Istilah Tanpa Peran dalam Cerita",
        },
        {
          correct: false,
          label: "Pilihan Ayu yang Mengabaikan Keinginan Pelanggan",
        },
        {
          correct: true,
          label: "Jahitan Merah yang Tidak Disembunyikan",
        },
      ],
    },
  },
};

export default item;
