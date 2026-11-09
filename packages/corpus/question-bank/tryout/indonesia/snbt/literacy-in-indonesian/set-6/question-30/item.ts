import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-6",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Garis yang Pasti Disebabkan Kelembapan Tinggi",
        },
        {
          correct: false,
          label: "Perintah Supervisor yang Sudah Dipahami Sepenuhnya",
        },
        {
          correct: false,
          label:
            "Sudut Pandang Terbatas sebagai Istilah Tanpa Peran dalam Cerita",
        },
        {
          correct: false,
          label: "Pemindahan Rutin yang Tidak Memerlukan Catatan Lama",
        },
        {
          correct: true,
          label: "Satu Kartu sebelum Lukisan Dipindahkan",
        },
      ],
    },
  },
};

export default item;
