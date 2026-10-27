import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-1",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Catatan Awal Sebelum Pengujian Panah Arah",
        },
        {
          correct: true,
          label: "Pengujian Panah Arah pada Rute Pameran Karya Siswa",
        },
        {
          correct: false,
          label: "Pengujian Beberapa Perubahan Serentak pada Pameran",
        },
        {
          correct: false,
          label:
            "Tanggapan Pengunjung terhadap Perancangan Ulang Permanen Pameran",
        },
        {
          correct: false,
          label: "Evaluasi Menyeluruh atas Semua Kegiatan Pameran",
        },
      ],
    },
  },
};

export default item;
