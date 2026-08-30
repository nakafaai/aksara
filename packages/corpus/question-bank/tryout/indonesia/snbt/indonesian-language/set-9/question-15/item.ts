import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Kepastian Mutlak tentang jalur wisata hutan kota",
        },
        {
          isCorrect: false,
          label: "Alasan Mengabaikan Semua Bukti dalam jalur wisata hutan kota",
        },
        {
          isCorrect: false,
          label: "Sejarah Lengkap aksesibilitas di Seluruh Dunia",
        },
        {
          isCorrect: true,
          label: "Keputusan Berbasis Bukti dalam jalur wisata hutan kota",
        },
        {
          isCorrect: false,
          label: "Satu Aturan untuk Setiap jalur wisata hutan kota",
        },
      ],
    },
  },
  stimulusKey: "passage-3",
};

export default item;
