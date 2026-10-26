import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-1",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "Pengujian Label Lokasi pada Baki Bibit Mangrove",
        },
        {
          correct: false,
          label: "Catatan Awal Sebelum Label Baki Diuji",
        },
        {
          correct: false,
          label: "Pengujian Beberapa Perubahan Serentak dalam Pembagian Bibit",
        },
        {
          correct: false,
          label: "Tanggapan atas Perancangan Ulang Permanen Pembagian Bibit",
        },
        {
          correct: false,
          label: "Evaluasi Menyeluruh atas Seluruh Kegiatan Pembibitan",
        },
      ],
    },
  },
};

export default item;
