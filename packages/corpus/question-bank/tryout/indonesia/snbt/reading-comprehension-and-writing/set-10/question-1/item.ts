import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-1",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Pengujian Pengelompokan Bahan menurut Tahap Resep di Kelas Memasak",
        },
        {
          correct: false,
          label: "Catatan Awal Sebelum Susunan Bahan Diuji",
        },
        {
          correct: false,
          label: "Pengujian Beberapa Perubahan Serentak di Kelas Memasak",
        },
        {
          correct: false,
          label: "Tanggapan terhadap Perancangan Ulang Permanen Kelas Memasak",
        },
        {
          correct: false,
          label: "Evaluasi Menyeluruh atas Semua Kegiatan Kelas Memasak",
        },
      ],
    },
  },
};

export default item;
