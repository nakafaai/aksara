import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Kepastian Mutlak tentang gudang kecil dekat pelabuhan",
        },
        {
          isCorrect: true,
          label: "Langkah Kecil Bima di gudang kecil dekat pelabuhan",
        },
        {
          isCorrect: false,
          label:
            "Alasan Mengabaikan Semua Bukti dalam gudang kecil dekat pelabuhan",
        },
        {
          isCorrect: false,
          label: "Sejarah Lengkap akuntabilitas di Seluruh Dunia",
        },
        {
          isCorrect: false,
          label: "Satu Aturan untuk Setiap gudang kecil dekat pelabuhan",
        },
      ],
    },
  },
  stimulusKey: "passage-5",
};

export default item;
