import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Pengecatan Putih pada Hari Terakhir",
        },
        {
          isCorrect: true,
          label: "Jejak Biru di Balik Dinding Putih",
        },
        {
          isCorrect: false,
          label: "Foto Tahun 1978 di Ruang Arsip",
        },
        {
          isCorrect: false,
          label: "Mengapa Semua Lapisan Lama Harus Ditutup",
        },
        {
          isCorrect: false,
          label: "Retakan yang Tidak Berkaitan dengan Sejarah",
        },
      ],
    },
  },
  stimulusKey: "passage-6",
};

export default item;
