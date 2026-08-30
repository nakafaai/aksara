import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "Langkah Kecil Nisa di pasar kecamatan",
        },
        {
          isCorrect: false,
          label: "Kepastian Mutlak tentang pasar kecamatan",
        },
        {
          isCorrect: false,
          label: "Alasan Mengabaikan Semua Bukti dalam pasar kecamatan",
        },
        {
          isCorrect: false,
          label: "Sejarah Lengkap advokasi diri di Seluruh Dunia",
        },
        {
          isCorrect: false,
          label: "Satu Aturan untuk Setiap pasar kecamatan",
        },
      ],
    },
  },
  stimulusKey: "passage-5",
};

export default item;
