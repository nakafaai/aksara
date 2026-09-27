import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Catatan Awal Sebelum Pengujian Panah Arah",
        },
        {
          isCorrect: true,
          label: "Pengujian Panah Arah pada Rute Pameran Karya Siswa",
        },
        {
          isCorrect: false,
          label: "Pengujian Beberapa Perubahan Serentak pada Pameran",
        },
        {
          isCorrect: false,
          label:
            "Tanggapan Pengunjung terhadap Perancangan Ulang Permanen Pameran",
        },
        {
          isCorrect: false,
          label: "Evaluasi Menyeluruh atas Semua Kegiatan Pameran",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
