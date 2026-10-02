import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Pengujian Pengelompokan Bahan menurut Tahap Resep di Kelas Memasak",
        },
        {
          isCorrect: false,
          label: "Catatan Awal Sebelum Susunan Bahan Diuji",
        },
        {
          isCorrect: false,
          label: "Pengujian Beberapa Perubahan Serentak di Kelas Memasak",
        },
        {
          isCorrect: false,
          label: "Tanggapan terhadap Perancangan Ulang Permanen Kelas Memasak",
        },
        {
          isCorrect: false,
          label: "Evaluasi Menyeluruh atas Semua Kegiatan Kelas Memasak",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
