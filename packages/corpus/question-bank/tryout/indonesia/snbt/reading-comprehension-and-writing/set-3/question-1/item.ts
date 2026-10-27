import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-1",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Catatan Awal Sebelum Pengujian Simbol Evakuasi",
        },
        {
          correct: false,
          label: "Pengujian Beberapa Perubahan Serentak pada Peta Evakuasi",
        },
        {
          correct: false,
          label:
            "Tanggapan Peserta terhadap Perancangan Ulang Permanen Peta Evakuasi",
        },
        {
          correct: false,
          label: "Evaluasi Menyeluruh atas Semua Unsur Peta Evakuasi",
        },
        {
          correct: true,
          label: "Pengujian Simbol Titik Kumpul yang Lebih Kontras",
        },
      ],
    },
  },
};

export default item;
