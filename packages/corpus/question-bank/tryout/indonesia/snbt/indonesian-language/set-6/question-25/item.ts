import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "Langkah Kecil Sari di program teman belajar",
        },
        {
          isCorrect: false,
          label: "Kepastian Mutlak tentang program teman belajar",
        },
        {
          isCorrect: false,
          label: "Alasan Mengabaikan Semua Bukti dalam program teman belajar",
        },
        {
          isCorrect: false,
          label: "Sejarah Lengkap penyangga belajar di Seluruh Dunia",
        },
        {
          isCorrect: false,
          label: "Satu Aturan untuk Setiap program teman belajar",
        },
      ],
    },
  },
  stimulusKey: "passage-5",
};

export default item;
