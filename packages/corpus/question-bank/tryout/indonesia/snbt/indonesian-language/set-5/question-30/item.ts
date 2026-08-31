import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Benang Merah sebagai Hiasan yang Tidak Mengubah Cerita",
        },
        {
          isCorrect: false,
          label: "Menghapus Seluruh Bekas pada Blus Warisan",
        },
        {
          isCorrect: false,
          label: "Konflik sebagai Istilah Tanpa Peran dalam Cerita",
        },
        {
          isCorrect: false,
          label: "Pilihan Ayu yang Mengabaikan Keinginan Pelanggan",
        },
        {
          isCorrect: true,
          label: "Jahitan Merah yang Tidak Disembunyikan",
        },
      ],
    },
  },
  stimulusKey: "passage-6",
};

export default item;
