import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Catatan Awal Sebelum Pengujian Simbol Evakuasi",
        },
        {
          isCorrect: false,
          label: "Pengujian Beberapa Perubahan Serentak pada Peta Evakuasi",
        },
        {
          isCorrect: false,
          label:
            "Tanggapan Peserta terhadap Perancangan Ulang Permanen Peta Evakuasi",
        },
        {
          isCorrect: false,
          label: "Evaluasi Menyeluruh atas Semua Unsur Peta Evakuasi",
        },
        {
          isCorrect: true,
          label: "Pengujian Simbol Titik Kumpul yang Lebih Kontras",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
