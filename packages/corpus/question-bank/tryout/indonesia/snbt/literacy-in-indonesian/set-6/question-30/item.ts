import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Garis yang Pasti Disebabkan Kelembapan Tinggi",
        },
        {
          isCorrect: false,
          label: "Perintah Supervisor yang Sudah Dipahami Sepenuhnya",
        },
        {
          isCorrect: false,
          label:
            "Sudut Pandang Terbatas sebagai Istilah Tanpa Peran dalam Cerita",
        },
        {
          isCorrect: false,
          label: "Pemindahan Rutin yang Tidak Memerlukan Catatan Lama",
        },
        {
          isCorrect: true,
          label: "Satu Kartu sebelum Lukisan Dipindahkan",
        },
      ],
    },
  },
  stimulusKey: "passage-6",
};

export default item;
